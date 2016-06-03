var express = require('express');

var fs=require('fs');
var path=require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var querystring=require('querystring');
var router = express.Router();
var app = express();

var MongoClient=require('mongodb').MongoClient;
var url='mongodb://localhost:27017/movieDatabase';

app.use(cookieParser());

/* GET home page. */
router.get('/', function(req, res, next) {
 res.render('index', { title: 'Express' });
//  console.log('Cookies: ', req.cookies);
});



//Reading the JSON File
router.get('/getJSON',function(req,res)
{
  console.log("inside get json");
  var content=[];

  var findData=function(db,callback)
  {

    var cursor=db.collection('movieCollection').find();
    var i=0;

    cursor.each(function(err,doc)
    {

      if(doc!=null)
      {
        content[i]=doc;
        i++;
      }
      else {
        callback();
      }
    });

  };


  MongoClient.connect(url,function(err,db)
  {
    console.log("Connected to Server");
    findData(db,function()
    {
      console.log(content);
      res.json(content);
      db.close();

    });
  });


});



//Deleting the Movie name
// router.delete('/deletePage/:x',function(request,response)
// {
//   console.log("Inside delete")
//   var reqData="";
//   reqData=request.params.x;
//
//     console.log(reqData);
//   var content=JSON.parse(fs.readFileSync('data/input.json'));
//
//   for(var i=0;i<content.length;i++){
//     if(content[i].Title==reqData)
//     {
//       content[i]="";
//       start=i;
//     }
//   }
//
//   for(var k=start+1;k<content.length;k++)
//   {
//     content[k-1]=content[k];
//   }
//   content.pop();
//
//
//   fs.writeFile('data/input.json', JSON.stringify(content), function(err) {
//    if(err) {
//    console.log(err);
//    }
//  });

//  response.redirect("/");
//
// });
//


module.exports = router;
