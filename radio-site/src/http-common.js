import axios from 'axios';

export default axios.create({
    // Local: http://localhost:5000/api/v1/radios
    baseURL: "https://us-west-2.aws.data.mongodb-api.com/app/atwradio-filbb/endpoint/",
    headers: {
        "Content-type": "application/json"
    }
});