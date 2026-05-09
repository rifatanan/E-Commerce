import React from 'react'

interface SearchProps {
    onSearch?: (query: string) => void;
}

const Search = ({ onSearch }: SearchProps) => {
    return (
        <div className='w-full flex shadow border border-slate-300 rounded-md overflow-hidden'>
            <input
                type="text"
                className='w-full outline:none focus:outline-none p-2'
                placeholder='Enter your search'
                onChange={(e) => onSearch?.(e.target.value)}
            />
            <button className='hover:bg-amber-300 rounded-l-full p-2 transition-colors whitespace-nowrap'>
                Search
            </button>
        </div>
    )
}

export default Search