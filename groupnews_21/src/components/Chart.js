/* Imports */
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { ua } from "../../../components/Util";
/* Chart code */
// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end
const UA = ua();
const g = window;
function setMarker() {
  g.chart.legend = new am4charts.Legend();
  var marker = g.chart.legend.markers.template;
  marker.width = 8;
  marker.height = 8;
  return marker;
}

function createSeries(field, name, timer = 1000) {
  // Set up series
  let series = window.chart.series.push(new am4charts.ColumnSeries());
  window.series = series;
  series.name = name;
  series.dataFields.valueY = field;
  series.dataFields.categoryX = "category";
  series.sequencedInterpolation = true;

  // Make it stacked
  series.stacked = true;
  series.sequencedInterpolation = timer !== 0;
  // Configure columns
  series.columns.template.width = UA
    ? am4core.percent(50)
    : am4core.percent(60);
  series.columns.template.tooltipText =
    "[bold]{name}[/]\n[font-size:14px]{categoryX}: {valueY}";
  series.tooltip.background.filters.clear();
  series.defaultState.transitionDuration = timer;
  series.hiddenState.transitionDuration = timer;
  series.columns.template.togglable = true;
  var activeState = series.columns.template.states.create("active");
  activeState.properties.fill = am4core.color("#debbbc"); //series.fill.brighten(1);
  activeState.properties.stroke = am4core.color("#ea6e72");

  // Only one column active at a time
  series.columns.template.events.on("hit", function (event) {
    series.columns.each(function (column) {
      if (column !== event.target) {
        column.setState("default");
        column.isActive = false;
      } else {
        const index = event.target.dataItem.index;
        const range = UA ? 2 : 8;
        window.chart.categoryAxis.zoomToIndexes(
          index - range <= 0 ? 0 : index - range,
          index + range
        );
      }
    });
    window.chart.categoryAxis.renderer.labels.template.rotation = 0;
  });

  // Add label
  let labelBullet = series.bullets.push(new am4charts.LabelBullet());
  labelBullet.label.text = "{valueY}";
  labelBullet.locationY = 0.5;
  labelBullet.label.hideOversized = true;

  return series;
}
function init() {
  let chart = am4core.create("chart", am4charts.XYChart);
  window.chart = chart;
  chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
  chart.fontSize = "12px";
  chart.fontFamily = "Malgun Gothic";
  chart.colors.step = 2;

  if (UA) {
    chart.padding(10, 10, 10, 0);
  } else {
    chart.padding(30, 30, 10, 30);
  }

  // 범례스타일
  setMarker();

  let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
  categoryAxis.dataFields.category = "category";
  categoryAxis.renderer.minGridDistance = 30;
  categoryAxis.renderer.grid.template.location = 0;
  categoryAxis.renderer.labels.template.rotation = 90;
  //categoryAxis.renderer.labels.template.adapter.add("dx", (dx) => dx - 20);
  categoryAxis.renderer.grid.template.disabled = true;
  // 라벨클릭이벤트
  var label = categoryAxis.renderer.labels.template;
  label.wrap = true;
  label.maxWidth = 120;

  function highlighColumn(ev) {
    chart.series.each(function (series) {
      if (series instanceof am4charts.ColumnSeries) {
        series.columns.each(function (column) {
          if (column.dataItem.categoryX === ev.target.dataItem.category) {
            column.isActive = true;
          } else {
            column.isActive = false;
          }
        });
      }
    });
    const index = ev.target.dataItem.index;
    const range = UA ? 2 : 8;
    window.chart.categoryAxis.zoomToIndexes(
      index - range <= 0 ? 0 : index - range,
      index + range
    );
    window.chart.categoryAxis.renderer.labels.template.rotation = 0;
  }

  label.events.on("hit", highlighColumn);
  label.cursorOverStyle = am4core.MouseCursorStyle.pointer;

  let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
  valueAxis.strictMinMax = true;
  valueAxis.min = 0;

  chart.scrollbarX = new am4core.Scrollbar();
  chart.categoryAxis = categoryAxis;
  chart.tooltip.fillOpacity = 0.4;
  // zoombtn

  chart.zoomOutButton.events.on("hit", (ev) => {
    categoryAxis.renderer.labels.template.rotation = 90;
  });
}

export { init, createSeries };
