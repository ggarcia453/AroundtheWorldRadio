import RadiosDAO from "../dao/radiosDAO.js";
import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

export default class RadiosCtrl {
    static async apiGetRadios(req, res, next) {
        // radiosPerPage value determines how many signals are displayed by default on the map.
        const radiosPerPage = req.query.radiosPerPage ? parseInt(req.query.radiosPerPage, 10) : 750;
        const page = req.query.page ? parseInt(req.query.page, 10) : 0;

        let filters = {}
        if (req.query.callsign) {
            filters.callsign = req.query.callsign
        } 
        if (req.query.date) {
            filters.date = Number(req.query.date)
        } 
        if (req.query.noCoordinates) {
            filters.noCoordinates = req.query.noCoordinates
        }
        if (req.query.distinct) {
            filters.distinct = req.query.distinct
        }

        const { radiosList, totalNumRadios } = await RadiosDAO.getRadios({
            filters,
            page,
            radiosPerPage,
        });

        let response = {
            radios: radiosList,
            page: page,
            filters: filters,
            entries_per_page: radiosPerPage,
            total_results: totalNumRadios,
        }
        res.json(response);
    }

    static async apiPostRadio(req, res, next) {
        try {
            let radioDocs = [];
            for (let i = 0; i < req.body.length; i++) {
                let r = req.body[i];
                const document = {
                    date: Number(r.date),
                    frequency: Number(r.frequency),
                    rx_tx: r.rx_tx,
                    mode: r.mode,
                    db: Number(r.db),
                    dt: Number(r.dt),
                    audio_freq: Number(r.audio_freq),
                    direction: Number(r.direction),
                    callsign: r.callsign,
                    message: r.message,
                    geometry: {
                        type: 'Point',
                        coordinates: [
                            Number(r.geometry.coordinates[0]), 
                            Number(r.geometry.coordinates[1])
                        ]
                    }
                };

                // const RadioResponse = await RadiosDAO.addRadio(
                //     type, properties, geometry
                // )

                radioDocs[i] = { insertOne: { document: document } };

            }
            const RadioResponse = await RadiosDAO.addRadiosBulk(radioDocs);
            
            res.json({ status: "success", message: RadioResponse })
        } catch(e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async apiDeleteRadios(req, res, next) {
        try {
            let radioDocs = [];
            for (let i = 0; i < req.body.length; i++) {
                let r = req.body[i]
                const radioId = r._id;
                radioDocs[i] = { deleteOne: { filter: { _id: new ObjectId(radioId) } } };
            }

            const radioResponse = await RadiosDAO.deleteRadiosBulk(radioDocs)

            res.json({ status: "success" });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
}