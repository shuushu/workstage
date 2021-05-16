/* Imports */
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { useEffect } from "react";

/* Chart code */
// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

export default function 지역별통계(props) {
  useEffect((props) => {
    /**
     * ---------------------------------------
     * This demo was created using amCharts 4.
     *
     * For more information visit:
     * https://www.amcharts.com/
     *
     * Documentation is available at:
     * https://www.amcharts.com/docs/v4/
     * ---------------------------------------
     */

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    var chart = am4core.create("chartMd", am4charts.XYChart);

    // Add data
    chart.data = [
      {
        year: "2016",
        europe: 2.5,
        namerica: 2.5,
        asia: 2.1,
      },
      {
        year: "2017",
        europe: 2.6,
        namerica: 2.7,
        asia: 2.2,
      },
      {
        year: "2018",
        europe: 2.8,
        namerica: 2.9,
        asia: 2.4,
      },
    ];

    chart.legend = new am4charts.Legend();
    chart.legend.position = "bottom";

    // Create axes
    var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "year";
    categoryAxis.renderer.grid.template.opacity = 0;

    var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.renderer.grid.template.opacity = 0;
    valueAxis.renderer.ticks.template.strokeOpacity = 0.5;
    valueAxis.renderer.ticks.template.stroke = am4core.color("#495C43");
    valueAxis.renderer.ticks.template.length = 10;
    valueAxis.renderer.line.strokeOpacity = 0.5;
    valueAxis.renderer.baseGrid.disabled = true;
    valueAxis.renderer.minGridDistance = 40;

    // Create series
    function createSeries(field, name) {
      var series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueX = field;
      series.dataFields.categoryY = "year";
      series.stacked = true;
      series.name = name;

      var labelBullet = series.bullets.push(new am4charts.LabelBullet());
      labelBullet.locationX = 0.5;
      labelBullet.label.text = "{valueX}";
      labelBullet.label.fill = am4core.color("#fff");
    }

    createSeries("europe", "Europe");
    createSeries("namerica", "North America");
    createSeries("asia", "Asia");
  }, []);
  return <div id="chartMd"></div>;
}
