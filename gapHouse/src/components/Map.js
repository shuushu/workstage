import * as am4core from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

import { SliderBar, LineChart, MapChart } from "./Chart";
import test from "../asset/data/emd.json";
import sigu from "../asset/data/select.json";
import {
  상태현황전체데이터,
  total,
  dong,
  매입시점전체데이터,
} from "../asset/data/house";

// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end
let g = window;

function delay() {
  return new Promise((resolve) => setTimeout(resolve, 3000));
}

// parameter is react setState
export default  function getData(callback , DATA) {
  let temp = [];
  let obj = {};
  const INIT_STR = "소유";
  const CUSTOM = {
    소유: am4core.color("#ff8726"),
    강제경매개시: am4core.color("#d21a1a"),
    압류: am4core.color("#7d47ff"),
  };
  g[g.KEY] = {};
  const LABEL = dong;

  g[g.KEY].point_area = DATA;
  g[g.KEY].timeline = 상태현황전체데이터;
  g[g.KEY].lastDate = new Date(
    g[g.KEY].timeline[g[g.KEY].timeline.length - 1].date
  );
  g[g.KEY].lineChartSeries = {};

  const sliderBar = new SliderBar("playBtn");
  const linechart = new LineChart("linechart");
  const mapChart = new MapChart(test);

  Object.entries(CUSTOM).forEach(([key, value]) => {
    g[g.KEY].lineChartSeries[key] = linechart.addSeries(key, value);
  });
  mapChart.mInit("chartdiv", 3);
  mapChart.setColor(CUSTOM);
  mapChart.setKeyName(INIT_STR);

  // 초깃값 셋팅
  mapChart.updateChart2(mapChart.bubbleArr[0], '소유');
  mapChart.updateChart2(mapChart.bubbleArr[1], "압류");
  mapChart.updateChart2(mapChart.bubbleArr[2], "강제경매개시");
  // 라벨 표출
  mapChart.drawLabel(LABEL);
  mapChart.mapChart.homeZoomLevel = 5;
  mapChart.mapChart.homeGeoPoint = {
    latitude: 37.487,
    longitude: 126.878,
  };
  // 클래스연결
  linechart.adapter(mapChart);
  linechart.setColor(CUSTOM);
  linechart.addClick(() => {
    g[g.KEY].mapChart.mapChart.reverseGeodata = true;
    if (!linechart.lineChart.legendDown) {
      sliderBar.slider.start =
        linechart.lineChart.cursor.xPosition *
        ((linechart.dateAxis.max - linechart.dateAxis.min) /
          (g[g.KEY].lastDate.getTime() - linechart.dateAxis.min));
    }
  });

  setTimeout(() => {
    if (g[g.KEY].lineChartSeries) {
      g[g.KEY].lineChartSeries[INIT_STR].show();
    }
  }, 100);

  // 슬라이드바 이벤트 바인딩
  sliderBar.updateTotalData = (index) => {
    // react setState
    let data = Object.entries(g[g.KEY].timeline[index]).map(([k, v]) => {
      return { name: k, data: v };
    });
    data.pop();
    g.setDateValue(g[g.KEY].timeline[index].date);
    // 라인차트 라벨
    callback(data);
  };
  sliderBar.updateMapData = (data, d) => {
    // 멀티플업데이트    
    let { bubbleArr, polygonSeries } = mapChart;    
    
    bubbleArr.forEach((v) => {      
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
        if (v.dataFields.value === '압류') {
          let MAX = 10;          
          if (d < 72) {
            MAX = 1;
          } else if (d >= 72 && d < 85) {
            MAX = 5;
          } else if (d >= 85 && d < 93) {
            MAX = 10;
          } else if (d >= 93 && d < 100) {
            MAX = 15;
          } else if (d >= 100 && d < 104) {
            MAX = 22;
          } else if (d >= 104 && d < 108) {
            MAX = 25;
          } else if (d >= 108 && d < 121) {
            MAX = 30;
          }

          v.heatRules.getIndex(0).max = MAX;
        } else if (v.dataFields.value === '소유') {
          let MAX = 10;
          if (d < 30) {
            MAX = 2;
          } else if (d >= 30 && d < 45) {
            MAX = 8;
          } else if (d >= 45 && d < 48) {
            MAX = 14;
          } else if (d >= 47 && d < 50) {
            MAX = 20;
          } else if (d >= 50 && d < 55) {
            MAX = 25;
          } else if (d >= 55 && d < 57) {
            MAX = 35;
          } else if (d >= 55 && d < 60) {
            MAX = 45;
          } else if (d >= 60 && d < 65) {
            MAX = 50;
          } else if (d >= 65 && d < 85) {
            MAX = 45;
          } else if (d >= 85 && d < 97) {
            MAX = 43;
          } else if (d >= 97 && d < 100) {
            MAX = 35;
          } else if (d >= 100 && d < 103) {
            MAX = 30;
          } else if (d >= 103 && d < 108) {
            MAX = 20;
          } else if (d >= 108 && d < 109) {
            MAX = 15;
          } else {
            MAX = 10;
          }
          v.heatRules.getIndex(0).max = MAX;
        } else {
          let MAX = 10;
          if (d < 95) {
            MAX = 1;
          } else if (d >= 95 && d < 100) {
            MAX = 2
          } else if (d >= 100 && d < 102) {
            MAX = 10;
          } else if (d >= 102 && d < 105) {
            MAX = 20;
          } else if (d >= 105 && d < 107) {
            MAX = 25;
          } else {
            MAX = 26;
          }

          v.heatRules.getIndex(0).max = 10;
        }
        
        //v.heatRules.getIndex(0).max = MAX;
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


  g[g.KEY].mapChart = mapChart;
  g[g.KEY].sliderBar = sliderBar;
  g[g.KEY].linechart = linechart;
  g[g.KEY].name = g.KEY;
}

export function TotalDraw() {
  let temp = [];
  const CUSTOM = {
    세대기준: am4core.color("#de4949"),
    빌라기준: am4core.color("#6349de"),
  };

  const INIT_STR = "세대기준";
  const LABEL = [];
  // for (let key of LABEL) {
  //   obj[key] = Number(Number.parseFloat(Math.random() * 100).toFixed(0));
  // }
  let i = 1,
    max = 2;
  for (; i < max; i++) {
    let date = `2020-${i < 10 ? `0${i}` : i}-05`;
    let obj = {
      date,
      list: [],
    };
    total.forEach((v) => {
      const { name, 세대기준, 빌라기준 } = v;
      LABEL.push(name);
      obj.list.push({
        세대기준: 세대기준,
        빌라기준: 빌라기준,
        id: name,
      });
    });

    temp.push(obj);
  }

  g[g.KEY] = {
    point_area: temp,
  };

  const mapChart = new MapChart(sigu);
  mapChart.initSingle("chartdiv2");
  mapChart.setColor(CUSTOM);
  mapChart.setKeyName(INIT_STR);
  // 초깃값 셋팅
  mapChart.updateChart(INIT_STR);
  // 라벨 표출
  mapChart.drawLabel(LABEL);
  mapChart.mapChart.homeZoomLevel = 3;
  mapChart.mapChart.homeGeoPoint = {
    latitude: 37.487,
    longitude: 126.878,
  };

  g[g.KEY].mapChart2 = mapChart;
}

export function buyDraw(callback, DATA) {
  const INIT_STR = "매입";
  const CUSTOM = {
    매입: am4core.color("#1c5fe5"),
  };
  const LABEL = dong;
  g[g.KEY] = {};

  g[g.KEY].point_area = DATA;
  g[g.KEY].timeline = 매입시점전체데이터;
  g[g.KEY].lastDate = new Date(
    g[g.KEY].timeline[g[g.KEY].timeline.length - 1].date
  );
  g[g.KEY].lineChartSeries = {};

  const mapChart = new MapChart(test);

  mapChart.mInit("chartdiv3", 1);
  mapChart.setColor(CUSTOM);
  mapChart.setKeyName(INIT_STR);

  // 초깃값 셋팅
  mapChart.updateChart2(mapChart.bubbleArr[0], INIT_STR);
  // 라벨 표출
  mapChart.drawLabel(LABEL);
  mapChart.mapChart.homeZoomLevel = 5;
  mapChart.mapChart.homeGeoPoint = {
    latitude: 37.487,
    longitude: 126.878,
  };
  // 홈에서는 슬라이드, 라인차트 안보여줌
  // 클래스연결
  //if (callback !== null) {
  const sliderBar = new SliderBar("playBtn3");
  const linechart = new LineChart("linechart3");
  Object.entries(CUSTOM).forEach(([key, value]) => {
    g[g.KEY].lineChartSeries[key] = linechart.addSeries(key, value);
  });
  linechart.adapter(mapChart);
  linechart.setColor(CUSTOM);
  linechart.addClick(() => {
    if (!linechart.lineChart.legendDown) {
      sliderBar.slider.start =
        linechart.lineChart.cursor.xPosition *
        ((linechart.dateAxis.max - linechart.dateAxis.min) /
          (g[g.KEY].lastDate.getTime() - linechart.dateAxis.min));
    }
  });

  setTimeout(() => {
    if (g[g.KEY].lineChartSeries) {
      g[g.KEY].lineChartSeries[INIT_STR].show();
    }
  }, 100);

  // 슬라이드바 이벤트 바인딩
  sliderBar.updateTotalData = (index) => {
    // react setState
    // {소유: 59, 가압류: 31, 신탁: 6, 압류: 90}
    let data = Object.entries(g[g.KEY].timeline[index]).map(([k, v]) => {
      return { name: k, data: v };
    });
    data.pop();
    g.setDateValue(g[g.KEY].timeline[index].date);

    // 라인차트 라벨
    if (callback !== null) {
      callback(data);
    }
  };
  sliderBar.updateMapData = (data, d) => {
    // 멀티플업데이트
    let { bubbleArr, polygonSeries } = mapChart;
    let MAX = 10;

    if (d < 30) {
      MAX = 3;
    } else if (d >= 30 && d < 45) {
      MAX = 10;
    } else if (d >= 45 && d < 48) {
      MAX = 20;
    } else if (d >= 47 && d < 50) {
      MAX = 30;
    } else if (d >= 50 && d < 55) {
      MAX = 40;
    } else if (d >= 55 && d < 57) {
      MAX = 52;
    } else if (d >= 55 && d < 60) {
      MAX = 60;
    } else if (d >= 60 && d < 65) {
      MAX = 70;
    } else if (d >= 65) {
      MAX = 71;
    }

    bubbleArr.forEach((v) => {
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
        v.heatRules.getIndex(0).max = MAX;
        //polygonSeries.heatRules.getIndex(0).maxValue = 40;
        v.invalidateRawData();
        polygonSeries.invalidateRawData();
      }
    });
  };

  
  g[g.KEY].sliderBar = sliderBar;
  g[g.KEY].linechart = linechart;
  //}
  g[g.KEY].mapChart = mapChart;
  g[g.KEY].name = g.KEY;
}
