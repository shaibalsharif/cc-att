import React, { useState } from 'react';
import './userform.css';
import { country_codes } from '../../Utils/phoneCodes';
import crimsonCupBranches from '../../Utils/locations';
import { useDropzone } from 'react-dropzone';
import { handleAddUser } from '../../Utils/firebaseHelpers';

const UserForm = () => {
    // State to store the selected image
    const [image, setImage] = useState(null);

    // Function to handle image drop or selection
    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0]; // Get the first accepted file
        setImage(file); // Update the state with the selected image
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
        // Access form data including the image
        handleAddUser({
            name: `${e.target.elements.firstName.value} ${e.target.elements.lastName.value}`,
            email: e.target.elements.email.value,
            phone: e.target.elements.phone.value,
            gender: 'male',
            branch: e.target.elements.jobtitle.value,
            photo: image,
        });
        // You can add further logic here to send the form data to the server
    };

    return (
        <div className="container mx-auto sm:px-4 py-20">
            <div className="md:w-3/5 px-4 lg:w-1/2 ml-auto">
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2">

                        {/* First Name */}
                        <div className="relative flex items-center  rounded-md w-full lg:w-1/2  mb-4">
                            <input
                                id="firstName"
                                type="text"
                                name="firstname"
                                placeholder="First Name"
                                className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 rounded"
                            />
                        </div>

                        {/* Last Name */}
                        <div className="relative flex items-center  rounded-md w-full lg:w-1/2  mb-4">
                            <input
                                id="lastName"
                                type="text"
                                name="lastname"
                                placeholder="Last Name"
                                className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 rounded"
                            />
                        </div>

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
                        <div className="relative flex items-center w-full lg:w-full  mb-4  rounded-md">
                            {/* Select dropdown for country code */}
                            <select
                                id="countryCode"
                                name="countryCode"
                                style={{ maxWidth: 80 }}
                                className="custom-select block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 h-full font-bold --text-gray-700"
                            >
                                {/* Options for country codes */}
                                {country_codes.map(el => {
                                    return <option value={el.phone_code}>{el.short_code} +{el.phone_code}</option>
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

                        {/* Job */}
                        <div className="relative flex items-center w-full lg:w-full  mb-4  rounded-md">
                            <select
                                id="job"
                                name="jobtitle"
                                className="outline-none block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 rounded custom-select"
                            >
                                <option disabled value="">Choose Branch</option>
                                {/* Options for job titles */}
                                {crimsonCupBranches.map(el => {
                                    return <option value={el.name}>{el.name}</option>
                                })}
                            </select>
                        </div>

                        {/* Image Picker */}
                        <div className="relative flex items-center w-full lg:w-full px-4 mb-4 border-md rounded-md">
                            <div {...getRootProps({ className: 'dropzone' })}>
                                <input {...getInputProps()} />
                                <p>Drag 'n' drop an image here, or click to select one</p>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="mb-4 lg:w-full px-4 mx-auto mb-0">
                            <button type="submit" className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline bg-blue-600 text-white hover:bg-blue-600 block w-full py-2">
                                <span className="font-bold">Add New Staff</span>
                            </button>
                        </div>

                        {/* Divider Text */}
                        <div className="mb-4 lg:w-full px-4 mx-auto flex items-center my-4">
                            <div className="border-b w-full ml-5" />
                            <span className="px-2 text-xs text-gray-700 font-bold text-gray-700">
                                OR
                            </span>
                            <div className="border-b w-full mr-5" />
                        </div>

                        {/* Already Registered */}
                        <div className="text-center w-full">
                            <p className="text-gray-700 font-bold">
                                Already Registered?{" "}
                                <a href="#" className="text-blue-600 ml-2">
                                    Login
                                </a>
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserForm;
