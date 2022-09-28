import React from "react";
import "./PollutionPage.css";
import { useState } from "react";
import PolluteBar from "../PolluteBar";
import { WEATHER_API_KEY, WEATHER_API_URL } from "./api";

function PollutionPage(props) {
  const [query, setQuery] = useState("");
  const [pollution, setPollution] = useState({});

  function handleChange(e) {
    setQuery(e.target.value);
  }

  function handleClick(e) {
    e.preventDefault();
    fetchWeather();
  }

  const fetchWeather = async (e) => {
    const res = await fetch(
      `${WEATHER_API_URL}weather?q=${query}&units=metric&APPID=${WEATHER_API_KEY}`
    );
    console.log(res)
    if (res.status === 200) {
      const data = await res.json();
    const lat = data.coord.lat;
    const lon = data.coord.lon;
    const res2 = await fetch(
      `${WEATHER_API_URL}air_pollution?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`
    );
    const data2 = await res2.json();
    setPollution(data2);
    } else {
      alert(`${query} is not a proper entry`)
    }
    
  };

  return (
    <>
      <div
        className={
          typeof pollution.list != "undefined"
            ? pollution.list[0].components.o3 > 180
              ? "pollute poor"
              : pollution.list[0].components.o3 > 120
              ? "pollute moderate"
              : pollution.list[0].components.o3 > 60
              ? "pollute fair"
              : pollution.list[0].components.o3 > 1
              ? "pollute good"
              : "pollute"
            : "pollute"
        }
      >
        <div className="input-form ">
          <form className="polluteform">
            <input
              className="searchfield"
              type="text"
              placeholder="City Name"
              onChange={handleChange}
              value={query}
            />
            <button className="pollute_button" onClick={handleClick}>
              Submit results
            </button>
          </form>
          <div className="details_pollute">
            {Object.keys(pollution).length !== 0 && (
              <>
                <div className="bar1">
                  <PolluteBar
                    index={"CO"}
                    value={pollution.list[0].components.co}
                  />
                  <div className="centerdata">
                    <h1>{query}</h1>
                    <h2>
                      {typeof pollution.list != "undefined"
                        ? pollution.list[0].components.o3 > 180
                          ? "Poor"
                          : pollution.list[0].components.o3 > 120
                          ? "Moderate"
                          : pollution.list[0].components.o3 > 60
                          ? "Fair"
                          : "Good"
                        : ""}
                    </h2>
                  </div>

                  <PolluteBar
                    index={"NO2"}
                    value={pollution.list[0].components.no2}
                  />
                </div>
                <div className="bar2">
                <PolluteBar
                    index={"O3"}
                    value={pollution.list[0].components.o3}
                  />
                  <PolluteBar
                    index={"PM10"}
                    value={pollution.list[0].components.pm10}
                  />
                  <PolluteBar
                    index={"PM25"}
                    value={pollution.list[0].components.pm2_5}
                  />
                  <PolluteBar
                    index={"NH3"}
                    value={pollution.list[0].components.nh3}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default PollutionPage;
