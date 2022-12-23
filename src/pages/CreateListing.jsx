import React from 'react'
import { useState } from 'react'

export default function CreateListing() {
    const [formData, setFormData] = useState({
        type: "rent",
        name: "",
        bedrooms: 1,
        bathrooms: 1,
        parking: false,
        furnished: true,
        address: "",
        description: "",
        offer: true,
        regularPrice: 0,
        discountedPrice: 0,
    })
    const { type, name, bedrooms, bathrooms, parking, furnished, address, description, offer, regularPrice, discountedPrice } = formData
    function onChange() {

    }
    return (
        <main>
            <h1 className='text-3xl font-bold text-center mt-6'>Create Listing</h1>
            <form className='max-w-md mx-auto px-2'>
                <p className='text-lg mt-6 font-semibold'>Sell / Rent</p>
                <div className='flex'>
                    <button
                        type='button'
                        id='type'
                        value="sale"
                        onClick={onChange}
                        className={`mr-3 text-sm uppercase shadow-md py-3 px-7 rounded w-full font-medium hover:shadow-lg active:shadow-lg ${type === "rent" ? "bg-white text-black" : "bg-slate-500 text-white"}`} >
                        sell
                    </button>
                    <button
                        type='button'
                        id='type'
                        value="sale"
                        onClick={onChange}
                        className={`ml-3 text-sm uppercase shadow-md py-3 px-7 rounded w-full font-medium hover:shadow-lg active:shadow-lg ${type === "sale" ? "bg-white text-black" : "bg-slate-500 text-white"}`} >
                        rent
                    </button>
                </div>
                <p className='text-lg mt-6 font-semibold'>Name</p>
                <input
                    type="text"
                    id='name'
                    value={name}
                    onChange={onChange}
                    maxLength="32"
                    minLength="10"
                    required
                    placeholder="Name"
                    className='w-full border border-gray-300 text-xl text-gray-500 bg-white rounded transition duration-150 ease-in-out mb-6'
                />
                <div className="flex space-x-6 mb-6">
                    <div className="">
                        <p className='text-lg font-semibold'>Beds</p>
                        <input
                            type="number"
                            name=""
                            id="bedrooms"
                            min="1"
                            max="50"
                            required
                            value={bedrooms}
                            className="w-full px-4 py-2 text-lg text-gray-700 bg-white text-center border border-gray-300 transition duration-150 ease-in-out focus:text-gray-700 focus:border-gray-300 active:border-gray-300"
                        />
                    </div>
                    <div className="">
                        <p className='text-lg font-semibold'>Bathrooms</p>
                        <input
                            type="number"
                            name=""
                            id="bathrooms"
                            min="1"
                            max="50"
                            required
                            value={bathrooms}
                            className="w-full px-4 py-2 text-lg text-gray-700 bg-white text-center border border-gray-300 transition duration-150 ease-in-out focus:text-gray-700 focus:border-gray-300 active:border-gray-300"
                        />
                    </div>
                </div>
                <p className='text-lg mt-6 font-semibold'>Parking spot</p>
                <div className='flex'>
                    <button
                        type='button'
                        value={true}
                        id="parking "
                        onClick={onChange}
                        className={`mr-3 text-sm uppercase shadow-md py-3 px-7 rounded w-full font-medium hover:shadow-lg active:shadow-lg ${!parking ? "bg-white text-black" : "bg-slate-500 text-white"}`} >
                        sell
                    </button>
                    <button
                        type='button'
                        value={false}
                        id="parking"
                        onClick={onChange}
                        className={`ml-3 text-sm uppercase shadow-md py-3 px-7 rounded w-full font-medium hover:shadow-lg active:shadow-lg ${parking ? "bg-white text-black" : "bg-slate-500 text-white"}`} >
                        No
                    </button>
                </div>
                <p className='text-lg mt-6 font-semibold'>Furnished</p>
                <div className='flex'>
                    <button
                        type='button'
                        id='furnished'
                        value={true}
                        onClick={onChange}
                        className={`mr-3 text-sm uppercase shadow-md py-3 px-7 rounded w-full font-medium hover:shadow-lg active:shadow-lg ${!furnished ? "bg-white text-black" : "bg-slate-500 text-white"}`} >
                        Yes
                    </button>
                    <button
                        type='button'
                        id='furnished'
                        value={false}
                        onClick={onChange}
                        className={`ml-3 text-sm uppercase shadow-md py-3 px-7 rounded w-full font-medium hover:shadow-lg active:shadow-lg ${furnished ? "bg-white text-black" : "bg-slate-500 text-white"}`} >
                        No
                    </button>
                </div>
                <p className='text-lg mt-6 font-semibold'>Address</p>
                <textarea
                    type="text"
                    id='address'
                    value={address}
                    onChange={onChange}
                    required
                    placeholder="Address"
                    className='w-full border-gray-300 text-xl text-gray-500 bg-white rounded transition duration-150 ease-in-out mb-6'
                />
                <p className='text-lg font-semibold'>Description</p>
                <textarea
                    type="text"
                    id='description'
                    value={description}
                    onChange={onChange}
                    required
                    placeholder="description"
                    className='w-full border-gray-300 text-xl text-gray-500 bg-white rounded transition duration-150 ease-in-out mb-6'
                />
                <p className='text-lg  font-semibold'>Offer</p>
                <div className='flex mb-6'>
                    <button
                        type='button'
                        id='offer'
                        value={true}
                        onClick={onChange}
                        className={`mr-3 text-sm uppercase shadow-md py-3 px-7 rounded w-full font-medium hover:shadow-lg active:shadow-lg ${!offer ? "bg-white text-black" : "bg-slate-500 text-white"}`} >
                        Yes
                    </button>
                    <button
                        type='button'
                        id='offer'
                        value={false}
                        onClick={onChange}
                        className={`ml-3 text-sm uppercase shadow-md py-3 px-7 rounded w-full font-medium hover:shadow-lg active:shadow-lg ${offer ? "bg-white text-black" : "bg-slate-500 text-white"}`} >
                        No
                    </button>
                </div>
                <p className='text-lg font-semibold'>Regular Price</p>
                <div className="flex">
                    <div className="mb-6 flex items-center justify-center space-x-6">
                        <input
                            type="number"
                            id='regularPrice'
                            onChange={onChange}
                            min="20"
                            max="400000000"
                            required
                            className='w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition duration-150 ease-in-out text-center focus:text-gray-700 focus:bg-white focus:border-gray-700'
                            value={regularPrice}
                        />
                        {type === "rent" && (
                            <div className="">
                                <p className='text-md w-full'>$/Month</p>
                            </div>
                        )}
                    </div>
                </div>
                {offer &&
                    <div className="">
                        <p className='text-lg font-semibold'>Discounted Price</p>
                        <div className="flex">
                            <div className="mb-6 flex items-center justify-center space-x-6">
                                <input
                                    type="number"
                                    id='discountedPrice'
                                    onChange={onChange}
                                    min="20"
                                    max="400000000"
                                    required={offer}
                                    className='w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition duration-150 ease-in-out text-center focus:text-gray-700 focus:bg-white focus:border-gray-700'
                                    value={discountedPrice}
                                />
                                {type === "rent" && (
                                    <div className="">
                                        <p className='text-md w-full'>$/Month</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>}
                    <div className="mb-6">
                        <p className='text-lg font-semibold '>Images</p>
                        <p className='text-gray-600'>The first Image will cover and (max 6)</p>
                        <input 
                        type="file" 
                        id="images" 
                        onChange={onChange} 
                        accept=".jpg,.png,.jpeg"
                        multiple
                        required
                        className='w-full px-3 py-1.5 text-gray-700 bg-white border border-gray-300 rounded transition duration-150 focus:bg-white focus:border-gray-700'
                         />
                    </div>
                    <button type="submit" className='w-full bg-blue-600 text-sm font-medium rounded shadow-md px-7 py-3 text-white active:shadow-lg active:bg-blue-700  focus:shadow-lg focus:bg-blue-700  hover:shadow-lg hover:bg-blue-700'></button>
            </form>

        </main>
    )
}
