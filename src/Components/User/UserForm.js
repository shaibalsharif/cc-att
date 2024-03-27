import React, { useState } from 'react';
import './userform.css';
import { country_codes } from '../../Utils/phoneCodes';
import crimsonCupBranches from '../../Utils/locations';
import { useDropzone } from 'react-dropzone';
import { handleAddUser } from '../../Utils/firebaseHelpers';
import barista_bg from "../../assets/images/barista.jpg"
import { designations } from '../../Utils/staffdata';
const UserForm = () => {
    // State to store the selected image
    const [image, setImage] = useState(null);

    // Function to handle image drop or selection
    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0]; // Get the first accepted file

        setImage(file); // Update the state with the selected image
        console.log(file);
    };

    // Hook to initialize the Dropzone component
    const { getRootProps, getInputProps } = useDropzone({
        onDrop, // Function to handle file drop
        accept: 'image/*', // Allow only image files
        maxFiles: 1, // Limit to only one file
    });

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const user_data = {}
        // Access form data including the image

        for (let i = 0; i < e.target.elements.length; i++) {
            const element = e.target.elements[i];
            user_data[element.name] = element.value


        }
       
        handleAddUser({
            id: user_data.id,
            first_name: user_data.firstname,
            last_name: user_data?.lastname,
            name: `${user_data.firstname} ${user_data?.lastname}`,
            email: user_data?.email,
            phone: `${user_data?.country_code}${user_data?.phone}`,
            sex: user_data?.sex,
            branch: user_data?.branchtitle,
            job_type: user_data?.job_type,
            address: user_data?.address,
            dob: user_data?.dob,
            join_date: user_data?.join_date,
            photo: image,
        });
        // You can add further logic here to send the form data to the server
    };

    return (
        <div className="container mx-auto sm:px-4 py-20 md:flex h-full ">
            <div className='hidden lg:block w-1/2 ' style={{ backgroundImage: `url(${barista_bg})`, backgroundSize: 'cover' }} >
                {/* <img className=' object-cover overflow-hidden' src={barista_bg} /> */}
                {/*  <div className='bg-gradient-to-br from-[#e7e5e583] to-[#f30f0f] h-full w-full'>

                </div> */}
            </div>

            <div className="w-full md:w-4/5 px-4 lg:w-1/2 lg:ml-auto pb-20">
                <form onSubmit={handleSubmit}>
                 
                        <div className="relative flex items-center w-full lg:w-full  mb-4  rounded-md">
                            <input
                                id="id"
                                type="text"
                                name="id"
                                placeholder="ID."
                                className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 rounded"
                            />
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                            <div className="relative flex items-center  rounded-md w-full   mb-4">
                                <input
                                    id="firstName"
                                    type="text"
                                    name="firstname"
                                    placeholder="First Name"
                                    className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 rounded"
                                />
                            </div>

                            {/* Last Name */}
                            <div className="relative flex items-center  rounded-md w-full   mb-4">
                                <input
                                    id="lastName"
                                    type="text"
                                    name="lastname"
                                    placeholder="Last Name"
                                    className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 rounded"
                                />
                            </div>
                        </div>
                        {/* First Name */}



                        <div className='grid md:grid-cols-2 gap-2'>
                            {/* Email Address */}
                            <div className="relative flex items-center w-full lg:w-full  mb-4  rounded-md">
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 rounded"
                                />
                            </div> 
                             {/* Phone Number */}
                            <div className="overflow-hidden relative flex items-center w-full lg:w-full  mb-4  rounded-md">
                                {/* Select dropdown for country code */}
                                <select
                                    id="countryCode"
                                    name="countryCode"
                                    style={{ maxWidth: 80 }}
                                    className="custom-select block appearance-none w-full  px-2 mb-2 text-base leading-normal
                                     bg-white text-gray-800 h-full font-semibold --text-gray-700"
                                >
                                    {/* Options for country codes */}
                                    {country_codes.map(el => {
                                        return <option selected={el.short_code=="BD"} value={el.phone_code}>{el.short_code} +{el.phone_code}</option>
                                    })}
                                </select>
                                {/* Input field for phone number */}
                                <input
                                    id="phoneNumber"
                                    type="tel"
                                    name="phone"
                                    placeholder="Phone Number"
                                    className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800  pl-3"
                                />
                            </div>
                        </div>

                        <div className='grid md:grid-cols-2 gap-2'>
                            {/* Branch */}
                            <div className="relative flex items-center w-full lg:w-full  mb-4  rounded-md">
                                <select
                                    id="branch"
                                    name="branchtitle"
                                    className="outline-none block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 rounded custom-select"
                                >
                                    <option disabled value="">Choose Branch</option>
                                    {/* Options for branch*/}
                                    {crimsonCupBranches.map(el => {
                                        return <option value={el.name}>{el.name}</option>
                                    })}
                                </select>
                            </div>

                            <div className="relative flex items-center w-full lg:w-full  mb-4  rounded-md">
                                <select
                                    id="designation"
                                    name="designation"
                                    className="outline-none block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 rounded custom-select"
                                >
                                    <option disabled value="">Choose Designation</option>
                                    {/* Options for designation*/}
                                    {designations.map(el => {
                                        return <option value={el.designation}>{el.designation}</option>
                                    })}
                                </select>
                            </div>
                            <div className="relative flex items-center w-full lg:w-full  mb-4  rounded-md">
                                <select
                                    id="job_type"
                                    name="job_type"
                                    className="outline-none block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 rounded custom-select"
                                >
                                    <option disabled value="">Choose Job type</option>
                                    {/* Options for Job type*/}

                                    <option value={'Full-Time'}>Full-Time</option>
                                    <option value={'Half-Time'}>Part-Time</option>

                                </select>
                            </div>
                            <div className="relative flex items-center w-full lg:w-full  mb-4  rounded-md">
                                <input
                                    id="join_date"
                                    type="date"
                                    name="join_date"
                                    placeholder="Joining Date"
                                    className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal
                                 bg-white text-gray-800 rounded"
                                />
                            </div>
                            <div className="relative flex items-center w-full lg:w-full  mb-4  rounded-md">
                                <input
                                    id="dob"
                                    type="date"
                                    name="dob"
                                    placeholder="Birth Date"
                                    className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal
                                 bg-white text-gray-800 rounded"
                                />
                            </div>
                            <div className="relative flex items-center w-full lg:w-full  mb-4  rounded-md">
                                <select
                                    id="sex"
                                    name="sex"
                                    className="outline-none block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 rounded custom-select"
                                >
                                    <option disabled value="">Choose Sex type</option>
                                    {/* Options for Job type*/}

                                    <option value={'Male'}>Male</option>
                                    <option value={'Female'}>Female</option>
                                    <option value={'Other'}>Other</option>

                                </select>
                            </div>
                            {/* Image Picker */}

                        </div>
                        <div className="relative flex items-center w-full lg:w-full  mb-4  rounded-md">
                            <textarea
                                id="address"
                                name="address"
                                placeholder="Residing Address"
                                className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal
                                 bg-white text-gray-800 rounded min-h-[7vh] max-h-[14vh]"
                            />
                        </div>
                        <div className="relative flex items-center w-full lg:w-full px-4 mb-4 border-md rounded-md border-[1px] border-dashed">
                            <div {...getRootProps({ className: 'dropzone' })} style={{ height: '10vh' }} >
                                <input className='!bg-yellow-500' {...getInputProps()} />
                                <p className='w-full text-center !bg-yellow-500'>Drag 'n' drop an image here, or click to select one</p>
                                <div className='h-2 w-full text-sm text-white font-semibold py-1'>
                                    {!image ? <p>No Selected file</p> : <p>Slected File :
                                        <span className='bg-gray-400 px-2 rounded-sm' >{image?.name}</span> <br />
                                        <span className='bg-gray-400 px-2 rounded-sm' >{(image?.size / 1024 / 1024).toFixed(2)} MB</span>
                                        {/*    <span><button>Preview</button></span> */}
                                    </p>}
                                </div>
                            </div>
                        </div>
                        {/* Submit Button */}
                        <div className="-mbs-4 lg:w-full px-4 mx-auto mb-20">
                            <button type="submit" className=" align-middle text-center select-none border font-normal 
                            whitespace-no-wrap rounded  px-3 leading-normal no-underline bg-blue-600
                             text-white hover:bg-blue-600 block w-full py-2">
                                <span className="font-bold">Add New Member</span>
                            </button>
                        </div>

                        {/* Divider Text */}
                        {/* Already Registered */}
                        {/*    <div className="mb-4 lg:w-full px-4 mx-auto flex items-center my-4">
                            <div className="border-b w-full ml-5" />
                            <span className="px-2 text-xs text-gray-700 font-bold text-gray-700">
                                OR
                            </span>
                            <div className="border-b w-full mr-5" />
                        </div>

                      
                             <div className="text-center w-full">
                            <p className="text-gray-700 font-bold">
                                Already Registered?{" "}
                                <a href="#" className="text-blue-600 ml-2">
                                    Login
                                </a>
                            </p>
                        </div> */}
                    
                </form>
            </div>
        </div>
    );
};

export default UserForm;
