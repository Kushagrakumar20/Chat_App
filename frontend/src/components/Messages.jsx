import React from 'react'
import SingleMessage from './SingleMessage'
import useGetMessages from '../hooks/useGetMessages'
import { useSelector } from 'react-redux';
import store from '../redux/store';
import useGetRealTimeMessage from '../hooks/useGetRealTimeMessage';


const Messages = () => {
  useGetMessages();
    useGetRealTimeMessage();
  const { messages } = useSelector(store => store.message);
  if (!messages) return;
  return (
    <div className='px-4 flex-1 overflow-auto max-h-100'>
      {
        messages && messages?.map((message) => {
          return (
            <SingleMessage key={message.id} message={message} />
          )
        })
      }
      {/* <SingleMessage /> */}
    </div>
  )
}

export default Messages