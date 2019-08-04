//initial knowledge about require and exports 

//this is going to be the root of all operations

//now we will try to require and export another file and print in this file that contains simple calculations
//what you write in this file remains in this file 
//the fundamental Node building block is called a module which maps directly to a file
//require is used to load a module
//to export things (variables and functions ) which you want to make it public 

//there can be a lot of export inside add.js 
//so when you require the entire file will be like an object
//you can access it by dot operator
//var file1 = module.require('./add.js')
//now you called require add.js so the entire file is here now under the name of file1 
//file1.add (we exported the function 'add' -->see that file) 
//u assume that the file is here and we are calling it by its name we created when we require that file simple as that
//console.log(file1.add(10,2));
//var person = require('./Person.js');

//var person1 = new person('James', 'Bond');

//console.log(person1.fullName());

//x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x
//enough of theory lets dive into task 
//requirements:
//XMLtoMongo.js file had operations like reading file and converting to json then implementing logic then uploading to database all in one file 
//we are going to 

var config = module.require('./Configuration.js');
var file1 = module.require('./FileRead.js');
var file2 = module.require('./Logic.js');
var file3 = module.require('./UploadtoDB.js')

var fs = require('fs');
var path = require('path');

var url = "mongodb://localhost:27017/";

var files_location = path.resolve(path.join(__dirname, '../'),"Assess2","xml").toString();

fs.readdir(files_location,"utf-8", function(err,data){
    var i =1;
    for(const file of data){
    
    //console.log(i++);
        //File read and convert to json
        file1.fileops(file)
            .then(jsonfile =>{
                //json file applying logic and output is an object we need 
                var arr = config.arr;
                file2.logic(arr,jsonfile)
                    .then(totable =>{
                      //uploading the object we need to database  
                      console.log("MAIN------ "+JSON.stringify(totable));
                      file3.uploaddb(url,totable)
                        .then(z =>{
                            //displaying success message
                            console.log(z)
                       })
                    })
             })
    }
})