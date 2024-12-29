import {Link} from 'react-router-dom';
import Header from "./Header";
import { useState } from 'react';
import axios from 'axios';
function Signup(){
    const [username,setusername]=useState('');
    const [password,setpassword]=useState('');
    const [mobile,setmobile]=useState('');

    const [email,setemail]=useState('');

    

    const handleApi=()=>{
      
        const url='http://localhost:4000/signup';
        const data={username,password,email,mobile}; 
        axios.post(url,data).then((res)=>{

if(res.data.message){
    alert(res.data.message);
}

        })
        .catch(
            (err)=>{

alert('server err');

            }
        )


        }
        
    
    return(
        <div >
<Header/>
<div className='p-3 m-3'>
<h3>welcome to SignUp page</h3>
<br />

USERNAME 
<input className='form-control' type="text"  value={username}  onChange={
    (e)=>{
        setusername(e.target.value);
    }
}/>
<br />
MOBILE
<input className='form-control' type="text"  value={mobile}  onChange={
    (e)=>{
        setmobile(e.target.value);
    }
}/>
<br />
EMAIL
<input className='form-control' type="text"  value={email}  onChange={
    (e)=>{
        setemail(e.target.value);
    }
}/>
<br />
PASSWORD 
<input className='form-control' type="text" value={password} onChange={
    (e)=>{
        setpassword(e.target.value);
    }
} />
<br />
<button className='btn btn-primary' onClick={handleApi}>SIGNUP</button>
<Link className='m-3' to="/login">LOGIN</Link>
</div>
        </div>
    )
}
export default Signup;