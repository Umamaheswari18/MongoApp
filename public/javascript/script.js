
    var myObj;

    //AJAX call to read the URL
    $.ajax({
            url: '/getJSON',
            success: function(result){
                            console.log(result);
                            myObj=result;


    create(myObj[0]);
    var i=0;

    function create(myObj)
    {
          $('li#name').empty().append("<h1>"+ myObj.Title + "</h1>");
          $('li#year').empty().append("Year:" + myObj.Year);
          $('li#actors').empty().append("Actors:" + myObj.Actors);
          $('li#director').empty().append("Director:" +myObj.Director);
          $('li#plot').empty().append("Plot:" +myObj.Plot);
          $('li#release').empty().append("<span class='glyphicon glyphicon-calendar'> </span>" +myObj.Released);
          $('li#rating').empty().append("&nbsp; | Rating: <span class='stars'></span>");
          $('li#awards').empty().append("&nbsp; |  &nbsp; Awards &amp; Nominations:" + myObj.Awards);
          $('#movieImage').attr('src',myObj.Poster);

          stars(myObj.imdbRating);

    }

    $('#updateButton').on('click',function()
    {
        $('#updateTitle').val($('li#name').text());
    });


    $('#deleteButton').on('click',function()
    {
        $('#deleteTitle').val($('li#name').text());
    });



    // $('#deleteButton').on('click',function()
    // {
    //     var deleteTitle=$('li#name').text();
    //     var deleteConfirm=confirm("Are you sure you want to delete?")
    //
    //     if(deleteConfirm==true)
    //     {
    //       $.ajax(
    //         {
    //           method:'post',
    //           url:'curdOpt/deletePage/' + deleteTitle,
    //
    //           success: function(result)
    //           {
    //             console.log(result);
    //
    //           }
    //         });
    //       }
    //
    // });

    // $('#updateSubmit').on('click',function()
    // {
    //
    //   var updateTitle=$('#updateTitle').val();
    //     var updateRating=$('#updateRating').val();
    //         var updateAwards=$('#updateAwards').val();
    //           var updateImage=$('#updateImage').val();
    //           console.log(updateImage);
    //   $.ajax({
    //       method:'put',
    //       url: 'updatePage/' + updateTitle  +'&'+ updateRating +'&'+ updateAwards + '&'+ updateImage ,
    //       success: function(result)
    //       {
    //         console.log(result);
    //       }
    //   });
    //
    // });

    $('button#next').on('click',function()
    {
        i=i+1;
        if(i== myObj.length)
        {
          i=0;
            create(myObj[i]);
          //$('div#main').empty().append('End of movies.. Go to Previous');
        //  $('li').append("<button class='btn btn-default' id='last'> Previous </button>");

        }
        else {
            create(myObj[i]);
        }
    });


    $('button#prev').on('click',function()
    {
      i=i-1;

      if(i<0)
      {
          //$('div#main').empty().append('Starting..');
          i=myObj.length-1;
          create(myObj[i]);
          //$('li').append("<button class='btn btn-default' id='next'> Next </button>");
      }
      else {

            create(myObj[i]);
      }

    });

    $('button#read').on('click',function()
    {

        i=0;
        create(myObj[i]);
    });


function validate()
  {

     if( document.updForm.updPlot.value == "" )
     {
        alert( "Please provide Description!" );
        document.updForm.updPlot.focus() ;
        return false;
     }

     if( document.updForm.updAwards.value == "" )
     {
        alert( "Please provide the Awards!" );
        document.updForm.updAwards.focus() ;
        return false;
     }

     if( document.updForm.updRating.value == "" ||
     isNaN( document.updForm.updRating.value ) ||
     document.updForm.updRating.value.length > 10 )
     {
        alert( "Please provide a Rating out of 10" );
        document.updForm.updRating.focus() ;
        return false;
     }

     if( document.updForm.imageurl.value == "" )
     {
        alert( "Please upload the image!" );
        return false;
     }
     return( true );
  }




  function validate2()
  {
    console.log("Inside validate2");

     if( document.addForm.Title.value == "" )
     {
        alert( "Please provide Title!" );
        document.addForm.Title.focus() ;
        return false;
     }

     if( document.addForm.Year.value == "" )
     {
        alert( "Please provide Year!" );
        document.addForm.Year.focus() ;
        return false;
     }
     if( document.addForm.Actors.value == "" )
     {
        alert( "Please provide Actors!" );
        document.addForm.Actors.focus() ;
        return false;
     }


     if( document.addForm.Director.value == "" )
     {
        alert( "Please provide Director!" );
        document.addForm.Director.focus() ;
        return false;
     }

     if( document.addForm.Released.value == "" )
     {
        alert( "Please provide Released Date" );
        document.addForm.Released.focus() ;
        return false;
     }

     if( document.addForm.Plot.value == "" )
     {
        alert( "Please provide Description" );
        document.addForm.Plot.focus() ;
        return false;
     }

     if( document.addForm.Rating.value == "" ||
     isNaN( document.addForm.Rating.value ) ||
     document.addForm.Rating.value > 10 )
     {
        alert( "Please provide Rating" );
        document.addForm.Rating.focus() ;
        return false;
     }

     if( document.addForm.Awards.value == "" )
     {
        alert( "Please provide Awards & Nominations" );
        document.addForm.Awards.focus() ;
        return false;
     }

     if( document.addForm.imageurl.value == "" )
     {
        alert( "Please upload the image!" );
        return false;
     }
     return true ;
  }





  function stars(rating)
  {
        // Get the value
      var val = parseFloat(rating);
      //  console.log(val);

        var size = val * 16;
      //  console.log(size);
        // Create stars holder
        var $span = $('<span />').width(size);
        // Replace the numerical value with stars
        $("span.stars").html($span);
    }


}
});
