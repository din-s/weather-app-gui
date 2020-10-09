const axios = require('axios')
require('dotenv').config()

//credentials
const key = process.env.API_KEY


//function to getWeather for given location

const getWeather=(location)=>{
  const url = `http://api.weatherapi.com/v1/current.json?key=${key}&q=${location}`
  //using axios
  return axios.get(url)
    .then((response)=>{
      const res = response.data
      const { location:locationInfo, current:currentInfo} = res
      return { locationInfo ,
       currentInfo 
      }
    }).then(({locationInfo,currentInfo})=>{
      // console.log(locationInfo.country,locationInfo.name)
      return {
        city: locationInfo.name,
        country : locationInfo.country,
        current : currentInfo
      }
    }).catch((e)=>{
      return {
        error:'Error : Couldn\'t fetch weather data!'
      }
    })
  
    
    
}

module.exports={
  getWeather
}