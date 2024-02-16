let radios;
let callsigns;

/**
 * Data Access Object for Radios database
 */
export default class RadiosDAO {
    static async injectDB(conn) {
        if (radios) {
            return
        }
        try {
            radios = await conn.collection("radios");
            callsigns = await conn.collection("callsigns");
        } catch (e) {
            console.error(
                `Unable to establish a collection handle in radiosDAO: ${e}`
            );
        }
    }

    static async getRadios({
        filters = null,
        page = 0,
        radiosPerPage = 100, // FIXME: only displaying 20
    } = {}) {
        let query;
        if (filters) { 
            if ("callsign" in filters) {
                query = { $text: { $search: filters["callsign"] } }
            } else if ("date" in filters) {
                // filters["date"]: YYMMDD
                query = { "date": { $gte: filters["date"]*1000000, $lt: (filters["date"]+1)*1000000 } }
            }
        }

        let cursor;
        
        try {
            cursor = await radios
                .find(query)
                .sort({date: -1})
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`);
            return  { radiosList: [], totalNumRadios: 0 };
        }

        const displayCursor = cursor.limit(radiosPerPage).skip(radiosPerPage * page);

        try {
            const radiosList = await displayCursor.toArray();
            const totalNumRadios = await radios.countDocuments(query);

            return { radiosList, totalNumRadios };
        } catch (e) {
            console.error(`Unable to convert cursor to array or problem counting documents. ${e}`);
            return { radiosList: [], totalNumRadios: 0 };
        }
    }

    /**
     * @deprecated Use addRadiosBulk instead
     */
    static async addRadio(type, properties, geometry) {
        try {
            const radioDoc = {
                type: type,
                properties: properties,
                geometry: geometry
            };
            return await radios.insertOne(radioDoc);
        } catch (e) {
            console.error(`Unable to post radio: ${e}`);
            return { error: e };
        }
    }

    static async addRadiosBulk(radioDocs) {
        try {
            return await radios.bulkWrite(radioDocs);
        } catch (e) {
            console.error(`Unable to post radio: ${e}`);
            return { error: e };
        }
    }

    static async deleteRadiosBulk(radioDocs) {
        try {
            return await radios.bulkWrite(radioDocs);
        } catch (e) {
            console.error(`Unable to delete radio: ${e}`);
            return { error: e };
        }
    }
    //TODO: More CRUD


    static async getCallsigns({
        filters = null,
        page = 0,
        callsignsPerPage = 100,
    } = {}) {
        let query;
        if (filters) {
            if ("callsign" in filters) {
                query = { $text: { $search: filters["callsign"] } }
            }
        }

        let cursor;
        
        try {
            cursor = await callsigns
                .find(query)
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`);
            return  { callsignsList: [], totalNumCallsigns: 0 };
        }

        const displayCursor = cursor.limit(callsignsPerPage).skip(callsignsPerPage * page);

        try {
            const callsignsList = await displayCursor.toArray();
            const totalNumCallsigns = await callsigns.countDocuments(query);

            return { callsignsList, totalNumCallsigns };
        } catch (e) {
            console.error(`Unable to convert cursor to array or problem counting documents. ${e}`);
            return { callsignsList: [], totalNumCallsigns: 0 };
        }
    }

    /**
     * 
     * @param {JSONArray} callsignDocs 
     * @returns 
     */
    static async addCallsigns(callsignDocs) {
        try {
            return await callsigns.bulkWrite(callsignDocs);
        } catch (e) {
            console.error(`Unable to post callsign(s): ${e}`);
            return { error: e };
        }
    }

    static async updateCallsign(callsign, coordinates) {
        try {
            const updateResponse = await callsigns.updateOne(
                { callsign: callsign },
                { $set: { coordinates: coordinates } }
            );
            
            return updateResponse;
        } catch (e) {
            console.error(`Unable to update callsign: ${e}`);
            return { error: e }
        }
    }

    static async deleteCallsign(callsign) {
        try {
            const deleteResponse = await callsigns.deleteOne({
                callsign: callsign
            });

            return deleteResponse;
        } catch (e) {
            console.error(`Unable to delete callsign: ${e}`);
            return { error: e };
        }
    }
}