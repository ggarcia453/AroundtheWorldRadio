# Around the World Radio

https://ggarcia453.github.io/AroundtheWorldRadio/

## Description
This a public repository for the Around the World Radio Senior Design Project. This project has been created by Isabel Ruiz, Antoine Nguyen, and Gabriel Garcia, and advised by [Professor Peter Burke](https://www.burkelab.com/) from UCI's Electrical Engineering and Computer Science department ([Capstone Site](https://sites.uci.edu/eecscapstone/2023/05/04/around-the-world-radio/)). 

This project logs signals from amateur radios detected from our handheld SDR and displays these signals onto a website (see https://pskreporter.info).

### Features
1. A **map** that displays **markers** for locations of radio signals.
1. Filtering by **callsign**, **frequency band**, and **date**.

## Future Plans
1. **Transmitting** signals
1. Computing **maximum signal strength** by **directionality** and displaying this best direction
1. **Archives** page to display past data
1. **Statistics** page to display statistics from aggregating data

## Architecture
We are using a Raspberry Pi, RTL-SDR Dongle, and a telescopic antenna as our hardware setup and using the software WSJT-X to to receive radio signals using FT8 protocol.

We are using the MERN stack. ReactJS for the frontend, NodeJS and ExpressJS for backend, and MongoDB for our database. We are using a REST architecture for our API. To display the map, we are using the [`react-leaflet`](https://github.com/PaulLeCam/react-leaflet) library.


## References
1. [FT8 from SDR Tutorial](https://github.com/PeterJBurke/FT8fromSDR) from Prof. Burke.
1. [Leaflet](https://leafletjs.com/reference.html) and [React Leaflet](https://react-leaflet.js.org/docs/api-map/) Documentation
1. MERN Stack Tutorials: [YouTube](https://youtu.be/mrHNSanmqQ4), [MongoDB](https://www.mongodb.com/languages/mern-stack-tutorial), [Example](https://medium.com/@beaucarnes/learn-the-mern-stack-by-building-an-exercise-tracker-mern-tutorial-59c13c1237a1)

---

## Testing
Open two terminals and start the React app and the server.
```bash
cd radio-site
npm start
```
```bash
cd server
nodemon server
```