import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react"
import { useParams } from "react-router";
import { db } from "../firebase";
import Spinner from "../components/Spinner"
import { Swiper, SwiperSlide } from "swiper/react";
import SwipeCore, { EffectFade, Autoplay, Navigation, Pagination } from "swiper";
import "swiper/css/bundle"
import { FaShare, FaMapMarkerAlt, FaBed, FaBath, FaParking, FaChair } from "react-icons/fa"
import { getAuth } from "firebase/auth"
import Contact from "../components/Contact";
import { MapContainer, TileLayer,Marker, Popup } from "react-leaflet";

export default function Listing() {
    const params = useParams()
    const auth = getAuth()
    const [listing, setListing] = useState(null)
    const [loading, setLoading] = useState(true)
    const [contactLandlord, setContactLandlord] = useState(false)
    const [shareListCopied, setShareListCopied] = useState(false)
    SwipeCore.use([Autoplay, Navigation, Pagination])
    useEffect(() => {
        async function fetchListing() {
            const docRef = doc(db, "listings", params.listingId)
            const docSnap = await getDoc(docRef)
            if (docSnap.exists()) {
                setListing(docSnap.data());
                setLoading(false);
            }
        }
        fetchListing();
    }, [params.listingId, loading])
    if (loading) {
        return <Spinner />
    }
    return (
        <main>
            <Swiper
                slidesPerView={1}
                navigation
                pagination={{ type: "progressbar" }}
                effect="fade"
                modules={[EffectFade]}
                autoplay={{ delay: 3000 }}
            >
                {listing.imgUrls.map((url, index) => (
                    <SwiperSlide key={index}>
                        <div
                            className="relative w-full overflow-hidden h-[300px]"
                            style={{
                                background: `url(${listing.imgUrls[index]}) center no-repeat`,
                                backgroundSize: "cover",
                            }}
                        ></div>
                    </SwiperSlide>
                ))}
            </Swiper>
            {/***************** COPY LISTING LINK ****************/}
            <div
                onClick={() => {
                    navigator.clipboard.writeText(window.location.href)
                    setShareListCopied(true)
                    setTimeout(() => {
                        setShareListCopied(false)
                    }, 2000)
                }}
                className="fixed top-[13%] right-[3%] z-10 bg-white cursor-pointer border-2 border-gray-400 rounded-full w-12 h-12 flex justify-center items-center">
                <FaShare className="text-lg text-slate-500 " />
            </div>
            {shareListCopied && <p className="fixed top-[23%] right-[5%] font-semibold border-2 border-gray-400 rounded-md bg-white z-10 p-2">Linked Copied</p>}

            <div className="flex flex-col md:flex-row max-w-6xl m-4 lg:mx-auto p-4 rounded-lg shadow-3 bg-white lg:space-x-5 ">
                <div className="lg:h-[400px] h-[200px] w-full">
                    <p className="text-2xl font-bold mb-3 text-blue-900">
                        {listing.name}  -Pkr {listing.offer ?
                            listing.discountedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") :
                            listing.regularPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        {listing.type === "rent" && " /month"}
                    </p>
                    <p className="flex items-center font-semibold mt-6 mb-3">
                        <FaMapMarkerAlt className="text-green-700 mr-1" />
                        {listing.address}
                    </p>
                    <div className="flex justify-start items-center space-x-4 w-[75%]">
                        <p className="bg-red-800 w-full max-w-200px rounded-md p-1 text-white text-center font-semibold shadow-md ">
                            {listing.type === "rent" ? "Rent" : "Sale"}
                        </p>
                        {listing.offer && (
                            <p className="bg-green-800 w-full max-w-200px rounded-md p-1 text-white text-center font-semibold shadow-md ">${listing.regularPrice - listing.discountedPrice} discount</p>
                        )}
                    </div>
                    <p className="my-3"><span className="font-semibold">Description- </span>{listing.description}</p>
                    <ul className="flex space-x-2 sm:space-x-10 items-center mb-6">
                        <li className="flex items-center whitespace-nowrap">
                            <FaBed className="text-lg mr-1" />
                            {+listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : "1 Bed"}
                        </li>
                        <li className="flex items-center whitespace-nowrap">
                            <FaBath className="text-lg mr-1" />
                            {+listing.bathrooms > 1 ? `${listing.bathrooms} Bathrooms` : "1 Bathroom"}
                        </li>
                        <li className="flex items-center whitespace-nowrap">
                            <FaParking className="text-lg mr-1" />
                            {listing.parking ? "Parking Spot" : "No Parking"}
                        </li>
                        <li className="flex items-center whitespace-nowrap">
                            <FaChair className="text-lg mr-1" />
                            {+listing.furnished ? "Furnished" : "Not Furnished"}
                        </li>
                    </ul>
                    {listing.userRef !== auth.currentUser.uid && !contactLandlord && (
                        <div className="mt-6 ">
                            <button
                                onClick={() => {
                                    setContactLandlord(true)
                                }}
                                className="px-7 py-3 bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg text-white text-sm uppercase font-medium focus:bg-blue-700 focus:shadow-lg w-full text-center transition duration-150 ease-in-out">Contact landlord</button>
                        </div>
                    )}
                    {contactLandlord && <Contact userRef={listing.userRef} listing={listing} />}
                </div>
                <div className="md:h-[400px] h-[200px] w-full z-10 overflow-x-hidden mt-6 md:mt-0 md:ml-2   ">
                    <MapContainer center={[listing.geolocation.lat, listing.geolocation.lng]} zoom={13} scrollWheelZoom={false} style={{height:"100%", width:"100%"}}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[listing.geolocation.lat, listing.geolocation.lng]}>
                            <Popup>
                                A pretty CSS3 popup. <br /> Easily customizable.
                            </Popup>
                        </Marker>
                    </MapContainer>
                </div>
            </div>
        </main>
    )
}
//08:56