var express=require('express');
var bodyparser=require('body-parser');
var cookieParser=require('cookie-parser');
var fs=require('fs');
var path=require('path');

var router = express.Router();
var app = express();


var MongoClient=require('mongodb').MongoClient;
var url='mongodb://localhost:27017/movieDatabase';



app.use(cookieParser());

//Creating a new movie list
router.post('/add',function(request,response)
{

  console.log("in addM");
  //var reqData="";
  //var content=JSON.parse(fs.readFileSync('data/input.json'));

    //  request.on('data', function (data) {
    //    reqData+=data;
    //  });

       var obj={};

      //console.log(request.body);

      // var parseData=querystring.parse(reqData);
      // console.log(parseData);
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
    //   content.push(obj);

      //  fs.writeFile('data/input.json', JSON.stringify(content), function(err) {
      //   if(err) {
      //   console.log(err);
      //   }
      // });


      var addData=function(db,callback)
      {
          db.collection('movieCollection').insert(obj);
          callback();
      }

      MongoClient.connect(url,function(err,db)
      {
        console.log("Connected to server");
        addData(db,function()
        {
          response.redirect('/');
          db.close();
        });

      });

      //console.log("Cookies" , request.cookies);

});

//Updating the Movie Details
router.post('/update',function(request,response)
{
      console.log("in update");
      var Title,updRating,updAwards,updPoster;

      var updateData=function(db,callback)
      {
        Title=request.body.Title;
        updRating=request.body.updRating;
           updAwards=request.body.updAwards;
          updPoster="images/" + request.body.imageurl;

          db.collection('movieCollection').update({'Title':Title},{$set:{'imdbRating':  updRating,'Awards':updAwards,'Poster':updPoster}});
          callback();
      };

      MongoClient.connect(url,function(err,db)
      {
        console.log("Connected to server");

        updateData(db,function()
        {
          response.redirect('/');
          db.close();
        });
      });
});



router.post('/deletePage',function(request,response)
{
     console.log("Inside delete")
      var deleteTitle=request.body.Title;

      var deleteData=function(db,callback)
      {
        db.collection('movieCollection').remove({'Title':deleteTitle});
        callback();
      };

       MongoClient.connect(url,function(err,db)
      {
          console.log("Connected to server");
          deleteData(db,function()
          {
            response.redirect("/");
            db.close();
          });
      });

    });

    module.exports = router;
