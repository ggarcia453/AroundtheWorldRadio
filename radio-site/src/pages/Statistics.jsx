import React from "react";
import './Statistics.css'
import K6AGA from './../images/K6AGA.png'
import K6AGA_box from './../images/K6AGA_box.png'

 
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
                <p>Welcome to the Stats page! Here we have a few graphs showing the relationship between directionality and decibel level. Let's look at a graph together.</p>
            <img src={K6AGA} alt="'Graph of data from callsign K6AGA'"
             width="50%"/>
             <p>Every point on the graph is a radio signal we've recieved with our antenna! They're mapped by which direction we had the antenna pointed and their decibel level.</p>
             <p>For this callsign 'K6AGA' we see that the signal stength as we rotated our antenna closer north. </p>
             <p>We've also created a box plot of this data, shown below</p>
             <img src={K6AGA_box} alt="'Box Plot of data from the callsign K6AGA'"
             width="50%"/>
             <p>This box plot also shows a significant difference in both the average and range of expected decibel levels for signals recieved when our antenna was rotated -90 degrees as opposed to -69 degrees. </p>
            </body>
        </div>
    );
};
 
export default Stats;