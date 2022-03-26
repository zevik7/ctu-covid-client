import Chart from 'react-apexcharts'
import { useState } from 'react'
import dateFormat from 'dateformat'

import globalOptions from '../globalOptions'

const LineChart = (props) => {
  // Props: seriesName, data, options, name
  const lineChart = {
    series: [
      {
        name: props.name,
        data: props.data,
      },
    ],
    options: {
      chart: {
        ...globalOptions,
        type: 'area',
        stacked: false,
        zoom: {
          type: 'x',
          enabled: true,
          autoScaleYaxis: true,
        },
        toolbar: {
          autoSelected: 'zoom',
        },
      },
      dataLabels: {
        enabled: false,
      },
      markers: {
        size: 0,
      },
      title: {
        text: 'Biểu đồ ' + props.name.toLowerCase(),
        align: 'left',
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.9,
          opacityTo: 0,
          stops: [0, 90, 100],
        },
      },
      yaxis: {
        title: {
          text: props.name,
        },
      },
      xaxis: {
        type: 'datetime',
        labels: {
          formatter: function (value) {
            return dateFormat(value, 'dd/mm/yy')
          },
        },
      },
      ...props.options,
    },
  }

  return (
    <Chart
      options={lineChart.options}
      series={lineChart.series}
      width={props.width}
      height={props.height}
    />
  )
}

export default LineChart
