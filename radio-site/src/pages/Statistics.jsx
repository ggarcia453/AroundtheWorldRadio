import React from "react";
 
const Stats = () => {
    return (
        <div
            style={{
                justifyContent: "centre",
                alignItems: "centre",
                height: "100vh",
            }}
        >
            <h1>
                Stats
            </h1>
            <body>
                <p>Welcome to the Stats page! Here we have a few graphs showing the relationship between directionality and decibel level. Let's look at a graph together.</p>
            <img src="https://cdn.discordapp.com/attachments/1095146892733710477/1211554915344977971/2ecd8a9b-2b91-429b-9a7c-62cd53aef603.png?ex=65ee9f71&amp;is=65dc2a71&amp;hm=19a76257258c7aa9efdbeb66e2ab014e71c6475e27f60c177b11bb1f3f10d7d9&amp;"
             width="50%"/>
             <p>Every point on the graph is a radio signal we've recieved with! They're mapped by which direction we had the antenna pointed and their decibel level.</p>
             <p>For this callsign 'K6AGA' we see that the signal stength as we rotated our antenna closer north. </p>
            </body>
        </div>
    );
};
 
export default Stats;