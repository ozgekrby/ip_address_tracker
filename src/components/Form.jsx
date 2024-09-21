import { useState } from "react";
import axios from "axios";

export default function Form({data, setData}) {
    const [ipAddress, setIpAddress] = useState("");
    
  
    const onChange = (e) => {
      setIpAddress(e.target.value);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const apiKey = import.meta.env.VITE_API_KEY;
      axios
        .get(
          `https://geo.ipify.org/api/v2/country,city,vpn?apiKey=${apiKey}&ipAddress=${ipAddress}`
        )
        .then(function (response) {
          console.log(response.data);
          setData(response.data);
        })
        .catch(function (error) {
          console.log(error.response?.data?.messages || "Error occurred");
        });
        setIpAddress("");
    };
  
    return (
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <label htmlFor="ipAddress">Ip Address Tracker</label>
          <div className="input-container">
            <input
            value={ipAddress}
              type="text"
              id="ipAddress"
              name="ipAddress"
              placeholder="0.0.0.0"
              pattern="\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b"
              onChange={onChange}
              required
            />
            <button type="submit">
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
              <p>{data.location?.city}, {data.location?.country}</p>
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
          <p>Lütfen IP adresinizi giriniz.</p> 
        )}
      </div>
    );
}
