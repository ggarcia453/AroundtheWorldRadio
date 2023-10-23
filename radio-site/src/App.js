//import logo from './logo.svg';
import './App.css';
import React from "react";
import "./App.css";
import Navbar from "./components/NavBar/navbarElements";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import AboutUs from './pages/AboutUs';
import Home from './pages/Home';
// import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import Map from './components/Map/Map.jsx';
import { Dropdown, DropdownItem } from 'react-bootstrap';
import Select from 'react-select'

const frequency_list = [
  {value:80, label:"80hz"},
  {value:70, label:"70hz"},
  {value: 60, label:"60hz"}
];

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json"

function App() {
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
              defaultValue={"Frequencies"}
              options={frequency_list}
            />
            <span>, show signals recieved by </span>

            <span style={{color: 'green'}}>[ call sign search ]</span>

            <span> using FT8</span>
        </div>
        <div className='map-container'>
          <Map/>
        </div>
      </body>
    </div>
    
    
    </>
  );
}




export default App;
