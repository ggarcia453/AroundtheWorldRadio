/**
 * Reference: https://stackoverflow.com/questions/28749471/mongoose-schema-for-geojson-coordinates
 */

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const radioSchema = new Schema({
    type: { type: String, default:'Feature' },
    properties: {
        datetime:   { type: Number, required: true },   // Datetime, in YYMMDDHHMMSS
        frequency:  { type: Number, required: true },   // Frequency on the radio dial
        rx_tx:      { type: String, default: 'Rx' },    // Received or transmitted signal
        mode:       { type: String, default: 'FT8' },   // Mode, we are only monitoring FT8
        db:         { type: Number, required: true },   // Decibels (signal strength)
        dt:         { type: Number },                   // Time difference (not used)
        audio_freq: { type: Number },                   // Audio frequency (not used)
        callsign:   { type: String, required: true },   // First part of the message, unique tag of a radio, discard if "CQ"
        locator:    { type: String, required: true },   // Second part of the message, unique coordinate grid box
        message:    { type: String }                    // Extra (not used)
    },
    geometry: { 
        type: { type: String, default:'Point' }, 
        coordinates: [Number] 
    }
}, {
    timestamps: true,
})

const Radio = mongoose.model('Radio', radioSchema);

module.exports = Radio;