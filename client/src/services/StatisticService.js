import $api from "../axios";

export default class StatisticService {
    static async getStatistic () {
        return $api.get('/statistic')
    }
}