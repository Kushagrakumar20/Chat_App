import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../redux/userSlice';


const Login = () => {
    const [user, setUser] = useState({
        userName: "",
        password: "",
    })
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8080/api/v1/user/login', user, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })

            toast.success(res.data.message);
            console.log(res);
            
            navigate("/");
            dispatch(setAuthUser(res.data));
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);

        }
        setUser({
            userName: "",
            password: "",
        })
    }
    return (
        <div>
            <div className="flex justify-center items-center min-h-screen">
                <div className="w-full max-w-md p-6 rounded-lg shadow-md bg-amber-100 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100">
                    <h1 className="text-3xl font-bold text-center text-yellow-500 underline">Login</h1>
                    <form onSubmit={onSubmitHandler} action="">

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


                        <Link to="/register" className='text-green-700 mt-2 flex justify-center'>
                            Don't have an account?
                        </Link>
                        <div className='flex justify-center'>
                            <button type="submit" className="btn btn-soft btn-accent mt-3 border border-slate-700 shadow-2xl ">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
