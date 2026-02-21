import Image from 'next/image'
import React from 'react'

const image1 = '/images/image.jpg'
const image2 = '/images/image-copy.png'
const image3 = '/images/image-copy-2.png'
const image4 = '/images/image-copy.png'
import Link from 'next/link'

const Cards = () => {
  return (
    <div className='h-50 w-full flex gap-2'>
      <Link href={'/Shoes'} className='h-full w-50 shadow-md flex flex-col gap-3'>
        <Image 
          src={image1}
          alt="image1"
          width={400}
          height={250}
        />
        <label className='font-bold text-center'>Shoes</label>
      </Link>

      <Link href={'/Shoes'} className='h-full w-50 shadow-md flex flex-col gap-3'>
        <Image 
            src={image1}
            alt="image1"
            width = {0}
            height ={0}
        />
        <label className='font-bold text-center'>Shoes</label>
      </Link>


      <Link href={'/Shoes'} className='h-full w-50 shadow-md flex flex-col gap-3'>
        <Image 
            src={image1}
            alt="image1"
            width = {0}
            height ={0}
        />
        <label className='font-bold text-center'>Shoes</label>
      </Link>


      <Link href={'/Shoes'} className='h-full w-50 shadow-md flex flex-col gap-3'>
        <Image 
            src={image1}
            alt="image1"
            width = {0}
            height ={0}
        />
        <label className='font-bold text-center'>Shoes</label>
      </Link>

      <Link href={'/Shoes'} className='h-full w-50 shadow-md flex flex-col gap-3'>
        <Image 
            src={image1}
            alt="image1"
            width = {0}
            height ={0}
        />
        <label className='font-bold text-center'>Shoes</label>
      </Link>

    </div>
  )
}

export default Cards 
