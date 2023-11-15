//import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";
import "./App.css";
import { TextField } from "@mui/material";
// import Navbar from "./components/NavBar/navbarElements";
// import {
//     BrowserRouter as Router,
//     Routes,
//     Route,
// } from "react-router-dom";
// import AboutUs from './pages/AboutUs';
// import Home from './pages/Home';
import Map from './components/Map/Map.jsx';
// import { Dropdown, DropdownItem } from 'react-bootstrap';
import Select from 'react-select'
import Calendary from './components/Calendar/Calendar.jsx';

const frequency_list = [
  {value:0, label:"all bands"},
  {value:14.074, label:"20m (14.074 MHz)"},
  {value:40, label:"40m"}
];

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json"

function App() {
  const [name, setName] = useState("");
  const [freq, setFreq] = useState(0);

  // function setUserChoice(choice) {
  //   freq = choice;
  //   console.log(freq + "m selected");
  // }

  return (
    <>
    {/*<Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<AboutUs />} />
                </Routes>
                </Router>*/ }
                
    <div className="App">
      <header className="App-header">
        <p>
          Welcome to the Around the World Radio Project website.
        </p>
        <a
          className="App-link"
          href="https://pskreporter.info/pskmap.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          Psk reporter - original project for reference
        </a>
        <p>
        This website has been created by Antoine Nguyen, Isabel Ruiz, and Gabriel Garcia as a part of their Senior Design Project. This project was advised
        by Prof. Burke of UCI's Electrical Engineering and Computer Science Department. For more information about this project,
        please follow 
        <a  className="App-link"
          href="https://sites.uci.edu/eecscapstone/2023/05/04/around-the-world-radio/"
          target="_blank"
          rel="noopener noreferrer"> this link. </a>
         This project has been made in collaboration with the Amateur Radio Association at UCI. 
      </p>
      <p>
        Below is our current map.
      </p>
      </header>
      <body>
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
              onChange={(e) =>{
                setName(e.target.value);
              }}/>

            <span> using FT8 on </span>
            <Calendary/>
        </div>
        <div id='map'>
          <Map frequency={freq} callsign={name} date = {Calendary.value}/>
        </div>
      </body>
    </div>
    
    
    </>
  );
}




export default App;
