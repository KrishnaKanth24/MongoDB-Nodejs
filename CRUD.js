//install mongoDB from their website
//install mongoDB driver using npm install mongodb

var client = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
//In MongoDB, a database is not created until it gets content!
//In MongoDB, a collection is not created until it gets content!

 client.connect(url, { useNewUrlParser: true },async function(err,db){
    
    if(err) {console.log(err);}
    
    //setting the name of database
    var name = db.db("students");
    console.log("name of the database is  "+name.toString());
    //setting the name of collection
    
    var collection = name.collection("studentCollection");
    
    var many = [{name:"admin", age:21,createdhere:"yes"},
                {name:"michael",age:31,createdhere:"yes"},
                {name:"a", age:11,createdhere:"yes"},
                {name:"b",age:12,createdhere:"yes"},
                {name:"c", age:13,createdhere:"yes"},
                {name:"d",age:14,createdhere:"yes"},
                {name:"e", age:15,createdhere:"yes"},
                {name:"f",age:16,createdhere:"yes"},
                {name:"g", age:17,createdhere:"yes"},
                {name:"h",age:18,createdhere:"yes"},
                {name:"i", age:19,createdhere:"yes"},
                {name:"j",age:20,createdhere:"yes"},
                {name:"k", age:21,createdhere:"yes"},
                {name:"m",age:22,createdhere:"yes"},
                {name:"n", age:23,createdhere:"yes"},
                {name:"o",age:24,createdhere:"yes"},
               ]
    
    //await insertmany(collection, many);
    
    //await insertone(collection, {"name":"nodejs","age":30});
   
    //await updateone(collection,{"createdhere":"krishna"},{age:20});
    
    await updatemany(collection,{"age":{$gte:20, $lt:24}},{"bottle":"plastic"});
    
    //await deleteone(collection,{"age":24});
    
    //await deletemany(collection,{"modified":"yes"});
    
    
    //await deletemany(collection,{}); 
     
    //displaycollection(collection);
    
    //displayspecific(collection, {age:{$gte: 14,$lte:18}})
     
    db.close();
    
});

function insertmany(collec, arr){
    
    collec.insertMany(arr);
    console.log("many documents were inserted ");
}

function insertone(collec, arr){ 
    
    collec.insertOne(arr);
    console.log("1 document inserted");
   }

function updateone(collec, filter, options){

    collec.updateOne(filter,{$set: options})
    console.log("for the document unique key value pair-->"+filter+" the updated field is "+options);
}

function updatemany(collec, filter, options){
    collec.updateMany(filter,{$set:options});
}
function deleteone(collec, filter){
    
    collec.deleteOne(filter);
    console.log("the document is deleted under the given key value pair "+filter);
}

function deletemany(collec, filter){
    collec.deleteMany(filter);
}

function displaycollection(collec){
    
    var alldocs = collec.find();
    
    alldocs.each(function(err,item){
        if(item != null){
           var str = "name  " + item.name;
            console.log(item);
        }
    })
}
function displayspecific(collec, filter){
    var specificdocs = collec.find(filter);
    specificdocs.each(function(err, item){
        if(item !=null){
        console.log(item);}
    })
}



/*
using schemas
const mongoose  = require('mongoose');
const app = require('express');

mongoose.connect('mongodb://localhost/krishnadatabase');

let port = 1234;
app.listen(port,() =>{
    console.log("server is up and running on port number "+port);
})




//collections
//collections contains document 
//schema gonna tell us what document should be 

const schema = new mongoose.Schema({
    title: String,
    content:String
})

//model represents a collection
const sch = mongoose.model('sch',schema)

//this is asynchronous function
sch.create({
    title:"krishna",
    content:"asasasasas"
}, (err, data) =>{
    console.log(err);
    console.log(data);
})

*/