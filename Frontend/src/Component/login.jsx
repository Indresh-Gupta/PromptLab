import react from "react"
import { useNavigate } from 'react-router-dom';
import {useState} from "react";
import "./login.css";
import SERVER from "../config/server";






function Login() {
      const [loginData, setLoginData]=useState({
        email:"",
        password:""
    })
    const navigator=useNavigate()
    const inputHandler=(e)=>{
       const {name, value} =e.target;
        setLoginData({...loginData, [name]:value})
       
    }

    const submitHandler=async(e)=>{
        e.preventDefault();
        const {email, password}=loginData;
        if(!email || !password){
            return console.log("user not enter correct data");
        }
        try{
           const url="https://promptlabbackend-7bqp.onrender.com/"
          const response=await fetch(url, {
            method:"Post",
           headers:{
            'content-type':"application/json",
           },
           body:JSON.stringify(loginData),
          });
          const result=await response.json();
          const {success, message, jwtToken,name, error}=result;
          if(success){
            console.log(message);
            localStorage.setItem("token",jwtToken);
            localStorage.setItem("loggedInUser",name);
            navigator("/home");
          } else if(error){
            console.log(error);
          }
          console.log(result);
        }catch(err){
          return  console.log("this is server side error", err);
        }
    }

    



    return ( <>
    <div className="auth-container">
    <form onSubmit={submitHandler}>
        <h1>This is login page </h1>
           <label htmlFor="email">Email</label>  
          <input type="text" placeholder="Enter your email" id="email" name="email" onChange={inputHandler} />
          <br></br><br></br>
           <label htmlFor="name">Password</label>  
          <input type="password" placeholder="Enter your password" id="password" name="password" onChange={inputHandler}/>
          <br></br>
          <button>Submit</button>

        </form>
       <p>
          Don’t have an account?<span onClick={() => navigator("/signup")}>Sign up</span>
        </p>
        </div>
     </> );
 }

 export default Login;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Login.css";

// function Login() {
//   const [loginData, setLoginData] = useState({
//     email: "",
//     password: ""
//   });

//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const inputHandler = (e) => {
//     const { name, value } = e.target;
//     setLoginData({ ...loginData, [name]: value });
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     const { email, password } = loginData;

//     if (!email || !password) {
//       setError("Please enter email and password");
//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:8080/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify(loginData)
//       });

//       const result = await response.json();
//       const { success, jwtToken, name, message } = result;

//       if (success) {
//         localStorage.setItem("token", jwtToken);
//         localStorage.setItem("loggedInUser", name);
//         navigate("/home");
//       } else {
//         setError(message || "Login failed");
//       }
//     } catch (err) {
//       setError("Server error. Please try again later.");
//       console.error(err);
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-box">
//         <h2>Login</h2>

//         {error && <p className="error-text">{error}</p>}

//         <form onSubmit={submitHandler}>
//           <input
//             type="email"
//             name="email"
//             placeholder="Enter your email"
//             onChange={inputHandler}
//           />

//           <input
//             type="password"
//             name="password"
//             placeholder="Enter your password"
//             onChange={inputHandler}
//           />

//           <button type="submit">Login</button>
//         </form>

//         <p>
//           Don’t have an account? <span>Sign up</span>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Login;
