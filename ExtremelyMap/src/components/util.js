import Highcharts from "highcharts";
import { GoogleSpreadsheet } from "google-spreadsheet";

Highcharts.setOptions({
  lang: {
    thousandsSep: ",",
  },
});

async function callSheet(url, sheetName) {
  const doc = new GoogleSpreadsheet(url);
  await doc.useApiKey("AIzaSyBudarQhMv3AL0900S8zFiM2HN7UaEu5_A");
  await doc.loadInfo();
  const sheet = doc.sheetsByTitle[sheetName]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
  const rows = await sheet.getRows(); // can pass in { limit, offset }
  return rows;
}

function barChart(categories, series) {
  if (!categories || !series) {
    return "데이터 없음";
  }
  Highcharts.chart("chart", {
    chart: {
      type: "bar",
    },
    title: {
      text: "",
    },
    xAxis: {
      categories,
      title: {
        text: null,
      },
      labels: {
        style: {
          fontWeight: "bold",
          color: "black",
          fontSize: "12px",
        },
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: "",
        align: "high",
      },
      labels: {
        overflow: "justify",
        style: {
          fontWeight: "bold",
          color: "black",
        },
      },
    },
    tooltip: {
      valueSuffix: "%",
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true,
        },
      },
    },
    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "top",
      x: 10,
      y: 10,
      floating: true,
      borderWidth: 1,
      backgroundColor:
        Highcharts.defaultOptions.legend.backgroundColor || "#FFFFFF",
      shadow: true,
    },
    credits: {
      enabled: false,
    },
    series,
  });
}

const getBarChartData = (v) => {
  // 하이챠트 바 형태로 데이터 추출
  let keyName = [
    "시도",
    "더불어민주당_득표율",
    "자유한국당_득표율",
    "국민의당_득표율",
    "바른정당_득표율",
    "정의당_득표율",
    "기타",
  ];
  let obj = {};
  keyName.forEach((key) => {
    obj[key] = [];
  });
  // 키값 자동화처리
  Object.entries(v).forEach(([c, value]) => {
    keyName.forEach((key) => {
      let v = Number(value[key]);
      obj[key].push(Number.isNaN(v) ? value[key] : v);
    });
  });
  // 다시 한번 형식에 맞게 정제
  return {
    categories: obj["시도"],
    series: [
      {
        name: "문재인",
        data: obj["더불어민주당_득표율"],
        color: "#3756d4",
      },
      {
        name: "홍준표",
        data: obj["자유한국당_득표율"],
        color: "#f22b2b",
      },
      {
        name: "안철수",
        data: obj["국민의당_득표율"],
        color: "#f95b09",
      },
      {
        name: "심상정",
        data: obj["정의당_득표율"],
        color: "#fdb72d",
      },
      {
        name: "유승민",
        data: obj["바른정당_득표율"],
        color: "#2dacfd",
      },
      {
        name: "기타",
        data: obj["기타"],
        color: "#cccccc",
      },
    ],
  };
};

export { callSheet, barChart, getBarChartData };
