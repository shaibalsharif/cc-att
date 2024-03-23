import React, { useState } from 'react'
import { staffData } from '../Utils/staffdata'
const Stafflist = () => {





    const [staffIndex, setSatffIndex] = useState(0)
    const staffDetails = staffData[staffIndex];
    const handleNext = (e) => {
        if (staffIndex <= staffData.length - 1) {
            setSatffIndex(staffIndex + 1)
        }
    }
    return (
        <div className='w-full md:w-1/2 lg:w-1/3 mx-auto h-96 py-4'>
            <img src={staffDetails.photo} />
            <div className='flex  justify-center gap-2'>
                Name:<p>{staffDetails.first_name.split(" ")[0]}</p>
                <p>{staffDetails.last_name.split(" ")[1]}</p>
            </div>
            <p>Branch: {staffDetails.branchName}</p>
            <p>Email: {staffDetails.email}</p>
            <p>DOB: {staffDetails.dob}</p>
            <p>Address: {staffDetails.address}</p>
            <p>Designation{staffDetails.designation}</p>

            <p>Sex: {staffDetails.gender}</p>
            <p>ID: {staffDetails.id}</p>
            <p>Phone:{staffDetails.phone}</p>
            <p>Join date:{staffDetails.joiningDate}</p>
            <div className='flex justify-center items-center gap-2'>
                <button className='bg-blue-600 text-white font-semibold px-4 capitalize rounded-md' onClick={handleNext}>next</button>
             
            </div>



        </div>
    )
}

export default Stafflist