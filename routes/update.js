var express=require('express');
var bodyparser=require('body-parser');
var cookieParser=require('cookie-parser');
var fs=require('fs');
var path=require('path');

var router = express.Router();
var app = express();

app.use(cookieParser());


//Updating the Movie Details
router.post('/',function(request,response)
{
  console.log("in update");
//  console.log(request.body);
  // var reqData="";
  var content=JSON.parse(fs.readFileSync('data/input.json'));

      //var  obj={};

       //var parseData=querystring.parse(reqData);

       console.log(request.body.Title );

       for(var k=0;k<content.length;k++)
       {
         if(request.body.Title == content[k].Title)
         {
           console.log("Inside if loop")
           content[k].imdbRating=request.body.updRating;
           content[k].Awards=request.body.updAwards;
           content[k].Poster="images/" + request.body.imageurl;
         }
       }

       fs.writeFile('data/input.json', JSON.stringify(content), function(err) {
        if(err) {
        console.log(err);
        }
      });

  //   response.sendFile(path.join(__dirname,'../views/'));
    response.redirect('/');

});


module.exports = router;
