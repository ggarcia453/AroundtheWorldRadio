/**
 * Reference: https://stackoverflow.com/questions/28749471/mongoose-schema-for-geojson-coordinates
 */

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const radioSchema = new Schema({
    type: { type: String, default:'Feature' },
    properties: {
        callsign:   { type: String, required: true },
        locator:    { type: String, required: true },
        frequency:  { type: Number, required: true },
        date:       { type: Date, default:Date.now }
    },
    geometry: { type: { type: String, default:'Point' }, coordinates: [Number] }
}, {
    timestamps: true,
})

const Radio = mongoose.model('Radio', radioSchema);

module.exports = Radio;