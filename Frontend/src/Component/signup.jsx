import react from "react"
import { useNavigate } from 'react-router-dom';
import {useState} from "react";
import "./signup.css";
import axios from "axios";


function Signup() {
    const [formData, setFormData]=useState({
        name:"",
        email:"",
        password:""
    })
    const navigator=useNavigate()
    const inputHandler=(e)=>{
       const {name, value} =e.target;
        setFormData({...formData, [name]:value})
    }

    const submitHandler=async(e)=>{
    e.preventDefault();
       await axios.post("https://promptlabbackend-7bqp.onrender.com/signup", formData)
        .then((response)=>{
            console.log(response);
            navigator("/home");
        }).catch((err)=>{
        console.log(err);
    })
    }

    return ( <>
         <div className="auth-container">
        <form onSubmit={submitHandler}>
            <h1>This is the signup page</h1>
          <label htmlFor="name">Name</label>  
          <input type="text" placeholder="Enter your name" id="name" name="name" onChange={inputHandler} />
          <br></br><br></br>
           <label htmlFor="email">Email</label>  
          <input type="text" placeholder="Enter your email" id="email" name="email" onChange={inputHandler} />
          <br></br><br></br>
           <label htmlFor="name">Password</label>  
          <input type="password" placeholder="Enter your password" id="password" name="password" onChange={inputHandler}/>
          <br></br>
          <button>Submit</button>

        </form>
        </div>
          </>
     );
}

export default Signup;