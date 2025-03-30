import React from 'react';
import Sidebar from './Sidebar';
import MessageContainer from './MessageContainer';

const HomePage = () => {
  return (
    <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden text-black bg-clip-padding backdrop-filter backdrop-blur-lg p-4"
      style={{ backgroundColor: 'rgba(255, 193, 7, 0.2)' }}
    >
      <Sidebar />
      <div className="h-full w-[2px] bg-gray-500 mx-4"></div>
      <MessageContainer />
    </div>
  );
};

export default HomePage;
