import "./App.css";
import React, { useState } from 'react'
import Form from "./components/Form";
import Map from "./components/Map";
export default function App() {
  const [data, setData] = useState(null);
  return (
    <div>
      <Form data={data} setData={setData}/>
      {data&&<Map lat={data.location?.lat}
            lng={data.location?.lng}
            city={data.location?.city}
            country={data.location?.country}
            isp={data.isp}/>}
      
    </div>
  )
}

