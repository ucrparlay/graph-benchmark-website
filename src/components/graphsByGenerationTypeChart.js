'use client'

import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'

ChartJS.register(
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement,
  ChartDataLabels
)

const GraphsByGenerationTypeChart = ({ categories }) => {
  const data = {
    labels: ['Real World', 'Synthetic'],
    datasets: [
      {
        label: '# of Graphs',
        data: [categories['Real World'].length, categories['Synthetic'].length],
      },
    ],
  }
  const options = {
    layout: {
      padding: 20,
    },
    plugins: {
      datalabels: {
        color: 'black',
        font: {
          size: '16px',
        },
      },
      legend: {
        position: 'bottom',
      },
    },
  }
  return <Doughnut data={data} options={options} />
}

export default GraphsByGenerationTypeChart
