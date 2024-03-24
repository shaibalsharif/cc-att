// Login.js
import React, { useEffect, useState } from 'react';
// import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
// import { auth } from '../Firebase/firebase_config';
import google from '../assets/images/google.jpg'
import { staffData } from '../Utils/staffdata';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
// import facebook from '../Assets/images/fb.png'



const GoogleButton = ({ signinHandler }) => {
    return (<button className='w-full text-xl'
        onClick={signinHandler}>
        <span className='mx-auto w-fit'><img src={google} className='mx-auto rounded-full  h-8 my-auto inline float-left ml-4 w-fit' /></span>
        <p className=''>Sign in with Google</p>
    </button>)
}
// const FacebookButton = ({ signinHandler }) => {
//     return (<button className='w-full text-xl'
//         onClick={signinHandler}>
//         <span><img src={facebook} className='h-8 my-auto inline float-left ml-4' /></span>
//         <p className=''>Sign in with Facebook</p>
//     </button>)
// }


// const GmailSignIn = ({ user_email, setuser_email, user_pass, setuser_pass, submithandler }) => {

//     return <div className='flex flex-col w-full'>
//         <label className='text-start'>Email</label>
//         <input value={user_email} onChange={(e) => handlechange(e, setuser_email)} type='email' className='w-full  mx-auto px-4 py-2 rounded-md' />
//         <label className='text-start'>Password</label>
//         <input value={user_pass} onChange={(e) => handlechange(e, setuser_pass)} type='password' className='w-full mx-auto px-4 py-2 rounded-md' />
//         <button onClick={(e) => submithandler(e, user_email, user_pass)}>Login</button>
//     </div>
// }

const Login = ({setter}) => {

    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    const [user_email, setuser_email] = useState("null")
    const [user_pass, setuser_pass] = useState("null")
    const [error, setError] = useState('')
    const handlechange = (e, setter) => {
        setter(e.target.value)
    }

    // const signInWithGoogle = async (e) => {
    //     e.preventDefault()
    //     setLoading(true);
    //     const provider = new GoogleAuthProvider();

    //     try {
    //         signInWithPopup(auth, provider)
    //             .then(res => {
    //                 setUser(res) 
    //                 setLoading(false)
    //             })
    //             .catch(e => {
    //                 setLoading(false)
    //                 console.log(e);
    //             })
    //     } catch (error) {
    //         setLoading(false)
    //         console.log(error.message);
    //     }


    // };

    const handleLogin = async (email, password) => {
        try {
            const auth = getAuth();
            await signInWithEmailAndPassword(auth, email, password).then(res => {
                setter(res);
                navigate("/admin")
            })
            // User successfully logged in
            setError('');
        } catch (error) {
            console.log(error);
            setError(error.message);
        }
    };
    const dummySignIn = (e, email, pass) => {
        e.preventDefault()
        if (email && pass) {
            setLoading(true)
            setTimeout(() => {
                setLoading(false)
                handleLogin(email, pass)
                const found_user = staffData.find(item => {
                    return item.email.trim().toLowerCase() == email.toLowerCase().trim()
                })
                if (found_user) {
                    setUser(found_user)
                    // navigate('/dashboard')
                }

            }, 1500);
        }
    }

    return (
        <div className='text-center w-screen flex justify-center items-center bg-dark-2 h-screen bg-opacity-90 overflow-hidden'>

            {!loading ? (<div className='w-screen px-[20%] sm:px-[22%] md:px-[25%] lg:px-[35%] xl:px-[40%]  '>
                <h2 className='text-3xl'>Sign In</h2>

                {/*  <FacebookButton signinHandler={signInWithGoogle} /> */}

                <div className='flex flex-col w-full'>
                    <label className='text-start'>Email</label>
                    <input value={user_email} onChange={(e) => handlechange(e, setuser_email)} type='email' className='w-full  mx-auto px-4 py-2 rounded-md' />
                    <label className='text-start'>Password</label>
                    <input value={user_pass} onChange={(e) => handlechange(e, setuser_pass)} type='password' className='w-full mx-auto px-4 py-2 rounded-md' />
                    <error className="min-h-6 text-sm text-red-500 py-1 font-[500] tracking-wider">{error}</error>
                    
                    <button className="w-full" onClick={(e) => dummySignIn(e, user_email, user_pass)}>Login</button>
                </div>
                <div className='w-full flex justify-center gap-2 text-white text-sm  py-1'>
                    <div className='border-[1px] w-full h-[1px] self-center'></div>
                    Or
                    <div className='border-[1px] w-full h-[1px] self-center'></div>
                </div>
                <GoogleButton /* signinHandler={signInWithGoogle} */ />
            </div>)
                :
                (<div class="relative flex justify-center items-center mt-12 text-center">
                    <p className='text-white absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-semibold text-expense-light text-lg loading'>Loading</p>
                    <div class=" animate-spin  rounded-full h-24 w-24 -border-t-2 border-b-2 border-light-2">  </div>
                </div>)}
        </div>
    );
};

export default Login;
