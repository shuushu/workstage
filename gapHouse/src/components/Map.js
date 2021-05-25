import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import ko from "@amcharts/amcharts4/lang/ko_KR";
import POINT_NAME from "../asset/data/labels";
import populations from "../asset/data/map";
import geo from "../asset/data/select.json";
import timeline from "../asset/data/timeline";
import point from "../asset/data/point_area";

import { SliderBar, LineChart, MapChart } from "./Chart";
// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end
let populations2;
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
export default async function getData() {
  let temp = [];
  let temp2 = [];
  let obj = {};

  for (let key of POINT_NAME) {
    obj[key] = Number(Number.parseFloat(Math.random() * 100).toFixed(0));
  }
  populations2 = obj;

  let i = 1,
    max = 13;
  for (; i < max; i++) {
    let date = `2020-${i < 10 ? `0${i}` : i}-05`;
    let obj = {
      date,
      list: [],
    };
    for (let key of POINT_NAME) {
      await obj.list.push({
        김용현: Number(Number.parseFloat(Math.random() * 100).toFixed(0)),
        강선범: Number(Number.parseFloat(Math.random() * 100).toFixed(0)),
        진현철: Number(Number.parseFloat(Math.random() * 100).toFixed(0)),
        육정순: Number(Number.parseFloat(Math.random() * 100).toFixed(0)),
        id: key,
      });
    }
    temp.push(obj);
    temp2.push({
      김용현: Number(Number.parseFloat(Math.random() * 100).toFixed(0)),
      강선범: Number(Number.parseFloat(Math.random() * 100).toFixed(0)),
      진현철: Number(Number.parseFloat(Math.random() * 100).toFixed(0)),
      육정순: Number(Number.parseFloat(Math.random() * 100).toFixed(0)),
      date,
    });
  }

  g.point_area = temp;
  g.timeline = temp2;
  g.lastDate = new Date(g.timeline[g.timeline.length - 1].date);
  g.lineChartSeries = {};
  //await delay()

  const mapChart = new MapChart("chartdiv");
  const INIT_STR = "김용현";
  const CUSTOM = {
    김용현: am4core.color("#ff8726"),
    강선범: am4core.color("#d21a1a"),
    진현철: am4core.color("#45d21a"),
    육정순: am4core.color("#1c5fe5"),
  };
  mapChart.setColor(CUSTOM);
  mapChart.setKeyName(INIT_STR);
  const linechart = new LineChart("linechart");
  Object.entries(CUSTOM).forEach(([key, value]) => {
    g.lineChartSeries[key] = linechart.addSeries(key, value);
  });
  const sliderBar = new SliderBar("playBtn");
  linechart.setColor(CUSTOM);
  linechart.setKeyName(INIT_STR);
  linechart.addClick((v) => {
    //if (!linechart.linechart.legendDown) {
    sliderBar.start =
      linechart.lineChart.cursor.xPosition *
      ((linechart.dateAxis.max - linechart.dateAxis.min) /
        (g.lastDate.getTime() - linechart.dateAxis.min));
    //}
    //console.log(sliderBar.start);
  });
  // 클래스연결
  linechart.adapter(mapChart);
  // 외부돔(탭) 이벤트 바인딩
  addEventCategory(linechart.handleButtonClick.bind(linechart));
  setTimeout(() => {
    g.lineChartSeries[INIT_STR].show();
  }, 100);
  sliderBar.updateMapData = (slider) => {
    let { bubbleSeries, polygonSeries } = mapChart;

    bubbleSeries.dataItems.each(function (dataItem) {
      dataItem.dataContext.confirmed = 0;
      dataItem.dataContext.deaths = 0;
      dataItem.dataContext.recovered = 0;
      dataItem.dataContext.active = 0;
    });
    for (let i = 0; i < slider.data.length; i++) {
      const di = slider.data[i];
      const image = bubbleSeries.getImageById(di.id);
      const polygon = polygonSeries.getPolygonById(di.id);
      if (image) {
        var population = Number(populations2[image.dataItem.dataContext.id]);
        // image.dataItem.dataContext.confirmed = di.confirmed;
        // image.dataItem.dataContext.deaths = di.deaths;
        // image.dataItem.dataContext.recovered = di.recovered;
        // image.dataItem.dataContext.active = di.confirmed - di.recovered - di.deaths;
        Object.entries(di).forEach(([k, v]) => {
          if (k !== "id") {
            //let key = setToOrigin(k);
            image.dataItem.dataContext[k] = v;
          }
        });
        //bubbleSeries.heatRules.getIndex(0).max = di['김용현']
      }
      bubbleSeries.heatRules.getIndex(0).maxValue = 30;
      polygonSeries.heatRules.getIndex(0).maxValue = 30;

      bubbleSeries.invalidateRawData();
      polygonSeries.invalidateRawData();
    }
    //await amInit();
    //await sideBottom();
  };

  //g.timeline = timeline;
  //g.point_area = point;
}
