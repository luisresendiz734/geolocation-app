import React, { useEffect, useState } from "react";
import "./App.css";
import useGeolocation from "react-hook-geolocation";
import ButtonAppBar from "./ButtonAppBar";

function App() {
  const geolocation = useGeolocation();
  const [data, setData] = useState(null);

  useEffect(() => {
    const getInfo = async () => {
      if (!geolocation.latitude || !geolocation.longitude) {
        return;
      }

      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${geolocation.latitude}&lon=${geolocation.longitude}&appid=868283d9b369d17bb897902827561654&lang=es&units=metric`
        );
        const obj = await res.json();
        setData(obj);
      } catch (error) {}
    };

    getInfo();
  }, [geolocation.latitude, geolocation.longitude]);

  return (
    <>
      <ButtonAppBar />
      <ul>
        <li>Latitude: {geolocation?.latitude}</li>
        <li>Longitude: {geolocation?.longitude}</li>
      </ul>

      {data && (
        <ul>
          <li>Ciudad: {`${data.name}, ${data.sys.country}`}</li>
          <br />
          <li>Estado del cielo: {`${data.weather[0].main}`}</li>
          <li>Descripcion: {`${data.weather[0].description}`}</li>
          <br />
          <li>Temperatura: {`${data.main.temp}`} C</li>
          <li>Presion: {`${data.main.pressure}`}</li>
          <li>Humedad: {`${data.main.humidity}`}</li>
          <br />
          <li>Velocidad de viento: {`${data.wind.speed}`} km/h</li>
          <li>Grados de viento: {`${data.wind.deg}`} deg</li>
          <li>Nubes: {`${data.clouds.all}`}</li>
        </ul>
      )}
    </>
  );
}

export default App;
