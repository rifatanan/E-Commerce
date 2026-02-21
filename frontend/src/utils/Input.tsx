'use client'
import React from 'react'

interface InputProps {
	name: string
	placeholder: string
	value?: string
	handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function Input({ name, placeholder, value, handleChange }: InputProps) {
	const inputProps: any = {
		name,
		type: 'text',
		className: 'appearance-none w-full text-gray-700 ring-1 border-gray-100 rounded p-2 py-3 mb-3 outline-none focus:outline-none',
		placeholder,
		required: false,
	}

	if (value !== undefined) inputProps.value = value
	if (handleChange) inputProps.onChange = handleChange

	return (
		<input
			{...inputProps}
		/>
	)
}

export default Input