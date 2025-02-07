import ProductService from "../service/product-service.js";

class ProductController {
    async getAllProducts (req, res, next) {
        try {
            const {page, limit, query} = req.query
            const data = await ProductService.getAllProducts(page, limit, query)

            res.set('Access-Control-Expose-Headers', 'x-total-count')
            res.set('x-total-count', data.totalCount);

            return res.json(data.products)
        } catch (e) {
            next(e)
        }
    }

    async addProduct (req, res, next) {
        try {
            const file = req.file
            const body = req.body
            const data = await ProductService.addProduct(file, body)

            return res.json(data)
        } catch (e) {
            next(e)
        }
    }

    async editProduct (req, res, next) {
        try {
            const file = req.file
            const body = req.body
            const data = await ProductService.editProduct(file, body)

            return res.json(data)
        } catch (e) {
            next(e)
        }
    }

    async getProduct (req, res, next) {
        try {
            const id = req.body.id
            const data = await ProductService.getProduct(id)

            return res.json(data)
        } catch (e) {
            next(e)
        }
    }

    async deleteProduct (req, res, next) {
        try {
            const {id} = req.query
            const data = await ProductService.deleteProduct(id)

            return res.json(data)
        } catch (e) {
            next(e)
        }
    }
}

export default new ProductController()