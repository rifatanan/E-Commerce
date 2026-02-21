"use client"
import React, { useState } from 'react'
import Button from '../utils/Button'
import Input from '../utils/Input'
import Label from '../utils/Label'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

function LogIn() {
	const router = useRouter();
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault()
		console.log('login', { email, password })
		router.push('/')
	}

	return (
		<div className="h-166 w-full flex justify-center items-center shadow-md ">
			<div className='p-10 h-5/6 lg:w-5/12 md:w-9/12 sm:w-9/12 bg-slate-200 shadow-md rounded-md'>
				<div className='h-full'>
					<h1 className='flex font-bold text-3xl justify-center'>Welcome Back!</h1>
					<h1 className='flex font-bold text-3xl justify-center'>Login to your account</h1>
					<form
						className='w-full h-5/6 pt-3 gap-2'
						onSubmit={handleSubmit}>
						<div className='grid grid-flow-row gap-2'>
							<Label name={"Email"} />
							<Input name={'email'} placeholder={"Enter Your Email"} value={email} handleChange={(e) => setEmail(e.target.value)} />
							<Label name={"Password"} />
							<Input name={'password'} placeholder={"Enter Your Password"} value={password} handleChange={(e) => setPassword(e.target.value)} />
							<p>Don't have an account?
								<Link href={'/register'} className='text-blue-500'> Registation</Link>
							</p>
						</div>
						<Button name={"LogIn"} />
					</form>
				</div>
			</div>
		</div>
  	)
}

export default LogIn