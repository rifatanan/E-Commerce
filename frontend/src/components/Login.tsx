"use client"
import React, { useState } from 'react'
import Button from '../utils/Button'
import Input from '../utils/Input'
import Label from '../utils/Label'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '../store/store'
import { loginUser } from '../store/slices/loginSlice'
import toast from 'react-hot-toast'
import { loginSchema } from '../utils/validation'
import type { LoginInput } from '../utils/validation'

const LogIn = () => {
	const router = useRouter();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [formErrors, setFormErrors] = useState<Partial<Record<keyof LoginInput, string>>>({});
    const dispatch = useAppDispatch();
    const { loading, error} = useAppSelector((state) => state.login);

	const handleSubmit = async(e: React.FormEvent) => {
		e.preventDefault();

		const validation = loginSchema.safeParse({ email, password });
		if (!validation.success) {
			const fieldErrors: Partial<Record<keyof LoginInput, string>> = {};
			Object.entries(validation.error.flatten().fieldErrors).forEach(([key, value]) => {
				if (value?.length) {
					fieldErrors[key as keyof LoginInput] = value[0];
				}
			});
			setFormErrors(fieldErrors);
			return;
		}

		setFormErrors({});

        try {
            const result = await dispatch(
                loginUser(validation.data)
            ).unwrap();
        
            if(result){
                toast.success("Login successful.")
                router.push('/');
            }
          } catch (error) {
            toast.error(error instanceof Error ? error.message : "Login failed");
          }
	}

	return (
		<div className="h-166 w-full flex justify-center items-center shadow-lg">
			<div className='p-10 h-5/6 lg:w-5/12 md:w-9/12 sm:w-9/12 bg-slate-200 shadow-md rounded-md'>
				<div className='h-full'>
					<h1 className='flex font-bold text-3xl justify-center'>Welcome Back!</h1>
					<h1 className='flex font-bold text-3xl justify-center'>Login to your account</h1>
					<form
						className='w-full h-5/6 pt-3 gap-2'
						onSubmit={handleSubmit}>
						<div className='grid grid-flow-row gap-2'>
							<Label name={"Email"} />
                            <Input
                                name='email'
                                type='email'
                                placeholder={"Enter Your Email"}
                                value={email}
                                handleChange={(e) => setEmail(e.target.value)}
                                error={!!formErrors.email}
                            />
                            {formErrors.email && <p className='text-red-500'>{formErrors.email}</p>}

                            <Label name={"Password"} />
                            <Input
                                name='password'
                                type='password'
                                placeholder={"Enter Your Password"}
                                value={password}
                                handleChange={(e) => setPassword(e.target.value)}
                                error={!!formErrors.password}
                            />
                            {formErrors.password && <p className='text-red-500'>{formErrors.password}</p>}
							<p>Don't have an account?
								<Link href={'/register'} className='text-blue-500'> Registration</Link>
							</p>
						</div>
						<Button name={loading ? "Loading" : "LogIn"} />
					</form>
				</div>
			</div>
		</div>
  	)
}

export default LogIn