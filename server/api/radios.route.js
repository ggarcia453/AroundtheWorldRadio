import express from 'express';
// import Radio from '../models/radio.model';
import RadiosCtrl from "./radios.controller.js"

const router = express.Router();

router.route('/').get(RadiosCtrl.apiGetRadios)

router.route("/add").post(RadiosCtrl.apiPostRadio);
//TODO: More CRUD @ video 45:34
//  https://www.youtube.com/watch?v=mrHNSanmqQ4

export default router;