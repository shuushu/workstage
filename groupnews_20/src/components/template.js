import Highcharts from "highcharts";
import imgs from "../asset/imgs/auto.jpg";
Highcharts.setOptions({
  lang: {
    thousandsSep: ",",
  },
});

const initHight = (props) => {
  const { categories, text, series } = props;
  Highcharts.chart("chart", {
    chart: {
      type: "bar",
    },
    title: {
      text,
    },
    xAxis: {
      categories,
    },
    yAxis: {
      min: 0,
    },
    legend: {
      reversed: true,
    },
    plotOptions: {
      series: {
        stacking: "normal",
      },
    },
    series,
  });
};

const TEMPLATE = {
  자동개폐장치: `
<div class="help">
    <h6>자동개폐장치란?</h6>
    <div class="parag">
        <img src=${imgs} class="float"  alt="" /> 화재 등 각종재난에 대비하여 설치된 방화문(아파트,빌딩 등)을 평상시에는 잠금상태를 유지하고, 비상 또는 화재시 자동으로 잠금 상태를 해제 할 수 있도록 설치하는 개폐 장치.
    </div>
</div>
`,
};
// 비중구하기
const getPer = (arr) => {
  return arr.map((i) => {
    return Object.entries(i).map(([k, v]) => {
      return Number((v / (arr[0][k] + arr[1][k])).toFixed(2));
    });
  });
};
const 이벤트 = {
  지붕형태() {
    const DATA = [
      {
        미설치: 1189,
        일부설치: 2,
        설치: 5128,
        혼재: 1,
      },
      {
        미설치: 1009,
        일부설치: 12,
        설치: 3128,
        혼재: 3,
      },
    ];
    const arr = getPer(DATA);

    Highcharts.chart("chart", {
      chart: {
        type: "column",
      },
      title: {
        text: "인천/경기 유도등 설치 현황",
      },
      xAxis: {
        categories: ["미설치", "일부설치", "설치", "혼재"],
      },
      yAxis: {
        title: "",
        labels: {
          format: "{value}%",
        },
      },
      credits: {
        enabled: false,
      },
      tooltip: {
        borderRadius: 10,
        formatter: function () {
          const idx = this.series.name === "인천" ? 0 : 1;
          return `<span class="tooltip">${this.series.name}: <strong>${
            DATA[idx][this.x]
          }개 ${this.x}</strong></span>`;
        },
      },
      plotOptions: {
        column: {
          stacking: "percent",
        },
      },
      series: [
        {
          name: "인천",
          data: arr[0],
        },
        {
          name: "경기도",
          data: arr[1],
        },
      ],
    });
  },
  유도등설치여부() {
    const DATA = [
      {
        미설치: 1189,
        일부설치: 2,
        설치: 5128,
        혼재: 1,
      },
      {
        미설치: 1009,
        일부설치: 12,
        설치: 3128,
        혼재: 3,
      },
    ];
    const arr = getPer(DATA);

    Highcharts.chart("chart", {
      chart: {
        type: "column",
      },
      title: {
        text: "인천/경기 유도등 설치 현황",
      },
      xAxis: {
        categories: ["미설치", "일부설치", "설치", "혼재"],
      },
      yAxis: {
        title: "",
        labels: {
          format: "{value}%",
        },
      },
      credits: {
        enabled: false,
      },
      tooltip: {
        borderRadius: 10,
        formatter: function () {
          const idx = this.series.name === "인천" ? 0 : 1;
          return `<span class="tooltip">${this.series.name}: <strong>${
            DATA[idx][this.x]
          }개 ${this.x}</strong></span>`;
        },
      },
      plotOptions: {
        column: {
          stacking: "percent",
        },
      },
      series: [
        {
          name: "인천",
          data: arr[0],
        },
        {
          name: "경기도",
          data: arr[1],
        },
      ],
    });
  },
  옥상출입문재질() {
    Highcharts.chart("chart", {
      chart: {
        type: "column",
      },
      title: {
        text: "인천/경기 출입문 재질 현황",
      },
      xAxis: {
        categories: ["방화문 ", "불연재", "가연재", "혼재", "기타"],
        labels: {
          style: {
            fontSize: "12px",
          },
        },
      },
      yAxis: {
        title: "",
        labels: {
          format: "{value:,.0f}",
          style: {
            fontSize: "12px",
          },
        },
      },

      tooltip: {
        borderRadius: 10,
        formatter: function () {
          return `<span class="tooltip">${this.series.name} 출입문 재질: <strong>${this.x} ${this.y}</strong>단지</span>`;
        },
      },
      credits: {
        enabled: false,
      },
      series: [
        {
          name: "인천",
          data: [5790, 481, 24, 8, 17],
        },
        {
          name: "경기도",
          data: [7790, 1381, 124, 80, 170],
        },
      ],
    });
  },
  옥상출입문개방관리() {
    Highcharts.chart("chart", {
      chart: {
        type: "column",
      },
      title: {
        text: "인천/경기 출입문 개방 관리 현황",
      },
      xAxis: {
        categories: [
          "열쇠 또는 번호키 ",
          "자동개폐장치",
          "항시개방",
          "수동개방장치",
          "원격개방장치",
          "폐쇄",
          "혼재",
        ],
        labels: {
          style: {
            fontSize: "12px",
          },
        },
      },
      yAxis: {
        title: "",
        labels: {
          format: "{value:,.0f}",
          style: {
            fontSize: "12px",
          },
        },
      },

      tooltip: {
        borderRadius: 10,
        formatter: function () {
          return `<span class="tooltip">${this.series.name}: <strong>${this.x} ${this.y}</strong>단지</span>`;
        },
      },
      credits: {
        enabled: false,
      },
      series: [
        {
          name: "인천",
          data: [1294, 1677, 1334, 14, 23, 13, 15],
        },
        {
          name: "경기도",
          data: [1694, 2677, 1934, 4, 3, 3, 5],
        },
      ],
    });
    document.getElementById("md-contents").innerHTML = TEMPLATE["자동개폐장치"];
  },
  옥상출입문위치() {
    Highcharts.chart("chart", {
      chart: {
        type: "column",
      },
      title: {
        text: "인천/경기 출입문 위치 현황",
      },
      xAxis: {
        categories: [
          "최상층",
          "최상층 아래층",
          "최상층 2개층 아래층",
          "수동개방장치",
          "혼재",
          "기타",
        ],
        labels: {
          style: {
            fontSize: "12px",
          },
        },
      },
      yAxis: {
        title: "",
        labels: {
          format: "{value:,.0f}",
          style: {
            fontSize: "12px",
          },
        },
      },

      tooltip: {
        borderRadius: 10,
        formatter: function () {
          return `<span class="tooltip">${this.series.name} 옥상 출입문 위치: <strong>${this.x} ${this.y}</strong>단지</span>`;
        },
      },
      credits: {
        enabled: false,
      },
      series: [
        {
          name: "인천",
          data: [2062, 1677, 12, 22, 15],
        },
        {
          name: "경기도",
          data: [4062, 2158, 17, 79, 4],
        },
      ],
    });
  },
  대피공간내난간설치() {
    Highcharts.chart("chart", {
      chart: {
        type: "column",
      },
      title: {
        text: "인천/경기 대피 공간 내 난간 설치 현황",
      },
      xAxis: {
        categories: ["설치", "미설치", "알수없음", "일부설치"],
        labels: {
          style: {
            fontSize: "12px",
          },
        },
      },
      yAxis: {
        title: "",
        labels: {
          format: "{value:,.0f}",
          style: {
            fontSize: "12px",
          },
        },
      },

      tooltip: {
        borderRadius: 10,
        formatter: function () {
          return `<span class="tooltip">${this.series.name} 난간 설치 현황: <strong>${this.x} ${this.y}</strong>단지</span>`;
        },
      },
      credits: {
        enabled: false,
      },
      series: [
        {
          name: "인천",
          data: [3921, 985, 101, 10],
        },
        {
          name: "경기도",
          data: [4921, 1085, 301, 13],
        },
      ],
    });
  },
};

const showContents = (props) => {
  initHight(props);
};

export default showContents;
