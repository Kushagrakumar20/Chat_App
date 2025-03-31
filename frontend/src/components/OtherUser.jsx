import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../redux/userSlice';

const OtherUser = ({user}) => {
    // const user = props.user;
    const dispatch = useDispatch();
    const {selectedUser, onlineUsers} = useSelector(store => store.user);
    const isOnline = onlineUsers?.includes(user?._id);
    const selectedUserHandler = () => {
        console.log(user);
        dispatch(setSelectedUser(user));
    }

    return (
        <>
            <div onClick={selectedUserHandler} className={`${selectedUser?._id===user?._id ? 'bg-gray-300': ''} flex gap-2 items-center hover:bg-gray-300 rounded-sm p-2 cursor-pointer`}>
                <div className={`avatar ${isOnline} ? 'online' : '' `}>
                    <div className="w-10 rounded-full">
                        <img
                            src={user?.profilePhoto}
                            alt="User_Profile"
                        />
                    </div>
                </div>
                <div className="flex flex-col flex-1">
                    <div className="flex justify-between gap-2">
                        <p>{user?.fullName}</p>
                    </div>
                </div>
            </div>
            <div className="divider my-0 py-0 divider-error"></div>
        </>
    )
}

export default OtherUser