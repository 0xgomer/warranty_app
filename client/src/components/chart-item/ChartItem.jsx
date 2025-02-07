import React from 'react';
import {Doughnut} from "react-chartjs-2";
import './chart-item.css'
import {ArcElement, Chart as ChartJS, Legend, Tooltip} from "chart.js";


ChartJS.register(ArcElement, Tooltip, Legend);


const ChartItem = ({header = '', labels= [], firstCount = 0, secondCount = 0}) => {
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Count',
                data: [firstCount, secondCount],
                backgroundColor: [
                    'rgba(124, 123, 123, 1)',
                    'rgba(255, 255, 255, 1)',
                ],
                borderRadius: 40,
                borderWidth: 0,
                spacing: 5,
                cutout: 100
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                display: false
            },
            tooltips: {
                enabled: false
            },
        },
        aspectRatio: 1,
        layout: {
            padding: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
            }
        },
        responsive: true,
        title: {
            display: false,
        }
    }

    const getProtsent = (num, count) => {
        if(num && count){
            const protsent = Math.floor((num/count) * 100)

            return protsent + ' %'
        }else {
            return '0 %'
        }
    }

    return (
        <div className="chart-item">
            <h2>{header}</h2>
            <div className="chart-chart">
                <Doughnut data={data} options={options} />
                <h1>{(firstCount + secondCount) || 0}</h1>
            </div>
            <div className="chart-info">
                <div className="chart-info__item first">
                    <div className="chart-info__right">
                        <div className="chart-info__color">

                        </div>
                        <span>{labels[0] || ''}</span>
                    </div>
                    <div className="chart-info__left">
                        {getProtsent(firstCount,firstCount + secondCount)}
                    </div>
                </div>
                <div className="chart-info__item second">
                    <div className="chart-info__right">
                        <div className="chart-info__color">

                        </div>
                        <span>{labels[1] || ''}</span>
                    </div>
                    <div className="chart-info__left">
                        {getProtsent(secondCount,firstCount + secondCount)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChartItem;