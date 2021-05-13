/* Imports */
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4maps from "@amcharts/amcharts4/maps";
import southKoreaHigh from "@amcharts/amcharts4-geodata/southKoreaHigh";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import ko from "@amcharts/amcharts4/lang/ko_KR";
import MapTable from './MapTable.tsx'
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
            chart.geodata = southKoreaHigh;
            chart.language.locale = ko;
        }
        catch (e) {
            chart.raiseCriticalError(new Error("Map geodata could not be loaded. Please download the latest <a href=\"https://www.amcharts.com/download/download-v4/\">amcharts geodata</a> and extract its contents into the same directory as your amCharts files."));
        }

        chart.projection = new am4maps.projections.Mercator();

        // zoomout on background click
        chart.chartContainer.background.events.on("hit", function () { zoomOut() });

        let colorSet = new am4core.ColorSet();
        let morphedPolygon;

        // map polygon series (countries)
        let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
        polygonSeries.useGeodata = true;

        // country area look and behavior
        let polygonTemplate = polygonSeries.mapPolygons.template;
        polygonTemplate.strokeOpacity = 1;
        polygonTemplate.stroke = am4core.color("#ffffff");
        polygonTemplate.strokeWidth = 0.2;
        polygonTemplate.fillOpacity = 0.5;
        if (!ua()) {
            polygonTemplate.tooltipText = "{name}";
        }



        // desaturate filter for countries
        let desaturateFilter = new am4core.DesaturateFilter();
        desaturateFilter.saturation = 0.25;
        polygonTemplate.filters.push(desaturateFilter);

        // take a color from color set
        polygonTemplate.adapter.add("fill", function (fill, target) {
            return colorSet.getIndex(target.dataItem.index + 1);
        })

        // set fillOpacity to 1 when hovered
        let hoverState = polygonTemplate.states.create("hover");
        hoverState.properties.fillOpacity = 1;

        // what to do when country is clicked
        polygonTemplate.events.on("hit", function (event: any) {

            const gn = event.target.dataItem.dataContext.name;
            setArea(gn);
            if (data[gn] !== null) {
                event.target.zIndex = 1000000;
                selectPolygon(event.target);
            } else {
                zoomOut()
                countryLabel.text = '선택 한 지역의 점검 결과 현황이 없습니다.';
                setTimeout(() => {
                    countryLabel.text = '지역을 선택하면 현황을 볼 수 있습니다'
                }, 3000)
            }

        })

        // Pie chart
        let pieChart = chart.seriesContainer.createChild(am4charts.PieChart);
        // Set width/heigh of a pie chart for easier positioning only
        pieChart.width = 100;
        pieChart.height = 100;
        pieChart.hidden = true; // can't use visible = false!

        // because defauls are 50, and it's not good with small countries
        pieChart.chartContainer.minHeight = 1;
        pieChart.chartContainer.minWidth = 1;

        let pieSeries = pieChart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "value";
        pieSeries.dataFields.category = "category";
        pieSeries.data = [
            { value: 100, category: "양호" },
            { value: 20, category: "불량" }
        ];

        let dropShadowFilter = new am4core.DropShadowFilter();
        dropShadowFilter.blur = 4;
        pieSeries.filters.push(dropShadowFilter);

        let sliceTemplate = pieSeries.slices.template;
        sliceTemplate.fillOpacity = 1;
        sliceTemplate.strokeOpacity = 0;

        let activeState = sliceTemplate.states.getKey("active");
        activeState.properties.shiftRadius = 0; // no need to pull on click, as country circle under the pie won't make it good

        let sliceHoverState = sliceTemplate.states.getKey("hover");
        sliceHoverState.properties.shiftRadius = 0; // no need to pull on click, as country circle under the pie won't make it good

        // we don't need default pie chart animation, so change defaults
        let hiddenState = pieSeries.hiddenState;
        hiddenState.properties.startAngle = pieSeries.startAngle;
        hiddenState.properties.endAngle = pieSeries.endAngle;
        hiddenState.properties.opacity = 0;
        hiddenState.properties.visible = false;

        // series labels
        let labelTemplate = pieSeries.labels.template;
        labelTemplate.nonScaling = true;
        labelTemplate.fill = am4core.color("#FFFFFF");
        labelTemplate.fontSize = 10;
        labelTemplate.background = new am4core.RoundedRectangle();
        labelTemplate.background.fillOpacity = 0.9;
        labelTemplate.padding(4, 9, 4, 9);
        labelTemplate.background.fill = am4core.color("#7678a0");


        // we need pie series to hide faster to avoid strange pause after country is clicked
        pieSeries.hiddenState.transitionDuration = 200;

        // country label
        let countryLabel = chart.chartContainer.createChild(am4core.Label);
        countryLabel.text = "지역을 선택하면 현황을 볼 수 있습니다";
        countryLabel.fill = am4core.color("#ccc");
        countryLabel.fontSize = 18;

        countryLabel.hiddenState.properties.dy = 1000;
        countryLabel.defaultState.properties.dy = 0;
        countryLabel.valign = "middle";
        countryLabel.align = "right";
        countryLabel.paddingRight = 50;
        countryLabel.hide(0);
        countryLabel.show();
        window['mapchart'] = chart;
        window['mapchart'].countryLabel = countryLabel;
        // select polygon
        function selectPolygon(polygon) {
            if (morphedPolygon != polygon) {
                let animation = pieSeries.hide();
                if (animation) {
                    animation.events.on("animationended", function () {
                        morphToCircle(polygon);
                    })
                }
                else {
                    morphToCircle(polygon);
                }
            }
        }

        // fade out all countries except selected
        function fadeOut(exceptPolygon) {
            for (var i = 0; i < polygonSeries.mapPolygons.length; i++) {
                let polygon = polygonSeries.mapPolygons.getIndex(i);
                if (polygon != exceptPolygon) {
                    polygon.defaultState.properties.fillOpacity = 0.5;
                    polygon.animate([{ property: "fillOpacity", to: 0.5 }, { property: "strokeOpacity", to: 1 }], polygon.polygon.morpher.morphDuration);
                }
            }
        }

        function zoomOut() {
            if (morphedPolygon) {
                pieSeries.hide();
                morphBack();
                //fadeOut();
                countryLabel.hide();
                morphedPolygon = undefined;
            }
        }

        function morphBack() {
            if (morphedPolygon) {
                morphedPolygon.polygon.morpher.morphBack();
                let dsf = morphedPolygon.filters.getIndex(0);
                dsf.animate({ property: "saturation", to: 0.25 }, morphedPolygon.polygon.morpher.morphDuration);
            }
        }

        function morphToCircle(polygon) {


            let animationDuration = polygon.polygon.morpher.morphDuration;
            // if there is a country already morphed to circle, morph it back
            morphBack();
            // morph polygon to circle
            polygon.toFront();
            polygon.polygon.morpher.morphToSingle = true;
            let morphAnimation = polygon.polygon.morpher.morphToCircle();

            polygon.strokeOpacity = 0; // hide stroke for lines not to cross countries

            polygon.defaultState.properties.fillOpacity = 1;
            polygon.animate({ property: "fillOpacity", to: 1 }, animationDuration);

            // animate desaturate filter
            let filter = polygon.filters.getIndex(0);
            filter.animate({ property: "saturation", to: 1 }, animationDuration);

            // save currently morphed polygon
            morphedPolygon = polygon;

            // fade out all other
            fadeOut(polygon);

            // hide country label
            countryLabel.hide();

            if (morphAnimation) {
                morphAnimation.events.on("animationended", function () {
                    zoomToCountry(polygon);
                })
            }
            else {
                zoomToCountry(polygon);
            }
        }

        function zoomToCountry(polygon) {
            const getName = polygon.dataItem.dataContext.name;
            let lv = 1.5;
            switch (getName) {
                case '경상북도': lv = 1.2;
                    break;
                case '서울': lv = 4;
                    break;
                case '인천': lv = 4;
                    break;
                case '울산': lv = 4;
                    break;
                case '부산': lv = 4;
                    break;
                case '대구': lv = 4;
                    break;
                case '광주': lv = 5;
                    break;
                case '세종': lv = 5;
                    break;
                case '대전': lv = 5;
                    break;
                default: lv = 1.5;
                    break;
            }

            let zoomAnimation = chart.zoomToMapObject(polygon, lv, true);
            if (zoomAnimation) {
                zoomAnimation.events.on("animationended", function () {
                    showPieChart(polygon);
                })
            }
            else {
                showPieChart(polygon);
            }
        }


        function showPieChart(polygon) {
            polygon.polygon.measure();
            let radius = polygon.polygon.measuredWidth / 2 * polygon.globalScale / chart.seriesContainer.scale;
            pieChart.width = radius * 2;
            pieChart.height = radius * 2;
            pieChart.radius = radius;

            let centerPoint = am4core.utils.spritePointToSvg(polygon.polygon.centerPoint, polygon.polygon);
            centerPoint = am4core.utils.svgPointToSprite(centerPoint, chart.seriesContainer);

            pieChart.x = centerPoint.x - radius;
            pieChart.y = centerPoint.y - radius;

            let fill = polygon.fill;
            let desaturated = fill.saturate(0.3);

            const getName = polygon.dataItem.dataContext.name;

            for (var i = 0; i < pieSeries.dataItems.length; i++) {
                let dataItem = pieSeries.dataItems.getIndex(i);
                dataItem.value = data[getName][i]
                //dataItem.value = Math.round(Math.random() * 100);
                dataItem.slice.fill = am4core.color(am4core.colors.interpolate(
                    fill.rgb,
                    am4core.color("#ffffff").rgb,
                    0.5 * i
                ));

                dataItem.label.background.fill = desaturated;
                dataItem.label.fontSize = 14;
                dataItem.tick.stroke = fill;
            }

            pieSeries.show();
            pieChart.show();

            countryLabel.text = "{name}";
            countryLabel.dataItem = polygon.dataItem;
            //countryLabel.fill = desaturated;
            countryLabel.fill = am4core.color("#ffffff");
            countryLabel.fontSize = 20;
            countryLabel.show()
        }

    }, [])

    return (
        <div className="home-contents">
            <div id="chartdiv"></div>
            <MapTable area={area} />
        </div>
    )
}