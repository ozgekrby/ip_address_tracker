import { useState } from "react";
import axios from "axios";

export default function Form({ data, setData }) {
  const [input, setInput] = useState("");

  const onChange = (e) => {
    setInput(e.target.value);
  };

  const includesLetters = (str) => {
    const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let letter of letters) {
      if (str.includes(letter)) {
        return true;
      }
    }
    return false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const apiKey = import.meta.env.VITE_API_KEY;
    const url = includesLetters(input)
      ? `https://geo.ipify.org/api/v2/country,city,vpn?apiKey=${apiKey}&domain=${input}`
      : `https://geo.ipify.org/api/v2/country,city,vpn?apiKey=${apiKey}&ipAddress=${input}`;

    axios
      .get(url)
      .then(function (response) {
        console.log(response.data);
        setData(response.data);
      })
      .catch(function (error) {
        console.log(error.response?.data?.messages);
      });
    setInput("");
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="ipAddress" className="head">
          Ip Address Tracker
        </label>
        <div className="input-container">
          <input
            value={input}
            type="text"
            id="ipAddress"
            name="ipAddress"
            placeholder="Search for any IP address or domain"
            onChange={onChange}
            required
          />
          <button type="submit" className="submit">
            <span className="arrow">➤</span>
          </button>
        </div>
      </form>
      {data ? (
        <section className="info-section">
          <div>
            <p>IP Address</p>
            <p>{data.ip}</p>
          </div>
          <div>
            <p>Location</p>
            <p>
              {data.location?.city}, {data.location?.country}
            </p>
          </div>
          <div>
            <p>Time Zone</p>
            <p>UTC {data.location?.timezone}</p>
          </div>
          <div>
            <p>ISP</p>
            <p>{data.isp}</p>
          </div>
        </section>
      ) : (
        <p>Beklenmeyen bir hata oluştu.</p>
      )}
    </div>
  );
}
