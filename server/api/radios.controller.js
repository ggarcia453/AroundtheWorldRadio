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
            const type = "Feature";
            const properties = {
                date: Number(req.body.properties.date),
                frequency: Number(req.body.properties.frequency),
                rx_tx: req.body.properties.rx_tx,
                mode: req.body.properties.mode,
                db: Number(req.body.properties.db),
                dt: Number(req.body.properties.dt),
                audio_freq: Number(req.body.properties.audio_freq),
                callsign: req.body.properties.callsign,
                locator: req.body.properties.locator,
                message: req.body.properties.message
            };
            const geometry = {
                type: 'Point',
                coordinates: [
                    Number(req.body.geometry.coordinates[0]), 
                    Number(req.body.geometry.coordinates[1])
                ]
            };

            const RadioResponse = await RadiosDAO.addRadio(
                type, properties, geometry
            )

            res.json({ status: "success" })
        } catch(e) {
            res.status(500).json({ error: e.message });
        }
    }
}