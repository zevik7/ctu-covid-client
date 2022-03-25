import { useState } from 'react'
import Chart from 'react-apexcharts'

const PieChart = (props) => {
  const [pieChart, setPieChart] = useState({
    series: props.series,
    options: {
      chart: {
        width: 480,
        type: 'pie',
      },
      labels: props.labels,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
      ...props.option,
    },
  })

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
