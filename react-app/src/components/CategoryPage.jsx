import { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate, Link, useParams } from "react-router-dom";
import axios from "axios";
import Categories from "./Categories";
import { FaHeart } from "react-icons/fa";
import './Home.css';
import API_URL from "../constants";

function CategoryPage() {
  const navigate = useNavigate();
  const param=useParams();
  console.log(param);
  
  const [products, setProducts] = useState([]);
  const [cproducts, setCproducts] = useState([]);
  const [search, setSearch] = useState('');
  const [issearch, setisSearch] = useState('false');

  useEffect(() => {
    const url = API_URL+'/get-products?catName='+param.catName;
    axios.get(url)
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
  }, [param]);

  // Handle search
  const handleSearch = (value) => {
    setSearch(value);
  };

  // Handle search button click
  const handleClick = () => {
    // if (!search) {
    //   setCproducts(products); // If search is empty, show all products
    //   return;
    // }
    // const filteredProducts = products.filter((item) => {
    //   return (
    //     item.pname.toLowerCase().includes(search.toLowerCase()) ||
    //     item.pdesc.toLowerCase().includes(search.toLowerCase()) ||
    //     item.category.toLowerCase().includes(search.toLowerCase())
    //   );
    // });
      // setCproducts(filteredProducts);
    
    const url = API_URL+'/search?search=' + search +'&loc='+localStorage.getItem('userLoc');

    
axios.get(url)
  .then((res) => {
 setCproducts(res.data.products);
 setSearch('true');
   
  })
  .catch((err) => {
    alert('Server error');
  });

  
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

const handleProduct=(id)=>{
  navigate('/product/'+id);

}
  return (
    <div>
      <Header
        search={search}
        handlesearch={handleSearch}
        handleClick={handleClick}
      />
       <Categories handleCategory={handleCategory} /> 
     
    {issearch && cproducts && <h5>SEARCH RESULTS
      <button className="logout" onClick={()=>
        setisSearch(false)
      }>CLEAR</button></h5>}  
    {issearch && cproducts && cproducts.length==0 &&<h5>NO RESULT FOUND</h5>}  
           

      { issearch && <div className="d-flex justify-content-center flex-wrap">
                {cproducts && products.length > 0 &&
                    cproducts.map((item, index) => {

                        return (
                            <div onClick={()=>handleProduct(item._id)} key={item._id} className="card m-3 ">
                                 <div onClick={()=>handleLike(item._id)} className="icon-con">
                            <   FaHeart  className="icons" /> 
                            </div>
                                <img width="250px" height="150px" src={API_URL+'/' + item.pimage} />
                                <h3 className="m-2 price-text"> {item.price} </h3>
                                <p className="m-2"> {item.pname}  | {item.category} </p>
                               
                                <p className="m-2 text-success"> {item.pdesc} </p>
                            </div>
                        )

                    })}
            </div>}
 
     { !issearch &&     <div className="d-flex justify-content-center flex-wrap">
                {products && products.length > 0 &&
                    products.map((item, index) => {

                        return (
                          <div onClick={()=>handleProduct(item._id)} key={item._id} className="card m-3 ">
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
            </div>}

        </div>
    )
}

export default CategoryPage;