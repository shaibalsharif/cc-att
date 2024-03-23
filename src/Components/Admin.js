import React, { useState } from 'react';
import crimsonCupBranches from '../Utils/locations';
import { handleAddUser } from '../Utils/firebaseHelpers';
import UserForm from './User/UserForm';
import UserList from './User/UserList';
import Stafflist from './Stafflist';

const Admin = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gender: '',
    dob: '',
    branch: '',
    photo: null
  });

  const [selectedTab, setSelectedTab] = useState('staffList')

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhotoChange = (e) => {

    const file = e.target.files[0];


    setFormData({ ...formData, photo: file });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can perform form submission logic here
    handleAddUser(formData)
    // Reset form after submission
    // setFormData({
    //   name: '',
    //   email: '',
    //   gender: '',
    //   dob: '',
    //   branch: '',
    //   photo: null
    // });
  };

  const handleTab = (tab) => {
    setSelectedTab(tab)
  }

  return (
    <div>
      <div className='w-full h-20 bg-gray-400 bg-opacity-20 py-8 px-4 md:px-[15%] lg:px-[18%]  flex justify-between items-center'>
        <button onClick={(e) => handleTab('staffList')} className='text-lg font-semibold px-2 text-white border-black border-2 active:scale-95 bg-violet-400'>All Staff</button>
        <button onClick={(e) => handleTab('attendance-today')} className='text-lg font-semibold px-2 text-white border-black border-2 active:scale-95 bg-violet-400'>Todays Attendance</button>
        <button onClick={(e) => handleTab('attendance-history')} className='text-lg font-semibold px-2 text-white border-black border-2 active:scale-95 bg-violet-400'>Attendance History</button>
      </div>

      {selectedTab == 'staffList' ? <Stafflist />:<></>}

      {/* <UserList /> */}
      {/*  <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Gender:</label>
          <select name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label>Date of Birth:</label>
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
        </div>
        <div>
          <label>Select Branch:</label>
          <select name="branch" value={formData.branch} onChange={handleChange} required>
            <option value="">Select Branch</option>
            
            {crimsonCupBranches.map(branch => (
              <option key={branch.name} value={branch.name}>{branch.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Upload Photo:</label>
          <input type="file" accept="image/*" onChange={handlePhotoChange} required />
        </div>
        <button type="submit">Submit</button>
      </form> */}
    </div>
  );
};

export default Admin;
