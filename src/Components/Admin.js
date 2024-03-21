import React, { useState } from 'react';
import crimsonCupBranches from '../Utils/locations';
import { handleAddUser } from '../Utils/firebaseHelpers';
import UserForm from './User/UserForm';
import UserList from './User/UserList';

const Admin = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gender: '',
    dob: '',
    branch: '',
    photo: null
  });

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

  return (
    <div>
      <h2>Admin Form</h2>
      <UserList />
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
