import { getAuth, updateProfile } from "firebase/auth";
import { collection, deleteDoc, doc, getDocs, orderBy, query, updateDoc, where } from "firebase/firestore";
import { db } from '../firebase';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { FcHome } from "react-icons/fc"
import { Link } from "react-router-dom";
import ListingItem from "../components/ListingItem";
export default function Profile() {
	const auth = getAuth()
	const navigate = useNavigate()
	const [changeDetail, setChangeDetail] = useState(false)
	const [listings, setListings] = useState(null)
	const [loading, setLoading] = useState(true)
	const [formData, setFormData] = useState({
		name: auth.currentUser.displayName,
		email: auth.currentUser.email,
	});
	const { name, email } = formData

	function onLogout() {
		auth.signOut()
		navigate("/")
	}
	function onChange(e) {
		setFormData((prevState) => ({
			...prevState,
			[e.target.id]: e.target.value,
		}))
	}
	async function onSubmit() {
		try {
			if (auth.currentUser.displayName !== name) {
				//update name in Firebase Authentication
				await updateProfile(auth.currentUser, {
					displayName: name,
				});
				//update name in Firebase Firestore
				const docRef = doc(db, "users", auth.currentUser.uid)
				await updateDoc(docRef, {
					name,
				})
			}
			toast.success("Profile updated sucessfully!")
		} catch (error) {
			toast.error("Could not update your profile!")
		}
	}

	useEffect(() => {
		async function fetchUserListings() {
		  const listingRef = collection(db, "listings");
		  const q = query(
			listingRef,
			where("userRef", "==", auth.currentUser.uid),
			orderBy("timestamp", "desc")
		  );
		  const querySnap = await getDocs(q);
		  let listings = [];
		  querySnap.forEach((doc) => {
			return listings.push({
			  id: doc.id,
			  data: doc.data(),
			});
		  });
		  setListings(listings);
		  setLoading(false);
		  console.log(listings);
		}
		fetchUserListings();
	  }, [auth.currentUser.uid]);
	  async function onDelete(listingID){
		if(window.confirm("Are you sure to delete?")){
			await deleteDoc(doc(db, "listings", listingID))
			const updatedListing = listings.filter(
				(listing) => listing.id !== listingID 
			);
			setListings(updatedListing)
			toast.success("Listing sucessfully deleted!")
		}
	  }
	  function onEdit(listingID){
		navigate(`/edit-listing/${listingID}`)
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
									onClick={() => {
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
					<button type="submit" className="bg-blue-600 w-full text-white text-sm py-3 px-7 hover:bg-blue-700 active:bg-blue-800 shadow-md hover:shadow-lg ">
						<Link to="/create-listing" className="flex justify-center items-center capitalize">
							<FcHome className="text-3xl bg-red-200 rounded-full p-1 border-2 mr-2" />
							Sell or rent your home
						</Link>
					</button>
				</div>
			</section>
			<div className="max-w-6xl px-3 mt-6 mx-auto">
				{!loading && listings.length > 0 && (
					<>
						<h2 className="text-2xl text-center font-semibold mb-6">My Listings</h2>
						<ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mt-6 mb-6 ">
							{listings.map((listing) => (
								<ListingItem
								key={listing.id}
								id={listing.id}
								listing={listing.data}
								onDelete = {()=> onDelete(listing.id) }
								onEdit = {()=> onEdit(listing.id) }
								/>
							))}
						</ul>
					</>
				)}
			</div>
		</>
	)
}
