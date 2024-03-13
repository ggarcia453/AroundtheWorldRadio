# AROUND THE WORLD MANUAL

https://ggarcia453.github.io/AroundtheWorldRadio/

## Description
Around the World Radio logs signals from amateur radios detected from our handheld SDR and displays these signals onto a website (see https://pskreporter.info).

Around the World Radio is a Senior Design Project created by Isabel Ruiz, Antoine Nguyen, and Gabriel Garcia, and advised by [Professor Peter Burke](https://www.burkelab.com/) from UCI's Electrical Engineering and Computer Science department ([Capstone Site](https://sites.uci.edu/eecscapstone/2023/05/04/around-the-world-radio/)). 

## COMPONENTS USED
Here is a list of our hardware and software components.

### Hardware:
1. Raspberry Pi 4 Model B
2. RTL-SDR Dongle Model: V3
3. Antenna

### Software:
1. MERN stack
   1. MongoDB Atlas + Realms
   2. ExpressJS
   3. ReactJS
   4. NodeJS
2. Python 3.11.7
   - Prior to use please use `pip install -r requirements.txt`
3. Bash 

### Antenna
For an antenna, there are different approaches you can undertake. These are the two we used.
1. Purchasing Telescopic Antenna. 
2. Building a dipole antenna with electrical wire and a dongle 

Our current dipole antenna is 28 ft on each side. This allows us to receive FT8 signals on the 20m band. We also plan on creating a dipole antenna that is 32 ft on each side to receive FT8 signals on the 40m band. More details about the Antenna Building process are described in the Antenna Building Section. 

## ANTENNA BUILDING
This section is dedicated to how to build a dipole antenna. 
To build our antenna we used an SMA connector soldered to our two lengths of wire. We used a NanoVNA to hone in on the frequencies we were receiving from our antenna. After verifying we could receive the 20m band, we then connected the SMA side of our connector to our RTL-SDR dongle which then connects to our Raspberry pi which helps us demodulate and decode signals received. This is described in more detail in the Raspberry Pi Setup section.

## MONGODB CONFIGURATION
This section describes how we set up our database. 

### 1. Set up the MERN Stack

We followed a [YouTube tutorial](https://youtu.be/mrHNSanmqQ4) on setting up the MERN stack from freeCodeCamp.org, changing names to fit our setting of radios (rather than restaurants as the tutorial shows). After setting up the MERN stack, creating a backend server using JavaScript, and setting up HTTP request endpoints, we are now able to read and write data into our database. We have specified our document schema to be as follows:
```javascript
date:       { type: Number, required: true },   // Datetime, in YYMMDDHHMMSS
frequency:  { type: Number, required: true },   // Frequency on the radio dial
rx_tx:      { type: String, default: 'Rx' },    // Receiving or transmitting
mode:       { type: String, default: 'FT8' },   // Mode, we only monitor FT8
db:         { type: Number, required: true },   // Decibels (signal strength)
dt:         { type: Number },                   // Time difference (not used)
audio_freq: { type: Number },                   // Audio frequency (not used)
callsign:   { type: String, required: true },   // Unique tag of a radio
message:    { type: String }                    // Extra (not used)
geometry: {
    type:   { type: String, default: 'Point' },
    coordinates: [ 
      { type: Number },                         // Longitude
      { type: Number }                          // Latitude
    ]
}
```

### 2. Starting the server
Since our server is located in the `server` folder, then we can use the following terminal commands to start the server on our local machine.
```bash
nodemon server
```
This starts the server on `http://localhost:5000/`. At this point we can add data using the endpoint `http://localhost:5000/radios/add`, following the schema above. We can read data from the endpoint `http://localhost:5000/radios`. 

#### Endpoints
* Website: http://localhost:3000/
* Radios Read [GET]: http://localhost:5000/api/v1/radios
* Radios Read Callsign [GET]: http://localhost:5000/api/v1/radios?callsign=K1JT
* Radios Read Date [GET]: http://localhost:5000/api/v1/radios?date=231109
* Radios Create [POST] (JSON array of JSON objects): http://localhost:5000/api/v1/radios/add
* Radios Delete [DELETE] (JSON array of JSON objects): http://localhost:5000/api/v1/radios/delete
* Callsigns Read [GET]: http://localhost:5000/api/v1/callsigns
* Callsigns Read (Specific) [GET]: http://localhost:5000/api/v1/callsigns?callsign=K1JT
* Callsign Create [POST] and Update [PUT] (JSON array of JSON objects): http://localhost:5000/api/v1/callsigns/update
* Callsign Delete (Specific) [DELETE] (query): http://localhost:5000/api/v1/callsigns/update?callsign=TEST

### 3. Setting up serverless endpoints
We continued using the YouTube tutorial to set up a serverless GET endpoint using MongoDB Realms. The following code is our function for the GET endpoint. We did have to modify the return line to ensure that the response returns a JSON format, rather than a EJSON format.
```javascript
exports = async function({query, headers, body}, response) {
  
    const {radiosPerPage = 100, page = 0} = query;

    let q = {}
    
    const collection = context.services.get("mongodb-atlas").db("radios").collection("radios");
    let radiosList = await collection.find(q).skip(page*radiosPerPage).limit(radiosPerPage).toArray();
    
    radiosList.forEach(radio => {
      radio._id = radio._id.toString()
    });

    let responseData = {
        radios: radiosList,
        page: page.toString(),
        filters: {},
        entries_per_page: radiosPerPage.toString(),
        total_results: await collection.count(q).then(num => num.toString()),
    };
    
    response.setBody(JSON.stringify(responseData));
};
```
## WEBSITE BUILDING
This section covers how we built our website. We opted to build our website with React js. 

### 1. Setting up the frontend. 
We used React to set up our website. This can be set up using 
```bash
npm init react-app radio-site
```
and the website can be run locally using
```bash
npm start
```

### 2. Setting up Leaflet
[Leaflet](https://leafletjs.com/reference.html) is a JavaScript library that displays an open source map component on your website. Since we were using the React framework, we opted to use the React wrapper for Leaflet, [React Leaflet](https://react-leaflet.js.org/docs/api-map/). 

After following the [installation guide](https://react-leaflet.js.org/docs/start-installation/) and the [setup](https://react-leaflet.js.org/docs/start-setup/), we made a Map.jsx component. Make sure you have the following imports:
```javascript
import React from "react";
import L from 'leaflet';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
```
We found that the markers in Leaflet had a pathing issue, so here is our fix:
```javascript
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
```
Datapoints in Leaflet are expected in a GeoJSON format. This means a JSON object / dictionary of the format:
```javascript
    {
      type: "Feature",
      properties: {
        ...
      },
      geometry: {
        type: "Point",
        coordinates: [ longitude, latitude ]
      }
    }
```
Then return the React code for Leaflet as follows:
```javascript
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
          key={JSON.stringify(radioJSON)}
          data={radioJSON}
        />
      </MapContainer>
    </div>
```
Adding the key to the GeoJSON allows the map to update dynamically with new data or filtering parameters, as referenced [here](https://stackoverflow.com/questions/44155385/rendering-geojson-with-react-leaflet).

### 3. Accessing the database and populating data
Follow the [YouTube tutorial](https://youtu.be/mrHNSanmqQ4). We are using our serverless GET endpoint, specified in `http-common.js` as the base-url (for local testing/setup, use `http://localhost:5000/`). Following the tutorial makes a function that makes a http request to the endpoint and returns the JSON array of JSON objects of all the radios. After converting these JSON objects into a list of GeoJSON objects, this list can be passed into the GeoJSON tag in the Map component (`radioJSON`).

## RASPBERRY PI SETUP
This section is dedicated to the raspberry pi, including how to set up WSJT-X.

First, we installed all the proper software outlined in a Raspberry Pi Tutorial on the [RTL-SDR website](https://www.rtl-sdr.com/tutorial-setting-up-a-low-cost-qrp-ft8-jt9-wspr-etc-monitoring-station-with-an-rtl-sdr-v3-and-raspberry-pi-3/ ).
This tutorial asks us to download and set up:
- RTL-SDR drivers - to properly set up our dongle
- Pulse Audio & Mplayer - to feed audio to WSJT-X
- CSDR - Digital signal processing library 
- Ncat - Transmission Control Protocol server
- Chrony - Network Time Protocol to synchronize timing
- WSJT-X - To decode audio into our FT8 messages

Then in a terminal tab we run the following commands:
```bash
rtl_sdr -s 1200000 -f 14100000 -D 2 - | csdr convert_u8_f | ncat -4l 4952 -k --send-only --allow 127.0.0.1
```
- `-s` sets the sample rate
- `-f` sets the frequency that we are listening to (14.10 or 20m)
- `-D 2` sets the dongle to accept high-frequency
- `-csdr convert_u8-f` converts the unsigned 8 bit output of the sdr to a float
- `-ncat -4l 4952` initiated IPV4 on port 4952
- `--send-only` ensures that the server only sends data
- `--allow 127.0.0.1` only allows local connections

In a new terminal tab run:
```bash
ncat -v 127.0.0.1 4952 | csdr shift_addition_cc `python3 -c "print(float(14100000-14074000)/1200000)"` | \
csdr fir_decimate_cc 25 0.05 HAMMING | \
csdr bandpass_fir_fft_cc 0 0.5 0.05 | csdr realpart_cf | csdr agc_ff | \
csdr limit_ff | csdr convert_f_s16 | \
mplayer -nocache -rawaudio samplesize=2:channels=1:rate=48000 -demuxer rawaudio -
```
- `-ncat -v` listens to the local server we set up previously
- `-csdr shift_addition` shifts to the center frequency which it 14.09
- `-csdr fir_decimate_cc 25 0.05 HAMMING | csdr bandpass_fir_fft_cc 0 0.5 0.05 | csdr limit_ff` manipulates the signal and lowpass filter
- `-csdr realpart_cf` take the real part of the signal
- `-csdr agc_ff` demodulates the signal
- `-csdr convert_f_s16` converts the float to a signed short (for audio input)
- `-mplayer <...>` takes in the s16 input and reads it as audio

In a third terminal tab you want to run:
```bash
pavucontrol
```
This will open up Mplayer and we should be able to see the audio bar move for VirtualAudio0. This shows that our RTL-SDR is working and we are receiving noise from our antenna.

After this we open up WSJT-X. On the first run through we had to change the audio input settings in WSJT-X. By default WSJT-X tries to take in the Raspberry Pi’s audio but we need to change it to our VirtualAudio0 audio sink. By changing this we ensure WSJT-X is decoding our RTL-SDR audio. From there we want to set WSJT-X to 20m, and the decoded signals should start to populate into ALL.txt.

## SIGNAL DATA ROADMAP
This section covers how we transfer the data from the Raspberry Pi to our website. After completing our antenna and raspberry pi setup, we run WSJT-X with the SDR and antenna connected to the Raspberry Pi. 
WSJT-X generates output in the form of a file called ALL.txt. An example is shown below. Note for the sake of brevity, a small excerpt is shown. 

```
231108_014445    14.074 Rx FT8     15  1.4 2571 W1FC F5BZB -08
231108_014445    14.074 Rx FT8     -4  0.4 1196 CQ F5RXL IN94
```
From this output, we created a file known as parse.py. We created a function called `json_parse`, which parses through each line of ALL.txt. For each line, it creates a JSON data point, with information including date we received the signal, the call sign, frequency, and decibel level. The information you choose to include will depend on the schema for your database. For our database, we also included information about coordinates of the signal, which is not included in ALL.txt. For signals, which we did not already know the coordinates for, we scraped that data from https://www.levinecentral.com/ham/grid_square.php . We then added this coordinate to our database for our future reference. After creating JSON data for each line, we send a list of these data points to our database server endpoint. 

When using our setup, run the script `run.py` first, which calls a bash script, `parse.sh`. This bash script checks for degrees and a valid file path, which is then fed into `parse.py`.

```bash
python parse.py [Direction in terms of degrees]
```
In parse.sh, ALL should be set prior to running the above command.
```bash 
#!/bin/bash
ALL='' #path to ALL.txt Must be set before calling parse.py
if [ $# -eq 0 ];
then
  echo "$0: Missing arguments"
  exit 1
fi
python3 parse.py $ALL $1
rm $ALL
```
For more infomation about how our server saves this data after our post requests, please refer to the secion `MONGODB CONFIGURATION`

## Common Errors

### 1. Error: connect ECONNREFUSED
**CAUSE:** The server machine cannot establish a connection to the MongoDB database due to the network denying access.
**SOLUTION:** Make sure to add your IP address to the **Network Access** section of MongoDB Atlas.