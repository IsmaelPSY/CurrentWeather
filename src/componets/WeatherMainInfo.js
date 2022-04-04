import './WeatherMainInfo.css'

const WeatherMainInfo = ({icon,description,country,city,temperature,tempFtn}) => {
    return(
        <div className='weatherMainInfo'>
            <h4>{country}</h4>
            <h5>{city}</h5>
            <img className="icon" src={icon} alt="norefer"/>
            <button onClick={tempFtn}><h1>{temperature}</h1></button>
            <h1>{description}</h1>
        </div>
    )
}

export default WeatherMainInfo;