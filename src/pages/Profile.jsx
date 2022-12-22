import { getAuth, updateProfile } from "firebase/auth";
import {doc, updateDoc} from "firebase/firestore";
import {db} from '../firebase';
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
export default function Profile() {
	const [formData, setFormData] = useState({
		name: "Zeshan",
		email: "Zeshan.butt3331@gmail.com"
	});
	const auth = getAuth()
	const navigate = useNavigate()
	const [changeDetail, setChangeDetail] = useState(false)
	const { name, email } = formData

	function onLogout() {
		auth.signOut()
		navigate("/")
	}
	function onChange(e){
		setFormData((prevState) =>({
			...prevState,
			[e.target.id]:e.target.value
		}))	
	}
	async	function onSubmit(){
		try {
			if(auth.currentUser.displayName !== name){
				//update name in Firebase Authentication
				await updateProfile(auth.currentUser,{
					displayName: name,
				});
				//update name in Firebase Firestore
				const docRef = doc(db,"users", auth.currentUser.uid)
				await updateDoc(docRef,{
					name,
				})
			}

			toast.success("Profile updated sucessfully!")
			
		} catch (error) {
			toast.error("Could not update your profile!")
		}
	}

	return (
		<>
			<section className='max-w-6xl flex justify-center items-center mx-auto'>
				<div className='w-full md:w-[50%] mt-6 px-3'>
					<form >
						<h1 className='text-3xl text-center font-bold my-6'>My Profile</h1>
						<input
							type="text"
							id='name'
							value={name}
							disabled={!changeDetail}
							onChange={onChange}
							className={`w-full  px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded mb-6 transition duration-200 ease-in-out ${changeDetail && 'bg-red-200 focus:bg-red-200'}`} />
						<input type="email" id='email' value={email} disabled className='w-full  px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded mb-6 transition duration-200 ease-in-out' />
						<div className='flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6'>
							<p className='flex items-center'>
								Do you want to change your name?
								<span
									onClick={() =>{ 
										changeDetail && onSubmit();
										setChangeDetail((prevState) => !prevState)
									}}
									className='text-red-600 hover:text-red-700 transition duration-200 ml-1 cursor-pointer '>
									{changeDetail ? "Apply Change" : "Edit"}
								</span>
							</p>
							<p onClick={onLogout} className='text-blue-600 hover:text-blue-700 transition duration-200 ml-1 cursor-pointer'>Sign out</p>
						</div>
					</form>
				</div>
			</section>
		</>
	)
}
