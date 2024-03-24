import React, { useState } from 'react'

const svg_menu = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-10 h-10">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
</svg>
const svg_close = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-10 h-10">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>



const Drawer = () => {

    const [isExpanded, setIsExpanded] = useState(false)
    const [conf_mod_On, set_conf_mod] = useState(false)

    const toggleExpand = () => {
        setIsExpanded(!isExpanded)
    }
    const toggleConf = () => {

        set_conf_mod(!conf_mod_On)
    }
    const handleLogout = (e) => {
        /* Logout */
    }
    return (
        <>
            {isExpanded ? <div className='w-3/5 lg:1/5 h-screen bg-[#310000] p-4 py-8 slide-right '>
                <div className='float-right' onClick={toggleExpand}>{svg_close}</div>

                <div className='h-full w-full  text-white py-10 flex flex-col px-8 space-y-4'>
                  
                    <button className='font-semibold py-2 px-4 text-start bg-[#9f0000]' >Attendance</button>
                    <button className='font-semibold py-2 px-4 text-start bg-[#9f0000]' >Edit Staff Info</button>
                    <button className='font-semibold py-2 px-4 text-start bg-[#9f0000]' >Add New Staff</button>
                    <button className='font-semibold py-2 px-4 text-start bg-[#9f0000]' onClick={toggleConf} >log Out</button>


                </div>



                {conf_mod_On ? <div className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-1/2 md:w-1/3 xl:w-1/5 rounded-md h-40 my-8 mx-4 bg-white flex flex-col items-center '>

                    <div className='self-end mr-2 float-right bg-red-500 ' onClick={toggleConf}>{svg_close}</div>
                    <p>Are you sure to get Out?</p>
                    <div className='gap-2 space-x-2'> <button onClick={handleLogout}>Yes</button>
                        <button onClick={toggleConf}>Cancel</button>
                    </div>
                </div> : <></>}
            </div> : <div className='absolute left-[3%] top-8 z-40 bg-red-500 rounded-md' onClick={toggleExpand}>{svg_menu}</div>}
        </>

    )
}


export default Drawer