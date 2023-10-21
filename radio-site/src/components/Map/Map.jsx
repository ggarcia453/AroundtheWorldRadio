import React from "react";
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import monitors from "./monitors.json";
import lines from "./lines.json";

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


function Map() {

  function onEachFeaturePopup(feature, layer){
    if (feature.properties.name) {
      let s = "";
      console.log(feature.properties.callsign);
      if (feature.properties.callsign != null){
            s = s + "Callsign: " + feature.properties.callsign + "<br/>";
      }
      if (feature.properties.locator != null){
        s = s + "Locator: " + feature.properties.locator + "<br/>";
      }
      if (feature.properties.frequency != null){
        s = s + "Receiving: " + feature.properties.frequency + "m<br/>";
      }
        layer.bindPopup(
          s +
          "Name: " + feature.properties.name
          );
    }
  }

  return (
    <>
      <MapContainer center={[33.64202831323988, -117.84444823454378]} zoom={5} scrollWheelZoom={false} >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GeoJSON data={monitors} onEachFeature={onEachFeaturePopup} />
        <GeoJSON data={lines} onEachFeature={onEachFeaturePopup}/>
      </MapContainer>
    </>
  );
}

export default Map;