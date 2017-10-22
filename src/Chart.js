import React, { Component } from 'react'
import { Bar } from 'react-chartjs-2'
import testData from './testData'

const Chart = (props) => {
  const chartData = {
    //monthly survey date
    labels: ['1/2','2/2','3/2','4/2','5/2'],
    datasets: [
      {
        label: 'pain/ KOOS',
        //monthly results for KOOS/pain
        data: [0,2,3,4,5],
        //color for all KOOS/pain. or array to differenciate every month
        backgroundColor: 'rgba(255,99,132,0.9)',
      },
      {
        label: 'stiffness/ NOOS',
        //monthly result for NOOS/stiffness
        data: [5,4,3,2,1],
        //color for all KOOS/stiffness. or array to differenciate every month
        backgroundColor: 'blue',
      }
    ],
  }
  let labels = [], datasets = []
  let propsData = testData
  const colors = [
    'green',
    'blue',
    'red',
    'purple',
    'orange',
  ]

  propsData.map((survey, surveyIndex) => {
    labels.push(survey.name)
    if (survey.categorizedScore.length !== 0) {
      //has sub cat
      survey.categorizedScore.map((subcat, index) => {
        if (datasets.findIndex(f => f.label === subcat.subcategoryName) !== -1) {
          //found
          datasets[datasets.findIndex(f => f.label === subcat.subcategoryName)].data.push(subcat.point)
        } else {
          //not found
          datasets.push(Object.assign({},{label: subcat.subcategoryName},{data:[subcat.point]}, {backgroundColor: colors[index]}))
        }
      })
    } else {
      // has no subcat, so use total score
      if (datasets.findIndex(f => f.label === 'score') !== -1) {
        //found
        datasets[datasets.findIndex(f => f.label === 'score')].data.push(survey.totalScore)
      } else {
        //not found, create new object
        datasets.push(Object.assign({}, {label:'score'}, {data:[survey.totalScore]},{backgroundColor: colors[surveyIndex]}))
      }
    }
  })
//question. will a subcat has no score for first 3 months then score for subsequent month???




  const currentData = [
    {date: '1/2', pain: 20, stiffness: 40},
    {date: '2/2', pain: 20, stiffness: 40},
    {date: '3/2', pain: 20, stiffness: 40},
  ]

  const options = {
    scales: {
      yAxes: [{ stacked: true }],
      xAxes: [{ stacked: true }],
    }
  }
  console.log(Object.assign({}, {labels:labels}, datasets))

  return(
    <div>
      <Bar
        	data={Object.assign({}, {labels: labels}, {datasets:datasets})}
        	options={options}
        />
    </div>
  )
}

export default Chart
