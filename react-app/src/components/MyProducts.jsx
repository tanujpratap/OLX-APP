import { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Categories from "./Categories";
import { FaHeart } from "react-icons/fa";
import './Home.css';
import API_URL from "../constants";

function MyProducts() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [cproducts, setCproducts] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const url = API_URL+'/my-products';
    let data={userId:localStorage.getItem('userId')}
    axios.post(url,data)
      .then((res) => {
        if (res.data.products) {
          setProducts(res.data.products);
          setCproducts(res.data.products);  // Set initial products to cproducts
        //   alert("Products fetched!");
        }
      })
      .catch((err) => {
        alert('Server error');
      });
  }, []);

  // Handle search
  const handleSearch = (value) => {
    setSearch(value);
  };

  // Handle search button click
  const handleClick = () => {
    if (!search) {
      setCproducts(products); // If search is empty, show all products
      return;
    }
    const filteredProducts = products.filter((item) => {
      return (
        item.pname.toLowerCase().includes(search.toLowerCase()) ||
        item.pdesc.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase())
      );
    });
    setCproducts(filteredProducts);
  };

  // Handle category filter
  const handleCategory = (value) => {
 
    let filteredProducts = products.filter((item,index) => {
      if( item.category === value){
        return item;
      }
    });
    setCproducts(filteredProducts);
  };

const handleLike=(productId)=>{
  const userId=localStorage.getItem('userId');
console.log('userId','productId',productId,userId);
const url = API_URL+'/like-product';
const data={userId,productId}
axios.post(url,data)
  .then((res) => {
  if(res.data.message){
    alert('liked');
  }
   
  })
  .catch((err) => {
    alert('Server error');
  });
}

  return (
    <div>
      <Header
        search={search}
        handlesearch={handleSearch}
        handleClick={handleClick}
      />
       <Categories handleCategory={handleCategory} /> 
     
     
           

        <div className="d-flex justify-content-center flex-wrap">
                {cproducts && products.length > 0 &&
                    cproducts.map((item, index) => {

                        return (
                            <div key={item._id} className="card m-3 ">
                                 <div onClick={()=>handleLike(item._id)} className="icon-con">
                            <   FaHeart  className="icons" /> 
                            </div>
                                <img width="300px" height="200px" src={API_URL+'/' + item.pimage} />

                                <p className="m-2"> {item.pname}  | {item.category} </p>
                                <h3 className="m-2 text-danger"> {item.price} </h3>
                                <p className="m-2 text-success"> {item.pdesc} </p>
                            </div>
                        )

                    })}
            </div>
<h5>All Results:</h5>
          <div className="d-flex justify-content-center flex-wrap">
                {products && products.length > 0 &&
                    products.map((item, index) => {

                        return (
                          <div key={item._id} className="card m-3 ">
                            <div onClick={()=>handleLike(item._id)} className="icon-con">
                            <   FaHeart  className="icons" /> 
                            </div>
                          
                                <img width="250px" height="150px" src={API_URL+'/' + item.pimage} />
                                <h3 className="m-2 price-text"> Rs. {item.price} /- </h3>
                                <p className="m-2"> {item.pname}  | {item.category} </p>
                                <p className="m-2 text-success"> {item.pdesc} </p>
                            </div>
                        )

                    })}
            </div>

        </div>
    )
}

export default MyProducts;