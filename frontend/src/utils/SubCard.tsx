import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const image = '/images/hudi.png'


const Cards = () => {
    return (
        <div className='h-50 w-full flex gap-2'>
            <Link href={'/Shoes'} className='h-full w-50 shadow-md flex flex-col gap-3'>
                <Image 
                    src={image}
                    alt="image1"
                    width={400}
                    height={250}
                />
                <label className='font-bold text-center'>Shoes</label>
            </Link>

            <Link href={'/Shoes'} className='h-full w-50 shadow-md flex flex-col gap-3'>
                <Image 
                    src={image}
                    alt="image2"
                    width={400}
                    height={250}
                />
                <label className='font-bold text-center'>Shoes</label>
            </Link>

            <Link href={'/Shoes'} className='h-full w-50 shadow-md flex flex-col gap-3'>
                <Image 
                    src={image}
                    alt="image3"
                    width={400}
                    height={250}
                />
                <label className='font-bold text-center'>Shoes</label>
            </Link>

            <Link href={'/Shoes'} className='h-full w-50 shadow-md flex flex-col gap-3'>
                <Image 
                    src={image}
                    alt="image4"
                    width={400}
                    height={250}
                />
                <label className='font-bold text-center'>Shoes</label>
            </Link>

            <Link href={'/Shoes'} className='h-full w-50 shadow-md flex flex-col gap-3'>
                <Image 
                    src={image}
                    alt="image1"
                    width={400}
                    height={250}
                />
                <label className='font-bold text-center'>Shoes</label>
            </Link>
        </div>
    )
}

export default Cards 
