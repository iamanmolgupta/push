var router1 = require('express').Router();  //import and create router instance
var userapi = require('../Api/imageApi');   //import api
var multer  = require('multer');
var { checkToken, generateToken } = require('../Middleware/middleware')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  })
  var upload = multer({ storage: storage })

router1.post('/addImage',upload.single("Image"),async(req,res)=>{
    try{
    const data = {Email:req.body.Email,User:req.body.User,Image:req.file.originalname,Category:req.body.Category};
    let result = await userapi.create(data);
    res.send(result);
    // console.log(result);
    }
    catch(err){
        console.log(err);
    }
})

router1.post('/allImage',async(req,res)=>{
    try{
    // console.log(req.body)
    let result = await userapi.all(req.body);
    res.send((result));
    console.log(result);
    }
    catch(err){
        console.log(err);
    }
})
router1.post('/getImage',async(req,res)=>{
  try{
  // console.log(req.body)
  let result = await userapi.ParticularImage(req.body);
  res.send(result);
  // console.log(result);
  }
  catch(err){
      console.log(err);
  }
})
router1.post('/comment',async(req,res)=>{
  try{
  let result = await userapi.comment(req.body);
  let result1 = await userapi.ParticularImage(req.body);
  res.send(result1);
  console.log({ result1 })
  }
  catch(err){
      console.log(err);
  }
})
router1.post('/allData', checkToken, async(req,res)=>{
  try{
  
  let result = await userapi.getData();
  res.send(result);
  // console.log({result});
  }
  catch(err){
      console.log(err);
  }
})
module.exports = router1;


