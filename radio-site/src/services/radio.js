import http from "../http-common";

/**
 * The interface for making GET and POST requests to the API.
 */
class RadioDataService {
    getAll(page = 0) {
        return http.get(`radios?page=${page}`);
    }

    getDate(page = 0, date) {
        return http.get(`radios?page=${page}&date=${date}`);
    }
}

export default new RadioDataService();