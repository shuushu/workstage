import Highcharts from "highcharts";
import darkUnica from "highcharts/themes/dark-unica";
import { ua } from '../../../components/Util';

darkUnica(Highcharts);
Highcharts.setOptions({
  lang: {
    thousandsSep: ",",
  },
});

export const data = [{
  text: '경기 지역 옥상 대피공간 현황',
  categories: ["가평", "고양", "과천", "광명", "광주", "구리", "군포", "김포", "남양주", "동두천", "부천", "분당", "성남", "송탄", "수원", "수원남부", "시흥", "안산", "안성", "안양", "양주", "양평", "여주", "연천", "오산", "용인", "의왕", "의정부", "이천", "일산", "파주", "평택", "포천", "하남", "화성"],
  series: [{
    name: "있음",
    data: [38, 176, 10, 93, 99, 84, 142, 157, 279, 49, 418, 120, 87, 89, 190, 204, 218, 105, 60, 251, 98, 46, 35, 28, 78, 611, 85, 127, 141, 164, 131, 147, 36, 108, 302],
  },
  {
    name: "없음",
    data: [0, 40, 0, 7, 15, 9, 2, 14, 43, 2, 83, 3, 14, 2, 48, 26, 58, 22, 14, 0, 15, 4, 5, 3, 6, 11, 12, 10, 5, 50, 33, 14, 8, 2, 23],
  },
  {
    name: "혼재/기타",
    data: [1, 15, 2, 2, 3, 7, 25, 10, 8, 23, 23, 25, 8, 1, 9, 21, 14, 7, 5, 16, 1, 3, 0, 2, 8, 24, 7, 0, 1, 4, 2, 11, 6, 1, 6],
  },
  ],
  target: `chart`
},
{
  text: '경기 지역 옥상출입문 설치 위치 현황',
  categories: ["가평", "고양", "과천", "광명", "광주", "구리", "군포", "김포", "남양주", "동두천", "부천", "분당", "성남", "송탄", "수원", "수원남부", "시흥", "안산", "안성", "안양", "양주", "양평", "여주", "연천", "오산", "용인", "의왕", "의정부", "이천", "일산", "파주", "평택", "포천", "하남", "화성"],
  series: [{
    name: "최상층",
    data: [24, 170, 4, 66, 65, 57, 82, 129, 163, 45, 431, 93, 86, 67, 171, 187, 195, 61, 30, 167, 69, 25, 28, 23, 46, 255, 59, 105, 106, 168, 121, 125, 34, 20, 171],
  },
  {
    name: "최상층 아래층",
    data: [9, 46, 6, 28, 48, 36, 67, 42, 147, 6, 60, 32, 15, 21, 68, 36, 80, 67, 44, 73, 40, 22, 12, 7, 32, 357, 31, 29, 35, 41, 45, 36, 10, 89, 149],
  },
  {
    name: "최상층 2개층 아래층",
    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 3, 0, 0, 1, 0, 0, 0, 0, 0],
  },
  {
    name: "혼재",
    data: [6, 15, 2, 8, 4, 7, 20, 10, 20, 23, 33, 23, 8, 4, 8, 27, 15, 6, 5, 27, 4, 6, 0, 3, 14, 34, 11, 3, 6, 8, 0, 11, 6, 2, 11],
  },
  ],
  target: `chart1`
},

{
  text: '경기 지역 옥상출입문 개방관리 현황',
  categories: ["가평", "고양", "과천", "광명", "광주", "구리", "군포", "김포", "남양주", "동두천", "부천", "분당", "성남", "송탄", "수원", "수원남부", "시흥", "안산", "안성", "안양", "양주", "양평", "여주", "연천", "오산", "용인", "의왕", "의정부", "이천", "일산", "파주", "평택", "포천", "하남", "화성"],
  series: [{
    name: "수동개방장치",
    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0],
  },
  {
    name: "열쇠 또는 번호키",
    data: [4, 77, 2, 38, 23, 28, 33, 41, 108, 17, 172, 29, 13, 16, 72, 78, 84, 65, 17, 75, 41, 6, 10, 7, 18, 52, 28, 45, 52, 93, 71, 22, 17, 12, 52],
  },
  {
    name: "원격개방장치",
    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  {
    name: "자동개폐장치",
    data: [6, 77, 4, 31, 71, 48, 46, 117, 172, 12, 89, 66, 45, 54, 125, 75, 116, 40, 29, 102, 58, 18, 19, 6, 51, 113, 38, 65, 36, 100, 68, 93, 15, 78, 241],
  },
  {
    name: "폐쇄",
    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  },
  {
    name: "항시개방",
    data: [28, 76, 4, 32, 20, 19, 78, 13, 41, 24, 252, 30, 44, 21, 42, 82, 79, 22, 25, 77, 16, 28, 11, 19, 17, 480, 49, 27, 57, 22, 28, 46, 12, 16, 35],
  },
  {
    name: "혼재",
    data: [1, 15, 2, 2, 3, 6, 22, 10, 10, 23, 25, 24, 9, 3, 9, 23, 14, 8, 5, 20, 1, 2, 1, 2, 7, 34, 8, 0, 3, 8, 3, 11, 6, 2, 5],
  },
  ],
  target: `chart2`
},
{
  text: '경기 지역 지붕형태 현황',
  categories: ["가평", "고양", "과천", "광명", "광주", "구리", "군포", "김포", "남양주", "동두천", "부천", "분당", "성남", "송탄", "수원", "수원남부", "시흥", "안산", "안성", "안양", "양주", "양평", "여주", "연천", "오산", "용인", "의왕", "의정부", "이천", "일산", "파주", "평택", "포천", "하남", "화성"],
  series: [{
    name: "박공(경사지붕)",
    data: [8, 74, 5, 29, 56, 39, 49, 65, 137, 23, 123, 80, 30, 21, 126, 90, 116, 66, 29, 86, 51, 6, 14, 10, 29, 129, 36, 0, 29, 153, 67, 51, 22, 24, 126],
  },
  {
    name: "슬라프(평지붕)",
    data: [26, 153, 6, 72, 47, 60, 102, 107, 175, 44, 396, 68, 74, 65, 115, 143, 174, 0, 50, 161, 60, 40, 26, 22, 57, 425, 66, 137, 116, 56, 94, 119, 27, 81, 177],
  },
  {
    name: "혼재",
    data: [5, 4, 1, 1, 14, 1, 18, 9, 18, 7, 5, 0, 5, 6, 6, 18, 0, 68, 0, 20, 3, 7, 0, 1, 6, 92, 2, 0, 2, 9, 5, 2, 1, 6, 28],
  },
  ],
  target: `chart`
},
]


const initHight = (props) => {
  const { categories, text, series, target  } = props;
  const node = target || 'chart';
  
  const chart = Highcharts.chart(node, {
    chart: {
      type: "bar",
      height: '100%'
    },
    title: {
      text,
      style: {
        fontSize: ua() ? '14px' : '16px',
      }
    },
    xAxis: {
      categories,
      labels: {
        style: {
          fontSize: ua() ? '14px' : '16px',
        }
      }
    },
    tooltip: {
      formatter: function () {
        let title = this.point.graphic.renderer.cacheKeys[0].split(',')[0];
        return `${title} - ${this.x} : ${this.y} (${this.series.name})`
      },
      style: {
        fontFamily: `"Noto Sans KR", "Apple SD Gothic"`,
        fontSize: '14px',
      }
    },
    yAxis: {
      title: "",
      min: 0,
      max: 100,
      labels: {
        format: "{value}%",
        style: {
          fontSize: '15px',
        }        
      },
    },
    credits: {
      enabled: false,
    },
    legend: {
      reversed: false,
    },
    plotOptions: {
      series: {
        stacking: "percent",
      },
    },
    series,
  }, function (chart) {
    const target = document.querySelector('#modal .md-wrap');
    if(target) {
      var setHeight = function () {
        chart.setSize(target.clientWidht, target.clientHeight);
      }      
      setHeight();
    } else {
      const target = document.querySelector('#tab-contents');
      var setHeight = function () {
        const h = target.clientWidth * 2 > 1000 ? 1000 : target.clientWidth * 2;
        chart.setSize(target.clientWidth, h);
      }      
      setHeight();
    }
  });
};



const showContents = (props) => {
  initHight(props);
};

function barChart(params) {
  const { text, series, categories } = params;
  document.querySelector('#modal .md-wrap').className = 'md-wrap barchart'
  
  const chart = Highcharts.chart('chart', {
      chart: {
        type: 'column'
      },
      title: {
        text
      },
      xAxis: {
        categories,
        crosshair: true
      },
      yAxis: {
        min: 0,
        title: null,
        labels: {
          style: {
            fontSize: '15px',
          }
        },
        
      },
      tooltip: {
        headerFormat: '<span style="font-size:15px">{point.key}</span><table>',
        pointFormat: '<tr><td style="font-size:15px;color:#ccc;padding:2px">{series.name}: </td>' +
          '<td style="font-size:15px;padding:2px"><b>{point.y}</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      series
    });
}

function pieChart(params) {
  const { text, data } = params;
  document.querySelector('#modal .md-wrap').className = 'md-wrap piechart'
  const chart = Highcharts.chart('chart', {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    title: {
      text,
      y: 30
    },
    accessibility: {
      point: {
        valueSuffix: '%'
      }
    },
    tooltip: {
      enabled: false
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        //size: ua() ? 290 : 300,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          //distance: -80,
          format: '<b>{point.name}</b>: {point.percentage:.1f}% ({point.y})',
          style: {
            fontSize: '16px',
            fontFamily: `"Noto Sans KR", "Apple SD Gothic"`,
          }
        }
      }
    },
    series: [
      {
      name: '비율',
      colorByPoint: true,
      data
    }]
  });
  chart.setClassName('piechart')
}
	

export default showContents;
export {
  barChart,
  pieChart
}