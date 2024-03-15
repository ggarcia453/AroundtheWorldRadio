import React from "react";
import './Statistics.css'
import K6AGA from './../images/K6AGA.png'
import K6AGA_box from './../images/K6AGA_box.png'
import Distance_bar from './../images/Distance_bar.png'
import Distnace_scatter from './../images/Distance_scatter.png'

 
const Stats = () => {
    return (
        <div
            style={{
                justifyContent: "centre",
                alignItems: "centre",
                height: "100%",
                fontSize: "20px"
            }}
        >
            <h1>
                Stats
            </h1>
            <body>
                <p>Welcome to the Stats page! Here we have a few graphs about all the data we recieved. Let's look at a graph together.</p>
            <img src={K6AGA} alt="'Graph of data from callsign K6AGA'"
             width="50%"/>
             <p>Every point on the graph is a radio signal we've recieved with our antenna! They're mapped by which direction we had the antenna pointed and their decibel level.</p>
             <p>For this callsign 'K6AGA' we see that the signal stength as we rotated our antenna closer north. </p>
             <p>We've also created a box plot of this data, shown below</p>
             <img src={K6AGA_box} alt="'Box Plot of data from the callsign K6AGA'"
             width="50%"/>
             <p>This box plot also shows a significant difference in both the average and range of expected decibel levels for signals recieved when our antenna was rotated -90 degrees as opposed to -69 degrees. </p>
            </body>
            <body>
                <p>Let's take look at some other graphs involving distance! Does the distance away fro UCI affect if we recieve the signal or not?</p>
                <img src={Distance_bar} alt="'Bar Graph showing frequency of signals recieved in a certain range'"
                width="50%"/>
                <p>We see that as the distance away increases, we see less signals from that range. But does this affect signal strength?</p>
                <img src={Distnace_scatter} alt="'Scatterplot of distance vs signal stength'"
                width="50%" />
                <p> We see that no distance does not affect signal strength directly.</p>
                <p> We are currently running more tests to see if distance does have some sort of relationship to decibel!</p>
            </body>
        </div>
    );
};
 
export default Stats;