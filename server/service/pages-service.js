import ApiError from "../exceptions/api-error.js";
import PagesModel from "../models/pages-model.js";

class PagesService {
    async getPage (page) {
        const candidate = await PagesModel.findOne({name: page})

        if (!candidate) {
            throw ApiError.BadRequestError(400, 'Page not found')
        }

        return candidate
    }
    
    async editPage (page, content) {
        const candidate = await PagesModel.findOne({name: page})

        if (!candidate) {
            throw ApiError.BadRequestError(400, 'Page not found')
        }

        candidate.content = content
        await candidate.save()

        return candidate
    }
}

export default new PagesService()