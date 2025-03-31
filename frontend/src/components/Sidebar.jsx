import React, { useState } from 'react'
import { LuUserRoundSearch } from "react-icons/lu";
import OtherUsers from './OtherUsers';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser, setOtherUsers } from '../redux/userSlice';

const Sidebar = () => {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const {otherUsers} = useSelector(store => store.user);
    const dispatch = useDispatch();
    const logoutHandler = async () => {
        try {
            const res = await axios.get("http://localhost:8080/api/v1/user/logout")
            toast.success(res.data.message);
            navigate('/login');
            dispatch(setAuthUser(null))
        } catch (error) {
            console.log(error);
            
        }
    }
    const searchSubmitHandler = (e) => {
        e.preventDefault();
        const conversationUser = otherUsers?.find((user)=> user.fullName.toLowerCase().includes(search.toLowerCase()));
        if(conversationUser){
            dispatch(setOtherUsers([conversationUser]));
        }else{
            toast.error("User not found!");
        }
    }
    return (
        <div>
            <form onSubmit={searchSubmitHandler} action="" className='flex space-x-2'>
                <input
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)}
                    className='input input-bordered rounded-md bg-gray-100'
                    type="text"
                    placeholder='Search'
                />
                <button type='submit' className='btn btn-active bg-green-700'>
                    <LuUserRoundSearch size={20}/>

                </button>
            </form>
            <div className="divider divider-neutral "></div>
            <OtherUsers/>
            <div className='mt-46'>
                <button onClick={logoutHandler} className="btn btn-sm bg-red-700 text-white">Logout</button>
            </div>
        </div>
    )
}

export default Sidebar