async function logic(arr,jsonfile){
    return new Promise(
        resolve =>
        {
            var totable ={};
            for(var temp=1;temp<3;temp++)
            {
                var x = "G"+temp;
                if(temp == 1){
                    totable["G1"]=jsonfile.UTILITYTYPE.D1[x]
                }
                else{
                    totable["G2"]=jsonfile.UTILITYTYPE.D1[x]
                }
            }
            for(var i=0;i<arr.length;i++)
            {
                var value ="V"+i;
                totable[value] = "-";
                //console.log("wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww"+value);
            }
            for(var temp = 0;temp<jsonfile.UTILITYTYPE.D2.INSTPARAM.length; temp++)
            {
                for(var y=0; y<arr.length; y++)
                {
                    if(jsonfile.UTILITYTYPE.D2.INSTPARAM[temp]._CODE == arr[y])
                    {
                        //console.log("THE CODE IS PRESENT and its value is "+jsonfile.UTILITYTYPE.D2.INSTPARAM[temp]._VALUE);
                        var value ="V"+y;
                        totable[value] = jsonfile.UTILITYTYPE.D2.INSTPARAM[temp]._VALUE;
                    }
                } 
            }
            resolve(totable)
        })
}
//exports
module.exports.logic = logic;