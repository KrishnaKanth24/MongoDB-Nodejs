var client = require('mongodb').MongoClient;

async function uploaddb(url,totable){
    return new Promise(
        resolve =>
        {
            //console.log(JSON.stringify(totable));
            client.connect(url,{useNewUrlParser: true},function(err,db){
            
                
                var name = db.db("xmltomongo");
                //console.log("name of the database is  "+name.toString());
                //setting the name of collection
    
                var collec = name.collection("xmlfiles");
                collec.insertOne(totable);
                //console.log("1 document inserted");
                db.close();
            })
            resolve("SUCCESSSS");
        })
}
//exports
module.exports.uploaddb = uploaddb;