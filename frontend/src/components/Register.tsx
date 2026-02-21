"use client"
import React, { useState } from 'react'
import Label from '../utils/Label'
import Input from '../utils/Input'
import Button from '../utils/Button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const Register = () => {
	const router = useRouter()
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault()
		console.log('register', { name, email, password })
		router.push('/')
	}

	return (
		<div className="h-166.25 w-full flex justify-center items-center">
			<div className='p-10 h-5/6 lg:w-5/12 md:w-9/12 sm:w-9/12 bg-slate-200 shadow-md rounded-md'>
				<div className='h-full'>
					<h1 className='flex font-bold text-3xl justify-center'>Registation</h1>
					<form 
						className='w-full h-5/6 pt-3 gap-2'
						onSubmit={handleSubmit}>
						<div className='grid grid-flow-row gap-2'>
							<Label name={"Name"} />
							<Input name='name' placeholder={"Enter Your Name"} value={name} handleChange={(e) => setName(e.target.value)} />
							<p className='text-red-500'>{/* error placeholder */}</p>
							<Label name={"Email"} />
							<Input name='email' placeholder={"Enter Your Email"} value={email} handleChange={(e) => setEmail(e.target.value)} />
							<p className='text-red-500'>{/* error placeholder */}</p>
							<Label name={"Password"} />
							<Input name='password' placeholder={"Enter Your Password"} value={password} handleChange={(e) => setPassword(e.target.value)} />
							<p className='text-red-500'>{/* error placeholder */}</p>
							<p>Already have an account?	<Link href={'/login'} className='text-blue-500'>LogIn</Link></p>
						</div>
						<Button name={"Submit"} />
					</form>
				</div>
			</div>
		</div>
	)
}

export default Register
