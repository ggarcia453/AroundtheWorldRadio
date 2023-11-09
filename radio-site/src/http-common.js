import axios from 'axios';

export default axios.create({
    baseURL: "http://localhost:5000/api/v1/radios",
    headers: {
        "Content-type": "application/json"
    }
});