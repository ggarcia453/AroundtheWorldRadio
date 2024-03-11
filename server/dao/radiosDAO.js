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
        radiosPerPage = 750,
    } = {}) {
        let query;
        if (filters) { 
            if ("callsign" in filters) {
                query = { $text: { $search: filters["callsign"] } }
            } else if ("date" in filters) {
                // filters["date"]: YYMMDD
                query = { "date": { $gte: filters["date"]*1000000, $lt: (filters["date"]+1)*1000000 } }
            } else if ("noCoordinates" in filters) {
                query = { "geometry": { "type": "Point", coordinates: [NaN, NaN] } }
            }
        }

        let cursor;
        
        try {
            if ("distinct" in filters && filters["distinct"] === "false") {
                cursor = await radios
                    .find(query)
                    .sort({date: -1})
                    .limit(radiosPerPage)
                    .skip(radiosPerPage * page);
            } else {
                cursor = await radios.aggregate([
                    { $match: query }, 
                    { $sort: {"date": -1} }, {
                    $group: {
                        originalId: {$first: '$_id'}, 
                        _id: '$callsign', 
                        date: {$first: '$date'},
                        frequency: {$first: '$frequency'},
                        rx_tx: {$first: '$rx_tx'},
                        mode: {$first: '$mode'},
                        db: {$first: '$db'},
                        dt: {$first: '$dt'},
                        audio_freq: {$first: '$audio_freq'},
                        direction: {$first: '$direction'},
                        message: {$first: '$message'},
                        geometry: {$first: '$geometry'}
                    }
                    }, { $sort: {"date": -1} }, {
                    $project: {
                        _id : '$originalId',
                        callsign  : '$_id',
                        date: '$date',
                        frequency: '$frequency',
                        rx_tx: '$rx_tx',
                        mode: '$mode',
                        db: '$db',
                        dt: '$dt',
                        audio_freq: '$audio_freq',
                        direction: '$direction',
                        message: '$message',
                        geometry: '$geometry'
                    }
                    }, { $skip: Number(page)*Number(radiosPerPage) },
                    { $limit: Number(radiosPerPage) }
                ])
            }
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`);
            return  { radiosList: [], totalNumRadios: 0 };
        }

        // const displayCursor = cursor.limit(radiosPerPage).skip(radiosPerPage * page);

        try {
            const radiosList = await cursor.toArray();
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