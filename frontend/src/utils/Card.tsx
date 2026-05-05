'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store/store'
import { fetchProducts } from '../store/slices/productsSlice'
import { addToCart } from '../store/slices/cartSlice'
import { useRouter } from 'next/navigation'

const expandImage = '/images/expand.png'
const ratingImage = '/images/rating.png'

const Card = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { products, loading, error } = useAppSelector((state) => state.products);
    const isLoggedIn = useAppSelector((state) => !!state.login.user);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch])

    const handleAddToCart = (product: any) => {
        const cartItem = {
            product: product,
            quantity: 1,
            totalPrice: product.price * 1,
        };

        if (!isLoggedIn) {
            localStorage.setItem('pendingCartItem', JSON.stringify(cartItem));
            router.push('/login');
            return;
        }

        dispatch(addToCart(cartItem));
    };

    if (loading) {
        return <div className='w-full mt-10 h-fit flex justify-center'>Loading products...</div>;
    }

    if (error) {
        return <div className='w-full mt-10 h-fit flex justify-center text-red-500'>Error: {error}</div>;
    }

    return (
        <div className='w-full mt-10 h-fit flex flex-wrap gap-3'>
                {products?.data?.map((product:any) => (
            <div key={product._id} className='w-80 rounded-lg relative hover:scale-105 shadow-2xl transition-transform'>

            <Link href={`/product-details?id=${product?._id}`}>
                <Image
                src={expandImage}
                alt="expand"
                className='right-2 top-2 rounded-t-sm absolute cursor-pointer'
                width={30}
                height={30}
                />
            </Link>

            <Image
                src={'/images/hudi.png'}
                alt={product?.name}
                className='w-full rounded-t-sm'
                width={400}
                height={250}
            />
            <div className="p-2">
                <div className='p-2'>
                    <h4 className='text-sm text-gray-600'>{product?.brand?.name || 'Brand'}</h4>
                    <h2 className="mt-2 mb-2 text-lg font-semibold tracking-tight text-heading line-clamp-2">{product?.name}</h2>
                    <div className='flex gap-3 items-center'>
                        <label className='text-sm'>Rating</label>
                        <div className="flex">
                        {Array.from({ length: 5 }, (_, index) => (
                            <Image
                                key={index}
                                src={ratingImage}
                                alt="star"
                                className={`w-4 h-4 ${index < Math.floor(product?.ratings.average) ? 'opacity-100' : 'opacity-30'}`}
                                width={16}
                                height={16}
                            />
                        ))}
                        </div>
                        <span className='text-sm text-gray-500'>({product?.ratings.count})</span>
                    </div>
                    <div className='mt-2'>
                        <label className='text-lg font-bold text-green-600'>Price: ${product?.price}</label>
                    </div>
                    </div>
                    <div className='p-2 flex justify-center items-center bg-red-300 hover:bg-red-500 rounded-2xl cursor-pointer transition-colors'>
                        <button
                            className='cursor-pointer text-white font-medium'
                            onClick={() => handleAddToCart(product)}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        ))}
        </div>
    )
}

export default Card
