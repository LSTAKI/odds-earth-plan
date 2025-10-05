// Weather service integrating NASA POWER API and Open-Meteo data
// NASA POWER: https://power.larc.nasa.gov/ - Provides historical climate data from 1981+
// Open-Meteo: https://open-meteo.com/ - Provides recent historical weather archive

export interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  precipitation: number;
}

export interface NASAPowerData {
  temperature: number;
  precipitation: number;
  humidity: number;
  windSpeed: number;
  source: 'NASA_POWER';
}

export interface HistoricalData {
  year: string;
  temperature: number;
  humidity: number;
  precipitation: number;
  windSpeed: number;
}

export interface LocationCoordinates {
  lat: number;
  lon: number;
  name: string;
  country: string;
}

// Geocoding using Open-Meteo geocoding API
export const searchLocations = async (query: string): Promise<LocationCoordinates[]> => {
  if (!query || query.length < 2) return [];
  
  try {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`
    );
    const data = await response.json();
    
    if (!data.results) return [];
    
    return data.results.map((result: any) => ({
      lat: result.latitude,
      lon: result.longitude,
      name: result.name,
      country: result.country || '',
    }));
  } catch (error) {
    console.error('Error fetching locations:', error);
    return [];
  }
};

// Fetch historical weather data for a specific date
export const fetchHistoricalWeatherData = async (
  lat: number,
  lon: number,
  date: Date
): Promise<WeatherData | null> => {
  try {
    const dateStr = date.toISOString().split('T')[0];
    const response = await fetch(
      `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&start_date=${dateStr}&end_date=${dateStr}&daily=temperature_2m_max,relative_humidity_2m_max,precipitation_sum,wind_speed_10m_max&timezone=auto`
    );
    const data = await response.json();
    
    if (!data.daily) return null;
    
    return {
      temperature: data.daily.temperature_2m_max[0] || 0,
      humidity: data.daily.relative_humidity_2m_max[0] || 0,
      windSpeed: data.daily.wind_speed_10m_max[0] || 0,
      precipitation: data.daily.precipitation_sum[0] || 0,
    };
  } catch (error) {
    console.error('Error fetching historical weather data:', error);
    return null;
  }
};

// Fetch NASA POWER climate data for long-term historical analysis
export const fetchNASAPowerData = async (
  lat: number,
  lon: number,
  startYear: number,
  endYear: number
): Promise<NASAPowerData[]> => {
  try {
    const params = [
      'T2M_MAX', // Temperature at 2 Meters Maximum (°C)
      'PRECTOTCORR', // Precipitation Corrected (mm/day)
      'RH2M', // Relative Humidity at 2 Meters (%)
      'WS10M_MAX' // Wind Speed at 10 Meters Maximum (m/s)
    ].join(',');
    
    const startDate = `${startYear}0101`;
    const endDate = `${endYear}1231`;
    
    const url = `https://power.larc.nasa.gov/api/temporal/daily/point?parameters=${params}&community=RE&longitude=${lon}&latitude=${lat}&start=${startDate}&end=${endDate}&format=JSON`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (!data.properties?.parameter) return [];
    
    const params_data = data.properties.parameter;
    const dates = Object.keys(params_data.T2M_MAX || {});
    
    return dates.map(date => ({
      temperature: params_data.T2M_MAX[date] || 0,
      precipitation: params_data.PRECTOTCORR[date] || 0,
      humidity: params_data.RH2M[date] || 0,
      windSpeed: params_data.WS10M_MAX[date] || 0,
      source: 'NASA_POWER' as const
    }));
  } catch (error) {
    console.error('Error fetching NASA POWER data:', error);
    return [];
  }
};

// Fetch multi-year historical data for trends (using Open-Meteo for recent years)
export const fetchHistoricalTrends = async (
  lat: number,
  lon: number,
  date: Date
): Promise<HistoricalData[]> => {
  try {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const currentYear = new Date().getFullYear();
    const years = [];
    
    // Get data for last 6 years from Open-Meteo
    for (let i = 5; i >= 0; i--) {
      years.push(currentYear - i);
    }
    
    const startDate = `${years[0]}-${month}-${day}`;
    const endDate = `${years[years.length - 1]}-${month}-${day}`;
    
    const response = await fetch(
      `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&start_date=${startDate}&end_date=${endDate}&daily=temperature_2m_max,relative_humidity_2m_max,precipitation_sum,wind_speed_10m_max&timezone=auto`
    );
    const data = await response.json();
    
    if (!data.daily) return [];
    
    // Sample one data point per year (around the same date)
    const sampledData: HistoricalData[] = [];
    const daysInYear = 365;
    
    for (let i = 0; i < years.length; i++) {
      const index = i * daysInYear;
      if (index < data.daily.time.length) {
        sampledData.push({
          year: years[i].toString(),
          temperature: Math.round(data.daily.temperature_2m_max[index] * 9/5 + 32), // Convert to Fahrenheit
          humidity: Math.round(data.daily.relative_humidity_2m_max[index]),
          precipitation: Math.round(data.daily.precipitation_sum[index] * 10) / 10,
          windSpeed: Math.round(data.daily.wind_speed_10m_max[index] * 0.621371), // Convert to mph
        });
      }
    }
    
    return sampledData;
  } catch (error) {
    console.error('Error fetching historical trends:', error);
    return [];
  }
};

// Calculate probabilities using COMBINED NASA POWER + Open-Meteo data for maximum accuracy
export const calculateProbabilities = async (
  lat: number,
  lon: number,
  date: Date,
  conditions: string[]
): Promise<{ condition: string; probability: number }[]> => {
  try {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const currentYear = new Date().getFullYear();
    
    // Fetch NASA POWER data for extended historical period (1981-2010 for climate normals)
    const nasaDataPromise = fetchNASAPowerData(lat, lon, 1990, 2020);
    
    // Fetch recent 10 years from Open-Meteo for current trends
    const startYear = currentYear - 10;
    const startDate = `${startYear}-${month}-${day}`;
    const endDate = `${currentYear - 1}-${month}-${day}`;
    
    const openMeteoPromise = fetch(
      `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&start_date=${startDate}&end_date=${endDate}&daily=temperature_2m_max,temperature_2m_min,relative_humidity_2m_max,precipitation_sum,wind_speed_10m_max&timezone=auto`
    ).then(r => r.json());
    
    const [nasaData, data] = await Promise.all([nasaDataPromise, openMeteoPromise]);
    
    if (!data.daily || !data.daily.time) {
      return conditions.map(c => ({ condition: c, probability: 50 }));
    }
    
    // Combine NASA POWER and Open-Meteo data for comprehensive analysis
    const temps = data.daily.temperature_2m_max.map((t: number) => t * 9/5 + 32);
    const humidity = data.daily.relative_humidity_2m_max;
    const precip = data.daily.precipitation_sum;
    const windSpeed = data.daily.wind_speed_10m_max.map((w: number) => w * 0.621371);
    
    // Add NASA POWER data (convert from Celsius to Fahrenheit, m/s to mph)
    if (nasaData.length > 0) {
      const nasaTemps = nasaData.map(d => d.temperature * 9/5 + 32);
      const nasaHumidity = nasaData.map(d => d.humidity);
      const nasaPrecip = nasaData.map(d => d.precipitation);
      const nasaWindSpeed = nasaData.map(d => d.windSpeed * 2.237); // m/s to mph
      
      temps.push(...nasaTemps);
      humidity.push(...nasaHumidity);
      precip.push(...nasaPrecip);
      windSpeed.push(...nasaWindSpeed);
    }
    
    console.log(`Combined dataset: ${temps.length} data points (NASA POWER: ${nasaData.length}, Open-Meteo: ${data.daily.time.length})`);
    
    const results = conditions.map(condition => {
      let count = 0;
      const total = temps.length;
      
      switch (condition) {
        case 'very-hot':
          count = temps.filter((t: number) => t > 90).length;
          break;
        case 'very-cold':
          count = temps.filter((t: number) => t < 32).length;
          break;
        case 'very-wet':
          count = precip.filter((p: number) => p > 10).length;
          break;
        case 'very-windy':
          count = windSpeed.filter((w: number) => w > 20).length;
          break;
        case 'uncomfortable':
          count = temps.filter((t: number, i: number) => 
            (t > 85 && humidity[i] > 60) || t > 95 || t < 40
          ).length;
          break;
        case 'very-comfortable':
          // Comfortable: temp 65-78°F, humidity <65%, low precipitation, moderate wind
          count = temps.filter((t: number, i: number) => 
            t >= 65 && t <= 78 && 
            humidity[i] < 65 && 
            precip[i] < 2 && 
            windSpeed[i] < 15
          ).length;
          break;
      }
      
      const probability = total > 0 ? Math.round((count / total) * 100) : 50;
      return { condition, probability };
    });
    
    return results;
  } catch (error) {
    console.error('Error calculating probabilities:', error);
    return conditions.map(c => ({ condition: c, probability: 50 }));
  }
};

