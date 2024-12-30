import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import Header from "./Header";
import API_URL from "../constants";

function ProductDetails(){
    const[product,setproduct]=useState()
    const[user,setuser]=useState()

    const p=useParams();
   
  
     useEffect(() => {
        const url = API_URL+'/get-product/'+p.productId;
        axios.get(url)
          .then((res) => {
          console.log(res);
          if(res.data.product){
            setproduct(res.data.product);
          }
          
          })
          .catch((err) => {
            alert('Server error');
          });
      }, []);
    
const handlecontact=(addedBy)=>{
console.log('id',addedBy);
const url = API_URL+'/get-user/'+addedBy;
axios.get(url)
  .then((res) => {
  console.log(res);
  if(res.data.user){
    setuser(res.data.user);
  }
  
  })
  .catch((err) => {
    alert('Server error');
  });

}
return(
    <>
    <Header/>
    PRODUCT DETAILS:
    <div >
    
      {product && <div className="d-flex justify-content-between flex-wrap">
        <div>
<img width="400px" height="200px" src={API_URL+'/'+product.pimage} alt="" />
{product.pimage2&&<img width="400px" height="200px" src={API_URL+'/'+product.pimage2} alt="" />}

<h6>Product Details:</h6>
{product.pdesc}
        </div>
        <div>
        <h3 className="m-2 price-text"> Rs. {product.price} /- </h3>
                                <p className="m-2"> {product.pname}  | {product.category} </p>
                                <p className="m-2 text-success"> {product.pdesc} </p>
                              { product.addedBy &&
                               <button onClick={()=>handlecontact(product.addedBy)}>
                                SHOW CONTACT DETAILS</button>}
                                {user && user.username && <h4>{user.username}</h4>}
                                {user && user.mobile && <h5>{user.mobile}</h5>}
                                {user && user.email && <h6>{user.email}</h6>}
        </div>
      </div>

      }
    </div>
    </>
)
}

export default ProductDetails;