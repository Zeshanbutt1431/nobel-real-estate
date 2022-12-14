import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import OAuth from '../components/OAuth';

export default function SignIn() {
	const navigate = useNavigate()
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const { email, password } = formData;
	function onChange(e) {
		setFormData((prevState) => ({
			...prevState,
			[e.target.id]: e.target.value,
		}))
		console.log(email, password);
	}
	async function onSubmit(e){
		e.preventDefault()
		try {
			const auth = getAuth()
			const userCredential = await signInWithEmailAndPassword(auth, email, password)
			if(userCredential.user){
				navigate('/')
			}
		} catch (error) {
			toast.error('Invalid username or password')
		}
	}
	return (
		<section>
			<h1 className='text-3xl text-center mt-6 font-bold'>Sign In</h1>
			<div className='flex justify-center flex-wrap items-center py-12 mx-6xl mx-auto'>
				<div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6'  >
					<img
						src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=773&q=80" alt="sign in " className='w-full rounded-2xl' />
				</div>
				<div className='w-full md:w-[67%] lg:w-[40%] px-6'>
					<form onSubmit={onSubmit}>
						<input className='mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out'
							type='email'
							id='email'
							value={email}
							onChange={onChange}
							placeholder='Email address' />
						<div className='relative mb-6 '>
							<input className='w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out'
								type={showPassword ? "text" : "password"}
								id='password'
								value={password}
								onChange={onChange}
								placeholder='Password' />
							{showPassword ?
								<AiFillEyeInvisible
									className='absolute right-3 top-3 text-xl cursor-pointer'
									onClick={() => setShowPassword((prevState) => !prevState)} />
								: <AiFillEye className='absolute right-3 top-3 text-xl cursor-pointer'
									onClick={() => setShowPassword((prevState) => !prevState)} />}
						</div>
						<div className='flex justify-between whitespace-nowrap text-sm sm:text-lg'>
							<p className='mb-6'>
								Don't have an account?
								<Link to="/sign-up" className='text-red-600 hover:text-red-700 transition duration-200 ease-in-out ml-1'>Register</Link>
							</p>
							<p>
								<Link to="/forgot-password" className='text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out'>Forgot password?</Link>
							</p>
						</div>

						<button type="submit" className='uppercase w-full px-7 py-3 bg-blue-600 text-white text-sm rounded shadow-sm hover:shadow-lg active:bg-blue-800 '>Sign In</button>
						<div className='my-4 flex items-center before:border-t before:border-gray-300 before:flex-1  after:border-t after:border-gray-300 after:flex-1'>
							<p className='mx-4 text-center font-semibold'>OR</p>
						</div>
						{/* Continue with google component */}
						<OAuth/>
					</form>
				</div>
			</div>
		</section>
	)
}

