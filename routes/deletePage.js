var express=require('express');
var bodyparser=require('body-parser');
var cookieParser=require('cookie-parser');
var fs=require('fs');
var path=require('path');

var router = express.Router();
var app = express();


router.delete('/:x',function(request,response)
{
  console.log("Inside delete")
  var reqData="";
  reqData=request.params.x;

    console.log(reqData);
  var content=JSON.parse(fs.readFileSync('data/input.json'));

  for(var i=0;i<content.length;i++){
    if(content[i].Title==reqData)
    {
      content[i]="";
      start=i;
    }
  }

  for(var k=start+1;k<content.length;k++)
  {
    content[k-1]=content[k];
  }
  content.pop();


  fs.writeFile('data/input.json', JSON.stringify(content), function(err) {
   if(err) {
   console.log(err);
   }
 });

// response.sendFile(path.join(__dirname,'../views/'));
 response.redirect("../");


});

 module.exports = router;
