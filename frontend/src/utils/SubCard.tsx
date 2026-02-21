import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

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
            alt="image1"
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
