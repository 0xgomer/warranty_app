import {getJsonFromXlsx} from "../utils/index.js";
import ApiError from "../exceptions/api-error.js";
import ProductModel from "../models/product-model.js";

class ProductService {
    async getAllProducts (page = 1, limit = 10, query = '') {
        const products = await ProductModel.find({ name: { $regex: query, $options: 'i' } }).limit(limit).skip((page - 1) * limit)
        const totalCount = await ProductModel.countDocuments()

        return {products, totalCount}
    }

    async addProduct (file, body) {
        const candidate = await ProductModel.findOne({name: body.name})

        if (!body.name) {
            throw ApiError.BadRequestError(400, "Product name not specified")
        }

        if (!body.warranty) {
            throw ApiError.BadRequestError(400, "Warranty period not specified")
        }

        if (candidate) {
            throw ApiError.BadRequestError(400, "A product with this name already exists")
        }

        if (!file) throw ApiError.BadRequestError(400,"file not upload")

        let serialNums = await getJsonFromXlsx(file)
        const matchedEquals = await ProductModel.find({ serial: { $in: serialNums } })

        if (matchedEquals.length > 0){
            const equalsFromDb = matchedEquals.map(item => item.serial).flat()
            const equals = equalsFromDb.filter(item => serialNums.includes(item))
            throw ApiError.BadRequestError(400, `These serial numbers already exist: ${equals}`)
        }

        const product = await ProductModel.create({name: body.name, warranty: body.warranty, serial: serialNums})

        return product
    }

    async editProduct (file, body) {
        const candidate = await ProductModel.findOne({name: body.name})
        const product = await ProductModel.findById({_id: body.id})

        if (candidate && candidate.name.toLowerCase() !== product.name.toLowerCase()){
            throw ApiError.BadRequestError(400, "A product with this name already exists")
        }

        if (!product) {
            throw ApiError.BadRequestError(400, "A product not found")
        }

        if (body.name) {
            product.name = body.name
        }

        if (body.warranty) {
            product.warranty = body.warranty
        }

        if (file){
            let serialNums = await getJsonFromXlsx(file)
            const matchedEquals = await ProductModel.find({ serial: { $in: serialNums } })

            if (matchedEquals.length > 0){
                const equalsFromDb = matchedEquals.map(item => item.serial).flat()
                const equals = equalsFromDb.filter(item => serialNums.includes(item))
                throw ApiError.BadRequestError(400, `These serial numbers already exist: ${equals}`)
            }

            product.serial = [...product.serial, ...serialNums]
        }

        await product.save()

        return product
    }

    async getProduct (id) {
        const product = await ProductModel.findOne({_id: id})

        if (!product) {
            throw ApiError.BadRequestError(400, "Product not found")
        }

        return {product}
    }

    async deleteProduct (id) {
        const product = await ProductModel.findOneAndRemove({_id: id})

        if (!product) {
            throw ApiError.BadRequestError(400, "Product not found")
        }

        return {product}
    }
}

export default new ProductService()