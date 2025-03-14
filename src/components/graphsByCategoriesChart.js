'use client'

import React from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { GRAPH_COLORS } from '@/constants'

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ChartDataLabels
)

const GraphsByCategoriesChart = ({ categories }) => {
  const data = {
    labels: Object.keys(categories),
    datasets: [
      {
        label: '# of Graphs',
        data: Object.values(categories).map((category) => category.length),
        borderWidth: 1,
        backgroundColor: Object.keys(categories).map(
          (_, i) => GRAPH_COLORS[i % GRAPH_COLORS.length]
        ),
      },
    ],
  }
  const options = {
    layout: {
      padding: {
        top: 30,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: '# of Graphs',
          font: {
            size: 16
          }
        },
        ticks: {
          font: {
            size: 14
          }
        },
      },
      x: {
        ticks: {
          font: {
            size: 14
          }
        },
      }
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'top',
        font: {
          size: '16px',
        },
      },
      legend: {
        display: false,
      },
    },
  }
  return <Bar data={data} options={options} />
}

export default GraphsByCategoriesChart
