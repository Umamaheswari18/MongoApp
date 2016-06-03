var express=require('express');
var bodyparser=require('body-parser');
var cookieParser=require('cookie-parser');
var fs=require('fs');
var path=require('path');

var router = express.Router();
var app = express();

app.use(cookieParser());

//Creating a new movie list
router.post('/',function(request,response)
{

  console.log("in addM");
  //var reqData="";
  var content=JSON.parse(fs.readFileSync('data/input.json'));
    //  request.on('data', function (data) {
    //    reqData+=data;
    //  });

       var obj={};

       //var parseData=querystring.parse(reqData);

       obj.Title=request.body.Title;
       obj.Year=request.body.Year;
       obj.Actors=request.body.Actors;
       obj.Director=request.body.Director;
       obj.Released=request.body.Released;
       obj.Plot=request.body.Plot;
       obj.imdbRating=request.body.Rating;
       obj.Awards=request.body.Awards;
       obj.Poster="images/" + request.body.imageurl;

       //Pushing the object to content Array
       content.push(obj);

       fs.writeFile('data/input.json', JSON.stringify(content), function(err) {
        if(err) {
        console.log(err);
        }
      });

      response.redirect('index',function(err,content)
    {
      response.send(content);
    })

      //response.sendFile(path.join(__dirname,'../views/'));
      //  response.redirect('/');
      console.log("Cookies" , request.cookies);

});


module.exports = router;
