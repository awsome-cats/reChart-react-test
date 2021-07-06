import React, { useState, useEffect } from 'react'
import { Bar } from 'react-chartjs-2'
/* api */
import { getData } from '../data/apiData'




const  BarChartScreen = () => {

const [labelsData, setLabelsData] = useState([])
const [ confirmedData, setConfirmedData] = useState([])
const [deathsData, setDeathsData] = useState([])
const [loading, setLoading] = useState(false)
const [error, setError] = useState(false)

useEffect(() => {
    getChartData()
}, [])

    const data = (canvas) => {
        const ctx = canvas.getContext('2d');
        const gradient = ctx.createLinearGradient(0, 90, 100, 0);
        const gradient1 = ctx.createLinearGradient(0, 90, 100, 0);

        gradient.addColorStop(0, `#ff9a9e`);// pink
        gradient.addColorStop(0.5, `#fad0c4`);// ベージュ
        gradient.addColorStop(1, '#fad0c4');// ベージュ

        gradient1.addColorStop(0, `#ff9a9e`);
        gradient.addColorStop(0.5, `#fad0c4`);
        gradient.addColorStop(1, '#fad0c4');

        return {
            // 置き換える
            // labels: [],
            labels:labelsData,
            datasets: [
                // data1
                {
                    barPercentage:0.5,
                    barThickness: 10,
                    maxBarThickness: 100,
                    minBarLength:2,
                    label: 'Confirmed',
                    // 置き換える
                    // data: [],
                    data: confirmedData,
                    backgroundColor:gradient1,
                    borderWidth:1

                },
                //data2
                {
                    barPercentage:0.5,
                    barThickness: 10,
                    maxBarThickness: 100,
                    minBarLength:2,
                    label: 'Deaths',
                    //置き換える
                    // data: [],
                    data: deathsData,
                    backgroundColor:gradient,
                    borderWidth:1

                },
            ],
        }
    }

    const options = {
        responsive: true,
        tooltips: {
            mode: 'index',
            intersect: false
        },
        hover: {
            mode: 'nearest',
            intersect: true
        },
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true
                    }
                }
            ]
        },
        legend: {
            display: true,
            position: 'bottom',
            labels: {
                fontColor: `rgba(242, 38, 19, 1)`
            }
        }
    }

    // api getData
    const getChartData = async() => {

        try {

            setLoading(true)
            setError(false)

            // 配列を用意する
            let labelsArray = [];
            let confirmedArray =[]
            let deathsArray = []

            const data = await getData()
            // 一般的な扱い
            data.forEach(element => {
                labelsArray.push(element.reportDate)
                confirmedArray.push(element.confirmed.total)
                deathsArray.push(element.deaths.total)
            })

            setLabelsData(labelsArray)
            setConfirmedData(confirmedArray)
            setDeathsData(deathsArray)

            setLoading(false)
        } catch(err) {
            console.log(err)
            setError(true)
            throw err
        }
    }



    return (
        <>
        {
            error ? (
                <p style={{color: 'red'}}>データを取得できませんでした。</p>
            )
            :loading ? (
                <p style={{color: 'green'}}>loading...</p>
            )
            :(
                <Bar data={data} options={options}/>
            )
        }

        </>
    )
}

export default BarChartScreen

