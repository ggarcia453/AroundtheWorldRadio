import React from "react";
import { Row } from "react-bootstrap";
 
const AboutUs = () => {
    return (
        <div
            style={{
                
                justifyContent: "centre",
                alignItems: "centre",
                height: "100vh",
            }}
        >
        <header className="App-header">
          <p>
            Around the World Radio Project website.
          </p>
          <iframe width="560" height="315" src="https://www.youtube.com/embed/iziYMrmkmUk?si=i7LlN8M-uk9jBM5D" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
          <br/>
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
            <a className="App-link"
              href="https://sites.uci.edu/eecscapstone/2023/05/04/around-the-world-radio/"
              target="_blank"
              rel="noopener noreferrer"> this link. </a>
          </p>
          </header>
          <body className="App-body">
            <h1>
                Gabriel Garcia
            </h1>
            <p>
            <a className="App-link" href="https://github.com/ggarcia453">Personal Github Link</a>
              <br/>
            <a className="App-link" href="https://www.linkedin.com/in/gabriel-e-garcia/">Linkedin</a>
            <br/>
            I am a 4th year Computer Science and Engineering student with a minor statistics. 
            </p>
            <h1>Antoine Nguyen</h1>
            <p>
              <a className="App-link" href="https://20wontons.github.io/">Personal Website</a>
              <br/>I am a Computer Science and Engineering major at UCI, class of 2024.
            </p>
            <h1>Isabel Ruiz</h1>
            <p>
              <a className="App-link" href="https://www.linkedin.com/in/idruiz39">LinkedIn</a>
              <br/>I am a 4th year Computer Science and Engineering student at UCI.
            </p>
          </body>
        </div>
    );
};
 
export default AboutUs;