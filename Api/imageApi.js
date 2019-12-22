var userdb = require('../Schema/imageSchema'); //import the schema


module.exports={
    create:function(data){
        return new Promise((resolve,rej)=>{
   userdb.create(data,function(err,result){
  
    userdb.find({User:data.User},function(err,result1){
        if(result1.length>0){     
        resolve(result1);}
        else{
            rej(err);
        }
        })
   
    })
  })
},
all:function(data){
    // console.log({data});
    return new Promise((resolve,rej)=>{
    userdb.find({User:data.userid},function(err,result1){
        console.log({result1})
        if(result1.length>0){   
        resolve(result1);}
        else{
            rej(err);
        }
        })
})},
ParticularImage:function(data){
    // console.log({data});
    return new Promise((resolve,rej)=>{
    userdb.find({_id:data.id},function(err,result1){
        if(result1.length>0){   
        resolve(result1);}
        else{
            rej(err);
        }
        })
})},
comment:function(data){
    return new Promise((resolve,rej)=>{
        userdb.updateOne({_id:data.id},{$push:{enterComment:data.comm}},function(err,result){
            console.log({result})
            if(result){
                resolve(result);}
                else{
                    rej(err);
                }
            
        })
    }) 
},
getData:function(){
    
    return new Promise((resolve,rej)=>{
    userdb.find({},function(err,result1){
        if(result1.length>0){     
        resolve(result1);}
        else{
            rej(err);
        }
        })
})}

}