import {Link, useNavigate} from 'react-router-dom';
import Header from "./Header";
import { useState } from 'react';
import axios from 'axios';
function Login(){
    const navigate=useNavigate();
    const [username,setusername]=useState('');
    const [password,setpassword]=useState('');
    const handleApi=()=>{
      
     
        const url='http://localhost:4000/login';
        const data={username,password};
        axios.post(url,data).then((res)=>{

if(res.data.message){
    // alert(res.data.message);
    if(res.data.token){
        localStorage.setItem('token',res.data.token)
        localStorage.setItem('userId',res.data.userId)
        navigate('/');
    }
}   })
.catch(
    (err)=>{

alert('server err');

    }
)


}
    return(
        <div>
<Header/>
<div className='p-3 m-3'>
<h3>welcome to Login page</h3>
<br />

USERNAME 
<input className='form-control' type="text" value={username} onChange={
    (e)=>{
        setusername(e.target.value);
    }
} />
<br />
PASSWORD 
<input className='form-control' type="text"  value={password} onChange={
    (e)=>{
        setpassword(e.target.value);
    }
}/>
<br />
<button className='btn btn-primary  ' onClick={handleApi}>LOGIN</button>
<Link className='m-3' to="/signup">SIGNUP</Link>
        </div>
        </div>
    )
}
export default Login;