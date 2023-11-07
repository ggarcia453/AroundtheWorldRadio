import React from "react";
import L from 'leaflet';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import monitors from "./data/monitors.json"; // sample JSON file
import RadiosList from "../RadiosList";

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
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;
/**
 * End of fix.
 */


/**
 * A Map component
 * @param {*} props 
 * @returns {HTML}
 */
function Map(props) {
  const radioJSON = { type: "FeatureCollection", features: RadiosList() };

  /**
   * On each marker, display a popup with the callsign, locator, and frequency band
   * @param {Feature<Geometry, any>} feature 
   * @param {Layer} layer 
   */
  function onEachFeaturePopup(feature, layer) {
    layer.bindPopup(
      "Callsign: " + feature.properties.callsign + "<br/>" +
      "Locator: " + feature.properties.locator + "<br/>" +
      "Receiving: " + feature.properties.frequency + "m"
    );

    /* DEPRECIATED: `name` is optional.
    if (feature.properties.name) {
      layer.bindPopup(
        "Callsign: " + feature.properties.callsign + "<br/>" +
        "Locator: " + feature.properties.locator + "<br/>" +
        "Receiving: " + feature.properties.frequency + "m<br/>" +
        "<b>Name: " + feature.properties.name + "</b>"
      );
    }
    */
  }

  /**
   * The filtering function for GeoJSON, filters by frequency band and callsign
   * @param {Feature<Geometry, any>} feature 
   * @returns {boolean} 
   */
  let filter = (feature) => {
    return (
      (props.frequency === 0 ? true : props.frequency === feature.properties.frequency) &&
      (props.callsign === "" ? true : feature.properties.callsign.startsWith(props.callsign.toUpperCase()))
      );
  }


  return (
    <div id="map">
      <MapContainer center={[33.64202831323988, -117.84444823454378]} zoom={5} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GeoJSON
          key={props.frequency + props.callsign + JSON.stringify(radioJSON)}
          data={radioJSON}
          onEachFeature={onEachFeaturePopup}
          filter={filter}
        />
      </MapContainer>
    </div>
  );
}


export default Map;