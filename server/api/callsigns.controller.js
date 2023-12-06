import RadiosDAO from "../dao/radiosDAO.js";

export default class CallsignsCtrl {
    static async apiGetCallsigns(req, res, next) {
        const callsignsPerPage = req.query.callsignsPerPage ? parseInt(req.query.callsignsPerPage, 10) : 100; // FIXME: this is how to change how much is displayed
        const page = req.query.page ? parseInt(req.query.page, 10) : 0;

        let filters = {}
        if (req.query.callsign) {
            filters.callsign = req.query.callsign;
        }

        const { callsignsList, totalNumCallsigns } = await RadiosDAO.getCallsigns({
            filters,
            page,
            callsignsPerPage,
        });

        let response = {
            callsigns: callsignsList,
            page: page,
            filters: filters,
            entries_per_page: callsignsPerPage,
            total_results: totalNumCallsigns,
        }
        res.json(response);
    }

    static async apiPostCallsigns(req, res, next) {
        try {
            let callsignDocs = [];
            for (let i = 0; i < req.body.length; i++) {
                let r = req.body[i];
                callsignDocs[i] = { insertOne: { document: { 
                    callsign: r.callsign,
                    coordinates: [
                        Number(r.coordinates[0]), 
                        Number(r.coordinates[1])
                    ] 
                } } };
            }
            const CallsignResponse = await RadiosDAO.addCallsigns(callsignDocs);
            
            res.json({ status: "success", message: CallsignResponse })
        } catch(e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async apiUpdateCallsign(req, res, next) {
        try {
            const callsign = req.body.callsign;
            const coordinates = req.body.coordinates;

            const callsignResponse = await RadiosDAO.updateCallsign(
                callsign,
                coordinates
            )

            var { error } = callsignResponse;
            if (error) {
                res.status(400).json({ error });
            }

            if (callsignResponse.modifiedCount === 0) {
                throw new Error(
                    "unable to update callsign"
                )
            }

            res.json({ status: "success" });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async apiDeleteCallsign(req, res, next) {
        try {
            const callsign = req.query.callsign
            console.log(callsign);
            const callsignResponse = await RadiosDAO.deleteCallsign(
                callsign
            )
            res.json({ status: "success" });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
}