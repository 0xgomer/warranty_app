import StatisticService from "../service/statistic-service.js";

class StatisticController {
    async getStatistic (req, res, next) {
        try {
            const data = await StatisticService.getStatistic()

            return res.json(data)
        } catch (e) {
            next(e)
        }
    }
}

export default new StatisticController()