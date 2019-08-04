
//today's task we are going to 
//read folder containing .txt and other extensions files
//we are going to filter out files other than .txt files and those files whose size is greater than 0KB
//after the filtration process is over 
//each txt files contains values but file ends with *
//each row starts with START and ends with END
//.txt file contains only value respective key can be found in config.json file 
//we are going to take key from json file and value from .txt and upload it to database
//and after we are done with a .txt file we are going to move it to another folder name 082019 (month and year)
//and inside that folder we are going to move the file 

var fs = require('fs');
var path = require('path');
//var re = new RegExp(/(\w+)/);
var client =require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";

//(?<=START)(\w+)(?=END)

//var file = path.resolve(__dirname,'../',"sample","try.txt");
//console.log(file);
/*
fs.readFile(file,"utf-8", function(err,data){
	console.log("entered");
	var res ={};
	 var res = re.exec(data);
	//str.push(temp);
	console.log(res);
	console.log(data);	


})
*/

var files_location = path.resolve(__dirname,'../',"sample");
fs.readdir(files_location,"utf-8",function(err,data){
	if(err){
		console.log("error in reading files from directory");
	}
	else{
		//now we are going to check for extension and size of file
		for (file of data){
			//taking the extension of file
			var ext = path.extname(file);
			//taking the size of file
			var stats = fs.statSync(path.resolve(files_location,file));
			if(ext ==".txt" &&stats.size >0 ){
				//all filters applied
				 
				filtersapplied(file);
			}	
			else{
				//we have to send(cut and paste) those files to another folder
			}
		}

	}
})
function filtersapplied(file){
	
	const config = fs.readFileSync("./rawDataTxtConfig.json","utf-8")
	const configjson =JSON.parse(config);
	//console.log(config);
	
	fs.readFile(path.resolve(files_location,file),"utf-8",function(err, data){
		//console.log(data);
		var totable ={};
		//var temp = [];
		var arr = "";
		arr = data.split("\r\n");
		console.log("the number of start and end(i.e)row is "+arr.length);
		console.log("the number of keys in json file is "+configjson.txtArrayIndexOrder.length);
		for(var x=0; x<=arr.length-2;x++){
			 arr1 =arr[x].toString().split(',');
			 console.log(arr1.length);
			 //totable[x]=[];
			for(y=1;y<configjson.txtArrayIndexOrder.length-1;y++){
			
			 //console.log(arr1);
			totable[configjson.txtArrayIndexOrder[y]] = arr1[y]; 
			uploadtodb(totable);	
		}}
		console.log(totable);
	})
}
function uploadtodb(totable){
	client.connect(url, function(err, db) { 
		var name = db.db("txttomongo");
		var collec = name.collection("list");
		collec.insertOne(totable,function(err,data){
			console.log("1 document inserted");
		});
		
		db.close();
})}


