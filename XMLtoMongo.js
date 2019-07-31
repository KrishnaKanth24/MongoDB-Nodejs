//we are to take a xml files from /assess2/xml (all 4 files)
//in all 4 files we are going to check under D1 if there is G1, G2 tag and put it in database
//we are going to check if code=P1-2-1-1-0 under all d2 for the first 4 elements if it is not there put an hyphen

//requires xml files from assess2\xml folder (all 4 files) 


//logic
//convert all xml to json 
//use conditions to sort and put it in an array 
//upload the array into database using insertMany() function

var fs =require('fs');
var fxp = require('fast-xml-parser');
var path = require('path');

var client = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

var files_location = path.resolve(__dirname,"Assess2","xml").toString();
console.log("zxzxzxzxzxxzxzxzxzxzxzxzxzxzxzxzxzxzxzxzxzxzxzxzxzxzxzxzxzxzxzxzxzxzxzxzxzxzxzxzxzxzxzxzx");
console.log("The files are in : " + files_location);

fs.readdir(files_location,"utf-8", async function(err,data){
     var i=1;
    for await (const file of data){
    
        await console.log(i++);
        await fileops(file);    
    }
})

async function fileops(file){
     
    var src = path.resolve(__dirname,"Assess2","xml",file);
    console.log("zzzzzzzzzzzzzzzzzzzzzzzzzzzzz"+src);
     
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
    //hilariously super cool output 
    //console.log(JSON.stringify(jsonfile));
    
    //shows javascript objects
    // console.log(jsonfile);
    
    var totable ={};
    for(var temp=1;temp<3;temp++){
        var x = "G"+temp;
        if(temp == 1){
            totable["meterBox"]=jsonfile.UTILITYTYPE.D1[x]
        }
        else{
            totable["timestamp"]=jsonfile.UTILITYTYPE.D1[x]
        }
    }
        
    var arr =[];
    
    var firstif= 0;
        var secondif =0;
        var thridif=0;
    totable["P1-2-1-1-0"]= "-";
    totable["P1-2-2-1-0"]= "-"
    totable["P4-4-1-0-0"]= "-"
    for(var temp = 0;temp<jsonfile.UTILITYTYPE.D2.INSTPARAM.length; temp++){
    //for(var temp = 0; temp<3; temp++){
        
        //the below will create array of objects under a key ..... so value will be array of objects
        //arr.push(JSON.stringify(jsonfile.UTILITYTYPE.D2.INSTPARAM[temp]));
        //totable["code"] = arr;
        
        //this below condition gives only one value per file 
        //console.log("aaaaaaaaaaaaaaaaaaaaa "+jsonfile.UTILITYTYPE.D2.INSTPARAM[temp]._CODE.)
        if(jsonfile.UTILITYTYPE.D2.INSTPARAM[temp]._CODE == "P1-2-1-1-0"){
            firstif=1;
            console.log("THE CODE IS PRESENT and its value is "+jsonfile.UTILITYTYPE.D2.INSTPARAM[temp]._VALUE);
            totable["P1-2-1-1-0"] = jsonfile.UTILITYTYPE.D2.INSTPARAM[temp]._VALUE;
        }else if(jsonfile.UTILITYTYPE.D2.INSTPARAM[temp]._CODE == "P1-2-2-1-0"){
            secondif =1;
            totable["P1-2-2-1-0"] = jsonfile.UTILITYTYPE.D2.INSTPARAM[temp]._VALUE;   
        }else if(jsonfile.UTILITYTYPE.D2.INSTPARAM[temp]._CODE == "P4-4-1-0-0"){   
            thirdif=1;
            totable["P4-4-1-0-0"] = jsonfile.UTILITYTYPE.D2.INSTPARAM[temp]._VALUE;
        }
    
        //find(jsonfile,"P1-2-1-1-0");
    
    }
    //if(firstif == 0){totable["P1-2-1-1-0"]= "-";}
      //  else if(secondif == 0){totable["P1-2-2-1-0"]= "-"}
    //    else if(thridif == 0){totable["P4-2-3-1-0"]= "-"};
     
   console.log(totable)
    
    //now comes the database operation
    await uploaddb(totable);
    
    /*
    fs.readFile(src, "utf-8", function(err, data){
            if(!err & fxp.validate( data) ){
               
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
                var jsonfile =  fxp.parse(data, options);
                console.log(file + "   "+ jsonfile);
                }
                })
    */
}
function find(x){
    
}
function uploaddb(totable){
    console.log(JSON.stringify(totable));
    client.connect(url,{useNewUrlParser: true},function(err,db){
        var name = db.db("xmltomongo");
    console.log("name of the database is  "+name.toString());
    //setting the name of collection
    
    var collec = name.collection("xmlfiles");
        collec.insertOne(totable);
    console.log("1 document inserted");
        db.close();
    })
    
}