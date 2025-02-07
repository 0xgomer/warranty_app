import UserModel from "../models/user-model.js";
import WarrantyModel from "../models/warranty-model.js";
import ProductModel from "../models/product-model.js";
import ApiError from "../exceptions/api-error.js";

class WarrantyService {
    async addWarranty (id, serial) {
        if (!id) {
            throw ApiError.UnauthorizedError()
        }

        if (!serial){
            throw ApiError.BadRequestError("You didn't specify serial")
        }

        const candidate = await WarrantyModel.findOne({serial: serial})
        const user = await UserModel.findById({_id: id})
        const product = await ProductModel.findOne({serial: serial})

        if (candidate){
            throw ApiError.BadRequestError(400,"Warranty all ready registered")
        }

        if (!user){
            throw ApiError.UnauthorizedError()
        }

        if (!product){
            throw ApiError.BadRequestError(400,"Product not found")
        }

        const warranty = await WarrantyModel.create({
            user: {
                id: user._id,
                username: user.username
            },
            serial: serial,
            product: product.name,
            warranty: product.warranty
        })

        return warranty
    }

    async getAllWarranties (id, page = 1, limit = 10, query = '') {
        if (!id) {
            throw ApiError.BadRequestError(400, "Warranties not found!")
        }

        const warranties = await WarrantyModel.find({ 'user.username': { $regex: query, $options: 'i' } }).limit(limit).skip((page - 1) * limit)
        const totalCount = await WarrantyModel.find({'user.id': id}).countDocuments()

        return {warranties, totalCount}
    }

    async getWarranty (serial) {
        if (!serial) {
            throw ApiError.BadRequestError(400, "You didn't specify serial")
        }

        const warranty = await WarrantyModel.findOne({serial: serial})

        if (!warranty){
            throw ApiError.BadRequestError(400, "Warranty not registered")
        }

        return warranty
    }

    async editWarranty (id, username, serial, duration) {
        const warranty = await WarrantyModel.findOne({_id: id})


        if (!warranty) {
            throw ApiError.BadRequestError(400,"Warranty not found")
        }

        if (username) {
            const user = await UserModel.findOne({username: username})

            if (!user) {
                throw ApiError.BadRequestError(400,"User not found")
            }

            warranty.user.id = user._id
            warranty.user.username = user.username
        }

        if (serial) {
            const product = await ProductModel.findOne({serial: serial})


            if (!product) {
                throw ApiError.BadRequestError(400,"Product not found")
            }

            warranty.serial = serial
            warranty.product = product.name
        }

        if (duration) {
            warranty.warranty = duration
        }

        await warranty.save()

        return warranty
    }

    async deleteWarranty (id) {
        if (!id) {
            throw ApiError.BadRequestError(400,"You didn't specify id")
        }

        const warranty = await WarrantyModel.findByIdAndDelete(id)

        if (!warranty) {
            throw ApiError.BadRequestError(400,"Warranty removed")
        }

        return warranty
    }
}

export default new WarrantyService()