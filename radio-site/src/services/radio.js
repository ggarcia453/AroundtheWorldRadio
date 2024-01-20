import http from "../http-common";

/**
 * The interface for making GET and POST requests to the API.
 */
class RadioDataService {
    getAll(page = 0) {
        return http.get(`radios?page=${page}`);
    }

    // TODO: CRUD @1:26:58
}

export default new RadioDataService();