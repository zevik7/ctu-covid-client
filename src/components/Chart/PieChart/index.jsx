import { useState } from 'react'
import Chart from 'react-apexcharts'
import globalOptions from '../globalOptions'

const PieChart = (props) => {
  const pieChart = {
    series: props.series,
    options: {
      chart: {
        ...globalOptions,
        type: 'pie',
      },
      labels: props.labels,
      ...props.option,
    },
  }

  return (
    <Chart
      options={pieChart.options}
      series={pieChart.series}
      type="pie"
      width={props.width}
      height={props.height}
    />
  )
}

export default PieChart
