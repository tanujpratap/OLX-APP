import "./Header.css";  
import{Link, useNavigate}from 'react-router-dom';
import categories from "./CategoriesList";
function Categories(props){
  const navigate=useNavigate();
    return (
        <div  className=" cat-container ">
<span>All Categories</span>

    {
        categories && categories.length>0 && 
        categories.map((item,index)=>{
            return(
                <span  key={index} className="category" onClick={()=>navigate('/category/'+item)} >{item}  </span>
            )
        })
    }

   
 
</div>

     
    )
}
export default Categories;