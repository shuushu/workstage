import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4maps from "@amcharts/amcharts4/maps";
import ko from "@amcharts/amcharts4/lang/ko_KR";
import geo from "../asset/data/select.json";
import POINT_NAME from "../asset/data/labels";
let g = window;

/**
 *  CORE
 * */
const numberFormatter = new am4core.NumberFormatter();

/**
 *  유틸
 * */
// return 현재슬라이드
// index가 설정되지 않은 경우 마지막 슬라이드를 가져옵니다.
function getSlideData(index) {
  if (index === undefined) {
    index = g.point_area.length - 1;
  }
  let data = g.point_area[index];

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
// 키네임변환
function setToOrigin(key) {
  let strName;
  switch (key) {
    case "김용현":
      strName = "active";
      break;

    case "강선범":
      strName = "confirmed";
      break;

    case "진현철":
      strName = "recovered";
      break;

    case "육정순":
      strName = "deaths";
      break;
    default:
      strName = key;
  }
  return strName;
}
// 키네임변환
function setToCustom(key) {
  let strName;
  switch (key) {
    case "active":
      strName = "김용현";
      break;

    case "confirmed":
      strName = "강선범";
      break;

    case "recovered":
      strName = "진현철";
      break;

    case "deaths":
      strName = "육정순";
      break;
    default:
      strName = key;
  }
  return strName;
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
  }
  drawSliderBar() {
    this.container.width = am4core.percent(100);
    this.container.padding(0, 15, 15, 10);
    this.container.layout = "horizontal";
    this.container.opacity = 1;
    let slider = this.container.createChild(am4core.Slider);
    slider.width = am4core.percent(100);
    slider.valign = "middle";
    slider.background.opacity = 1;
    slider.opacity = 0.7;
    slider.background.fill = am4core.color("#ffffff");
    slider.marginLeft = 20;
    slider.marginRight = 35;
    slider.height = 15;
    slider.start = 1;

    slider.startGrip.background.fill = this.playButton.background.fill;
    slider.startGrip.background.strokeOpacity = 0;
    slider.startGrip.icon.stroke = am4core.color("#ffffff");
    slider.startGrip.background.states.copyFrom(
      this.playButton.background.states
    );

    // what to do when slider is dragged
    slider.events.on("rangechanged", () => {
      if (this.updateMapData) {
        const index = Math.round((g.point_area.length - 1) * slider.start);
        this.updateMapData.call(null, this);
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

  /* updateMapData(data) {
    //modifying instead of setting new data for a nice animation
    bubbleSeries.dataItems.each(function (dataItem) {
      dataItem.dataContext.confirmed = 0;
      dataItem.dataContext.deaths = 0;
      dataItem.dataContext.recovered = 0;
      dataItem.dataContext.active = 0;
    });

    maxPC = { active: 0, confirmed: 0, deaths: 0, recovered: 0 };

    for (var i = 0; i < data.length; i++) {
      var di = data[i];
      var image = bubbleSeries.getImageById(di.id);
      var polygon = polygonSeries.getPolygonById(di.id);
      if (image) {
        var population = Number(populations2[image.dataItem.dataContext.id]);
        // image.dataItem.dataContext.confirmed = di.confirmed;
        // image.dataItem.dataContext.deaths = di.deaths;
        // image.dataItem.dataContext.recovered = di.recovered;
        // image.dataItem.dataContext.active = di.confirmed - di.recovered - di.deaths;
        Object.entries(di).forEach(([k, v]) => {
          if (k !== "id") {
            let key = setToOrigin(k);
            image.dataItem.dataContext[key] = v;
          }
        });
        //bubbleSeries.heatRules.getIndex(0).max = di['김용현']
      }
      if (polygon) {
        // Object.entries(di).forEach(([k, v]) => {
        //     if (k !== 'id') {
        //         let key = setToOrigin(k);
        //         polygon.dataItem.dataContext[`${key}PC`] = 0.1
        //     }
        // })
        // polygon.dataItem.dataContext.confirmedPC = di.confirmed / population * 1000000;
        // polygon.dataItem.dataContext.deathsPC = di.deaths / population * 1000000;
        // polygon.dataItem.dataContext.recoveredPC = di.recovered / population * 1000000;
        // polygon.dataItem.dataContext.active = di.confirmed - di.recovered - di.deaths;
        // polygon.dataItem.dataContext.activePC = polygon.dataItem.dataContext.active / population * 1000000;
        // if (population > 100000) {
        //     if (polygon.dataItem.dataContext.confirmedPC > maxPC.confirmed) {
        //         maxPC.confirmed = polygon.dataItem.dataContext.confirmedPC;
        //     }
        //     if (polygon.dataItem.dataContext.deathsPC > maxPC.deaths) {
        //         maxPC.deaths = polygon.dataItem.dataContext.deathsPC;
        //     }
        //     if (polygon.dataItem.dataContext.recoveredPC > maxPC.recovered) {
        //         maxPC.recovered = polygon.dataItem.dataContext.recoveredPC;
        //     }
        //     if (polygon.dataItem.dataContext.activePC > maxPC.active) {
        //         maxPC.active = polygon.dataItem.dataContext.activePC;
        //     }
        // }
      }

      bubbleSeries.heatRules.getIndex(0).maxValue = max[currentType];
      polygonSeries.heatRules.getIndex(0).maxValue = maxPC[currentType];

      bubbleSeries.invalidateRawData();
      polygonSeries.invalidateRawData();
    }
  } */
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
    this.setData(g.timeline);
  }
  setKeyName(name) {
    this.options.keyName = name;
  }
  adapter(classObject) {
    this.pluginChart = classObject;
  }
  addClick(callback) {
    this.lineChart.plotContainer.events.on("up", callback);
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
    lineChartContainer.background.cornerRadius(30, 30, 0, 0);
    lineChartContainer.background.fillOpacity = 0.25;
    lineChartContainer.paddingTop = 12;
    lineChartContainer.paddingBottom = 0;

    // https://www.amcharts.com/docs/v4/chart-types/xy-chart/
    let lineChart = lineChartContainer.createChild(am4charts.XYChart);
    lineChart.fontSize = "0.8em";
    lineChart.paddingRight = 30;
    lineChart.paddingLeft = 30;
    lineChart.maskBullets = false;
    lineChart.paddingBottom = 5;
    lineChart.paddingTop = 3;
    lineChart.zoomOutButton.disabled = true;

    // date axis
    // https://www.amcharts.com/docs/v4/concepts/axes/date-axis/
    let dateAxis = lineChart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 50;
    dateAxis.renderer.grid.template.stroke = am4core.color("#000000");
    dateAxis.renderer.grid.template.strokeOpacity = 0.25;

    dateAxis.max = g.lastDate.getTime() + am4core.time.getDuration("day", 5);

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
    valueAxis.renderer.grid.template.stroke = am4core.color("#000000");
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
    lineChart.legend.fontSize = "10px";
    lineChart.legend.itemContainers.template.valign = "middle";

    lineChart.legend.itemContainers.template.events.on("down", function () {
      lineChart.legendDown = true;
    });
    lineChart.legend.itemContainers.template.events.on("up", function () {
      setTimeout(function () {
        lineChart.legendDown = false;
      }, 100);
    });

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
    series.strokeOpacity = 0.6;
    series.stroke = color;
    series.fill = color;
    series.maskBullets = false;
    series.minBulletDistance = 10;
    series.hidden = true;
    series.hideTooltipWhileZooming = true;

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
    series.tooltipText = "Total {name}: {valueY}";

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
    g.lineChartSeries[type].show();
    // hide other series
    for (let key in g.lineChartSeries) {
      if (key !== type) {
        g.lineChartSeries[key].hide();
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
  constructor(name, options) {
    this.container = null;
    this.options =
      {
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
    this.init(name);
  }

  setKeyName(name) {
    this.options.keyName = name;
  }
  init(nodeName) {
    // main container
    // https://www.amcharts.com/docs/v4/concepts/svg-engine/containers/
    this.container = am4core.create(nodeName, am4core.Container);
    this.container.language.locale = ko;
    this.setSizeCanvas(100, 100);
    const data = this.setPaperData();

    this.container.tooltip = new am4core.Tooltip();
    this.container.tooltip.background.fill = am4core.color("#000000");
    this.container.tooltip.background.stroke = this.options.colors[
      this.options.keyName
    ];
    this.container.tooltip.fontSize = "0.9em";
    this.container.tooltip.getFillFromObject = false;
    this.container.tooltip.getStrokeFromObject = false;

    this.mapChart = this.container.createChild(am4maps.MapChart);
    this.mapChart.height = am4core.percent(100);
    this.mapChart.zoomControl = new am4maps.ZoomControl();
    this.mapChart.zoomControl.align = "right";
    this.mapChart.zoomControl.marginRight = 15;
    this.mapChart.zoomControl.valign = "middle";

    this.mapChart.seriesContainer.background.fillOpacity = 0;
    this.mapChart.zoomEasing = am4core.ease.sinOut;

    // https://www.amcharts.com/docs/v4/chart-types/map/#Map_data
    // you can use more accurate world map or map of any other country - a wide selection of maps available at: https://github.com/amcharts/amcharts4-geodata
    this.mapChart.geodata = geo;
    this.mapChart.reverseGeodata = true;
    // Set projection
    // https://www.amcharts.com/docs/v4/chart-types/map/#Setting_projection
    // instead of Miller, you can use Mercator or many other projections available: https://www.amcharts.com/demos/map-using-d3-projections/
    this.mapChart.projection = new am4maps.projections.Miller();
    this.mapChart.panBehavior = "move";

    // when map is globe, beackground is made visible
    this.mapChart.backgroundSeries.mapPolygons.template.polygon.fillOpacity = 0.05;
    this.mapChart.backgroundSeries.mapPolygons.template.polygon.fill = am4core.color(
      "#000"
    );
    this.mapChart.backgroundSeries.hidden = true;
    // you can have pacific - centered map if you set this to -154.8
    this.mapChart.deltaLongitude = -10;
    this.drawMapFeature(data);
    this.drawBubble(data);
  }

  setSizeCanvas(w, h) {
    this.container.width = am4core.percent(w);
    this.container.height = am4core.percent(h);
  }
  // PREPARE DATA
  setPaperData() {
    // let list = g.point_area[g.point_area.length - 1].list;
    // for (let i = 0; i < list.length; i++) {
    //   let country = list[i];
    //   console.log(country);
    //   countryIndexMap[country.id] = i;
    // }

    // get slide data
    let slideData = getSlideData();
    // 데이터복사
    let mapData = JSON.parse(JSON.stringify(slideData.list));

    // 성능 향상을 위해 값이 0 인 항목 제거
    for (let i = mapData.length - 1; i >= 0; i--) {
      if (mapData[i].confirmed == 0) {
        mapData.splice(i, 1);
      }
    }

    // the last day will have most
    // for (let i = 0; i < mapData.length; i++) {
    //   let di = mapData[i];
    //   if (di.confirmed > max.confirmed) {
    //     max.confirmed = di.confirmed;
    //   }
    //   if (di.recovered > max.recovered) {
    //     max.recovered = di.recovered;
    //   }
    //   if (di.deaths > max.deaths) {
    //     max.deaths = di.deaths;
    //   }
    //   max.active = max.confirmed;
    // }
    return mapData;
    // END OF DATA
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
    polygonSeries.data = mapData;

    let polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.fill = this.options.countryColor;
    polygonTemplate.fillOpacity = 1;
    polygonTemplate.stroke = this.options.countryStrokeColor;
    polygonTemplate.strokeOpacity = 0.15;
    polygonTemplate.setStateOnChildren = true;
    polygonTemplate.tooltipPosition = "fixed";

    //%polygonTemplate.events.on("hit", handleCountryHit);
    //%polygonTemplate.events.on("over", handleCountryOver);
    //%polygonTemplate.events.on("out", handleCountryOut);

    polygonSeries.heatRules.push({
      target: polygonTemplate,
      property: "fill",
      min: this.options.countryColor,
      max: this.options.countryColor,
      dataField: "value",
    });

    // 맵라벨 옵션
    let labelSeries = this.mapChart.series.push(new am4maps.MapImageSeries());
    let labelTemplate = labelSeries.mapImages.template.createChild(
      am4core.Label
    );
    labelTemplate.horizontalCenter = "middle";
    labelTemplate.verticalCenter = "middle";
    labelTemplate.fontSize = 12;
    labelTemplate.interactionsEnabled = false;
    labelTemplate.nonScaling = true;
    labelTemplate.fillOpacity = 0.3;
    labelTemplate.fill = "#fff";

    // 라벨 표출
    polygonSeries.events.on("inited", function () {
      for (var i = 0; i < POINT_NAME.length - 1; i++) {
        var polygon = polygonSeries.getPolygonById(POINT_NAME[i]);

        if (polygon) {
          var label = labelSeries.mapImages.create();
          var state = polygon.dataItem.dataContext.id;
          label.latitude = polygon.visualLatitude;
          label.longitude = polygon.visualLongitude;
          label.children.getIndex(0).text = state;
        }
      }
    });

    // polygon 이벤트 바인딩
    const polygonHoverState = polygonTemplate.states.create("hover");
    polygonHoverState.transitionDuration = 100;
    polygonHoverState.properties.fill = this.options.countryHoverColor;

    const polygonActiveState = polygonTemplate.states.create("active");
    polygonActiveState.properties.fill = this.options.activeCountryColor;
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
    bubbleSeries.tooltip.background.fill = am4core.color("#000000");

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
    circle.hiddenState.properties.scale = 0.0001;
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
      max: 10,
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
  setColor(colors) {
    this.options.colors = colors;
  }
  // 업데이트
  updateChart(type) {
    // let custom = setToCustom(type),
    //   name = setToOrigin(type);
    // console.log(type);
    // currentType = name;
    // currentTypeName = name;
    // if (name !== "육정순") {
    //   currentTypeName += " cases";
    // }

    this.bubbleSeries.mapImages.template.tooltipText =
      "[bold]{custom}: {value}[/] [font-size:11px]\n" + type;

    this.bubbleSeries.dataFields.value = type;
    this.polygonSeries.dataFields.value = type;
    this.bubbleSeries.dataItems.each((dataItem) => {
      dataItem.setValue("value", dataItem.dataContext[type]);
    });

    this.polygonSeries.dataItems.each((dataItem) => {
      dataItem.setValue("value", dataItem.dataContext[type]);
      dataItem.mapPolygon.defaultState.properties.fill = undefined;
    });

    // change color of bubbles
    // setting colors on mapImage for tooltip colors

    this.bubbleSeries.mapImages.template.fill = this.options.colors[type];
    this.bubbleSeries.mapImages.template.stroke = this.options.colors[type];
    this.bubbleSeries.mapImages.template.children.getIndex(
      0
    ).fill = this.options.colors[type];
    // update heat rule's maxValue
    this.bubbleSeries.heatRules.getIndex(0).maxValue = 30;
    this.polygonSeries.heatRules.getIndex(0).maxValue = 30;
  }
}
export { SliderBar, LineChart, MapChart };
