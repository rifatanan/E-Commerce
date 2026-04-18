'use client'
import React from 'react'

interface InputProps {
    name: string
    placeholder: string
    value?: string
    handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    error?: boolean
    type?: string
}

function Input({ name, placeholder, value, handleChange, error = false, type }: InputProps) {
    return (
        <input
            name={name}
            type={type}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            className={`appearance-none w-full text-gray-700 rounded p-2 py-3 mb-3 outline-none border ${
                error
                ? 'border-red-500 ring-1 ring-red-500'
                : 'border-gray-400 focus:ring-1 focus:ring-gray-500'
            }`}
        />
    )
}

export default Input