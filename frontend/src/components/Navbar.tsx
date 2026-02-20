'use client'
import Image from 'next/image'
import Link from 'next/link'
import Search from '../utils/Search'

import { BottomSVG, FavouriteSVG, MenuSVG, ShopSVG, StackSVG } from '../../public/svg/svg'
import { useState } from 'react'
import CategoryMenu from './CategoryMenu'
import CartMenu from './CartMenu'

const Navbar = () => {

    const subCategory = ["home","electronics","fashion","beauty","health","grocery", "bags","footwear", "jewelry","watches","kids","toys","sports","books"];
    const categoryMenu = ["fashion", "electronics", "bags", "footware", "groceries", "beauty", "fashion", "electronics", "bags", "footware", "groceries", "beauty"];

    const [menuStatus, setMenuStatus] = useState(false);
    const [cartStatus, setCartStatus] = useState(false);


    return (
        <div>
            <CategoryMenu menuStatus={menuStatus} setMenuStatus={setMenuStatus}/>

            <CartMenu cartStatus={cartStatus} setCartStatus = {setCartStatus}/>

            {/* Nav Bar */}
            <nav className="fixed top-0 left-0 w-full z-50 shadow-md bg-white">
                {/* Main Navbar */}
                <div className="flex justify-center">
                    <div className="container1 py-2 flex items-center justify-between">
                        {/* Logo */}
                        <Link href="/">
                            <Image src="/images/logo.jpg" alt="logo" width={100} height={40} className="w-auto h-10" />
                        </Link>

                        {/* Search Box */}
                        <div className="w-[40%]">
                            <Search />
                        </div>

                        {/* Auth + Icons */}
                        <div className="flex gap-6 items-center">
                            <div className="flex gap-3">
                                <Link className="hover:underline" href="/login">Login</Link>
                                <Link className="hover:underline" href="/register">Register</Link>
                            </div>

                            <div className="flex gap-4">
                                    <button 
                                        className="relative cursor-pointer hover:scale-110 transition-transform"
                                        onClick= {() => setCartStatus(!cartStatus)}
                                    >
                                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 rounded-full">
                                            0
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
                                <Link href={`/${item}`} key={i} className="hover:text-blue-600 capitalize transition-colors">
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