const request = require('postman-request');


const geocode =(location,callback)=>{
    const geoCodeUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+location +".json?access_token=pk.eyJ1Ijoic3ByYWJhc2FyYSIsImEiOiJja3o1bnF5OWowczB6MnVueGVrcm9tN2xhIn0.RLmTTCTfKSq0LaqCiKmELA&limit=1";

    request({url:geoCodeUrl,json:true},(error,response)=>{
    if (error){
        var errorMsg="Unable to connect to location service";
        callback(errorMsg,undefined);
    }else if(response.body.features.length===0){
        callback("Unable to find the location. Please try again",undefined)

    }else{

        const coordinates = {
            latitude: response.body.features[0].center[1],
            longitude:  response.body.features[0].center[0],
            location: response.body.features[0].place_name
        }
        callback(undefined,coordinates)
    }
    
})
}



module.exports = geocode;