import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import toast from 'react-hot-toast';

const Signup = () => {
    const [user, setUser] = useState({
        fullName: "",
        userName: "",
        password: "",
        confirmPassword: "",
        gender: ""
    })
    const navigate = useNavigate();
    const handleCheckbox = (gender) => {
        setUser({ ...user, gender })
    }
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8080/api/v1/user/register', user, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })
            
            if(res.data.success){
                toast.success(res.data.message);
                navigate("/login");
            }
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
            
        }
        setUser({
            fullName: "",
            userName: "",
            password: "",
            confirmPassword: "",
            gender: ""
        })
    }
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-full max-w-md p-6 rounded-lg shadow-md bg-amber-100 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100">
                <h1 className="text-3xl font-bold text-center text-yellow-500 underline">Sign Up</h1>
                <form onSubmit={onSubmitHandler} action="">
                    <div>
                        <label className="label p-2">
                            <span className="text-base label-text text-black">Full Name</span>
                        </label>
                        <input
                            value={user.fullName}
                            onChange={(e) => setUser({ ...user, fullName: e.target.value })}
                            type="text"
                            placeholder="Full Name"
                            className="w-full h-10 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-gray-500 text-black bg-white"
                        />
                    </div>
                    <div>
                        <label className="label p-2">
                            <span className="text-base label-text text-black">User Name</span>
                        </label>
                        <input
                            value={user.userName}
                            onChange={(e) => setUser({ ...user, userName: e.target.value })}
                            type="text"
                            placeholder="User Name"
                            className="w-full h-10 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-gray-500 text-black bg-white"
                        />
                    </div>
                    <div>
                        <label className="label p-2">
                            <span className="text-base label-text text-black">Password</span>
                        </label>
                        <input
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            type="password"
                            placeholder="Password"
                            className="w-full h-10 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-gray-500 text-black bg-white"
                        />
                    </div>
                    <div>
                        <label className="label p-2">
                            <span className="text-base label-text text-black">Confirm Password</span>
                        </label>
                        <input
                            value={user.confirmPassword}
                            onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
                            type="password"
                            placeholder="Confirm Password"
                            className="w-full h-10 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-gray-500 text-black bg-white"
                        />
                    </div>
                    <div className='flex'>
                        <div className='flex items-center text-blue-500 mt-2'>
                            <p>Male</p>
                            <input
                                checked={user.gender === "male"}
                                onChange={() => handleCheckbox("male")}
                                type="checkbox"
                                defaultUnChecked
                                className="checkbox checkbox-primary m-2" />
                        </div>
                        <div className='flex items-center text-pink-500 mt-2'>
                            <p>Female</p>
                            <input
                                checked={user.gender === "female"}
                                onChange={() => handleCheckbox("female")}
                                type="checkbox"
                                defaultUnChecked
                                className="checkbox checkbox-secondary m-2" />
                        </div>
                    </div>
                    <Link to="/login" className='text-green-700 mt-2 flex justify-center'>
                        Already have an account?
                    </Link>
                    <div className='flex justify-center'>
                        <button type='submit' className="btn btn-soft btn-accent mt-3 border border-slate-700 shadow-2xl ">Sign up</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
