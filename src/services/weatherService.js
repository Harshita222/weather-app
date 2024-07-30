

import { DateTime } from "luxon";

const API_KEY = "678813de961756d6eb594f200e842b6f";
const BASE_URL = "https://api.openweathermap.org/data/2.5/";

const getWeatherData = (infoType, searchParams) => {
  const url = new URL(BASE_URL + infoType);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

  return fetch(url).then((res) => res.json());
};

const iconUrlFromCode = (icon) =>
  `http://openweathermap.org/img/wn/${icon}@2x.png`;

const formatToLocalTime = (
  timestamp,  
  offset,     
  format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
) => {
  return DateTime.fromSeconds(timestamp, { zone: "utc" }).plus({ seconds: offset }).toFormat(format);
};

const formatCurrent = (data) => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
    timezone,
  } = data;

  const { main: details, icon } = weather[0];
  const formattedLocalTime = formatToLocalTime(dt, timezone);
  return {
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    country,
    sunrise: formatToLocalTime(sunrise, timezone, "hh:mm a"),
    sunset: formatToLocalTime(sunset, timezone, "hh:mm a"),
    speed,
    details,
    icon: iconUrlFromCode(icon),
    formattedLocalTime,
    dt,
    timezone,
    lat,
    lon,
  };
};

const formatForecastWeather = (data, timezone) => {
  const hourly = data.list
    .slice(0, 8)  // Next 8 hours
    .map((hour) => ({
      title: formatToLocalTime(hour.dt, timezone, "hh:mm a"),
      temp: hour.main.temp,
      icon: iconUrlFromCode(hour.weather[0].icon),
    })) || [];

  const daily = data.list
    .filter((item) => item.dt_txt.includes("12:00:00"))  
    .slice(0, 7)  
    .map((day) => ({
      title: formatToLocalTime(day.dt, timezone, "ccc"),  
      temp: day.main.temp,
      icon: iconUrlFromCode(day.weather[0].icon),
      date: formatToLocalTime(day.dt, timezone, "ccc, dd LLL yyyy"), 
    })) || [];

  return { hourly, daily };
};

const getFormattedWeatherData = async (searchParams) => {
  try {
    const formattedCurrentWeather = await getWeatherData("weather", searchParams).then(formatCurrent);
    const { dt, timezone, lat, lon } = formattedCurrentWeather;

    const forecastData = await getWeatherData("forecast", {
      lat,
      lon,
      units: searchParams.units,
    });

    const formattedForecastWeather = formatForecastWeather(forecastData, timezone);

    return { ...formattedCurrentWeather, ...formattedForecastWeather };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return {};
  }
};

export default getFormattedWeatherData;
