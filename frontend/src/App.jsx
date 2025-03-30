import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from './components/HomePage';
import Login from './components/Login';
import Signup from './components/signup';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import io from "socket.io-client";
import store from './redux/store';


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/register",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
])

function App() {
  const [socket, setSocket] = useState(null);
  const { authUser } = useSelector(store => store.user);
  
  useEffect(() => {
    if (authUser) {
      console.log("useeffect");
      const socket = io('http://localhost:8080', {
      });
      socket.on("connect", () => {
        console.log("🎉 Socket connected! ID:", socket.id);
    });

    socket.on("connect_error", (err) => {
        console.log("❌ Socket connection error:", err);
    });
      setSocket(socket);
    }
  }, [authUser]);

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
