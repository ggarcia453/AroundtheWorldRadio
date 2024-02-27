import { React, useState } from "react";
import { Calendar } from 'primereact/calendar';
import 'primereact/resources/themes/bootstrap4-light-blue/theme.css'
import Map from '../components/Map/Map.jsx';
import Select from 'react-select';
import { TextField } from "@mui/material";
import { Container, Row } from "react-bootstrap";

const frequency_list = [
  { value: 0, label: "all bands" },
  { value: 14.074, label: "20m" },
];

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json"

function getDateQuery() {
    var query = window.location.search.substring(1).split("=");
    if (query[0] == "date") { return query[1] }
}

/**
 * Converts a Date to an int to be used to compare to the datetime from WSJT-X
 * 
 * ISO Date format: `YYYY-MM-DDTHH:MM:SS.SSSZ`  EX: `2023-11-14T08:00:00.000Z`
 * 
 * int date format: `YYMMDDHHMMSS`              EX: `231114000000`
 * @param {Date} date 
 * @returns {Number}
 */
function convertDateToString(date) {
    // 2023-11-14T08:00:00.000Z
    const iso = date.toISOString();
    return Number(iso.substring(2,4)+iso.substring(5,7)+iso.substring(8,10)+"000000");
}

function convertStringToDate(string) {
    if (string) {
        var date = "20" + string.substring(0,2) 
            + "-" + string.substring(2,4) 
            + "-" + string.substring(4,6)
            + "T08:00:00.000Z";
        return new Date(date);
    } else {
        return null
    }
}

function Home() {
  const [name, setName] = useState("");
  const [freq, setFreq] = useState(0);

  let today = new Date();
  return (
    <Container
      style={{
        justifyContent: "centre",
        alignItems: "centre",
        height: "100vh",
      }}
    >

      <Row> 
      <Calendar value={convertStringToDate(getDateQuery())} onChange={(e) => window.location.replace(`?date=${convertDateToString(e.value)/1000000}`)} showButtonBar maxDate={today} />
      </Row>

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

          <span> using FT8</span>
        </div>
        <div id='map'>
          <Map frequency={freq} callsign={name} date={convertStringToDate(getDateQuery())} />
        </div>
      </Row>

    </Container>
  );
};

export default Home;