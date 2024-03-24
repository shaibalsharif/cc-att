import React, { useState } from 'react'
import LocationSelector from '../LocationSelector'
// import on from '../assets/images/on.png'

// import off from '../assets/images/off.png'
const DashBoard = () => {

    const [shiftOn, setShiftOn] = useState(false)

    return (
        <div className='h-screen w-full' style={{
            backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center',
            backgroundImage: `url(${'https://unblast.com/wp-content/uploads/2020/03/Barista-Vector-Illustration.jpg'})`
        }}>
            <div className='h-[20vh] w-full bg-slate-300 bg-opacity-30 flex justify-center items-center'  >

                <div className='h-20   w-[35%] md:w-[20%] lg:w-[15%] xl:[10%] rounded-full flex justify-center items-center'>

                    <button onClick={() => { setShiftOn(!shiftOn) }} className='w-full h-full'><img
                        className={`w-full h-full object-contain my-auto ${shiftOn ? ' bg-white ' : ' !bg-black '} rounded-l-full`} src={''/* on */} /></button>
                    <button onClick={() => { setShiftOn(!shiftOn) }} className='w-full h-full'> <img
                        className={`w-full h-full object-contain my-auto ${!shiftOn ? ' bg-white ' : ' !bg-black '}rounded-r-full`} src={''/* off */} /></button>

                </div>
            </div>

            <LocationSelector />
        </div>
    )
}

export default DashBoard