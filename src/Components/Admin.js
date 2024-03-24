import React from 'react'
import Drawer from './Admin/Drawer'
import '../assets/css/admin.css'
import UserForm from './User/UserForm'
const svg_menu = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
</svg>
const svg_close = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>





const Admin = ({ signedUser }) => {

  return (
    <div className='relative h-screen overflow-hidden w-full bg-[#9F0000]'>
      <Drawer />
      <UserForm />

    </div>
  )
}

export default Admin