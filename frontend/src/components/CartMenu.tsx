import React, { useEffect } from 'react'
import { ShopSVG } from '../../public/svg/svg'
import { useAppDispatch, useAppSelector } from '../store/store'
import { getUserAllAddToCart } from '../store/slices/cartSlice';

interface CartMenuProps {
    cartStatus: boolean;
    setCartStatus: (status: boolean) => void;
}

const CartMenu = ({cartStatus, setCartStatus}: CartMenuProps) => {

    const dispatch = useAppDispatch();
    const isLogin = useAppSelector((state) => !!state.login.user);

    const cartItems = useAppSelector((state) => state.cart.items);
    const subtotal = cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    const user = useAppSelector((state) => state.login.user);

    console.log('user from cart menu:', user);

    useEffect(() => {
        if (isLogin) {
            dispatch(getUserAllAddToCart());
        }
    }, [isLogin, dispatch]);

  return (
    <div>
      {/*Cart Menu*/}
            <div 
                className={`fixed inset-0 z-100 transition-all duration-300
                    ${cartStatus ? 'visible' : 'invisible pointer-events-none'}`}
            >
                {/* Dark Overlay */}
                <div 
                    className={`absolute inset-0 bg-black/60 transition-opacity duration-300
                        ${cartStatus ? 'opacity-100' : 'opacity-0'}`}
                    onClick={() => setCartStatus(false)}
                />

                {/* Cart Menu Panel - Right Side */}
                <div 
                    className={`absolute top-0 right-0 h-full w-80 bg-white shadow-2xl transition-transform duration-300 ease-out overflow-y-auto
                        ${cartStatus ? 'translate-x-0' : 'translate-x-full'}`}
                >
                    {/* Cart Header */}
                    <div className='flex items-center justify-between p-4 bg-red-400 text-white'>
                        <h2 className='text-xl font-bold'>Your Cart</h2>
                        <button 
                            onClick={() => setCartStatus(false)}
                            className='w-8 h-8 flex items-center justify-center cursor-pointer bg-white/20 hover:bg-white/30 rounded-full transition-colors'
                        >
                            ✕
                        </button>
                    </div>

                    {/* Cart Content */}
                    <div className='p-4'>
                        {cartItems?.length === 0 ? (
                            <div className='flex flex-col items-center justify-center py-10 text-gray-500'>
                                <ShopSVG />
                                <p className='mt-4 text-lg'>Your cart is empty</p>
                                <p className='text-sm'>Add items to get started</p>
                                <button 
                                    onClick={() => setCartStatus(false)}
                                    className='mt-6 px-6 py-2 bg-red-400 text-white rounded hover:bg-red-500 transition-colors'
                                >
                                    Continue Shopping
                                </button>
                            </div>
                        ) : (
                            <div className='space-y-4 pb-32'>
                                {cartItems.map((item, index) => (
                                    <div key={index} className='flex gap-3 p-3 border rounded-lg'>
                                        <div className='w-20 h-20 rounded-lg overflow-hidden bg-gray-100'>
                                            <img
                                                src={item.product.thumbnail || '/images/hudi.png'}
                                                alt={item.product.name}
                                                className='w-full h-full object-cover'
                                            />
                                        </div>
                                        <div className='flex-1'>
                                            <h3 className='font-semibold text-sm'>{item.product.name || 'Product'}</h3>
                                            <p className='text-xs text-gray-600'>Price: ${item.product.price?.toFixed(2) || '0.00'}</p>
                                            <p className='text-xs text-gray-500'>Qty: {item.quantity}</p>
                                            <p className='text-sm font-semibold text-red-500'>${( item.product.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Cart Footer */}
                    <div className='absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 space-y-3'>
                        <div className='flex justify-between'>
                            <span className='text-sm font-medium'>Items Total:</span>
                            <span className='text-sm font-semibold'>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className='flex justify-between border-t pt-3'>
                            <span className='font-medium'>Total:</span>
                            <span className='font-bold text-red-500'>${subtotal.toFixed(2)}</span>
                        </div>
                        <button className='w-full py-3 bg-red-400 text-white rounded hover:bg-red-500 transition-colors'>
                            Checkout
                        </button>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default CartMenu
