import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4maps from "@amcharts/amcharts4/maps";
import southKoreaHigh from "@amcharts/amcharts4-geodata/southKoreaHigh";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import ko from "@amcharts/amcharts4/lang/ko_KR";
import geo from "../asset/data/select.json";
import ttt from "../asset/data/ttt.js";
am4core.useTheme(am4themes_animated);

let chart, polygonSeries;
function makeLabels() {
  /* Create map polygon series */
  polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
  /* Make map load polygon (like country names) data from GeoJSON */
  polygonSeries.useGeodata = true;
  // Configure label series
  var labelSeries = chart.series.push(new am4maps.MapImageSeries());
  var labelTemplate = labelSeries.mapImages.template.createChild(am4core.Label);
  labelTemplate.horizontalCenter = "middle";
  labelTemplate.verticalCenter = "middle";
  labelTemplate.fontSize = 12;
  labelTemplate.interactionsEnabled = false;
  labelTemplate.nonScaling = true;
  labelTemplate.fillOpacity = 0.3;

  const name = [
    "수원 장안구",
    "수원 권선구",
    "수원 팔달구",
    "수원 영통구",
    "성남 수정구",
    "성남 중원구",
    "성남 분당구",
    "의정부시",
    "안양시만안구",
    "안양시동안구",
    "부천시",
    "광명시",
    "평택시",
    "동두천시",
    "안산상록구",
    "안산단원구",
    "덕양구",
    "일산동구",
    "일산서구",
    "과천시",
    "구리시",
    "남양주시",
    "오산시",
    "시흥시",
    "군포시",
    "의왕시",
    "하남시",
    "용인처인구",
    "용인기흥구",
    "용인수지구",
    "파주시",
    "이천시",
    "안성시",
    "김포시",
    "화성시",
    "광주시",
    "양주시",
    "포천시",
    "여주시",
    "연천군",
    "가평군",
    "양평군",
    "종로구",
    "중구",
    "용산구",
    "성동구",
    "광진구",
    "동대문구",
    "중랑구",
    "성북구",
    "강북구",
    "도봉구",
    "노원구",
    "은평구",
    "서대문구",
    "마포구",
    "양천구",
    "강서구",
    "구로구",
    "금천구",
    "영등포구",
    "동작구",
    "관악구",
    "서초구",
    "강남구",
    "송파구",
    "강동구",
    "중구",
    "동구",
    "미추홀구",
    "연수구",
    "남동구",
    "부평구",
    "계양구",
    "서구",
    "강화군",
  ];
  // Set up label series to populate
  polygonSeries.events.on("inited", function () {
    for (var i = 0; i < name.length - 1; i++) {
      var polygon = polygonSeries.getPolygonById(name[i]);

      if (polygon) {
        var label = labelSeries.mapImages.create();
        var state = polygon.dataItem.dataContext.id;
        label.latitude = polygon.visualLatitude;
        label.longitude = polygon.visualLongitude;
        label.children.getIndex(0).text = state;
      }
    }
  });
}

function setPolygon() {
  /* Configure series */
  let polygonTemplate = polygonSeries.mapPolygons.template;
  polygonTemplate.applyOnClones = true;
  polygonTemplate.togglable = true;
  polygonTemplate.tooltipText = "{SIG_KOR_NM}";
  polygonTemplate.nonScalingStroke = true;
  polygonTemplate.strokeOpacity = 0.1;
  polygonTemplate.stroke = "#000";
  polygonTemplate.fillOpacity = 0.6;
  let lastSelected;
  /* polygonTemplate.events.on("hit", function (ev) {
    if (lastSelected) {
      // This line serves multiple purposes:
      // 1. Clicking a country twice actually de-activates, the line below
      //    de-activates it in advance, so the toggle then re-activates, making it
      //    appear as if it was never de-activated to begin with.
      // 2. Previously activated countries should be de-activated.
      lastSelected.isActive = false;
    }
    ev.target.series.chart.zoomToMapObject(ev.target);
    if (lastSelected !== ev.target) {
      lastSelected = ev.target;
    }
  }); */
}

export default function call() {
  //window.homeMap.dispose();
  chart = am4core.create("chartdiv2", am4maps.MapChart);

  chart.geodata = ttt;
  chart.projection = new am4maps.projections.Miller();
  chart.language.locale = ko;
  chart.reverseGeodata = true;
  /* Set projection */

  window.homeMap = chart;
  // 라벨
  makeLabels();
  setPolygon();
}
