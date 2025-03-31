import React, { useEffect } from 'react'
import SendInput from './SendInput'
import Messages from './Messages'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedUser } from '../redux/userSlice'

const MessageContainer = () => {
  const { selectedUser, authUser } = useSelector(store => store.user);
  const dispatch = useDispatch(); 
  // useEffect(()=>{
  //   return ()=>dispatch(setSelectedUser(null))
  // },[])
  return (
    <>
      {selectedUser!==null ? (
      <div className='md:min-w-[550px] flex flex-col '>
        <div className="flex gap-2 items-center rounded-md px-4 py-2 mb-2 text-white bg-stone-800">
          <div className="avatar online">
            <div className="w-10 rounded-full">
              <img
                src={selectedUser?.profilePhoto}
                alt="User_Profile"
              />
            </div>
          </div>
          <div className="flex flex-col flex-1">
            <div className="flex justify-between gap-2">
              <p>{selectedUser?.fullName}</p>
            </div>
          </div>
        </div>
        <Messages />
        <SendInput />
      </div>
      ) : (
        
          <div className='md:min-w-[550px] flex flex-col justify-center items-center'>
            <h1 className='text-4xl text-black font-bold'>Hi!! {authUser?.fullName}</h1>
            <h2 className='text-2xl text-black'>Let's Start Conversattion </h2>
          </div>
        
      )}
    </>

  )
}

export default MessageContainer