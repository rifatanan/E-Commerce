import React from 'react'
import { BottomSVG, FavouriteSVG, MenuSVG, ShopSVG, StackSVG } from '../../public/svg/svg'

interface CartMenuProps {
    cartStatus: boolean;
    setCartStatus: (status: boolean) => void;
}

const CartMenu = ({cartStatus, setCartStatus}: CartMenuProps) => {
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
                        {/* Empty Cart State */}
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
                    </div>

                    {/* Cart Footer */}
                    <div className='absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200'>
                        <div className='flex justify-between mb-4'>
                            <span className='font-medium'>Subtotal:</span>
                            <span className='font-bold'>$0.00</span>
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
