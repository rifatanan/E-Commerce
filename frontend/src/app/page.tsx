import SubCards from '../utils/SubCard'
import Card from '../utils/Card'

const page = () => {
    return (
        <div className='flex flex-col gap-4 mx-auto container1 mb-10'>
            <SubCards/>
            <Card/> 
        </div>
    )
}

export default page
