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
}