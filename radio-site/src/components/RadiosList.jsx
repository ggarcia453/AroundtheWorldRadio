import React, { useState, useEffect } from 'react';
import RadioDataService from "../services/radio";

/**
 * Returns the list of radios from the database query
 * @param {*} props 
 * @returns {[{}]}
 */
const RadiosList = props => {
    const [radios, setRadios] = useState([]);

    useEffect(() => {
        retrieveRadios();
    }, []);

    const retrieveRadios = () => {
        if (props && props.date) {
            RadioDataService.getDate(Number(props.date))
                .then(response => {
                    setRadios(response.data.radios);
                })
                .catch(e => {
                    console.log(e);
                });
        } else {
            RadioDataService.getAll()
                .then(response => {
                    // console.log(response.data);
                    setRadios(response.data.radios);
                })
                .catch(e => {
                    console.log(e);
                });
        }
    }

    const refreshList = () => {
        retrieveRadios();
    }

    return radios;
}

export default RadiosList;