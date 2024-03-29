import React from "react";
import L from 'leaflet';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import RadiosList from "../RadiosList";
// import monitors from "./data/monitors.json"; // sample JSON file

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
 * 
 * props (to dynamically filter): 
 *  * frequency
 *  * callsign
 *  * date
 * @param {*} props 
 * @returns {HTML}
 */
function Map(props) {
  let radiosList = [];
  // create GeoJSON for each radio signal document
  for (const radio of RadiosList(props.date)) {
    radiosList.push({
      type: "Feature",
      properties: {
        date: radio.date,
        frequency: radio.frequency,
        rx_tx: radio.rx_tx,
        mode: radio.mode,
        db: radio.db,
        dt: radio.dt,
        audio_freq: radio.audio_freq,
        direction: radio.direction,
        callsign: radio.callsign,
        message: radio.message,
      },
      geometry: radio.geometry
    })
  }
  const radioJSON = { type: "FeatureCollection", features: radiosList };

  /**
   * On each marker, display a popup with the callsign, locator, and frequency band
   * @param {Feature<Geometry, any>} feature 
   * @param {Layer} layer 
   */
  function onEachFeaturePopup(feature, layer) {
    layer.bindPopup(
      "Callsign: " + feature.properties.callsign + "<br/>" +
      "Receiving: " + feature.properties.frequency + "MHz<br/>" +
      "Time: " + feature.properties.date
    );
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
      // (props.date   === null ? true : convertDate(props.date) <= feature.properties.date && feature.properties.date < convertDate(props.date)+1000000) 
  }


  // /**
  //  * Converts a Date to an int to be used to compare to the datetime from WSJT-X
  //  * 
  //  * ISO Date format: `YYYY-MM-DDTHH:MM:SS.SSSZ`  EX: `2023-11-14T08:00:00.000Z`
  //  * 
  //  * int date format: `YYMMDDHHMMSS`              EX: `231114000000`
  //  * @param {Date} date 
  //  * @returns {Number}
  //  */
  // function convertDate(date) {
  //   // 2023-11-14T08:00:00.000Z
  //   const iso = date.toISOString();
  //   return Number(iso.substring(2,4)+iso.substring(5,7)+iso.substring(8,10)+"000000");
  // }

  // console.log("Displaying " + radioJSON.features.length + " results.")


  return (
    <div id="map">
      <MapContainer center={[33.64202831323988, -117.84444823454378]} 
      zoom={5} 
      scrollWheelZoom={false} 
      minZoom={3}
      maxBounds={[
        [180, 180],
        [-180,-180]
    ]}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          continuousWorld={false}
          noWrap={true}
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