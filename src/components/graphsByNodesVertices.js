'use client'

import React from 'react'
import { Scatter } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LogarithmicScale,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
} from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { GRAPH_COLORS } from '@/constants'

ChartJS.register(
  PointElement,
  CategoryScale,
  LogarithmicScale,
  Tooltip,
  Legend,
  ArcElement,
  ChartDataLabels
)

const formatTickLabel = function (value) {
  if (value >= 1000000000) {
    return value / 1000000000 + 'B'
  }
  if (value >= 1000000) {
    return value / 1000000 + 'M'
  }
  if (value >= 1000) {
    return value / 1000 + 'K'
  }
  return value
}

const GraphsByNodesVertices = ({ graphs }) => {
  const data = {
    datasets: [
      {
        labels: Object.values(graphs || {})?.map((graph) => graph?.title),
        data: Object.values(graphs || {})?.map((graph) => ({
          x: graph?.vertices_count,
          y: graph?.edges_count,
        })),
        backgroundColor: [GRAPH_COLORS[0]],
      },
    ],
  }
  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: '# of Vertices',
          font: {
            size: 16
          }
        },
        type: 'logarithmic',
        ticks: {
          callback: formatTickLabel,
          font: {
            size: 14
          }
        },
      },
      y: {
        title: {
          display: true,
          text: '# of Edges',
          font: {
            size: 16
          }
        },
        type: 'logarithmic',
        ticks: {
          callback: formatTickLabel,
          font: {
            size: 14
          }
        },
      },
    },
    plugins: {
      datalabels: {
        display: false,
      },
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (tooltip) {
            var dataLabel = tooltip?.dataset?.labels?.[tooltip.dataIndex] || ''
            return `${dataLabel} ${tooltip?.formattedValue}`
          },
        },
      },
    },
  }
  return <Scatter data={data} options={options} />
}

export default GraphsByNodesVertices
