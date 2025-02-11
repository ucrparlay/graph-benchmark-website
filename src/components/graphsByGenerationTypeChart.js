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
import { GRAPH_COLORS } from '@/constants'

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
    labels: ['Real_World', 'Synthetic'],
    datasets: [
      {
        label: '# of Graphs',
        data: [categories['Real_World'].length, categories['Synthetic'].length],
        backgroundColor: [GRAPH_COLORS[0], GRAPH_COLORS[1]],
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
