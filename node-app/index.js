const express=require('express');
const cors=require('cors');
const path=require('path');
var jwt=require('jsonwebtoken');
const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  const upload = multer({ storage: storage })
const bodyParser=require('body-parser');
const app=express();
app.use('/uploads',express.static(path.join(__dirname,'uploads')))
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
const port=4000;
const mongoose = require('mongoose');
const { type } = require('os');

mongoose.connect('mongodb://localhost:27017/test'
    );
const Users = mongoose.model('Users', { username: String , mobile:String,email:String,password:String ,likedProducts:[{type:mongoose.Schema.Types.ObjectId, ref:'Products'}]}); 
let schema=new mongoose.Schema({
    pname:String,
    pdesc:String,
    price:String,
    category:String,
    pimage:String,
    pimage2:String,
    addedBy:mongoose.Schema.Types.ObjectId,
    pLOC:{
        type:{
            type:String,
            enum:['Point'],
            default:'Point'
        },
        
            coordinates:{
type:[Number]
            }
        
    }

})
schema.index({pLOC:'2dsphere'});
const Products=mongoose.model('Products',schema)
app.get('/',(req,res)=>{
    res.send("hello world");

})
app.get('/search',(req,res)=>{
    
     
    let search=req.query.search;
    let latitude=req.query.loc.split(',')[0];
    let longitude=req.query.loc.split(',')[1];
      
    Products.find(
        {
       $or:     [{pname:{$regex:search}},
        {price:{$regex:search}},
        {pdesc:{$regex:search}}
       ],
       pLOC:{
        $near:{
            $geometry:{
                type:'Point',
                coordinates:[parseFloat(latitude),parseFloat(longitude)]
            },
            $maxDistance:500*1000, 
        }
       }

        }
    )
    .then((results)=>{

res.send({message:'success',products:results})

    }
  
    )
    .catch(
      (err)=>{
          res.send({message:'server err'})
      }
    )

})

app.post('/like-product',(req,res)=>{
    let productId=req.body.productId;
    let userId=req.body.userId;
    
    
    Users.updateOne({_id:userId},{$addToSet:{likedProducts:productId}})
    .then(()=>{
        res.send({message:'liked success'})
    }

    )
    .catch(
        ()=>{
            res.send({message:'server err'})
        }
    )

    
})
app.post('/add-product',upload.fields([{name:'pimage'},{name:'pimage2'}]),(req,res)=>{
   
    
 
    const plat=req.body.plat;
    const plong=req.body.plong;
    const pname=req.body.pname;

    const pdesc=req.body.pdesc;
    const price=req.body.price;
    const category=req.body.category;
    const pimage=req.files.pimage[0].path;
    const pimage2=req.files.pimage2[0].path;
    const addedBy=req.body.userId;    
    const product=new Products({pname,pdesc,price,category,pimage,pimage2,addedBy
     ,pLOC:{type:'Point',coordinates:[plat,plong]}
    });

    product.save()
    .then(()=>{
        res.send({message:'saved success'})
    }

    )
    .catch(
        ()=>{
            res.send({message:'server err'})
        }
    )

    
     
    
    
})
app.get('/get-products',(req,res)=>{
    const catName=req.query.catName;
    let _f={} 
    if(catName){
        _f={category:catName}
    }
    Products.find(_f)
      .then((result)=>{

res.send({message:'success',products:result})

      }
    
      )
      .catch(
        (err)=>{
            res.send({message:'server err'})
        }
      )
    
})
app.get('/get-product/:pId',(req,res)=>{
    console.log(req.params);
    
    Products.findOne({_id:req.params.pId})
      .then((result)=>{

res.send({message:'success',product:result})

      }
    
      )
      .catch(
        (err)=>{
            res.send({message:'server err'})
        }
      )
    
})
app.post('/liked-products',(req,res)=>{
    Users.findOne({_id:req.body.userId}).populate('likedProducts')
      .then((result)=>{

res.send({message:'success',products:result.likedProducts})

      }
    
      )
      .catch(
        (err)=>{
            res.send({message:'server err'})
        }
      )
    
})
app.post('/my-products',(req,res)=>{
    const userId=req.body.userId;
   Products.find({addedBy: userId})
      .then((result)=>{

res.send({message:'success',products:result})

      }
    
      )
      .catch(
        (err)=>{
            res.send({message:'server err'})
        }
      )
    
})
app.post('/signup',(req,res)=>{
    const username=req.body.username;
    const password=req.body.password;
    const email=req.body.email;

    const mobile=req.body.mobile;

    const user=new Users({username:username,password:password,email,mobile});
    user.save().then(() => 
    {
        res.send({message:'saved success'});

    })
    .catch(()=>{
        res.send({message:'server err'});
    })

})
app.get('/my-profile/:userId',(req,res)=>{
    let uId=req.params.userId;
    Users.findOne({_id:uId})
    .then((result) => 
        {
            res.send({message:' success',user:{email:result.email,mobile:result.mobile,username:result.username}});
    
        })
        .catch(()=>{
            res.send({message:'server err'});
        })
    
})
app.get('/get-user/:uId',(req,res)=>{
    const _userId=req.params.uId;
    Users.findOne({_id:_userId})
    .then((result) => 
        {
            res.send({message:' success',user:{email:result.email,mobile:result.mobile,username:result.username}});
    
        })
        .catch(()=>{
            res.send({message:'server err'});
        })
})
app.post('/login',(req,res)=>{
    const username=req.body.username;
    const password=req.body.password;

   Users.findOne({username:username})
    .then((result) => 
    {
      
        if(!result){
            res.send({message:'user not found'});
        }
        else{
            if(result.password==password){
                const token=jwt.sign(
                    {
                        data:result
                    },
                    'MYKEY',{
                        expiresIn:'1h'
                    }
                );
                 res.send({message:'findsuccess',token:token,userId:result._id})
            }
            if(result.password!=password){
                res.send({message:'wrong password'})
           }
        }
       

    })
    .catch((err)=>{
        console.log(err);
        
        res.send({message:'server err'});
    })

})
app.listen(port,()=>{
    console.log(`app listening on port ${port}`);
    
})