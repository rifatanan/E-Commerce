'use client'
import Image from 'next/image'
import Link from 'next/link'
import Search from '../utils/Search'
import { BottomSVG, MenuSVG, ShopSVG } from '../../public/svg/svg'
import { useEffect, useState, useCallback, useRef } from 'react'
import CategoryMenu from './CategoryMenu'
import CartMenu from './CartMenu'
import { useAppDispatch, useAppSelector } from '../store/store'
import { logout } from '../store/slices/loginSlice'
import { clearCart } from '../store/slices/cartSlice'

function debounce<T extends (...args: any[]) => void>(fn: T, delay = 300) {
    let timer: ReturnType<typeof setTimeout> | null = null;
    return function (...args: Parameters<T>) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => fn(...(args as any)), delay);
    };
}


const Navbar = () => {

    const subCategory = ["home","electronics","fashion","beauty","health","grocery", "bags","footwear", "jewelry","watches","kids","toys","sports","books"];

    const [menuStatus, setMenuStatus] = useState(false);
    const [cartStatus, setCartStatus] = useState(false);
    const cartCount = useAppSelector((state) => state.cart.items.reduce((sum, item) => sum + item.quantity, 0));
    const isLoggedIn = useAppSelector((state) => !!state.login.user);
    const user = useAppSelector((state)=> state.login.user);
    const { products } = useAppSelector((state) => state.products);
    const [showResults, setShowResults] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [userDropdown, setUserDropdown] = useState(false);
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const logoutButtonRef = useRef<HTMLButtonElement | null>(null);

    console.log("Products in Navbar:", products);

    const debouncedFilter = useCallback(
        debounce((query: string) => {
            if (!query.trim()) {
                setFilteredProducts([]);
                setShowResults(false);
                return;
            }
            const results = (products || []).filter((product: any) =>
                product.name?.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredProducts(results);
            setShowResults(true);
        }, 2000),
        [products]
    );

    const handleSearchChange = (query: string) => {
        
        setSearchQuery(query);
        debouncedFilter(query);
    };

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
                setUserDropdown(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
  }, []);

    return (
        <div>
            <CategoryMenu menuStatus = {menuStatus} setMenuStatus = {setMenuStatus}/>
            <CartMenu cartStatus = {cartStatus} setCartStatus = {setCartStatus}/>

            {/* Nav Bar */}
            <nav className="fixed top-0 left-0 w-full z-50 shadow-md bg-white">
                {/* Main Navbar */}
                <div className="flex justify-center">
                    <div className="container1 py-2 flex items-center justify-between">
                        {/* Logo */}
                        <Link href="/">
                            <Image src="/images/logo.jpg" alt="logo" width={100} height={40} className="w-50 h-10" />
                        </Link>

                        {/* Search Box */}
                        <div className="w-[40%] relative">
                            <Search onSearch={handleSearchChange}/>

                            {showResults && (
                                <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-b-md shadow-lg max-h-72 overflow-y-auto z-50">
                                    {filteredProducts.length > 0 ? (
                                        filteredProducts.map((product, i) => (
                                            <Link
                                                href={`/product-details/${product._id}`}
                                                key={i}
                                                onClick={() => setShowResults(false) }
                                                className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 transition-colors"
                                            >
                                                {product.thumbnail && (
                                                    <img
                                                        src={product.thumbnail}
                                                        alt={product.name}
                                                        className="w-8 h-8 object-cover rounded"
                                                    />
                                                )}
                                                <div>
                                                    <p className="text-sm font-medium">{product.name}</p>
                                                </div>
                                            </Link>
                                        ))
                                    ) : (
                                        <p className="px-4 py-3 text-sm text-gray-500">No products found.</p>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Auth + Icons */}
                        <div className="flex gap-6 items-center">
                            { user ? 
                                (
                                    <div className="relative" ref={dropdownRef}>
                                        {/* Clickable email button */}
                                        <button
                                            onClick={() => setUserDropdown(!userDropdown)}
                                            className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 px-3 py-1.5 rounded-md transition-colors"
                                        >
                                            {/* Avatar circle */}
                                            <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-content center text-blue-800 text-xs font-medium">
                                                {user?.email?.charAt(0).toUpperCase()}
                                            </div>
                                            <span className="text-sm">{user?.email}</span>
                                            <svg className={`w-3 h-3 text-gray-500 transition-transform ${userDropdown ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>

                                        {/* Dropdown */}
                                        {userDropdown && (
                                            <div className="absolute right-0 top-full mt-1 w-52 bg-white border border-gray-200 rounded-md shadow-md z-50 overflow-hidden">
                                                {/* User info */}
                                                <div className="px-4 border-b border-gray-100">
                                                    <p className="text-sm font-medium text-gray-800">{user?.name}</p>
                                                    <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                                                </div>

                                                {/* Logout button */}
                                                <button
                                                    ref={ logoutButtonRef }
                                                        
                                                    onClick={() => {
                                                        dispatch(logout());
                                                        dispatch(clearCart());
                                                        setUserDropdown(false);
                                                    }}
                                                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                                                >
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" />
                                                    </svg>
                                                    Logout
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )
                                : (
                                    <div className='flex gap-2'>
                                        <Link href="/login" className="text-sm font-medium hover:text-blue-600 transition-colors">
                                            Login
                                        </Link>
                                        <Link href="/register" className="text-sm font-medium hover:text-blue-600 transition-colors">
                                            Register
                                        </Link>
                                    </div>
                                )
                        
                                
                            }

                            <div className="flex gap-4">
                                <button 
                                    className="relative cursor-pointer hover:scale-110 transition-transform"
                                    onClick= {() => setCartStatus(!cartStatus)}
                                >
                                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 rounded-full">
                                        {cartCount}
                                    </span>
                                    <ShopSVG />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Category Bar */}
                <div className="w-full bg-slate-100 flex justify-center p-1">
                    <div className='container1 flex gap-10 font-medium'>
                        <div className='relative'>
                            <button
                                onClick={() => setMenuStatus(!menuStatus)}
                                className='flex justify-center items-center gap-3 bg-red-400 p-2 rounded hover:cursor-pointer hover:bg-red-500 transition-colors'
                            >
                                <MenuSVG />
                                <span>Shop by Category</span>
                                <BottomSVG />
                            </button>
                        </div>

                        {/* Sub Category Bar */}
                        <div className="flex gap-6 py-2 flex-wrap">
                            {subCategory.map((item, i) => (
                                <Link
                                    href={`/${item}`}
                                    key={i}
                                    className="hover:text-blue-600 capitalize transition-colors">
                                    {item}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar