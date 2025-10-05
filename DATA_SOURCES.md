# Data Sources Documentation

This application integrates multiple authoritative data sources to provide accurate weather probability analysis:

## NASA POWER API

**Official Source:** [NASA POWER (Prediction Of Worldwide Energy Resources)](https://power.larc.nasa.gov/)

### What is NASA POWER?
NASA POWER provides solar and meteorological data sets from NASA research for support of renewable energy, building energy efficiency, and agricultural needs. The data is derived from satellite observations and climate models.

### Data Used:
- **Temperature (T2M_MAX)**: Maximum temperature at 2 meters above ground (°C)
- **Precipitation (PRECTOTCORR)**: Corrected precipitation data (mm/day)
- **Relative Humidity (RH2M)**: Relative humidity at 2 meters (%)
- **Wind Speed (WS10M_MAX)**: Maximum wind speed at 10 meters (m/s)

### Coverage:
- **Temporal Range**: 1981 - 2020 (40 years of climate normals)
- **Spatial Resolution**: 0.5° x 0.625° (approximately 50km)
- **Update Frequency**: Annual updates

### API Endpoint:
```
https://power.larc.nasa.gov/api/temporal/daily/point
```

### Usage in Application:
We use NASA POWER data to:
1. Calculate long-term climate probabilities (30-year climate normals)
2. Establish baseline weather patterns for locations worldwide
3. Provide historical context for probability calculations

---

## Open-Meteo Archive API

**Official Source:** [Open-Meteo Historical Weather API](https://open-meteo.com/)

### What is Open-Meteo?
Open-Meteo is a free weather API that aggregates data from national weather services like NOAA, DWD (Germany), Météo-France, and others. It provides historical weather observations and reanalysis data.

### Data Used:
- **Maximum Temperature (temperature_2m_max)**: Daily max temperature (°C)
- **Minimum Temperature (temperature_2m_min)**: Daily min temperature (°C)
- **Relative Humidity (relative_humidity_2m_max)**: Maximum relative humidity (%)
- **Precipitation (precipitation_sum)**: Total daily precipitation (mm)
- **Wind Speed (wind_speed_10m_max)**: Maximum wind speed at 10m (km/h)

### Coverage:
- **Temporal Range**: Recent 10 years (rolling window)
- **Spatial Resolution**: High resolution (approximately 11km for ERA5 data)
- **Update Frequency**: Daily updates with ~5 day lag

### API Endpoint:
```
https://archive-api.open-meteo.com/v1/archive
```

### Usage in Application:
We use Open-Meteo data to:
1. Analyze recent weather trends (last 6-10 years)
2. Calculate current climate probabilities
3. Display time-series historical charts
4. Provide location-based weather analysis

---

## Data Integration Strategy

### Why Use Both Sources?

1. **NASA POWER**: Provides long-term climate context and stable baseline data
   - 40+ years of consistent satellite-derived observations
   - Ideal for understanding long-term climate patterns
   - Official NASA dataset suitable for competitions

2. **Open-Meteo**: Provides recent, high-resolution observations
   - Current trends and recent historical data
   - Higher spatial resolution for more accurate local analysis
   - Frequent updates with latest observations

### Combined Analysis:
The application combines both datasets to provide:
- **Robust probability calculations** using 30+ years of NASA climate data
- **Recent trend analysis** using the last 10 years from Open-Meteo
- **Comprehensive insights** that balance long-term patterns with current conditions

---

## Geocoding

**Source:** Open-Meteo Geocoding API

```
https://geocoding-api.open-meteo.com/v1/search
```

Used for converting location names to coordinates (latitude/longitude) for data queries.

---

## Data Processing

All data is processed to:
1. Convert units to user-friendly formats (Fahrenheit, mph, etc.)
2. Calculate probability metrics based on historical frequency
3. Filter data by date windows (±3 days) for seasonal analysis
4. Aggregate multi-year data for trend visualization

---

## Attribution

This application uses:
- **NASA POWER API** - Provided by NASA Langley Research Center (LaRC)
- **Open-Meteo API** - Aggregated from multiple national weather services
- **Open-Meteo Geocoding** - Location search and coordinate conversion

All data sources are free to use and do not require authentication for basic access.
