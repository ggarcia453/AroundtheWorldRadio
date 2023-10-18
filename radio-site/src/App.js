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
import L from 'leaflet';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css"

/**
 * Fixing react-leaflet's marker icon. 
 * Reference: https://stackoverflow.com/questions/49441600/react-leaflet-marker-files-not-found
 */
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
	iconRetinaUrl: iconRetina,
	iconSize:    [25, 41],
	iconAnchor:  [12, 41],
	popupAnchor: [1, -34],
	tooltipAnchor: [16, -28],
	shadowSize:  [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;
/**
 * End of fix.
 */

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
        <MapContainer center={[33.64202831323988, -117.84444823454378]} zoom={5} scrollWheelZoom={false} >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[33.64202831323988, -117.84444823454378]}>
            <Popup>
              MSTB @ UCI
            </Popup>
          </Marker>
        </MapContainer>
      </body>
    </div>
    
    
    </>
  );
}



export default App;
