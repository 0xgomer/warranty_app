import React, {useEffect, useState} from 'react';
import StatisticService from "../../services/StatisticService";
import ChartItem from "../chart-item/ChartItem";
import './statistic-form.css'


const StatisticForm = () => {
    const [statistic, setStatistic] = useState({})
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        StatisticService.getStatistic()
            .then((response) => {
                setStatistic(response.data)
            }).catch(err => {
            setError(err)
        }).finally(() => {
            setLoading(false)
        })
    }, [])

    return (
        <div className='statistic-form'>
            <div className="statistic-form__header">
                <h1>Statistics</h1>
                <p>All statistics are displayed here</p>
            </div>
            <div className="statistic-form__charts">
                <ChartItem header={'number of users'} labels={['Admins', 'Members']} firstCount={statistic.adminsCount} secondCount={statistic.membersCount}/>
                <ChartItem header={'number of verified users'} labels={['Verified', 'Not verified']} firstCount={statistic.activatedUsersCount} secondCount={statistic.notActivatedUsersCount}/>
                <ChartItem header={'admins statistic'} labels={['admins', 'moderators']} firstCount={statistic.adminsCount} secondCount={statistic.moderatorsCount}/>
                <ChartItem header={'verified products'} labels={['verified', 'not verified']} firstCount={statistic.verifiedProducts} secondCount={statistic.notVerifiedProducts}/>
            </div>
        </div>
    );
};

export default StatisticForm;