import Chart from 'react-apexcharts'
import { useState } from 'react'
import dateFormat from 'dateformat'

import locationOption from '../localesOption'

const LineChart = (props) => {
  const [lineChart, setLineChart] = useState({
    series: [
      {
        name: props.seriesName,
        data: props.data,
      },
    ],
    options: {
      chart: {
        ...locationOption,
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
        text: 'Biểu đồ số ca nhiễm',
        align: 'left',
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.9,
          opacityTo: 0,
          stops: [10, 90, 100],
        },
      },
      yaxis: {
        title: {
          text: 'Số ca nhiễm',
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
      ...props.option,
    },
  })

  return (
    <Chart
      options={lineChart.options}
      series={lineChart.series}
      type="area"
      width={props.width}
      height={props.height}
    />
  )
}

export default LineChart
