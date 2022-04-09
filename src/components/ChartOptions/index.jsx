import dateFormat from 'dateformat'
import globalOptions from './globalOptions'

export const LineWithLabelsPositiveCase = {
  chart: {
    ...globalOptions,
    height: 300, // Default height
    type: 'line',
    dropShadow: {
      enabled: true,
      color: '#000',
      top: 18,
      left: 7,
      blur: 10,
      opacity: 0.2,
    },
    toolbar: {
      show: false,
    },
  },
  colors: ['#ed6c02', '#ef5350', '#00e676'],
  dataLabels: {
    enabled: true,
  },
  stroke: {
    curve: 'smooth',
  },
  legend: {
    show: true,
    showForSingleSeries: true,
    position: 'top',
    horizontalAlign: 'right',
    floating: true,
    offsetY: -25,
    offsetX: -5,
  },
  title: {
    text: 'Ghi chú',
    align: 'left',
  },
  grid: {
    borderColor: '#e7e7e7',
    row: {
      colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
      opacity: 0.5,
    },
  },
  markers: {
    size: 1,
  },
  xaxis: {
    title: {
      text: 'Ngày',
    },
    categories: ['1/1/2021', '2/1/2021'],
  },
  yaxis: {
    title: {
      text: 'Số ca nhiễm',
    },
  },
}

export const ZoomableTimePositiveCase = {
  chart: {
    ...globalOptions,
    type: 'area',
    stacked: false,
    height: 500,
    zoom: {
      type: 'x',
      enabled: true,
      autoScaleYaxis: true,
    },
    toolbar: {
      autoSelected: 'zoom',
    },
  },
  colors: ['#ed6c02', '#ef5350', '#00e676'],
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
  yaxis: {
    title: {
      text: 'Số ca',
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
  tooltip: {
    shared: false,
  },
}

export const ZoomableTimeHealthDeclaCount = {
  chart: {
    ...globalOptions,
    type: 'area',
    stacked: false,
    height: 500,
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
  yaxis: {
    title: {
      text: 'Số ca',
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
  tooltip: {
    shared: false,
  },
}

export const PieChartInjection = {
  chart: {
    ...globalOptions,
    type: 'radialBar',
    width: 400,
    height: 300,
  },
  plotOptions: {
    radialBar: {
      offsetY: 0,
      offsetX: -70,
      startAngle: 0,
      endAngle: 360,
      hollow: {
        margin: 10,
        size: '35%',
        background: 'transparent',
        image: undefined,
      },
      dataLabels: {
        name: {
          show: true,
        },
        value: {
          show: true,
        },
      },
    },
  },
  colors: ['#4b9fea', '#1e88e5', '#155fa0'],
  labels: ['Mũi 1', 'Mũi 2', 'Mũi 3'],
  legend: {
    show: true,
    floating: true,
    fontSize: '18px',
    position: 'right',
    offsetX: 0,
    offsetY: 30,
    labels: {
      useSeriesColors: true,
    },
    markers: {
      size: 0,
    },
    formatter: function (seriesName, opts) {
      return seriesName + ' ' + opts.w.globals.series[opts.seriesIndex]
    },
    itemMargin: {
      vertical: 3,
    },
  },
  responsive: [
    // {
    //   breakpoint: 480,
    //   options: {
    //     legend: {
    //       show: false,
    //     },
    //   },
    // },
  ],
}
