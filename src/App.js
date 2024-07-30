
import React, { useState, useEffect } from "react";
import  SearchBar from "./components/SearchBar";
import TimeAndLocation from "./components/TimeAndLocation";
import TempAndDetails from "./components/TempAndDetails";
import Forecast from "./components/Forecast";
import getFormattedWeatherData from "./services/weatherService";

const App = () => {
  const [query, setQuery] = useState({ q: "New Delhi" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  const getWeather = async () => {
    const data = await getFormattedWeatherData({ ...query, units });
    setWeather(data);
    console.log(data);
  };

  useEffect(() => {
    getWeather();
  }, [query, units]);

  return (
    <div className="mx-auto max-w-screen-lg mt-4 py-5 px-32 bg-gradient-to-br shadow-xl shadow-gray-400 from-cyan-600 to-blue-700">
      
      < SearchBar setQuery={setQuery} setUnits={setUnits} />

      {weather && (
        <>
          <TimeAndLocation weather={weather} />
          <TempAndDetails weather={weather} units={units} />
          <Forecast title="Hourly Forecast" data={weather.hourly} isHourly={true} />
          <Forecast title="Daily Forecast" data={weather.daily} isHourly={false} />
        
        </>
      )}
    </div>
  );
};

export default App;

