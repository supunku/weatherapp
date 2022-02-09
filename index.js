const express = require('express');
const path = require('path');
const hbs = require('hbs');

const geocode = require('./utilits/geocode.js');
const forecast = require('./utilits/weather.js');
const weather = require('./utilits/weather.js');



const app = express();

var port = process.env.PORT;

if(port=== undefined){
    port = 3000;
}




var publicPathDirectory = path.join(__dirname,"./Public");
var pagesDirectory = path.join(__dirname,"./Pages")
var partialDirectory = path.join(__dirname,"./Pages/Partial")
app.use(express.static(publicPathDirectory));



app.set("view engine","hbs" );
app.set("views",pagesDirectory);

hbs.registerPartials(partialDirectory);

app.get("",(request,response)=>{
    response.render("index",{
        title:"Weather app",
        description:"This decribe about home page",
        author:"Supun",
    });
});

app.get("/help",(request,response)=>{
    response.render("help",{
        title:"Help for you",
        author:"Supun",
        description:"This decribe help"
    })
})

app.get("/about",(request,response)=>{
    response.render("about",{
        title:"This is the about page",
        description:"This decribe about us",
        author:"Supun",
    })
})

app.get("/weather",(request,response)=>{
  if(!request.query.address){
      return response.send({
          error:"Please provide the address"
      });
  }

  geocode(request.query.address,(error,geodata)=>{
      if(error){
        return response.send({
            error:error
        });
      }
      forecast(geodata.latitude,geodata.longitude,(error,weather)=>{
        if(error){
            return response.send({
                error:error
            });

        }
        response.send({
            location:geodata.location,
            forecast:weather
        })
      })
  })

  
})

app.get("*",(request,response)=>{
    response.render("404",{
        title:"404 : Page note found",
        error: "No such file or directory found"
    })
})

app.listen(port,()=>{
    console.log("Sever is started on port 3000")
});