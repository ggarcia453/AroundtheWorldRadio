import express from 'express';
// import Radio from '../models/radio.model';
import CallsignsCtrl from "./callsigns.controller.js"

const router = express.Router();

router.route('/').get(CallsignsCtrl.apiGetCallsigns);

router.route("/add").post(CallsignsCtrl.apiPostCallsigns);
//TODO: More CRUD @ video 45:34
//  https://www.youtube.com/watch?v=mrHNSanmqQ4

export default router;