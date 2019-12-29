var { get } = require('lodash');
var router1 = require('express').Router();  //import and create router instance
var userapi = require('../Api/imageApi');   //import api
var multer  = require('multer');
var { checkToken } = require('../Middleware/middleware')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  })
  var upload = multer({ storage: storage })

router1.post('/addImage', checkToken, upload.single("Image"),async(req,res)=>{
    try{
    const data = {Email:req.body.Email,User:req.body.User,Image:req.file.originalname,Category:req.body.Category};
    let result = await userapi.create(data);
    result = await userapi.findData({User: data.User}, {}, {skip: 0,limit:0, sort:{date:-1}})
    res.send(result);
    // console.log(result);
    }
    catch(err){
        res.send(err);
    }
})

router1.get('/allImage', checkToken, async(req,res)=>{
    try{

    let params = JSON.parse(req.query.params)

    let filter = get(params,"filter",{});
    let field = get(params,"field",{})
    let options =get(params,"option",{})
    let result = await userapi.findData(filter, field, options)
    res.send((result));
    }
    catch(err){
      // console.log({ err })
        res.send(err);
    }
})
router1.get('/getImage', checkToken, async(req,res)=>{
  try{
  let params = JSON.parse(req.query.params);
  let filter = get(params, "filter", {});
  let field = get(params, "field", {});
  let options= get(params, "options", {});
  let result = await userapi.findData(filter, field, options)
  res.send(result);
  // console.log(result);
  }
  catch(err){
      res.send(err);
  }
})
router1.post('/comment', checkToken, async(req,res)=>{
  try{
  let result = await userapi.comment(req.body);
  let filter = {_id: req.body.id};
  let field = {};
  let options= {
    skip: 0,
    limit: 0,
    sort: {date: -1}
  }
  result = await userapi.findData(filter, field, options)
  res.send(result);
  // console.log({ result })
  }
  catch(err){
      res.send(err);
  }
})
router1.post('/likes', checkToken, async(req,res)=>{
  try{
    // console.log("likes", req.body)
   let result = await userapi.likes(req.body.likeData);
   result = await userapi.findData({},{},{skip:0,limit:0,sort:{date:-1}})
   res.send(result);
  //  console.log({result})
  }
  catch(err){
    // console.log({err})
    res.send(err)
  }
})
router1.get('/allData', checkToken, async(req,res)=>{
  try{
  let result = await userapi.findData( {}, {}, {skip:0, limit:0, sort:{date:-1}});
  res.send(result);
  }
  catch(err){
    // console.log({err})
      res.send(err)

  }
})
module.exports = router1;


