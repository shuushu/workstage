import * as am4core from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

import { SliderBar, LineChart, MapChart } from "./Chart";
import test from "../asset/data/test.json";
import { 배경주 } from "../asset/data/house";

// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end
let g = window;

function delay() {
  return new Promise((resolve) => setTimeout(resolve, 3000));
}

// swipertab 이벤트 바인딩
function addEventCategory(listener) {
  const items = document.querySelectorAll("#sideBottom .MuiChip-root");
  if (items.length > 0) {
    items.forEach((i) => {
      i.addEventListener("click", listener);
    });
  }
}

// parameter is react setState
export default async function getData(callback) {
  let temp = [];
  let temp2 = [];
  let obj = {};
  const LABEL = 배경주.area;
  for (let key of LABEL) {
    obj[key] = Number(Number.parseFloat(Math.random() * 100).toFixed(0));
  }
  let i = 1,
    max = 13;
  for (; i < max; i++) {
    let date = `2020-${i < 10 ? `0${i}` : i}-05`;
    let obj = {
      date,
      list: [],
    };
    for (let key of LABEL) {
      await obj.list.push({
        소유: Number(Number.parseFloat(Math.random() * 100).toFixed(0)),
        가압류: Number(Number.parseFloat(Math.random() * 100).toFixed(0)),
        신탁: Number(Number.parseFloat(Math.random() * 100).toFixed(0)),
        압류: Number(Number.parseFloat(Math.random() * 100).toFixed(0)),
        id: key,
      });
    }
    temp.push(obj);

    temp2.push({
      소유: Number(Number.parseFloat(Math.random() * 100).toFixed(0)),
      가압류: Number(Number.parseFloat(Math.random() * 100).toFixed(0)),
      신탁: Number(Number.parseFloat(Math.random() * 100).toFixed(0)),
      압류: Number(Number.parseFloat(Math.random() * 100).toFixed(0)),
      date,
    });
  }

  g.point_area = temp;
  g.timeline = temp2;
  g.lastDate = new Date(g.timeline[g.timeline.length - 1].date);
  g.lineChartSeries = {};

  const sliderBar = new SliderBar("playBtn");
  const linechart = new LineChart("linechart");
  const mapChart = new MapChart(test);
  const INIT_STR = "소유";
  const CUSTOM = {
    소유: am4core.color("#ff8726"),
    가압류: am4core.color("#d21a1a"),
    신탁: am4core.color("#45d21a"),
    압류: am4core.color("#1c5fe5"),
  };
  Object.entries(CUSTOM).forEach(([key, value]) => {
    g.lineChartSeries[key] = linechart.addSeries(key, value);
  });
  mapChart.init("chartdiv");
  mapChart.setColor(CUSTOM);
  mapChart.setKeyName(INIT_STR);
  // 초깃값 셋팅
  //mapChart.updateChart(INIT_STR);
  //mapChart.updateChart("가압류");
  mapChart.updateChart2(mapChart.bubbleArr[0], INIT_STR);
  mapChart.updateChart2(mapChart.bubbleArr[1], "가압류");
  // 라벨 표출
  mapChart.drawLabel(LABEL);
  // mapChart.mapChart.maxZoomLevel = 1;
  // mapChart.mapChart.seriesContainer.draggable = false;
  // mapChart.mapChart.seriesContainer.resizable = false;
  // 클래스연결
  linechart.adapter(mapChart);
  linechart.setColor(CUSTOM);
  linechart.addClick(() => {
    if (!linechart.lineChart.legendDown) {
      sliderBar.slider.start =
        linechart.lineChart.cursor.xPosition *
        ((linechart.dateAxis.max - linechart.dateAxis.min) /
          (g.lastDate.getTime() - linechart.dateAxis.min));
    }
  });

  // 외부돔(탭) 이벤트 바인딩
  addEventCategory(linechart.handleButtonClick.bind(linechart));
  setTimeout(() => {
    g.lineChartSeries[INIT_STR].show();
  }, 100);

  // 슬라이드바 이벤트 바인딩
  sliderBar.updateTotalData = (index) => {
    // react setState
    // {소유: 59, 가압류: 31, 신탁: 6, 압류: 90}
    let data = Object.entries(g.timeline[index]).map(([k, v]) => {
      return { name: k, data: v };
    });
    data.pop();
    callback(data);
  };
  sliderBar.updateMapData = (data) => {
    // 멀티플업데이트
    let { bubbleArr, polygonSeries } = mapChart;

    bubbleArr.forEach((v) => {
      v.dataItems.each(function (dataItem) {
        dataItem.dataContext.confirmed = 0;
        dataItem.dataContext.deaths = 0;
        dataItem.dataContext.recovered = 0;
        dataItem.dataContext.active = 0;
      });
      for (let i = 0; i < data.length; i++) {
        const di = data[i];
        const image = v.getImageById(di.id);
        if (image) {
          Object.entries(di).forEach(([k, v]) => {
            if (k !== "id") {
              image.dataItem.dataContext[k] = v;
            }
          });
        }
        // 맥스값 변경시 Nagative value Error 발생
        //v.heatRules.getIndex(0).maxValue = 40;
        //polygonSeries.heatRules.getIndex(0).maxValue = 40;
        v.invalidateRawData();
        polygonSeries.invalidateRawData();
      }
    });
  };
  // 단일업데이트
  /* sliderBar.updateMapData = (data) => {
    let { bubbleSeries, polygonSeries } = mapChart;

    bubbleSeries.dataItems.each(function (dataItem) {
      dataItem.dataContext.confirmed = 0;
      dataItem.dataContext.deaths = 0;
      dataItem.dataContext.recovered = 0;
      dataItem.dataContext.active = 0;
    });
    for (let i = 0; i < data.length; i++) {
      const di = data[i];
      const image = bubbleSeries.getImageById(di.id);
      if (image) {
        Object.entries(di).forEach(([k, v]) => {
          if (k !== "id") {
            image.dataItem.dataContext[k] = v;
          }
        });
      }
      bubbleSeries.heatRules.getIndex(0).maxValue = 40;
      polygonSeries.heatRules.getIndex(0).maxValue = 40;

      bubbleSeries.invalidateRawData();
      polygonSeries.invalidateRawData();
    }
  }; */
  //sliderBar.play();

  // 버튼 스타일 변경
  const btn = document.querySelectorAll(
    `g[aria-labelledby="id-61-title"] path`
  );
  await delay(1000);
  if (btn[0]) {
    btn[0].setAttribute(
      "d",
      "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
    );
    btn[0].setAttribute("style", "opacity: 1");
  }

  g.mapChart = mapChart;
  g.sliderBar = sliderBar;
  g.linechart = linechart;
}
