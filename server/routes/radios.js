const router = require('express').Router();
let Radio = require('../models/radio.model');

router.route('/').get((req, res) => {
    Radio.find()
        .then(radios => res.json(radios))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('./add').post((req, res) => {
    const properties = {
        callsign: req.body.callsign,
        locator: req.body.locator,
        frequency: Number(req.body.frequency),
        date: Date.parse(req.body.date)
    };
    const geometry = {
        type: 'Point',
        coordinates: [Number(req.body.latitude), Number(req.body.longitude)]
    };

    const newRadio = new Radio({
        properties, 
        geometry
    });

    newRadio.save()
        .then(() => res.json('Radio added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;