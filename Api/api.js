var userdb = require('../Schema/schema'); //import the schema
var SGmail = require("@sendgrid/mail");  //import sendgrid

//set your sendgrid api key
SGmail.setApiKey(
  "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"
  );

module.exports={
  getuser:function(data){

    //return promise
    return new Promise((resolve,rej)=>{
    
      //check if the user exist or not..
      userdb.find({},function(err,result){
    
        //if yes then resolve the email already exist  
        if(result.length>0){
        resolve(result)
       }
    
       //else create the user in the database and send welcome email to user
    
       
      })
    })
    },
    
    getinfo:function(data){

      //return promise
      return new Promise((resolve,rej)=>{
      
        //check if the user exist or not..
        userdb.find({"Email":data["Email"]},function(err,result){
      
          //if yes then resolve the email already exist  
          if(result.length>0){
          resolve(["Email id already exist"]);
        
         }
      
         //else create the user in the database and send welcome email to user
      
         else{
           console.log("dta" + data);
          userdb.create(data,function(err,result1){
            
            // prepare your message
            const msg = {
             to: data.Email ,
             from: "anmolgupta81@gmail.com",
             subject: data.uname1+",Welcome to Daffodil!Confirm Your Email",
             text: 'Go to this link for confirmation of your registration http://localhost:9081/verified/'+result1["id"]
           };
           SGmail.send(msg); // to send msg
           resolve(result1.uname1);
           if(err){
             rej(err);
           }
          })
           }
      
           // if we get any error then reject with error message
           if(err){
             rej(err);
           } 
        })
      })
      },




//add user method to add new user
adduser:function(data){

//return promise
return new Promise((resolve,rej)=>{

  //check if the user exist or not..
  userdb.find({"Email":data["Email"]},function(err,result){

    //if yes then resolve the email already exist  
    if(result.length>0){
    resolve("Email id already exist");
   }

   //else create the user in the database and send welcome email to user

   else{
    userdb.create(data,function(err,result1){

      // prepare your message
      const msg = {
       to: data.Email ,
       from: "anmolgupta81@gmail.com",
       subject: data.uname1+",Welcome to Daffodil!Confirm Your Email",
       text: 'Go to this link for confirmation of your registration http://localhost:9081/verified/'+result1["id"]
     };
     SGmail.send(msg); // to send msg
     resolve("sign up successfully");
     if(err){
       rej(err);
     }
    })
     }

     // if we get any error then reject with error message
     if(err){
       rej(err);
     } 
  })
})
},

reset:function(data){
  return new Promise((resolve,rej)=>{
  userdb.updateOne({"_id":data["id"]},{$set:{"Password":data["Password"]}},function(err,result){
    if(result){
      resolve("reset password successfully")
    }
    else{
      rej(err);
    }
  })
  })
},
forgot:function(data){
  return new Promise((resolve,rej)=>{
  userdb.find({"Email":data["Email"]},function(err,result){
    if(result.length>0){
      resolve(["valid",result])
    }
    else{
      resolve("email id does not exist");
    }
  })
  })
},

// verified user method
verifieduser:function(data){

//return a promise
return new Promise((resolve,rej)=>{

 //update the verified field of the user from false to true
  userdb.updateOne({"_id":data},{$set:{"verified":true}},function(err,result){

    //if verified the verified successfully
    if(result){
      resolve("email verified successfully");
    }

    //else rej with an error
    else{
      rej("error from update");
    }
  })
})
},

//login user method
loginuser :function(data){
  return new Promise((resolve,rej)=>{
console.log({ data })
      //verify that the entered email id and password is valid or not.
  userdb.find( { $and: [ { "Email":data["Email"]}, { "Password":data["Password"] } ] },function(err,result){

    //if valid then verify that the user have verified their email id or not.
    
    if(result.length>0){
      userdb.find({ $and: [ { "Email":data["Email"]}, { "verified":true } ] } ,function(err,results){
        console.log({ results })
        //if all the details filled by the user are correct
        if(results.length>0){
         
          resolve(["login successfully",results]);
        }

        //else email not verified
        else{
          resolve("you haven't verified your email id")
        }

        //if error then reject with the error
        if(err){
          rej(err);
        }
      })
    }

    //if the credentials were wrong
    else{
      resolve("invalid credentials");
    }
    if(err)
    {
      rej("error from login");
    }
  } )
  })
}
}

