import PagesService from '../service/pages-service.js'

class PagesController {
    async getPage (req, res, next) {
        try {
            const {page} = req.query
            const data = await PagesService.getPage(page)

            return res.json(data)
        } catch (e) {
            next(e)
        }
    }

    async editPage (req, res, next) {
        try {
            const {page, content} = req.body
            const data = await PagesService.editPage(page, content)

            return res.json(data)
        } catch (e) {
            next(e)
        }
    }
}

export default new PagesController()