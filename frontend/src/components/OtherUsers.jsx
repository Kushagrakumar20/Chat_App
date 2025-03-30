import React from "react";
import OtherUser from "./OtherUser";
import useGetOtherUsers from "../hooks/useGetOtherUsers";
import { useSelector } from "react-redux";
import store from "../redux/store";

const OtherUsers = () => {
    // custom hook
    useGetOtherUsers();
    const {otherUsers} = useSelector(store => store.user);

    if (!otherUsers) {
        return;
    }
    return (
        <div className="overflow-auto max-h-100 ">
            {
                otherUsers?.map((user) => {
                    return (
                        <OtherUser key={user._id} user={user}/>
                    )
                })
            }
            
        </div>

    );
};

export default OtherUsers;
