var userdb = require('../Schema/imageSchema'); //import the schema


module.exports={
  create:function(data){
        return new Promise((resolve,rej)=>{
   userdb.create(data).then((result)=>{
       resolve(result).catch(err=>{
           rej(err);
       })
   })
  })
},
 findData :function(filter, fields, options){
   return new Promise ((resolve, rej)=>{
       userdb
       .find(filter, fields)
       .sort(options.sort)
       .skip(options.skip)
       .limit(options.limit)
       .then(result=>{
        //    console.log({result})
           resolve(result);
       }).catch(err=>{
        //    console.log({err})
           rej(err);
       })
   })
 },

comment:function(data){
    return new Promise((resolve,rej)=>{
        userdb.updateOne({_id:data.id},{$push:{enterComment:data.comm}}).then(result =>{
            resolve(result);
        }).catch(err=>{
            rej(err);
        })
    }) 
},

}