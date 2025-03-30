import React, { useState } from 'react'
import { BsSendFill } from "react-icons/bs";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../redux/messageSlice';


const SendInput = () => {
    
    const dispatch = useDispatch();
    const {selectedUser} = useSelector(store => store.user);
    const [message, setMessage] = useState("");
    const {messages} = useSelector(store => store.message);
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`http://localhost:8080/api/v1/message/send/${selectedUser?._id}`, {message}, {
                withCredentials: true,
            });
            console.log(res);
            dispatch(setMessages([...messages, res?.data?.newMessage]))
        } catch (error) {
            console.log(error);
            
        }
        setMessage("");
    }
    return (
        <form onSubmit={onSubmitHandler} className='fixed bottom-0 w-138.5 mb-3'>
            <div className='w-full relative'>
                <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    type="text"
                    placeholder='Send a message ... '
                    className='border text-sm p-3 rounded-sm block w-full border-zinc-800 bg-gray-600 text-white relative '
                />
                <button type="submit" className='absolute flex items-center inset-y-0 end-0 p-2 cursor-pointer'>
                    <BsSendFill className='text-lg'/>
                </button>
            </div>
        </form>
    )
}

export default SendInput