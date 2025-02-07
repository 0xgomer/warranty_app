import UserModel from "../models/user-model.js";
import WarrantyModel from "../models/warranty-model.js";
import ProductModel from "../models/product-model.js";

class StatisticService {
    async getStatistic() {
        const membersCount = await UserModel.find({role: 'member'}).countDocuments()
        const adminsRolesCount = await UserModel.find({$or: [{role: 'admin'}, {role: 'moderator'}]}).countDocuments()
        const activatedUsersCount = await UserModel.find({isActivated: true}).countDocuments()
        const notActivatedUsersCount = await UserModel.find({isActivated: false}).countDocuments()
        const adminsCount = await UserModel.find({role: 'admin'}).countDocuments()
        const moderatorsCount = await UserModel.find({role: 'moderator'}).countDocuments()
        const verifiedProducts = await WarrantyModel.find().countDocuments()
        const notVerifiedProductsReq = await ProductModel.find()

        const notVerifiedProducts = notVerifiedProductsReq.reduce((acc, curr) => acc + curr.serial.length, 0)

        return {membersCount, adminsRolesCount, activatedUsersCount, notActivatedUsersCount, adminsCount, moderatorsCount, verifiedProducts, notVerifiedProducts: notVerifiedProducts - verifiedProducts}
    }
}

export default new StatisticService()