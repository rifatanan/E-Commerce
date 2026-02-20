
interface CategoryMenuProps {
    menuStatus: boolean;
    setMenuStatus: (status: boolean) => void;
}

const CategoryMenu = ({menuStatus, setMenuStatus}: CategoryMenuProps) => {
    const categoryMenu = ["fashion", "electronics", "bags", "footware", "groceries", "beauty", "fashion", "electronics", "bags", "footware", "groceries", "beauty"];

    
  return (
    <div>
      {/* Category Menu*/}
        <div 
            className={`fixed inset-0 z-100 transition-all duration-300
                ${menuStatus ? 'visible' : 'invisible pointer-events-none'}`}
        >
            {/* Dark Overlay */}
            <div 
                className={`absolute inset-0 bg-black/60 transition-opacity duration-300
                    ${menuStatus ? 'opacity-100' : 'opacity-0'}`}
                onClick={() => setMenuStatus(false)}
            />

            {/* Category Menu Panel - Left Side */}
            <div
                className={`absolute top-0 left-0 h-full w-80 bg-white shadow-2xl transition-transform duration-300 ease-out overflow-y-auto
                    ${menuStatus ? 'translate-x-0' : '-translate-x-full'}`}
            >
                {/* Menu Header */}
                <div className='flex items-center justify-between p-4 bg-red-400 text-white'>
                    <h2 className='text-xl font-bold'>Shop by Category</h2>
                    <button 
                        onClick={() => setMenuStatus(false)}
                        className='w-8 h-8 flex items-center justify-center cursor-pointer bg-white/20 hover:bg-white/30 rounded-full transition-colors'
                    >
                        ✕
                    </button>
                </div>

                {/* Menu Items */}
                <ul className='w-full p-2'>
                    {categoryMenu.map((item, i) => (
                        <li key={i} className='w-full'>
                            <button
                                onClick={() => setMenuStatus(false)}
                                className={`px-4 py-3 flex items-center cursor-pointer w-full rounded hover:bg-slate-100 capitalize transition-all duration-300 ease-out border-b border-gray-100
                                    ${menuStatus ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
                            >
                                {item}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </div>
  )
}

export default CategoryMenu
