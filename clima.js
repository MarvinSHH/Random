async function getWeatherByLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const LAT = position.coords.latitude;
      const LON = position.coords.longitude;

      try {
        // 1. Clima
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current_weather=true&timezone=auto`
        );
        const data = await response.json();

        // 2. Ciudad (BigDataCloud, sin CORS)
        const geoResponse = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${LAT}&longitude=${LON}&localityLanguage=es`
        );
        const geoData = await geoResponse.json();

        const cityName = geoData.city || geoData.locality || "Ubicación desconocida";
        const adminArea = geoData.principalSubdivision || "";
        const country = geoData.countryName || "";

        // 3. Mostrar
        document.getElementById("city").textContent = `${cityName}, ${adminArea}, ${country}`;
        document.getElementById("temp").textContent = `${data.current_weather.temperature} °C`;
        document.getElementById("desc").textContent = `Viento: ${data.current_weather.windspeed} km/h`;

      } catch (error) {
        document.getElementById("city").textContent = "Error cargando clima";
      }
    });
  } else {
    document.getElementById("city").textContent = "Geolocalización no soportada";
  }
}

window.onload = getWeatherByLocation;
