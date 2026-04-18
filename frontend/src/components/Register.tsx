"use client"
import React, { useState } from 'react'
import Label from '../utils/Label'
import Input from '../utils/Input'
import Button from '../utils/Button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '../store/store'
import { registerUser } from '../store/slices/registerSlice'
import toast from 'react-hot-toast'
import { registerSchema } from '../utils/validation'
import type { RegisterInput } from '../utils/validation'

const Register = () => {
	const router = useRouter();
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [formErrors, setFormErrors] = useState<Partial<Record<keyof RegisterInput, string>>>({});
    const dispatch = useAppDispatch();
    const { loading, error } = useAppSelector((state) => state.registration);

	const handleSubmit = async(e: React.FormEvent) => {
		e.preventDefault()
		const validation = registerSchema.safeParse({ name, email, password });

		if (!validation.success) {
			const fieldErrors: Partial<Record<keyof RegisterInput, string>> = {};
			Object.entries(validation.error.flatten().fieldErrors).forEach(([key, value]) => {
				if (value?.length) {
					fieldErrors[key as keyof RegisterInput] = value[0];
				}
			});
			setFormErrors(fieldErrors);
			return;
		}

		setFormErrors({});

		try {
            const result = await dispatch(
                registerUser(validation.data)
            ).unwrap();
            if(result){
                toast.success("Registration successful.")
                router.push('/login');
            }
        } catch (error) {
            toast.error(error instanceof Error ? error?.message : "Registration failed");
        }
	}

	return (
		<div className="h-166.25 w-full flex justify-center items-center">
			<div className='p-10 h-5/6 lg:w-5/12 md:w-9/12 sm:w-9/12 bg-slate-200 shadow-md rounded-md'>
				<div className='h-full'>
					<h1 className='flex font-bold text-3xl justify-center'>Registration</h1>
					<form
						className='w-full h-5/6 pt-3 gap-2'
						onSubmit={handleSubmit}>
						<div className='grid grid-flow-row gap-2'>
                            <Label name={"Name"} />
                            <Input
                                name='name'
                                placeholder={"Enter Your Name"}
                                value={name}
                                handleChange={(e) => setName(e.target.value)}
                                error={!!formErrors.name}
                            />
                            {formErrors.name && <p className='text-red-500'>{formErrors.name}</p>}

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

                            {error && <p className='text-red-500'>{error}</p>}
                            <p>
                                Already have an account? <Link href={'/login'} className='text-blue-500'>Login</Link>
                            </p>
                            </div>
						<Button name={loading ? "Submitting" : "Submit"} />
					</form>
				</div>
			</div>
		</div>
	)
}

export default Register
