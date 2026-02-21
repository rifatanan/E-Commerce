import React from 'react'

function Label({ name }: { name: string }) {
	return (
		<label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>{name}</label>
	)
}

export default Label