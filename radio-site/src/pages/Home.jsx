import { React, useState } from "react";
import { Calendar } from 'primereact/calendar';
import 'primereact/resources/themes/bootstrap4-light-blue/theme.css'
import Map from '../components/Map/Map.jsx';
import Select from 'react-select';
import { TextField } from "@mui/material";
import { Container, Row } from "react-bootstrap";

const frequency_list = [
  { value: 0, label: "all bands" },
  { value: 60, label: "60m" },
  { value: 40, label: "40m" }
];

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json"

function Home() {
  const [name, setName] = useState("");
  const [freq, setFreq] = useState(0);

  const [date, setDate] = useState(null);
  let today = new Date();
  return (
    <Container
      style={{
        justifyContent: "centre",
        alignItems: "centre",
        height: "100vh",
      }}
    >


      <Row className="">
        <br/>
        <div className='menu-container'>
          <span>On </span>
          <Select
            className='dropdown'
            defaultValue={frequency_list[0]}
            options={frequency_list}
            onChange={(choice) => setFreq(choice.value)}
          />
          <span>, show signals recieved from </span>

          <TextField
            value={name}
            className='text_box'
            label="Callsign"
            onChange={(e) => {
              setName(e.target.value);
            }} />

          <span> using FT8 on </span>
          <Calendar value={date} onChange={(e) => setDate(e.value)} showButtonBar maxDate={today} />
        </div>
        <div id='map'>
          <Map frequency={freq} callsign={name} date={date} />
        </div>
      </Row>

    </Container>
  );
};

export default Home;