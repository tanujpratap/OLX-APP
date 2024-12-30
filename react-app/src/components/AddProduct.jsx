import { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate,Link } from "react-router-dom";
import axios from 'axios'
import categories from "./CategoriesList";
import API_URL from "../constants";

function AddProduct(){
    const navigate=useNavigate();
    const[pname,setpname]=useState('');
    const[pdesc,setpdesc]=useState('');
    const[price,setprice]=useState('');
    const[pimage,setpimage]=useState('');
    const[pimage2,setpimage2]=useState('');
    const[category,setcategory]=useState('');



    useEffect(
        ()=>{
            if(!localStorage.getItem('token')){
                navigate('/login');
            }
        },[]
    )
    const handleApi=()=>{
        navigator.geolocation.getCurrentPosition((position)=>{
          
            
            
        
        const formData=new FormData();
        formData.append('plat',position.coords.latitude);
        formData.append('plong',position.coords.longitude);
        formData.append('pname',pname);
        formData.append('pdesc',pdesc);
        formData.append('price',price);
        formData.append('pimage',pimage);
        formData.append('pimage2',pimage2); 
        formData.append('category',category);
        
        
        formData.append('userId',localStorage.getItem('userId'));
        const url=API_URL+'/add-product'; 
        axios.post(url,formData).then(
            (res)=>{
        
        if(res.data.message){
            alert(res.data.message);
            navigate('/');
        }
        
            }
        )
        .catch((err)=>{
            alert(err);
            
        })
    })

        }

    return(
        <div  >
            <Header/>
            <div  className="p-3" >
            <h2>ADD PRODUCT HERE:</h2>
 < level>Product Name</level>
 <input className="form-control" type="text" value={pname} onChange={
    (e)=>{
        setpname(e.target.value)
    }
 } />
 < level>Product Description</level>
 <input className="form-control" type="text" value={pdesc} onChange={
    (e)=>{
setpdesc(e.target.value);
    }
 } />
 < level>Product Price </level>
 <input className="form-control" type="text" value={price} onChange={
    (e)=>{
setprice(e.target.value);
    }} />
 < level>Product Category</level>
<select  className="form-control" value={category} onChange={
    (e)=>{
setcategory(e.target.value);
    }}>
    <option >Cloth</option>
    <option >Bikes</option>
    <option >Mobiles</option>
    {
        categories && categories.length>0 && 
        categories.map((item,index)=>{
            return(
                <option key={'option'+index}>{item}</option>
            )
        })
    }
</select>
< level>Product Image</level>
 <input className="form-control" type="file"  onChange={
    (e)=>{
setpimage(e.target.files[0]);
    }} />
    < level>Product Second Image</level>
    <input className="form-control" type="file"  onChange={
    (e)=>{
setpimage2(e.target.files[0]);
    }} />
<button onClick={handleApi} className="btn btn-primary mt-3 ">SUBMIT</button>
            </div>
 
        </div>
    )
}
export default AddProduct;