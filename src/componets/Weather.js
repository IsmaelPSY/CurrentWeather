import axios from 'axios';
import { useEffect, useState } from 'react';

import WeatherMainInfo from './WeatherMainInfo';
import WeatherExtraInfo from './WeatherExtraInfo';

import './Weather.css'

const API_endpoint = `https://api.weatherapi.com/v1/current.json`
const API_key = `490d16b8108944d9bfd155947220204`

function showError(error) {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.")
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.")
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.")
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.")
        break;
        default:
            alert("Error")
            break;
    }
  }

const Weather = () => {

//   const [currentWeather,setCurrentWeather] = useState({})
  const [location,setLocation] = useState({})
  const [condition,setCondition] = useState({})
  const [temperatureCelcius,setTemperatureCelcius] = useState('')
  const [temperatureFarenheit,setTemperatureFarenheit] = useState('')

  const [temperature,setTemperature] = useState('')

  useEffect(()=>{
    
    if(!navigator.geolocation) alert('Geolocation is not supported by this browser.')

    navigator.geolocation.getCurrentPosition((position)=>{
  
      const latitude = position.coords.latitude
      const longitude = position.coords.longitude
     
      axios.get(`${API_endpoint}?key=${API_key}&q=${latitude},${longitude}`)
      .then(response => {
        // setCurrentWeather(response.data.current)
        setLocation(response.data.location)
        setCondition(response.data.current.condition)
        setTemperatureCelcius(`${response.data.current.temp_c}°C`)
        setTemperatureFarenheit(`${response.data.current.temp_f}°F`)
        setTemperature(`${response.data.current.temp_c}°C`)
      })
      .catch(err =>{
        console.log(err)
      })
    },showError)
  },[])
  
  
  const Temperature = () =>{
    if(temperature === temperatureCelcius) setTemperature(temperatureFarenheit)
    if(temperature === temperatureFarenheit) setTemperature(temperatureCelcius)
  }
 
  return (
    <div className='weather_container'>
        <WeatherMainInfo 
            icon = {condition.icon} 
            description = {condition.text} 
            city = {location.name} 
            country={location.country}
            temperature={temperature}
            tempFtn={Temperature}/>
        <WeatherExtraInfo/>
    </div>
  );
}

export default Weather;