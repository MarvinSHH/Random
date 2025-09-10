const LAT = 19.4326;  // Latitud de CDMX
const LON = -99.1332; // Longitud de CDMX

async function getWeather() {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current_weather=true&timezone=auto`
    );
    const data = await response.json();
    console.log(data);

    document.getElementById("city").textContent = "Ciudad de México";
    document.getElementById("temp").textContent = `${data.current_weather.temperature} °C`;
    document.getElementById("desc").textContent = `Viento: ${data.current_weather.windspeed} km/h`;
  } catch (error) {
    document.getElementById("city").textContent = "Error cargando clima";
  }
}

window.onload = getWeather;
