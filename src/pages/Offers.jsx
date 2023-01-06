import React from 'react'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { db } from '../firebase'
import { collection, getDocs, limit, orderBy, query, startAfter, where } from 'firebase/firestore'
import Spinner from "../components/Spinner"
import ListingItem from "../components/ListingItem"
import { async } from '@firebase/util'

export default function Offers() {
	const [listings, setListings] = useState(null);
	const [loading, setLoading] = useState(true);
	const [lastFetchedListing, setLastFetchedListing] = useState(null)
	useEffect(() => {
		async function fetchListings() {
			try {
				const listingRef = collection(db, "listings");
				const q = query(listingRef, where("offer", "==", true), orderBy("timestamp", "desc"), limit(8))
				const querySnap = await getDocs(q);
				const lastVisibleListing = querySnap.docs[querySnap.docs.length - 1];
				setLastFetchedListing(lastVisibleListing); 
				const listings = [];
				querySnap.forEach((doc) => {
					return listings.push({
						id: doc.id,
						data: doc.data(),
					})
				})
				setListings(listings)
				setLoading(false)


			} catch (error) {
				toast.error("Could not fetch listings")
			}
		}
		fetchListings();
	}, [])
	
	async function onFetchMoreListing(){
		try {
			const listingRef = collection(db, "listings");
			const q = query(listingRef, where("offer", "==", true), orderBy("timestamp", "desc"),startAfter(lastFetchedListing), limit(4))
			const querySnap = await getDocs(q);
			const lastVisibleListing = querySnap.docs[querySnap.docs.length - 1];
			setLastFetchedListing(lastVisibleListing); 
			const listings = [];
			querySnap.forEach((doc) => {
				return listings.push({
					id: doc.id,
					data: doc.data(),
				})
			})
			setListings((prevState)=>[...prevState, ...listings])
			setLoading(false)


		} catch (error) {
			toast.error("Could not fetch listings")
		}
	}


	return (
		<div className='max-w-6xl mx-auto px-3 '>
			<h1 className='text-3xl text-center mb-6 font-semibold '>Offers</h1>
			{loading ? <Spinner /> : listings && listings.length > 0 ?
				<>	
					<main>
						<ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
							{listings.map((listing)=>(
								<ListingItem key={listing.id} id={listing.id} listing={listing.data} />
							))}
						</ul>
					</main>
					{lastFetchedListing && (
						<div className='flex justify-center items-center'>
							<button onClick={onFetchMoreListing} className='bg-white border border-gray-300 px-3 py-1.5 my-6 text-gray-700 hover:border-slate-600 rounded transition ease-in-out duration-150'>Load more</button>
						</div>
					)}
				</> : <p>There are no offers</p>}
		</div>
	)
}
