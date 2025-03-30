import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { setMessages } from '../redux/messageSlice';

const useGetMessages = () => {
    const {selectedUser} = useSelector(store => store.user);
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchMessage = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/api/v1/message/${selectedUser?._id}`, {
                    withCredentials: true,
                });
                console.log(res);
                dispatch(setMessages(res.data));

            } catch (error) {
                console.log(error);
                
            }
        }
        fetchMessage();
    }, [selectedUser?._id])
}

export default useGetMessages