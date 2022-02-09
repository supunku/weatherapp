const request = require('postman-request');


const weather = (latitude,longitude,callback)=>{

    const weatherUrl = "http://api.weatherstack.com/current?access_key=8b97d4975ba4dd906467eebd385d0089&query="+latitude+","+longitude;

    request({url:weatherUrl,json:true},(error,response)=>{
        if (error){
              callback("Unable to connect to location service",undefined);
        }else if (response.body.error){
           callback("Unable to find the weather location",undefined) 
        }else{
            const currentWeather =  "It feels like currently "+response.body.current.temperature;
            
            callback(undefined,currentWeather)
        }
    })

}

module.exports= weather;