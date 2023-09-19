import React, { useState } from 'react'
import axios from 'axios'
const Login = () => {
    const [username, setUsername] = useState('')
    const [password,setPassword] = useState('')
    const handleFormSubmit = async(e)=>{
        e.preventDefault();
        try{

            const { data } = await axios.post('http://localhost:4000/login', { username,password });
        }
        catch(e){
            console.log("ERROR : ",e.message)
        }
        console.log("DONE")
    }
  return (
    <div>
        <form action="" onSubmit={handleFormSubmit}>

        <input type="text" className='border-2' onChange={(e)=>{setUsername(e.target.value)}} />
        <input type="password" className='border-2' onChange={(e)=>{setPassword(e.target.value)}} />
        <button type="submit">Login</button>
        </form>
    </div>
  )
}

export default Login