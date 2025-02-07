import $api from "../axios";

export default class WarrantyService {
    static async getAllWarranties ({page = 1, limit = 10, query = ''}) {
        return $api.get('/warranties', {
            params:{
                page,
                limit,
                query
            }
        })
    }

    static async getWarranty (serial) {
        return $api.get('/warranty', {
            params:{
                serial
            }
        })
    }

    static async addWarranty (serial) {
        return $api.post('/warranty', {serial})
    }

    static async deleteWarranty (id) {
        return $api.delete('/warranty', {
            params: {id}
        })
    }
}