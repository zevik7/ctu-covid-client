import dateFormat from 'dateformat'
import options from './globalOptions'

export const LineWithLabelsPositiveCase = {
  chart: {
    ...options.chart,
    height: 200, // Default height
    type: 'line',
    dropShadow: {
      enabled: true,
      color: '#000',
      top: 18,
      left: 7,
      blur: 10,
      opacity: 0.1,
    },
    toolbar: {
      show: true,
      autoSelected: 'reset',
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
    offsetY: -5,
    offsetX: 0,
  },
  title: {
    text: 'Trong 7 ngày gần nhất',
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
    ...options.chart,
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
    dropShadow: {
      enabled: true,
      color: '#000',
      top: 18,
      left: 7,
      blur: 10,
      opacity: 0.2,
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
    text: 'Toàn bộ thời gian',
    align: 'left',
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
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 0,
      inverseColors: false,
      opacityFrom: 1,
      opacityTo: 0.8,
      stops: [0, 90, 100],
    },
  },
  tooltip: {
    shared: false,
  },
}

export const ZoomableTimeHealthDeclaCount = {
  chart: {
    ...options.chart,
    type: 'area',
    stacked: false,
    height: 400,
    zoom: {
      type: 'x',
      enabled: true,
      autoScaleYaxis: true,
    },
    toolbar: {
      autoSelected: 'zoom',
    },
    dropShadow: {
      enabled: true,
      color: '#000',
      top: 18,
      left: 7,
      blur: 10,
      opacity: 0.1,
    },
  },
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 0,
  },
  title: {
    text: 'Trong 30 ngày gần nhất',
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
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 0.5,
      inverseColors: false,
      opacityFrom: 1,
      opacityTo: 0.8,
      stops: [0, 90, 100],
    },
  },
  tooltip: {
    shared: false,
  },
}

export const PieChartInjection = {
  chart: {
    ...options.chart,
    type: 'radialBar',
    width: '100%',
    height: 200,
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
  colors: ['#4b9fea', '#1769aa', '#2c387e'],
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
      return seriesName + ' ' + opts.w.globals.series[opts.seriesIndex] + '%'
    },
    itemMargin: {
      vertical: 3,
    },
  },
  // responsive: [
  //   {
  //     breakpoint: 480,
  //     options: {
  //       legend: {
  //         show: false,
  //       },
  //     },
  //   },
  // ],
}
