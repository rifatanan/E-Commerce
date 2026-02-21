import React from 'react'

function Button({name}: {name: string}) {
  return (
	<button 
		type='submit'
		className="bg-cyan-400 text-white font-[Poppins] duration-500 md:my-0 p-2 py-2 hover:bg-cyan-500 rounded-md"
	>{name}
	</button>
  )
}

export default Button