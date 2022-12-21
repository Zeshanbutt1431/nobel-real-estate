import { getAuth } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router";
export default function Profile() {
	const [formData, setFormData] = useState({
		name: "Zeshan",
		email: "Zeshan.butt3331@gmail.com"
	});
	const auth = getAuth()
	const navigate = useNavigate()
	const { name, email } = formData

	function onLogout(){
		auth.signOut()
		navigate("/")
	}
	
	return (
		<>
			<section className='max-w-6xl flex justify-center items-center mx-auto'>
				<div className='w-full md:w-[50%] mt-6 px-3'>
					<form >
						<h1 className='text-3xl text-center font-bold my-6'>My Profile</h1>
						<input type="text" id='name' value={name} disabled className='w-full  px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded mb-6 transition duration-200 ease-in-out' />
						<input type="email" id='email' value={email} disabled className='w-full  px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded mb-6 transition duration-200 ease-in-out' />
						<div className='flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6'>
							<p className='flex items-center'>
								Do you want to change your name?
								<span className='text-red-600 hover:text-red-700 transition duration-200 ml-1 cursor-pointer '>Edit</span>
							</p>
							<p onClick={onLogout} className='text-blue-600 hover:text-blue-700 transition duration-200 ml-1 cursor-pointer'>Sign out</p>
						</div>
					</form>
				</div>
			</section>
		</>
	)
}
