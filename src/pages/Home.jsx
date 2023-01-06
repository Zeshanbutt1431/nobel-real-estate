import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { Link } from 'react-router-dom';
import ListingItem from '../components/ListingItem';
import Slider from '../components/Slider'
import { db } from '../firebase';

export default function Home() {
	//Offers Section
	const [offerListings, setOffferListings] = useState(null);
	useEffect(() => {
		async function fetchListings() {
			try {
				//Listing reference from db
				const listingRef = collection(db, "listings")
				//Query to fetch listing from database
				const q = query(listingRef, where("offer", "==", true), orderBy("timestamp", "desc"), limit(4))
				//Run query
				const querySnap = await getDocs(q)
				//Save fetched listings to show on page
				const listings = [];
				querySnap.forEach((doc) => {
					return listings.push({
						id: doc.id,
						data: doc.data(),
					});
				});
				setOffferListings(listings);

			} catch (error) {
				console.log(error);
			}
		}
		fetchListings();
	}, [])
	const [rentListings, setRentListings] = useState(null);
	useEffect(() => {
		async function fetchListings() {
			try {
				//Listing reference from db
				const listingRef = collection(db, "listings")
				//Query to fetch listing from database
				const q = query(listingRef, where("type", "==", "rent"), orderBy("timestamp", "desc"), limit(4))
				//Run query
				const querySnap = await getDocs(q)
				//Save fetched listings to show on page
				const listings = [];
				querySnap.forEach((doc) => {
					return listings.push({
						id: doc.id,
						data: doc.data(),
					});
				});
				setRentListings(listings);

			} catch (error) {
				console.log(error);
			}
		}
		fetchListings();
	}, [])
	const [saleListings, setSaleListings] = useState(null);
	useEffect(() => {
		async function fetchListings() {
			try {
				//Listing reference from db
				const listingRef = collection(db, "listings")
				//Query to fetch listing from database
				const q = query(listingRef, where("type", "==", "sale"), orderBy("timestamp", "desc"), limit(4))
				//Run query
				const querySnap = await getDocs(q)
				//Save fetched listings to show on page
				const listings = [];
				querySnap.forEach((doc) => {
					return listings.push({
						id: doc.id,
						data: doc.data(),
					});
				});
				setSaleListings(listings);

			} catch (error) {
				console.log(error);
			}
		}
		fetchListings();
	}, [])
	return (

		<div>
			<Slider />
			<div className='max-w-6xl mx-auto p-4 space-y-6'>
				{offerListings && offerListings.length > 0 && (
					<div className='m-2 mb-6'>
						<h2 className='px-3 text-2xl mt-2 font-semibold'>Recent Offers</h2>
						<Link to="/offers">
							<p className='px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out'>Show more offers</p>
						</Link>
						<ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
							{offerListings.map((listing) => (
								<ListingItem key={listing.id} id={listing.id} listing={listing.data} />
							))}
						</ul>
					</div>
				)}
				{rentListings && rentListings.length > 0 && (
					<div className='m-2 mb-6'>
						<h2 className='px-3 text-2xl mt-2 font-semibold'>Places for rent</h2>
						<Link to="/category/rent">
							<p className='px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out'>Show more places for rent</p>
						</Link>
						<ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
							{rentListings.map((listing) => (
								<ListingItem key={listing.id} id={listing.id} listing={listing.data} />
							))}
						</ul>
					</div>
				)}
				{saleListings && saleListings.length > 0 && (
					<div className='m-2 mb-6'>
						<h2 className='px-3 text-2xl mt-2 font-semibold'>Places for sale</h2>
						<Link to="/category/sale">
							<p className='px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out'>Show more places for sale</p>
						</Link>
						<ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
							{saleListings.map((listing) => (
								<ListingItem key={listing.id} id={listing.id} listing={listing.data} />
							))}
						</ul>
					</div>
				)}
			</div>
		</div>
	)
}
