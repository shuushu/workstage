import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4maps from "@amcharts/amcharts4/maps";
import ko from "@amcharts/amcharts4/lang/ko_KR";
import { ua } from "../../../components/Util";
let g = window;
const RANGE = {
  매입: [
    {
      date: new Date(2015, 10, 10),
      endDate: new Date(2017, 12, 10),
      str: "임대사업자 세재 해택 기간",
    },
  ],
  상태: [
    {
      date: new Date(2015, 10, 10),
      endDate: new Date(2017, 12, 10),
      str: "임대사업자 세재 해택 기간",
    },
  ],
};

/**
 *  CORE
 * */
//const numberFormatter = new am4core.NumberFormatter();
am4core.options.autoSetClassName = true;
//am4core.options.autoDispose = true;
/**
 *  유틸
 * */
// return 현재슬라이드
// index가 설정되지 않은 경우 마지막 슬라이드를 가져옵니다.
function getSlideData(index) {
  if (index === undefined) {
    index = g[g.KEY].point_area.length - 1;
  }
  let data = g[g.KEY].point_area[index];

  // augment with names
  //for (let i = 0; i < data.list.length; i++) {
  //data.list[i].name = idToName(data.list[i].id);
  //}

  return data;
}
// capitalize first letter
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 *  CLASS 버튼(슬라이드바, 자동 플레이)
 * */
class SliderBar {
  constructor(nodeName) {
    this.container = am4core.create(nodeName, am4core.Container);

    this.isActive = false;
    this.sliderAnimation = null;
    this.playButton = null;
    this.drawButton();
    this.drawSliderBar();
    this.data = JSON.parse(JSON.stringify(getSlideData().list));
  }
  drawButton() {
    this.playButton = this.container.createChild(am4core.PlayButton);
    this.playButton.valign = "middle";
    // 최소값이 디폴트로 지정되어있기에 변경을 해야 크기가 변함
    this.playButton.scale = ua() ? 0.5 : 0.8;
    this.playButton.events.on("toggled", (event) => {
      if (event.target.isActive) {
        this.play();
      } else {
        this.stop();
      }
    });
  }
  drawSliderBar() {
    this.container.width = am4core.percent(100);
    if (ua()) {
      this.container.padding(0, 5, 5, 10);
    } else {
      this.container.padding(0, 15, 15, 10);
    }

    this.container.layout = "horizontal";
    this.container.opacity = 1;
    let slider = this.container.createChild(am4core.Slider);
    this.slider = slider;
    this.slider.id = "shushu";
    slider.width = am4core.percent(100);
    slider.valign = "middle";
    slider.background.opacity = 1;
    slider.opacity = 0.7;
    slider.background.fill = am4core.color("#ffffff");
    slider.marginLeft = ua() ? 10 : 20;
    slider.marginRight = ua() ? 15 : 35;
    slider.minHeight = ua() ? 2 : 5;
    slider.start = 1;

    slider.startGrip.background.fill = this.playButton.background.fill;
    slider.startGrip.background.strokeOpacity = 0;
    slider.startGrip.icon.stroke = am4core.color("#ffffff");
    slider.startGrip.background.states.copyFrom(
      this.playButton.background.states
    );

    // what to do when slider is dragged
    slider.events.on("rangechanged", () => {
      const index = Math.round(
        (g[g.KEY].point_area.length - 1) * this.slider.start
      );
      if (this.updateMapData) {
        this.updateMapData.call(null, getSlideData(index).list, index);
      }
      if (this.updateTotalData) {
        this.updateTotalData(index);
      }

      //updateTotals(index);
    });
    // stop animation if dragged
    slider.startGrip.events.on("drag", () => {
      this.stop();
      if (this.sliderAnimation) {
        this.sliderAnimation.setProgress(slider.start);
      }
    });
  }
  stop() {
    if (this.sliderAnimation) {
      this.sliderAnimation.pause();
    }
  }
  play() {
    if (!this.sliderAnimation) {
      this.sliderAnimation = this.slider
        .animate(
          { property: "start", to: 1, from: 0.3 },
          20000,
          am4core.ease.linear
        )
        .pause();
      this.sliderAnimation.events.on("animationended", () => {
        this.playButton.isActive = false;
        setTimeout(() => {
          this.play();
        }, 1000);
      });
    }

    if (this.slider.start >= 1) {
      this.slider.start = 0;
      this.sliderAnimation.start();
    }
    this.sliderAnimation.resume();
    this.playButton.isActive = true;
  }
}

/**
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *  라인차트 클래스
 * */
class LineChart {
  constructor(name, options) {
    this.container = am4core.create(name, am4core.Container);
    this.container.tapToActivate = true;
    this.options =
      {
        colors: {
          c1: am4core.color("#ff8726"),
          c2: am4core.color("#d21a1a"),
          c3: am4core.color("#45d21a"),
          c4: am4core.color("#1c5fe5"),
        },
        keyName: "c1",
      } || options;
    this.container.language.locale = ko;
    this.setSizeCanvas(100, 100);
    this.drawLineChart();
    this.setData(g[g.KEY].timeline);
  }
  setKeyName(name) {
    this.options.keyName = name;
  }
  adapter(classObject) {
    this.pluginChart = classObject;
  }
  addClick(callback) {
    this.lineChart.plotContainer.events.on("hit", callback);
  }
  setSizeCanvas(w, h) {
    this.container.width = am4core.percent(w);
    this.container.height = am4core.percent(h);
  }
  drawLineChart() {
    let lineChartContainer = this.container.createChild(am4core.Container);

    lineChartContainer.layout = "vertical";
    lineChartContainer.height = am4core.percent(100);
    lineChartContainer.width = am4core.percent(100);
    lineChartContainer.background = new am4core.RoundedRectangle();
    lineChartContainer.background.fill = am4core.color("#000000");
    if (ua()) {
      lineChartContainer.background.cornerRadius(10, 10, 0, 0);
    } else {
      lineChartContainer.background.cornerRadius(30, 30, 0, 0);
    }

    lineChartContainer.background.fillOpacity = 0.25;
    lineChartContainer.paddingTop = 12;
    lineChartContainer.paddingBottom = 0;

    // https://www.amcharts.com/docs/v4/chart-types/xy-chart/
    let lineChart = lineChartContainer.createChild(am4charts.XYChart);
    lineChart.fontSize = "0.8em";
    lineChart.paddingRight = ua() ? 10 : 30;
    lineChart.paddingLeft = ua() ? 10 : 30;
    lineChart.maskBullets = false;
    lineChart.paddingBottom = ua() ? 1 : 5;
    lineChart.paddingTop = ua() ? 1 : 3;
    lineChart.zoomOutButton.disabled = true;

    // date axis
    // https://www.amcharts.com/docs/v4/concepts/axes/date-axis/
    let dateAxis = lineChart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 50;
    dateAxis.renderer.grid.template.stroke = am4core.color("#333");
    dateAxis.renderer.grid.template.strokeOpacity = 0.25;
    dateAxis.max =
      g[g.KEY].lastDate.getTime() + am4core.time.getDuration("day", 5);

    dateAxis.tooltip.label.fontSize = "0.8em";
    dateAxis.tooltip.background.fill = this.options.colors[
      this.options.keyName
    ];
    dateAxis.tooltip.background.stroke = this.options.colors[
      this.options.keyName
    ];
    dateAxis.renderer.labels.template.fill = am4core.color("#ffffff");
    this.dateAxis = dateAxis;
    // value axis
    // https://www.amcharts.com/docs/v4/concepts/axes/value-axis/
    let valueAxis = lineChart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.opposite = true;
    valueAxis.interpolationDuration = 3000;
    valueAxis.renderer.grid.template.stroke = am4core.color("#333");
    valueAxis.renderer.grid.template.strokeOpacity = 0.25;
    valueAxis.renderer.minGridDistance = 30;
    valueAxis.renderer.maxLabelPosition = 0.98;
    valueAxis.renderer.baseGrid.disabled = true;
    valueAxis.tooltip.disabled = true;
    valueAxis.extraMax = 0.05;
    valueAxis.maxPrecision = 0;
    valueAxis.renderer.inside = true;
    valueAxis.renderer.labels.template.verticalCenter = "bottom";
    valueAxis.renderer.labels.template.fill = am4core.color("#ffffff");
    valueAxis.renderer.labels.template.padding(2, 2, 2, 2);
    valueAxis.adapter.add("max", function (max, target) {
      if (max < 5) {
        max = 5;
      }
      return max;
    });
    // cursor
    // https://www.amcharts.com/docs/v4/concepts/chart-cursor/
    lineChart.cursor = new am4charts.XYCursor();
    lineChart.cursor.maxTooltipDistance = 0;
    lineChart.cursor.behavior = "none"; // set zoomX for a zooming possibility
    lineChart.cursor.lineY.disabled = true;
    lineChart.cursor.lineX.stroke = this.options.colors[this.options.keyName];
    lineChart.cursor.xAxis = dateAxis;
    // this prevents cursor to move to the clicked location while map is dragged
    am4core
      .getInteraction()
      .body.events.off(
        "down",
        lineChart.cursor.handleCursorDown,
        lineChart.cursor
      );
    am4core
      .getInteraction()
      .body.events.off("up", lineChart.cursor.handleCursorUp, lineChart.cursor);

    // legend
    // https://www.amcharts.com/docs/v4/concepts/legend/
    lineChart.legend = new am4charts.Legend();
    lineChart.legend.parent = lineChart.plotContainer;
    lineChart.legend.labels.template.fill = am4core.color("#ffffff");
    lineChart.legend.markers.template.height = 8;
    lineChart.legend.contentAlign = "left";
    lineChart.legend.fontSize = "12px";
    lineChart.legend.x = 0;
    lineChart.legend.itemContainers.template.valign = "middle";
    // 레전드 클릭시에는 이벤트가 일어나지 않게 함
    lineChart.legendDown = false;
    lineChart.legend.itemContainers.template.events.on("down", function () {
      lineChart.legendDown = true;
    });
    lineChart.legend.itemContainers.template.events.on("up", function () {
      setTimeout(function () {
        lineChart.legendDown = false;
      }, 100);
    });

    //  범위 가이드라인 그리기
    const drawLine = (date) => {
      let range2 = this.dateAxis.axisRanges.create();
      if (date instanceof Date) {
        range2.date = date;
        range2.grid.stroke = am4core.color("#fff");
        range2.grid.strokeWidth = 1;
        range2.grid.strokeOpacity = 0.3;
        range2.grid.strokeDasharray = "3,3";
      }

      return range2;
    };
    /* Object.entries(RANGE[g.KEY]).forEach((items) => {
      items.forEach((d) => {
        let range;
        Object.entries(d).forEach(([key, v]) => {
          if (key !== "str") {
            range = drawLine(v);
          }
        });
        range.label.dx = -60;
        range.label.inside = true;
        range.label.text = d.str;
        range.label.fontSize = "11px";
        range.label.fillOpacity = 0.5;
        range.label.verticalCenter = "bottom";
      });
    }); */

    this.lineChart = lineChart;
  }
  setData(data) {
    // make a copy of data as we will be modifying it

    this.lineChart.data = JSON.parse(JSON.stringify(data));
  }
  // 데이터 별 지점 표시 및 툴팁 생성
  addSeries(name, color) {
    let series = this.lineChart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = name;
    series.dataFields.dateX = "date";
    series.name = capitalizeFirstLetter(name);
    series.strokeOpacity = 0.5;
    series.stroke = color;
    series.fill = color;
    series.maskBullets = false;
    series.minBulletDistance = 10;
    //series.hidden = true;
    series.propertyFields.fill = am4core.color("#1c5fe5");
    series.hideTooltipWhileZooming = true;

    // X축 범위 선정
    Object.entries(RANGE[g.KEY]).forEach((items) => {
      items.forEach((obj) => {
        if (obj instanceof Date) {
          let range = this.dateAxis.createSeriesRange(series);
          range.date = obj.date;
          range.endDate = obj.endDate;
          range.contents.fill = am4core.color("#999");
          range.contents.fillOpacity = 0.5;
        }
      });
    });

    //  bullet(포인트)
    let bullet = series.bullets.push(new am4charts.CircleBullet());
    bullet.states.create("hover");
    bullet.setStateOnChildren = true;
    bullet.circle.fillOpacity = 1;
    bullet.circle.fill = am4core.color("#1e2128");
    bullet.circle.radius = 2;

    let circleHoverState = bullet.circle.states.create("hover");
    circleHoverState.properties.fillOpacity = 1;
    circleHoverState.properties.fill = color;
    circleHoverState.properties.scale = 1.4;

    // tooltip setup
    series.tooltip.pointerOrientation = "down";
    series.tooltip.getStrokeFromObject = true;
    series.tooltip.getFillFromObject = false;
    series.tooltip.background.fillOpacity = 0.2;
    series.tooltip.background.fill = am4core.color("#000000");
    series.tooltip.dy = -4;
    series.tooltip.fontSize = "0.8em";
    series.tooltipText = "{name}: {valueY}";

    this.series = series;
    return series;
  }
  handleButtonClick(event) {
    const name =
      event.target.dummyData ||
      event.target.parentElement.getAttribute("data-key");
    if (name && typeof name === "string") {
      this.pluginChart.updateChart(name);
      this.updateChart(name);
    }
  }
  // change data type (탭클릭시 데이터 전환)
  updateChart(type) {
    const color = this.options.colors[type];
    g[g.KEY].lineChartSeries[type].show();
    // hide other series
    for (let key in g[g.KEY].lineChartSeries) {
      if (key !== type) {
        g[g.KEY].lineChartSeries[key].hide();
      }
    }
    // 날짜-월(툴팁);
    this.dateAxis.tooltip.background.fill = color;
    this.dateAxis.tooltip.background.stroke = color;
    this.lineChart.cursor.lineX.stroke = color;
  }
  setColor(colors) {
    this.options.colors = colors;
  }
}

/**
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *  amchart맵 클래스
 * */
class MapChart {
  constructor(data, options) {
    this.geoData = data;
    this.container = null;
    this.bubbleArr = [];
    this.bubbleSeries = null;
    this.options =
      {
        width: 80,
        height: 80,
        countryColor: am4core.color("#3b3b3b"),
        countryStrokeColor: am4core.color("#000"),
        colors: {
          c1: am4core.color("#ff8726"),
          c2: am4core.color("#d21a1a"),
          c3: am4core.color("#45d21a"),
          c4: am4core.color("#1c5fe5"),
        },
        keyName: "c1",
      } || options;
  }
  setKeyName(name) {
    this.options.keyName = name;
  }
  drawCanvas(nodeName) {
    this.container = am4core.create(nodeName, am4core.Container);
    this.container.language.locale = ko;
    this.setSizeCanvas(this.options.width, this.options.height);
    this.container.align = "right";
    this.container.valign = "bottom";

    this.mapChart = this.container.createChild(am4maps.MapChart);
    this.mapChart.responsive = {
      enabled: true,
    };
    this.mapChart.zoomControl = new am4maps.ZoomControl();
    this.mapChart.zoomControl.align = "right";
    this.mapChart.zoomControl.marginRight = 15;
    this.mapChart.zoomControl.valign = "middle";

    this.mapChart.height = am4core.percent(100);
    this.mapChart.geodata = this.geoData;
    // HMR 및 SPA라우터에서 페이지 전환 후 돌아 올때 맵이 꺠지는 이슈 수정 [소요시간 5h]
    this.mapChart.reverseGeodata = true;

    // https://www.amcharts.com/docs/v4/chart-types/map/#Map_data
    // you can use more accurate world map or map of any other country - a wide selection of maps available at: https://github.com/amcharts/amcharts4-geodata

    // Set projection
    // https://www.amcharts.com/docs/v4/chart-types/map/#Setting_projection
    // instead of Miller, you can use Mercator or many other projections available: https://www.amcharts.com/demos/map-using-d3-projections/
    this.mapChart.projection = new am4maps.projections.Miller();
    this.mapChart.panBehavior = "move";
    this.mapChart.seriesContainer.background.fillOpacity = 0;
    // when map is globe, beackground is made visible
    // this.mapChart.backgroundSeries.mapPolygons.template.polygon.fillOpacity = 0.05;
    // this.mapChart.backgroundSeries.mapPolygons.template.polygon.fill = am4core.color(
    //   "red"
    // );
    this.mapChart.backgroundSeries.hidden = false;
    // you can have pacific - centered map if you set this to -154.8
    //this.mapChart.deltaLongitude = -10;
  }
  //
  drawBackgroundMap(nodeName) {
    this.drawCanvas(nodeName);
    this.drawMapFeature();
  }
  mInit(nodeName, n) {
    const data = this.init(nodeName);

    for (let i = 0; i < n; i++) {
      this.drawMultipleBubble(data, i, n);
    }
  }
  initSingle(nodeName) {
    const data = this.init(nodeName);
    this.drawBubble(data);
  }
  init(nodeName) {
    // main container
    // https://www.amcharts.com/docs/v4/concepts/svg-engine/containers/
    this.drawCanvas(nodeName);
    const data = this.setPaperData();

    this.container.tooltip = new am4core.Tooltip();
    this.container.tooltip.background.fill = am4core.color("#000000");
    this.container.tooltip.background.stroke = this.options.colors[
      this.options.keyName
    ];
    this.container.tooltip.fontSize = "0.9em";
    this.container.tooltip.getFillFromObject = false;
    this.container.tooltip.getStrokeFromObject = false;

    // this.mapChart.zoomControl = new am4maps.ZoomControl();
    // this.mapChart.zoomControl.align = "right";
    // this.mapChart.zoomControl.marginRight = 15;
    // this.mapChart.zoomControl.valign = "middle";

    // this.mapChart.zoomEasing = am4core.ease.sinOut;

    this.drawMapFeature(data);

    return data;
  }

  setSizeCanvas(w, h) {
    this.container.width = am4core.percent(w);
    this.container.height = am4core.percent(h);
  }
  // PREPARE DATA
  setPaperData() {
    // get slide data
    let slideData = getSlideData();
    // 데이터복사
    let mapData = JSON.parse(JSON.stringify(slideData.list));

    // 성능 향상을 위해 값이 0 인 항목 제거
    for (let i = mapData.length - 1; i >= 0; i--) {
      if (mapData[i].confirmed === 0) {
        mapData.splice(i, 1);
      }
    }
    return mapData;
    // END OF DATA
  }
  // data is string array
  drawLabel(data) {
    const { polygonSeries } = this;
    // 맵라벨 옵션
    let labelSeries = this.mapChart.series.push(new am4maps.MapImageSeries());
    let labelTemplate = labelSeries.mapImages.template.createChild(
      am4core.Label
    );
    labelTemplate.horizontalCenter = "middle";
    labelTemplate.verticalCenter = "middle";
    labelTemplate.fontSize = ua() ? 10 : 12;
    labelTemplate.interactionsEnabled = false;
    labelTemplate.nonScaling = true;
    labelTemplate.fillOpacity = ua() ? 0.15 : 0.3;
    labelTemplate.fill = "#fff";

    // 라벨 표출
    polygonSeries.events.on("inited", function () {
      for (var i = 0; i < data.length; i++) {
        var polygon = polygonSeries.getPolygonById(data[i]);

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
  // 폴리곤
  drawMapFeature(mapData) {
    // Map polygon series (defines how country areas look and behave)
    let polygonSeries = this.mapChart.series.push(
      new am4maps.MapPolygonSeries()
    );
    polygonSeries.dataFields.id = "id";
    polygonSeries.dataFields.value = "confirmedPC";
    polygonSeries.interpolationDuration = 0;

    polygonSeries.useGeodata = true;
    polygonSeries.nonScalingStroke = true;
    polygonSeries.strokeWidth = 0.5;
    // this helps to place bubbles in the visual middle of the area
    polygonSeries.calculateVisualCenter = true;
    if (mapData) {
      polygonSeries.data = mapData;
    }

    let polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.fill = this.options.countryColor;
    polygonTemplate.fillOpacity = 0.8;
    polygonTemplate.stroke = this.options.countryStrokeColor;
    polygonTemplate.strokeOpacity = 0.15;
    polygonTemplate.setStateOnChildren = true;
    polygonTemplate.tooltipPosition = "fixed";

    //%polygonTemplate.events.on("hit", handleCountryHit);
    //%polygonTemplate.events.on("over", handleCountryOver);
    //%polygonTemplate.events.on("out", handleCountryOut);
    if (mapData) {
      polygonSeries.heatRules.push({
        target: polygonTemplate,
        property: "fill",
        min: this.options.countryColor,
        max: this.options.countryColor,
        dataField: "value",
      });

      // polygon 이벤트 바인딩
      const polygonHoverState = polygonTemplate.states.create("hover");
      polygonHoverState.transitionDuration = 100;
      polygonHoverState.properties.fill = this.options.countryHoverColor;

      const polygonActiveState = polygonTemplate.states.create("active");
      polygonActiveState.properties.fill = this.options.activeCountryColor;
    }
    this.polygonSeries = polygonSeries;
  }
  // 버블 폴리곤 위에 circle그리기
  drawBubble(mapData) {
    const bubbleSeries = this.mapChart.series.push(
      new am4maps.MapImageSeries()
    );
    bubbleSeries.data = JSON.parse(JSON.stringify(mapData));
    bubbleSeries.dataFields.id = "id";
    // adjust tooltip
    bubbleSeries.tooltip.animationDuration = 0;
    bubbleSeries.tooltip.showInViewport = false;
    bubbleSeries.tooltip.background.fillOpacity = 0.2;
    bubbleSeries.tooltip.getStrokeFromObject = true;
    bubbleSeries.tooltip.getFillFromObject = false;
    bubbleSeries.tooltip.background.fillOpacity = 0.2;
    bubbleSeries.tooltip.background.fill = am4core.color("#000");
    let imageTemplate = bubbleSeries.mapImages.template;
    // 지도 확대 시 버블이 커지게 할려면 false로 설정
    imageTemplate.nonScaling = true;
    imageTemplate.strokeOpacity = 0;
    imageTemplate.fillOpacity = 0.55;
    imageTemplate.tooltipText = "{name}: [bold]{value}[/]";
    imageTemplate.applyOnClones = true;

    //%imageTemplate.events.on("over", handleImageOver);
    //%imageTemplate.events.on("out", handleImageOut);
    //%imageTemplate.events.on("hit", handleImageHit);

    // 마우스오버 시 툴팁이 가운데가 아닌 원의 상단을 가리 키도록하는 데 필요합니다.
    imageTemplate.adapter.add("tooltipY", function (tooltipY, target) {
      return -target.children.getIndex(0).radius;
    });

    // When hovered, circles become non-opaque
    let imageHoverState = imageTemplate.states.create("hover");
    imageHoverState.properties.fillOpacity = 1;

    // add circle inside the image
    let circle = imageTemplate.createChild(am4core.Circle);
    // this makes the circle to pulsate a bit when showing it
    circle.hiddenState.properties.scale = 0.0000001;
    circle.hiddenState.transitionDuration = 2000;
    circle.defaultState.transitionDuration = 2000;
    circle.defaultState.transitionEasing = am4core.ease.elasticOut;
    // later we set fill color on template (when changing what type of data the map should show) and all the clones get the color because of this
    circle.applyOnClones = true;

    // heat rule makes the bubbles to be of a different width. Adjust min/max for smaller/bigger radius of a bubble
    bubbleSeries.heatRules.push({
      target: circle,
      property: "radius",
      min: 1,
      max: 102,
      dataField: "value",
    });

    // 데이터 항목의 유효성을 검사 할 때 0 값 거품을 숨 깁니다 (최소 크기가 설정 되었기 때문에).
    bubbleSeries.events.on("dataitemsvalidated", function () {
      bubbleSeries.dataItems.each((dataItem) => {
        var mapImage = dataItem.mapImage;
        var circle = mapImage.children.getIndex(0);

        if (mapImage.dataItem.value === 0) {
          circle.hide();
        } else if (circle.isHidden || circle.isHiding) {
          circle.show();
        }
      });
    });
    // 맵 위경도에 버블 배치
    imageTemplate.adapter.add("latitude", (latitude, target) => {
      var polygon = this.polygonSeries.getPolygonById(target.dataItem.id);
      if (polygon) {
        target.disabled = false;
        return polygon.visualLatitude;
      } else {
        target.disabled = true;
      }
      return latitude;
    });

    imageTemplate.adapter.add("longitude", (longitude, target) => {
      var polygon = this.polygonSeries.getPolygonById(target.dataItem.id);

      if (polygon) {
        target.disabled = false;
        return polygon.visualLongitude;
      } else {
        target.disabled = true;
      }
      return longitude;
    });
    this.bubbleSeries = bubbleSeries;
    return imageTemplate;
  }

  // 버블 다중 표현
  drawMultipleBubble(mapData, type, size) {
    const bubbleSeries = this.mapChart.series.push(
      new am4maps.MapImageSeries()
    );
    bubbleSeries.data = JSON.parse(JSON.stringify(mapData));
    bubbleSeries.dataFields.id = "id";
    // adjust tooltip
    bubbleSeries.tooltip.animationDuration = 0;
    bubbleSeries.tooltip.showInViewport = false;
    bubbleSeries.tooltip.background.fillOpacity = 0.2;
    bubbleSeries.tooltip.getStrokeFromObject = true;
    bubbleSeries.tooltip.getFillFromObject = false;
    bubbleSeries.tooltip.background.fillOpacity = 0.2;
    bubbleSeries.tooltip.background.fill = am4core.color("#000");
    let imageTemplate = bubbleSeries.mapImages.template;
    // 지도 확대 시 버블이 커지게 할려면 false로 설정
    imageTemplate.nonScaling = true;
    imageTemplate.strokeOpacity = 0;
    imageTemplate.fillOpacity = 0.55;
    imageTemplate.tooltipText = "{name}: [bold]{value}[/]";

    imageTemplate.applyOnClones = true;

    //%imageTemplate.events.on("over", handleImageOver);
    //%imageTemplate.events.on("out", handleImageOut);
    //%imageTemplate.events.on("hit", handleImageHit);

    // 마우스오버 시 툴팁이 가운데가 아닌 원의 상단을 가리 키도록하는 데 필요합니다.
    imageTemplate.adapter.add("tooltipY", function (tooltipY, target) {
      return -target.children.getIndex(0).radius;
    });

    // When hovered, circles become non-opaque
    let imageHoverState = imageTemplate.states.create("hover");
    imageHoverState.properties.fillOpacity = 1;

    // add circle inside the image
    let circle = imageTemplate.createChild(am4core.Circle);
    // this makes the circle to pulsate a bit when showing it
    circle.hiddenState.properties.scale = 0.00001;
    circle.hiddenState.transitionDuration = 2400;
    circle.defaultState.transitionDuration = 2400;
    circle.defaultState.transitionEasing = am4core.ease.elasticOut;
    // later we set fill color on template (when changing what type of data the map should show) and all the clones get the color because of this
    circle.applyOnClones = true;

    // heat rule makes the bubbles to be of a different width. Adjust min/max for smaller/bigger radius of a bubble
    let RADIUS;
    if (g.KEY === "매입") {
      RADIUS = 71;
    } else if (g.KEY === "상태") {
      if (type === 1) {
        // '압류'
        RADIUS = 30;
      } else if (type === 0) {
        // '소유'
        RADIUS = 10;
      } else if (type === 2) {
        // '강제경매개시'
        RADIUS = 13;
      } else {
        RADIUS = 70;
      }
    }

    bubbleSeries.heatRules.push({
      target: circle,
      property: "radius",
      min: 1,
      max: ua() ? RADIUS / 2 : RADIUS,
      dataField: "value",
    });

    // 데이터 항목의 유효성을 검사 할 때 0 값 거품을 숨 깁니다 (최소 크기가 설정 되었기 때문에).
    bubbleSeries.events.on("dataitemsvalidated", function () {
      bubbleSeries.dataItems.each((dataItem) => {
        var mapImage = dataItem.mapImage;
        var circle = mapImage.children.getIndex(0);
        if (mapImage.dataItem.value === 0) {
          circle.hide(0);
        } else if (circle.isHidden || circle.isHiding) {
          circle.show();
        }
      });
    });
    let x = 0;
    if (size > 1) {
      switch (type) {
        case 0:
          x = 0.003;
          break;
        case 1:
          x = -0.003;
          break;
      }
    }

    // 맵 위경도에 버블 배치
    imageTemplate.adapter.add("latitude", (latitude, target) => {
      var polygon = this.polygonSeries.getPolygonById(target.dataItem.id);
      if (polygon) {
        target.disabled = false;
        return polygon.visualLatitude + x;
      } else {
        target.disabled = true;
      }
      return latitude + x;
    });

    imageTemplate.adapter.add("longitude", (longitude, target) => {
      var polygon = this.polygonSeries.getPolygonById(target.dataItem.id);
      if (polygon) {
        target.disabled = false;
        return polygon.visualLongitude + x;
      } else {
        target.disabled = true;
      }
      return longitude + x;
    });
    this.bubbleArr.push(bubbleSeries);
    return imageTemplate;
  }
  setColor(colors) {
    this.options.colors = colors;
  }
  // 업데이트
  updateChart(type) {
    this.bubbleSeries.mapImages.template.tooltipText =
      type +
      "[font-size:13px]{custom} [font-size:20px]{value}[/][font-size:13px]채 보유";

    // 에러체크 확인중
    if (type) {
      this.bubbleSeries.dataFields.value = type;
      this.polygonSeries.dataFields.value = type;
    }

    this.bubbleSeries.dataItems.each((dataItem) => {
      dataItem.setValue("value", dataItem.dataContext[type]);
    });

    this.polygonSeries.dataItems.each((dataItem) => {
      dataItem.setValue("value", dataItem.dataContext[type]);
    });

    // change color of bubbles
    // setting colors on mapImage for tooltip colors

    this.bubbleSeries.mapImages.template.fill = this.options.colors[type];
    this.bubbleSeries.mapImages.template.stroke = this.options.colors[type];
    this.bubbleSeries.mapImages.template.children.getIndex(
      0
    ).fill = this.options.colors[type];
    // update heat rule's maxValue
    //this.bubbleSeries.heatRules.getIndex(0).maxValue = 30;
    //this.polygonSeries.heatRules.getIndex(0).maxValue = 30;
  }

  updateChart2(bubbleArr, type) {
    bubbleArr.mapImages.template.tooltipText =
      //"[bold]{custom}: {value}[/] [font-size:11px]\n" + type;

      "[font-size:20px]" +
      type +
      "[font-size:13px] 물권  [font-size:20px]{value}[/][font-size:13px]채";

    // 에러체크 확인중
    if (type) {
      bubbleArr.dataFields.value = type;
      this.polygonSeries.dataFields.value = type;
    }

    bubbleArr.dataItems.each((dataItem) => {
      dataItem.setValue("value", dataItem.dataContext[type]);
    });

    this.polygonSeries.dataItems.each((dataItem) => {
      dataItem.setValue("value", dataItem.dataContext[type]);
    });

    // change color of bubbles
    // setting colors on mapImage for tooltip colors

    bubbleArr.mapImages.template.fill = this.options.colors[type];
    bubbleArr.mapImages.template.stroke = this.options.colors[type];
    bubbleArr.mapImages.template.children.getIndex(
      0
    ).fill = this.options.colors[type];
    // update heat rule's maxValue
    //this.bubbleSeries.heatRules.getIndex(0).maxValue = 30;
    //this.polygonSeries.heatRules.getIndex(0).maxValue = 30;
  }
}

export { SliderBar, LineChart, MapChart };
