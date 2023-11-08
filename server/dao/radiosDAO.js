let radios

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
        } catch (e) {
            console.error(
                `Unable to establish a collection handle in radiosDAO: ${e}`
            );
        }
    }

    static async getRadios({
        filters = null,
        page = 0,
        radiosPerPage = 20,
    } = {}) {
        let query;
        if (filters) {
            //TODO: can filter radios here too
        }

        let cursor;
        
        try {
            cursor = await radios
                .find(query)
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

    static async addRadio(type, properties, geometry) {
        try {
            const radioDoc = {
                type: type,
                properties: {
                    callsign: properties.callsign,
                    locator: properties.locator,
                    frequency: Number(properties.frequency)
                },
                geometry: {
                    coordinates: [
                        Number(geometry.coordinates[0]),
                        Number(geometry.coordinates[1])
                    ],
                    type: geometry.type
                }
            };
            return await radios.insertOne(radioDoc);
        } catch (e) {
            console.error(`Unable to post radio: ${e}`);
            return { error: e };
        }

        //TODO: More CRUD
    }
}