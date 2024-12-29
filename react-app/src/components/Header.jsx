import "./Header.css";  
import{Link, useNavigate}from 'react-router-dom';
import {FaSearch} from 'react-icons/fa';
import { useState } from "react";
function Header(props){
    const[loc,setloc]=useState(null);
    const[showOver,setshowOver]=useState(false);
    const navigate=useNavigate();
    const handleLogout=()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/login');
    }
    let locations = [
        {
            "latitude": 28.6139,
            "longitude": 77.2090,
            "placeName": "New Delhi, Delhi"
        },
        {
            "latitude": 19.0760,
            "longitude": 72.8777,
            "placeName": "Mumbai, Maharashtra"
        },
    ]
    return (
        <div  className=" header-container d-flex justify-content-between">
<div className="Header"  >
<Link to="/" className="links" >HOME</Link>
<select value={loc} onChange={(e)=>{
    localStorage.setItem('userLoc',e.target.value)
    setloc(e.target.value)
}} >
    {
          locations.map((item,index) => {
            return(
                <option 
               value={`${item.latitude},${item.longitude}`} >
        {item.placeName}
                </option>
            )
        
           })
    }
 
</select>
<input className="search" type="text" value={props && props.search} onChange={(e)=>props.handlesearch && props.handlesearch(e.target.value)

} />
<button className="search-btn" onClick={()=> props.handleClick && props.handleClick()} ><FaSearch/></button>
   
 
</div>
<div>

 


   <div onClick={()=>{
    setshowOver(!showOver)
   }} style={{
    display:'flex',justifyContent:"center",
    alignItems:'center',background:'#002f34',
    width:'40px',height:'40px',
    borderRadius:'50%'
    , cursor:'pointer',
    color:'white',fontSize:'14px'
   }}>N</div>
   {showOver &&
    <div style={{
        minHeight:'100px',
        width:'200px',
        background:'#eee',
        position:'absolute',
        top:'0',
        right:'0',
        zIndex:'1',
        marginTop:'50px',
        marginRight:'50px',
        color:'red',
        fontSize:'14px',
        background:'#002f34',
        borderRadius:'7px'

       


    }}>
        <div>
        {!!localStorage.getItem('token')&&
<Link to="/add-product">
 <button className="logout  ">ADD PRODUCT</button>
  </Link>}
        </div>
      <div>
      {!!localStorage.getItem('token')&&
  <Link to="/liked-products">
 <button className="logout  ">FAVORITES</button>
  </Link>}
      </div>
      <div>
      {!!localStorage.getItem('token')&&
  <Link to="/my-products">
 <button className="logout  ">MY ADS</button>
  </Link>}
      </div>
<div>
{!localStorage.getItem('token')?
    <Link to="/login">LOGIN</Link>:

   <button className="logout" onClick={handleLogout} >LOGOUT</button> }
</div>

    </div>
   }
</div>
        </div>
    )
}
export default Header;