var should=require("chai").should(),
    expect=require("chai").expect,
    assert=require("chai").assert,
    supertest=require("supertest"),
    app=require('../bin/www');

var url=supertest("http://localhost:8080");

//Testing the Get JSON API
describe("Testing the GET JSON File",function(err)
{
  it("should handle the request and read the JSON",function(done)
  {
      url
        .get("/getJSON")
        .expect(200)
        .expect('Content-type',/json/)
        .end(function(err,res)
        {
          if(err)
          {
            throw err;
          }
          var myObj=JSON.parse(res.text);
          expect('myObj').to.exist;
          //alert(myObj);
          done();
        });
  });
});


//Testing the Add API

describe("Testing the add Request",function(err)
{
  it("should handle the request and add a new object and Redirect",function(done)
  {
      url
        .post("/curdOpt/add")
        .send({"Title":"Thuppakki","Year":"2015","Actors":"Jeyam Ravi, Nayanthara, Arvind Swamy, Mugdha Godse","Director":"M. Raja","Released":"28 Aug 2015","Plot":"Revolving around a police officer who is passionate to destroy the most corrupt person in the country, Siddharth Abhimanyu","imdbRating":"8.9","Awards":"N/A","imageurl":"thanioruvan.jpg"})
        .expect(302)
        .end(function(err,res)
        {
          if(err)
          {
            throw err;
          }
        // console.log(res.text);
          done();
        });
    });

    it("Checking whether the object is added",function(done)
    {
        url
          .get("/getJSON")
          .expect(200)
          .expect('Content-type',/json/)
          .end(function(err,res)
          {
            if(err)
            {
              throw err;
            }
            var myObj=JSON.parse(res.text);
            myObj[myObj.length-1].Title.should.be.equal("Thuppakki");
            done();
          });
  });
});



//Testing the Update API

describe("Testing the add Request",function(err)
{
  it("should handle the request and update an object and Redirect",function(done)
  {
      url
        .post("/curdOpt/update")
        .send({"Title":"Thuppakki","updRating":"9.0","updAwards":"1 National Award","imageurl":"thanioruvan.jpg"})
        .expect(302)
        .end(function(err,res)
        {
          if(err)
          {
            throw err;
          }
        // console.log(res.text);
          done();
        });
    });

    it("Checking whether the object has been updated",function(done)
    {
        url
          .get("/getJSON")
          .expect(200)
          .expect('Content-type',/json/)
          .end(function(err,res)
          {
            if(err)
            {
              throw err;
            }
            var myObj=JSON.parse(res.text);

            for(var i=0;i<myObj.length;i++)
            {
              if(myObj[i].Title === "Thuppakki")
              {
                console.log(myObj[i].imdbRating);
                myObj[i].imdbRating.should.be.equal("9.0");
                myObj[i].Awards.should.be.equal("1 National Award");
                myObj[i].Poster.should.be.equal("images/thanioruvan.jpg");
              }
            }

            done();
          });
  });
});


//Testing the delete API
describe("Testing the Delete Request",function(err)
{
  it("should handle the request and delete an object and Redirect",function(done)
  {
      url
        .delete("/curdOpt/deletePage/Thuppakki")
        //.send({"Title":"Thani Oruvan","updRating":"9.0","updAwards":"1 National Award","imageurl":"thanioruvan.jpg"})
        .expect(302)
        .end(function(err,res)
        {
          if(err)
          {
            throw err;
          }
          done();
        });
    });

    it("Checking whether the movie has been deleted",function(done)
    {
        url
          .get("/getJSON")
          .expect(200)
          .expect('Content-type',/json/)
          .end(function(err,res)
          {
            if(err)
            {
              throw err;
            }
            var myObj=JSON.parse(res.text);

            for(var i=0;i<myObj.length;i++)
            {
              expect(myObj[i].Title).to.not.equal('Thuppakki');
            }

            done();
          });
  });
});
