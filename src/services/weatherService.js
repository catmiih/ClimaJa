import axios from "axios";

const API_KEY = "1714eb9c4c804bd8a63151856251506";
const BASE_URL = "https://api.weatherapi.com/v1";

export const getForecast = async (city) => {
  const response = await axios.get(`${BASE_URL}/forecast.json`, {
    params: {
      key: API_KEY,
      q: city,
      days: 5,
      aqi: "no",
      alerts: "yes",
      lang: "pt",
    },
  });

  return {
    forecast: response.data.forecast.forecastday,
    location: response.data.location,
  };
};
