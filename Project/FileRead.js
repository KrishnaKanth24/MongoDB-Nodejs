//initial knowledge about require and exports 
//this file needs main.js to support full understandability

//whatever you assign to module.exports or exports, will be exposed as a module.
/*
function add(a,b){
   return a+b; 
}
//exports is an object so u can attach properties or methods to it
module.exports.add = add;

module.exports = function (firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.fullName = function () { 
        return this.firstName + ' ' + this.lastName;
    }
}
*/
//x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x
// this is going to be the first file that we are going to do operations on 

// we will read from the directory all the files and pass it to main.js program
//copying chunks of code from XMLtoMongo.js 

var fs =require('fs');
var fxp =require('fast-xml-parser');
var path =require('path');

async function fileops(file){
    return new Promise(
        resolve =>
        {
            var src = path.resolve(path.join(__dirname, '../'),"Assess2","xml",file);
            //console.log("zzzzzzzzzzzzzzzzzzzzzzzzzzzzz"+src);
     
            var rawfile =fs.readFileSync(src,"utf-8");
            var options = {
						attributeNamePrefix: "_",
						attrNodeName: false,
						textNodeName: "#text",
						ignoreAttributes: false,
						ignoreNameSpace: false,
						allowBooleanAttributes: false,
						parseNodeValue: true,
						parseAttributeValue: false,
						trimValues: true,
						cdataTagName: "__cdata",
						cdataPositionChar: "\\c",
						localeRange: ""
					   };
            var jsonfile = fxp.parse(rawfile,options);
            resolve (jsonfile);
        })
}
//all exports here
module.exports.fileops = fileops;