import './App.css';
import Signup from "./Component/signup.jsx"
import Login from "./Component/login.jsx"
import Sidebar from "./Sidebar.jsx";
import ChatWindow from "./ChatWindow.jsx";
import {MyContext} from "./MyContext.jsx";
import { useState } from 'react';
import {v1 as uuidv1} from "uuid";
import {createBrowserRouter, RouterProvider} from "react-router-dom";

function App() {
 
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState(null);
  const [currThreadId, setCurrThreadId] = useState(uuidv1());
  const [prevChats, setPrevChats] = useState([]); //stores all chats of curr threads
  const [newChat, setNewChat] = useState(true);
  const [allThreads, setAllThreads] = useState([]);

  const providerValues = {
    prompt, setPrompt,
    reply, setReply,
    currThreadId, setCurrThreadId,
    newChat, setNewChat,
    prevChats, setPrevChats,
    allThreads, setAllThreads
  }; 

   const route=createBrowserRouter([
    {
      path:"/signup",
      element: <Signup/>
    },
    {
      path:"/",
      element:<Login/>
    },
    {
      path:"/home",
      element:<div className='app'>
      <MyContext.Provider value={providerValues}>
          <Sidebar></Sidebar>
          <ChatWindow></ChatWindow>
        </MyContext.Provider>
    </div>
    }
  ])

  return (
    <>
     <RouterProvider router={route}></RouterProvider>
    
    </>
    
  )
}

export default App;