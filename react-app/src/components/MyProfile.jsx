import { useEffect, useState } from "react";
import Header from "./Header";
import axios from 'axios';
import API_URL from "../constants";


function MyProfile(){
    const[user,setuser]=useState({});
    useEffect(
        ()=>{
            let url=API_URL+'/my-profile/'+localStorage.getItem('userId');
axios.get(url)
  .then((res) => {
 console.log(res.data);
 if(res.data.user){
  setuser(res.data.user);
 }
 
  })
  .catch((err) => {
    alert('Server error');
  });

        },[]
    )
return(
    <div>
     <Header/>
<div className="p-3 m-3">
<h3 className="text-center mt-2">User Profile</h3>
<table className="table  table-border">
    <thead><tr>
        <td>username</td>
        <td>mobile</td>
        <td>Email</td>
    </tr></thead>
    
   <tbody> <tr>
        <td>{user.username}</td>
        <td>{user.email}</td>
        <td>{user.mobile}</td> 
    </tr></tbody>
</table>
    </div>
    </div>
)
}
export default MyProfile;