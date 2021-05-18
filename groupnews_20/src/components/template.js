import Highcharts from "highcharts";
import darkUnica from "highcharts/themes/dark-unica";

darkUnica(Highcharts);
Highcharts.setOptions({
  lang: {
    thousandsSep: ",",
  },
});

export const data = [
    {
        text: '경기도 지역 옥상출입문 설치 현황',
        categories: ["가평", "고양", "과천", "광명", "광주", "구리", "군포", "김포", "남양주", "동두천", "부천", "분당", "성남", "송탄", "수원", "수원남부", "시흥", "안산", "안성", "안양", "양주", "양평", "여주", "연천", "오산", "용인", "의왕", "의정부", "이천", "일산", "파주", "평택", "포천", "하남", "화성"],
        series: [
        {
            name: "설치",
            data: [38, 245, 10, 102, 115, 97, 169, 173, 329, 54, 524, 126, 102, 94, 244, 247, 283, 132, 74, 265, 117, 51, 41, 32, 90, 663, 222, 137, 151, 267, 172, 163, 44, 110, 345],
        },
        {
            name: "일부설치",
            data: [0, 0, 0, 1, 0, 0, 5, 0, 0, 0, 2, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
        {
            name: "미설치",
            data: [1, 28, 2, 1, 3, 6, 19, 11, 8, 24, 21, 23, 0, 0, 8, 25, 12, 7, 5, 17, 1, 2, 0, 2, 7, 24, 9, 0, 1, 4, 0, 11, 7, 1, 3],
        },
        ],
        target: `chart`
    },
    {
        text: '경기도 지역 옥상 대피공간 현황',
        categories: ["가평", "고양", "과천", "광명", "광주", "구리", "군포", "김포", "남양주", "동두천", "부천", "분당", "성남", "송탄", "수원", "수원남부", "시흥", "안산", "안성", "안양", "양주", "양평", "여주", "연천", "오산", "용인", "의왕", "의정부", "이천", "일산", "파주", "평택", "포천", "하남", "화성"],
        series: [
            {
            name: "있음",
            data: [38, 199, 10, 95, 100, 87, 165, 159, 286, 52, 439, 122, 89, 92, 194, 220, 224, 109, 60, 265, 102, 47, 36, 29, 83, 652, 207, 127, 145, 196, 137, 149, 36, 108, 317],
            },
            {
            name: "없음",
            data: [0, 46, 0, 7, 15, 10, 3, 14, 43, 2, 87, 3, 14, 2, 50, 27, 58, 23, 14, 0, 15, 4, 5, 3, 7, 11, 15, 10, 6, 72, 35, 14, 8, 2, 28],
            },
            {
            name: "혼재/기타",
            data: [0, 0, 0, 1, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            },
        ],
        target: `chart1`
    },
    {
        text: '경기도 지역 지붕 형태 현황',
        categories: ["가평", "고양", "과천", "광명", "광주", "구리", "군포", "김포", "남양주", "동두천", "부천", "분당", "성남", "송탄", "수원", "수원남부", "시흥", "안산", "안성", "안양", "양주", "양평", "여주", "연천", "오산", "용인", "의왕", "의정부", "이천", "일산", "파주", "평택", "포천", "하남", "화성"],
        series: [
            {
            name: "박공",
            data: [8, 96, 5, 29, 56, 40, 57, 67, 140, 24, 128, 80, 30, 24, 130, 94, 116, 68, 29, 93, 51, 6, 14, 11, 32, 140, 52, 0, 31, 201, 69, 51, 23, 24, 135],
            },
            {
            name: "슬라브",
            data: [26, 172, 6, 74, 48, 63, 118, 108, 180, 47, 419, 70, 76, 68, 119, 163, 180, 1, 50, 175, 64, 41, 27, 23, 62, 455, 175, 137, 119, 64, 100, 121, 27, 81, 188],
            },
            {
            name: "혼재",
            data: [5, 5, 1, 1, 14, 0, 18, 9, 17, 7, 0, 0, 5, 3, 3, 15, 0, 70, 0, 14, 3, 7, 0, 0, 3, 92, 4, 0, 2, 7, 3, 2, 1, 6, 25],
            },
        ],
        target: `chart2`
    }
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
    },
    xAxis: {
      categories,
      labels: {
        style: {
          fontSize: '16px',
        }
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
  window.chart = chart;
};



const showContents = (props) => {
  initHight(props);
};

export default showContents;
