import { useEffect} from "react";
import { useState } from "react";
import bicolLocations from "../src/bicolLocations.jsx";
function App() {

  const [weather, setWeather] = useState(null);
  const [selectedCity, setSelectedCity] = useState(bicolLocations[0]);
  
  useEffect(() => {
  fetch(
    `http://127.0.0.1:5000/api/weather?lat=${selectedCity.latitude}&lon=${selectedCity.longitude}`
  )
    .then(response => response.json())
    .then(data => {
      setWeather(data);
    });

}, [selectedCity]);

  return (
    <div>
      <h1>Weather App</h1>
      <select
  value={selectedCity.id}
  onChange={(e) => {
    const city = bicolLocations.find(
      (location) => location.id === e.target.value
    );

    setSelectedCity(city);
  }}
>
  {bicolLocations.map((city) => (
    <option key={city.id} value={city.id}>
      {city.name}, {city.province}
    </option>
  ))}
</select>
      {weather && (
        <div>
          
          <h2>{weather.temperature}°C</h2>
          <p>Humidity: {weather.humidity}%</p>
          <p>Wind: {weather.windSpeed} km/h</p>
        </div>
      )}
    </div>
  );
}

export default App;