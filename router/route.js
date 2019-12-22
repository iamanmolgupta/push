var router = require('express').Router();  //import and create router instance
var userapi = require('../Api/api');   //import api

//render homepage
router.get('/',(req,res)=>{
  res.render('homepage');
})

//render login page
router.get('/login',(req,res)=>{
  res.render('login');
})

//render signup form
router.get('/user',(req,res)=>{
  res.render('form');
})

//post request for the add user
router.post('/user',async function(req,res){

  try{
  console.log("submitted form:"+JSON.stringify(req.body))
    //get the result from api
    var result = await userapi.adduser(req.body)

    //print that result on the screen
    res.send(result)
  }
  
  //catch error and print on console
  catch(err){
    console.log(err);
  }
})

router.post('/', async function(req,res){


var result = await userapi.getuser()
res.send(result)


})
router.post('/getinfo', async function(req,res){


  var result = await userapi.getinfo(req.body)
  res.send(result)
  
  
  })
  router.post('/reset',async function(req,res){
    try{
      console.log(req.body)
    var result = await userapi.reset(req.body)
    res.send(result)
    }
    catch(err){
      console.log(err);
    }
  })
  router.post('/forgot',async function(req,res){
    try{
      console.log(req.body)
    var result = await userapi.forgot(req.body)
    res.send(result)
    console.log({result})
    }
    catch(err){
      console.log(err);
    }
  })
// for the verification of user
router.get('/verified/:uname',async function(req,res){
  try{
    //call the verifieduser method in the api and get the result from there
    var result1 = await userapi.verifieduser(req.params.uname)
    res.send(result1);
  }
  catch(err){
    console.log(err);
  }
})

//for the login page
router.post('/login',async function(req,res){

try{
  //call the loginuser method in the api
  console.log(req.body)
  var resultlogin  = await userapi.loginuser(req.body);
  console.log({resultlogin});
  res.send(resultlogin);
}
catch(err){
  console.log(err);
}
})

//export the router
module.exports = router;