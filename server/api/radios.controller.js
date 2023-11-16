import RadiosDAO from "../dao/radiosDAO.js";

export default class RadiosCtrl {
    static async apiGetRadios(req, res, next) {
        const radiosPerPage = req.query.radiosPerPage ? parseInt(req.query.radiosPerPage, 10) : 20;
        const page = req.query.page ? parseInt(req.query.page, 10) : 0;

        let filters = {}
        //TODO: filters

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
                const type = "Feature";
                const properties = {
                    date: Number(r.properties.date),
                    frequency: Number(r.properties.frequency),
                    rx_tx: r.properties.rx_tx,
                    mode: r.properties.mode,
                    db: Number(r.properties.db),
                    dt: Number(r.properties.dt),
                    audio_freq: Number(r.properties.audio_freq),
                    callsign: r.properties.callsign,
                    locator: r.properties.locator,
                    message: r.properties.message
                };
                const geometry = {
                    type: 'Point',
                    coordinates: [
                        Number(r.geometry.coordinates[0]), 
                        Number(r.geometry.coordinates[1])
                    ]
                };

                // const RadioResponse = await RadiosDAO.addRadio(
                //     type, properties, geometry
                // )

                radioDocs[i] = { insertOne: { document: { type: type, properties: properties, geometry: geometry } } };

            }
            const RadioResponse = await RadiosDAO.addRadiosBulk(radioDocs);
            
            res.json({ status: "success", message: RadioResponse })
        } catch(e) {
            res.status(500).json({ error: e.message });
        }
    }
}