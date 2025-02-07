import WarrantyService from "../service/warranty-service.js";

class WarrantyController {
    async addWarranty (req, res, next) {
        try {
            const {id} = req.user
            const {serial} = req.body
            const data = await WarrantyService.addWarranty(id, serial)

            return res.json(data)
        } catch (e) {
            next(e)
        }
    }

    async getAllWarranties (req, res, next) {
        try {
            const {page, limit, query} = req.query
            const {id} = req.user
            const data = await WarrantyService.getAllWarranties(id, page, limit, query)

            res.set('Access-Control-Expose-Headers', 'x-total-count')
            res.set('x-total-count', data.totalCount);

            return res.json(data.warranties)
        } catch (e) {
            next(e)
        }
    }

    async getWarranty (req, res, next) {
        try {
            const {serial} = req.query
            const data = await WarrantyService.getWarranty(serial)

            return res.json(data)
        } catch (e) {
            next(e)
        }
    }

    async editWarranty (req, res, next) {
        try {
            const {id, username, serial, duration} = req.body
            const data = await WarrantyService.editWarranty(id, username, serial, duration)

            return res.json(data)
        } catch (e) {
            next(e)
        }
    }

    async deleteWarranty (req, res, next) {
        try {
            const {id} = req.query
            const data = await WarrantyService.deleteWarranty(id)

            return res.json(data)
        } catch (e) {
            next(e)
        }
    }
}

export default new WarrantyController()