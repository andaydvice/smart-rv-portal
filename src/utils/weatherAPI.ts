export const weatherConfig = {
  oneCallApiKey: '',
  baseUrl: 'https://api.openweathermap.org/data/3.0',
};

export const fetchWeatherData = async (lat: number, lon: number) => {
  console.log('[WeatherAPI] Fetching weather data for:', { lat, lon });
  
  if (!weatherConfig.oneCallApiKey) {
    console.error('[WeatherAPI] No API key provided');
    throw new Error('API key is required');
  }

  const response = await fetch(
    `${weatherConfig.baseUrl}/onecall?lat=${lat}&lon=${lon}&appid=${weatherConfig.oneCallApiKey}&units=metric`
  );

  if (!response.ok) {
    console.error('[WeatherAPI] Failed to fetch weather data:', response.statusText);
    throw new Error('Failed to fetch weather data');
  }

  return response.json();
};