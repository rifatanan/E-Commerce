import Image from 'next/image'
import Link from 'next/link'

const image1 = '/images/image.jpg'
const image2 = '/1.png'
const ratingImage = '/rating.png'

const rating = [1,2,3,4,5];

const Card = () => {
  return (
    <div className='w-full mt-10 h-fit flex gap-3'>
        <div className='w-100 rounded-lg relative hover:scale-101 shadow-2xl'>

            <Link href={'/product-details?id=123'}>
                <Image
                    src={image2}
                    alt="image1"
                    className='right-0 rounded-t-sm absolute cursor-pointer'
                    width={30}
                    height={30}
                />
            </Link>
            
            <Image 
                src={image1}
                alt="image1"
                className='w-full rounded-t-sm '
                width={400}
                height={250}
            />
            <div className="p-2">
                <div className='p-2'>
                    <h4>Company Name</h4>
                    <h2 className="mt-6 mb-2 text-2xl font-semibold tracking-tight text-heading">Streamlining your design process today.</h2>
                    <div className='flex gap-3'>
                        <label htmlFor="">Rating</label>
                        <div className=" flex">
                            {rating.map((item, index) =>
                                <Image 
                                    key={index}
                                    src={ratingImage}
                                    alt="image1"
                                    className='w-5 h-5 rounded-t-sm '
                                    width={10}
                                    height={10}
                                />
                            )}
                        </div>
                    </div>
                    <div>
                        <label>Price:80tk</label>
                    </div>
                </div>
                {/* button */}
                <div className='p-2 flex justify-center items-center bg-red-300 hover:bg-red-500 rounded-2xl cursor-pointer'>
                    <button className='cursor-pointer'>Add to Card</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Card
