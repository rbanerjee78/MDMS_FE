import {
    SET_MONTHLY_DATA,
    SET_DAILY_DATA,
    SET_OUTAGE_DATA,
    SET_ONDEMAND_DATA,
    SET_PERFORMANCE_DATA,
  } from '../actions/types';

  import * as echarts from 'echarts';

  
  const initialOndemandData = {
    responsive: true,
    maintainAspectRatio: false,
    title: {
      text: '',
      subtext: '',
      left: '-5%',
      top: '-5%',
      bottom: '-5%',
      right: '-5%',
      width: '500px'
    },
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '100%',
        label: false,
        labelLine: false,
        left: 50,
        top: 0,
        right: 0,
        bottom: 0,
        data: [
          { value: 1048, name: 'Search Engine', itemStyle: { color: '#a23aff' } },
          { value: 735, name: 'Direct', itemStyle: { color: '#3cb4fd' } },
          { value: 580, name: 'Email', itemStyle: { color: '#ffd74e' } },
          { value: 484, name: 'Union Ads', itemStyle: { color: '#ff67cc' } },
          { value: 300, name: 'Video Ads', itemStyle: { color: '#00ff00' } }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
            normal: {
              label: false,
              labelLine: false
            }
          }
        }
      }
    ]
  };

  const initialMonthlyData = {
    color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '5%',
      right: '5%',
      bottom: '5%',
      top: '5%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: ['Jan', 'Feb', 'Mer', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        axisTick: {
          alignWithLabel: true
        }
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: 'Direct',
        type: 'bar',
        barWidth: '60%',
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#a23aff' },
            { offset: 0.5, color: '#c38dfc' },
            { offset: 1, color: '#c38dfc' }
          ])
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#a23aff' },
              { offset: 0.7, color: '#c38dfc' },
              { offset: 1, color: '#c38dfc' }
            ])
          }
        },
        data: [10, 52, 200, 334, 390, 330, 220, 120, 400, 334, 390, 330,]
      },
    
    ]
  }

  const inititalDailyData = {

    color: ['#a23aff', '#3cb4fd', '#c38dfc', '#88d7ff', '#ff8dfc'],
    title: {
      text: ''
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },

    autoResize: true,
    
    
    grid: {
      left: "2%",
      right: "2%",
      top: "2%",
      bottom: "2%",
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: 'Line 1',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 0
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#a23aff'
            },
            {
              offset: 1,
              color: '#c38dfc'
            }
          ])
        },
        emphasis: {
          focus: 'series'
        },
        data: [140, 232, 101, 264, 90, 340, 250]
      },
      {
        name: 'Line 2',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 0
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#ff67cc'
            },
            {
              offset: 1,
              color: '#ff8dfc'
            }
          ])
        },
        emphasis: {
          focus: 'series'
        },
        data: [120, 282, 111, 234, 220, 340, 310]
      },
      {
        name: 'Line 3',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 0
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#3cb4fd'
            },
            {
              offset: 1,
              color: '#88d7ff'
            }
          ])
        },
        emphasis: {
          focus: 'series'
        },
        data: [320, 132, 201, 334, 190, 130, 220]
      },
      {
        name: 'Line 4',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 0
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#4e4e89'
            },
            {
              offset: 1,
              color: '#a23aff'
            }
          ])
        },
        emphasis: {
          focus: 'series'
        },
        data: [220, 402, 231, 134, 190, 230, 120]
      }
    ]

  }

  const initialOutageData = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
          // Use axis to trigger tooltip
          type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
        }
      },
  
      grid: {
        left: '3%',
        right: '4%',
        bottom: '0',
        top: '0',
        containLabel: true
      },
      xAxis: {
        type: 'value'
      },
      yAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        
      },
      series: [
        {
          name: 'Direct',
          type: 'bar',
          stack: 'total',
          emphasis: {
            focus: 'series'
          },
          data: [320, 302, 301, 334, 390, 330, 320],
          color: '#a23aff'
        },
        {
          name: 'Mail Ad',
          type: 'bar',
          stack: 'total',
          emphasis: {
            focus: 'series'
          },
          data: [120, 132, 101, 134, 90, 230, 210],
          color: '#3cb4fd'
        },
        {
          name: 'Affiliate Ad',
          type: 'bar',
          stack: 'total',
  
          emphasis: {
            focus: 'series'
          },
          data: [220, 182, 191, 234, 290, 330, 310],
          color:'#c38dfc'
        },
        {
          name: 'Video Ad',
          type: 'bar',
          stack: 'total',
  
          emphasis: {
            focus: 'series'
          },
          data: [150, 212, 201, 154, 190, 330, 410],
          color:'#88d7ff'
        },
        {
          name: 'Search Engine',
          type: 'bar',
          stack: 'total',
  
          emphasis: {
            focus: 'series'
          },
          data: [820, 832, 901, 934, 1290, 1330, 1320],
          color:'#ff8dfc'
        }
      ]
  }

  const iniitialPerformanceData = {

    xAxis: {
        scale: true
      },
      grid: {
        left: '3%',
  top: 10,
  right: '3%',
  bottom: 10,
        containLabel: true
      },
      yAxis: {
        scale: true
      },
      series: [
        {
          type: 'effectScatter',
          symbolSize: 20,
          data: [
            [172.7, 105.2],
            [153.4, 42]
          ],
          color: '#a23aff'
          
        },
        {
          type: 'scatter',
          // prettier-ignore
          data: [[161.2, 51.6], [167.5, 59.0], [159.5, 49.2], [157.0, 63.0], [155.8, 53.6],
          [170.0, 59.0], [159.1, 47.6], [166.0, 69.8], [176.2, 66.8], [160.2, 75.2],
          [172.5, 55.2], [170.9, 54.2], [172.9, 62.5], [153.4, 42.0], [160.0, 50.0],
          [147.2, 49.8], [168.2, 49.2], [175.0, 73.2], [157.0, 47.8], [167.6, 68.8],
          [159.5, 50.6], [175.0, 82.5], [166.8, 57.2], [176.5, 87.8], [170.2, 72.8],
          [174.0, 54.5], [173.0, 59.8], [179.9, 67.3], [170.5, 67.8], [160.0, 47.0],
          [154.4, 46.2], [162.0, 55.0], [176.5, 83.0], [160.0, 54.4], [152.0, 45.8],
          [162.1, 53.6], [170.0, 73.2], [160.2, 52.1], [161.3, 67.9], [166.4, 56.6],
          [168.9, 62.3], [163.8, 58.5], [167.6, 54.5], [160.0, 50.2], [161.3, 60.3],
          [167.6, 58.3], [165.1, 56.2], [160.0, 50.2], [170.0, 72.9], [157.5, 59.8],
          [167.6, 61.0], [160.7, 69.1], [163.2, 55.9], [152.4, 46.5], [157.5, 54.3],
          [168.3, 54.8], [180.3, 60.7], [165.5, 60.0], [165.0, 62.0], [164.5, 60.3],
          [156.0, 52.7], [160.0, 74.3], [163.0, 62.0], [165.7, 73.1], [161.0, 80.0],
          [162.0, 54.7], [166.0, 53.2], [174.0, 75.7], [172.7, 61.1], [167.6, 55.7],
          [151.1, 48.7], [164.5, 52.3], [163.5, 50.0], [152.0, 59.3], [169.0, 62.5],
          [164.0, 55.7], [161.2, 54.8], [155.0, 45.9], [170.0, 70.6], [176.2, 67.2],
          [170.0, 69.4], [162.5, 58.2], [170.3, 64.8], [164.1, 71.6], [169.5, 52.8],
          [163.2, 59.8], [154.5, 49.0], [159.8, 50.0], [173.2, 69.2], [170.0, 55.9],
          [161.4, 63.4], [169.0, 58.2], [166.2, 58.6], [159.4, 45.7], [162.5, 52.2],
          [159.0, 48.6], [162.8, 57.8], [159.0, 55.6], [179.8, 66.8], [162.9, 59.4],
          [161.0, 53.6], [151.1, 73.2], [168.2, 53.4], [168.9, 69.0], [173.2, 58.4],
          [171.8, 56.2], [178.0, 70.6], [164.3, 59.8], [163.0, 72.0], [168.5, 65.2],
          [166.8, 56.6], [172.7, 105.2], [163.5, 51.8], [169.4, 63.4], [167.8, 59.0],
          [159.5, 47.6], [167.6, 63.0], [161.2, 55.2], [160.0, 45.0], [163.2, 54.0],
          [162.2, 50.2], [161.3, 60.2], [149.5, 44.8], [157.5, 58.8], [163.2, 56.4],
          [172.7, 62.0], [155.0, 49.2], [156.5, 67.2], [164.0, 53.8], [160.9, 54.4],
          [162.8, 58.0], [167.0, 59.8], [160.0, 54.8], [160.0, 43.2], [168.9, 60.5],
          [158.2, 46.4], [156.0, 64.4], [160.0, 48.8], [167.1, 62.2], [158.0, 55.5],
          [167.6, 57.8], [156.0, 54.6], [162.1, 59.2], [173.4, 52.7], [159.8, 53.2],
          [170.5, 64.5], [159.2, 51.8], [157.5, 56.0], [161.3, 63.6], [162.6, 63.2],
          [160.0, 59.5], [168.9, 56.8], [165.1, 64.1], [162.6, 50.0], [165.1, 72.3],
          [166.4, 55.0], [160.0, 55.9], [152.4, 60.4], [170.2, 69.1], [162.6, 84.5],
          [170.2, 55.9], [158.8, 55.5], [172.7, 69.5], [167.6, 76.4], [162.6, 61.4],
          [167.6, 65.9], [156.2, 58.6], [175.2, 66.8], [172.1, 56.6], [162.6, 58.6],
          [160.0, 55.9], [165.1, 59.1], [182.9, 81.8], [166.4, 70.7], [165.1, 56.8],
          [177.8, 60.0], [165.1, 58.2], [175.3, 72.7], [154.9, 54.1], [158.8, 49.1],
          [172.7, 75.9], [168.9, 55.0], [161.3, 57.3], [167.6, 55.0], [165.1, 65.5],
          [175.3, 65.5], [157.5, 48.6], [163.8, 58.6], [167.6, 63.6], [165.1, 55.2],
          [165.1, 62.7], [168.9, 56.6], [162.6, 53.9], [164.5, 63.2], [176.5, 73.6],
          [168.9, 62.0], [175.3, 63.6], [159.4, 53.2], [160.0, 53.4], [170.2, 55.0],
          [162.6, 70.5], [167.6, 54.5], [162.6, 54.5], [160.7, 55.9], [160.0, 59.0],
          [157.5, 63.6], [162.6, 54.5], [152.4, 47.3], [170.2, 67.7], [165.1, 80.9],
          [172.7, 70.5], [165.1, 60.9], [170.2, 63.6], [170.2, 54.5], [170.2, 59.1],
          [161.3, 70.5], [167.6, 52.7], [167.6, 62.7], [165.1, 86.3], [162.6, 66.4],
          [152.4, 67.3], [168.9, 63.0], [170.2, 73.6], [175.2, 62.3], [175.2, 57.7],
          [160.0, 55.4], [165.1, 104.1], [174.0, 55.5], [170.2, 77.3], [160.0, 80.5],
          [167.6, 64.5], [167.6, 72.3], [167.6, 61.4], [154.9, 58.2], [162.6, 81.8],
          [175.3, 63.6], [171.4, 53.4], [157.5, 54.5], [165.1, 53.6], [160.0, 60.0],
          [174.0, 73.6], [162.6, 61.4], [174.0, 55.5], [162.6, 63.6], [161.3, 60.9],
          [156.2, 60.0], [149.9, 46.8], [169.5, 57.3], [160.0, 64.1], [175.3, 63.6],
          [169.5, 67.3], [160.0, 75.5], [172.7, 68.2], [162.6, 61.4], [157.5, 76.8],
          [176.5, 71.8], [164.4, 55.5], [160.7, 48.6], [174.0, 66.4], [163.8, 67.3]
          ],
          itemStyle: {
            color: '#ff8dfc' // set a single color for all data points
          }
        },
        
      ]
  }
  
  const initialState = {
    monthly: initialMonthlyData,
    daily: inititalDailyData,
    outage: initialOutageData,
    ondemand: initialOndemandData, // Initialize ondemand data with the hard-coded data
    performance: iniitialPerformanceData,
  };
  
  // Define the reducer function
  const dashboardReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_MONTHLY_DATA:
        return { ...state, monthly: action.payload };
      case SET_DAILY_DATA:
        return { ...state, daily: action.payload };
      case SET_OUTAGE_DATA:
        return { ...state, outage: action.payload };
      case SET_ONDEMAND_DATA:
        return { ...state, ondemand: action.payload };
      case SET_PERFORMANCE_DATA:
        return { ...state, performance: action.payload };
      default:
        return state;
    }
  };
  
  export default dashboardReducer;