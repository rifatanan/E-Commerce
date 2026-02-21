import SubCards from '../utils/SubCard'
import Card from '../utils/Card'
import HeroSlider from '../utils/HeroSlider'

const page = () => {
    return (
        <div className='flex flex-col gap-4 mx-auto container1 mb-10'>
            <HeroSlider />
            <SubCards/>
            <Card/> 
        </div>
    )
}

export default page
