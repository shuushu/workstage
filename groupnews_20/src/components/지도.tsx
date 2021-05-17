/* Imports */
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4maps from "@amcharts/amcharts4/maps";
import southKoreaHigh from "@amcharts/amcharts4-geodata/southKoreaHigh";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import ko from "@amcharts/amcharts4/lang/ko_KR";
import { useEffect, useState } from "react";
import { ua } from '../../../components/Util'
am4core.useTheme(am4themes_animated);

const data = {
    '서울': [559, 14],
    '부산': [184, 154],
    '대구': [221, 0],
    '인천': [358, 121],
    '광주': [10, 8],
    '대전': [9, 15],
    '울산': [12, 38],
    '세종': [11, 3],
    '경기도': [123, 74],
    '강원도': [63, 6],
    '충청북도': [2, 9],
    '충청남도': null,
    '전라북도': [14, 1],
    '전라남도': [0, 7],
    '경상북도': [19, 8],
    '경상남도': [24, 11],
    '제주': null,
    '창원': [27, 0],
}

export default function 지도컨텐츠() {
    const [area, setArea] = useState('all');
    useEffect(() => {
        let chart = am4core.create("chartdiv", am4maps.MapChart);

        try {
            //chart.geodata = southKoreaHigh;
            chart.geodataSource.url = "http://fire.assembly-mbc.com/dd.json";
            chart.language.locale = ko;
        }
        catch (e) {
            chart.raiseCriticalError(new Error("Map geodata could not be loaded. Please download the latest <a href=\"https://www.amcharts.com/download/download-v4/\">amcharts geodata</a> and extract its contents into the same directory as your amCharts files."));
        }

/* Set projection */
chart.projection = new am4maps.projections.Miller();

/* Create map polygon series */
let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

/* Make map load polygon (like country names) data from GeoJSON */
polygonSeries.useGeodata = true;

/* Configure series */
let polygonTemplate = polygonSeries.mapPolygons.template;
polygonTemplate.applyOnClones = true;
polygonTemplate.togglable = true;
polygonTemplate.tooltipText = "{name}";
polygonTemplate.nonScalingStroke = true;
polygonTemplate.strokeOpacity = 0.5;
polygonTemplate.fill = chart.colors.getIndex(0);
let lastSelected;
polygonTemplate.events.on("hit", function(ev) {
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
})


/* Create selected and hover states and set alternative fill color */
let ss = polygonTemplate.states.create("active");
ss.properties.fill = chart.colors.getIndex(2);

let hs = polygonTemplate.states.create("hover");
hs.properties.fill = chart.colors.getIndex(4);

// Hide Antarctica
polygonSeries.exclude = ["AQ"];

// Small map
chart.smallMap = new am4maps.SmallMap();
// Re-position to top right (it defaults to bottom left)
chart.smallMap.align = "right";
chart.smallMap.valign = "top";
chart.smallMap.series.push(polygonSeries);

// Zoom control
chart.zoomControl = new am4maps.ZoomControl();

let homeButton = new am4core.Button();
homeButton.events.on("hit", function(){
  chart.goHome();
});

homeButton.icon = new am4core.Sprite();
homeButton.padding(7, 5, 7, 5);
homeButton.width = 30;
homeButton.icon.path = "M16,8 L14,8 L14,16 L10,16 L10,10 L6,10 L6,16 L2,16 L2,8 L0,8 L8,0 L16,8 Z M16,8";
homeButton.marginBottom = 10;
homeButton.parent = chart.zoomControl;
homeButton.insertBefore(chart.zoomControl.plusButton);

    }, [])

    return (
        <div className="home-contents">
            <div id="chartdiv"></div>

        </div>
    )
}