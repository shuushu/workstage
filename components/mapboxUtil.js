window.hflag = {
  SIDO: null,
  GU: null,
  EMD: null,
};
const g = window;

// 단계별 색상 채우기
function generatorColorSteopExpressions(name, color, valuesRange) {
  const dyColor = (범위값) => {
    let result, value;
    switch (범위값) {
      case valuesRange[0]:
        value = 200;
        break;
      case valuesRange[1]:
        value = 160;
        break;
      case valuesRange[2]:
        value = 80;
        break;
      case valuesRange[3]:
        value = 50;
        break;
      case valuesRange[4]:
        value = 30;
        break;
      case valuesRange[5]:
        value = 0;
        break;
      default:
        value = 230;
        break;
    }
    switch (color) {
      case "red":
        result = `rgb(255,${value},${value})`;
        break;
      case "green":
        result = `rgb(${value},255,${value})`;
        break;
      case "blue":
        result = `rgb(${value},${value},255)`;
        break;
      case "yellow":
        result = `rgb(255,255,${value})`;
        break;
      case "cyan":
        result = `rgb(255,255,${value})`;
        break;
      default:
        result = `rgba(0,0,0,1)`;
        break;
    }
    return result;
  };

  let temp = ["case"];
  // 값이 단계가 세분화 되어 표현할 때
  valuesRange.forEach((범위값) => {
    temp.push(["<", ["to-number", ["get", name]], 범위값]);
    temp.push(dyColor(범위값));
  });
  temp.push(dyColor(1));
  return temp;
}

// mapbox expression 만들기
function makeExpression(valuesRange, prefix) {
  return [
    [`${prefix}_자유한국당_득표율`, "red"],
    [`${prefix}_더불어민주당_득표율`, "blue"],
    [`${prefix}_국민의당_득표율`, "green"],
    [`${prefix}_정의당_득표율`, "yellow"],
    [`${prefix}_바른정당_득표율`, "cyan"],
  ].map(([정당, 컬러]) => {
    return generatorColorSteopExpressions(정당, 컬러, valuesRange);
  });
}
// 면채우기
function makeStepFillLayer(valuesRange, props) {
  const { id, source, name, prefix, level } = props;
  const 정당별컬러스텝 = makeExpression(valuesRange, prefix);
  g.map.addLayer({
    id,
    source,
    type: "fill",
    "source-layer": name,
    paint: {
      "fill-color": [
        "case",
        ["==", ["get", `${prefix}_개표결과`], "자유한국당_득표율"],
        [...정당별컬러스텝[0]],
        ["==", ["get", `${prefix}_개표결과`], "더불어민주당_득표율"],
        [...정당별컬러스텝[1]],
        ["==", ["get", `${prefix}_개표결과`], "국민의당_득표율"],
        [...정당별컬러스텝[2]],
        ["==", ["get", `${prefix}_개표결과`], "정의당_득표율"],
        [...정당별컬러스텝[3]],
        ["==", ["get", `${prefix}_개표결과`], "바른정당_득표율"],
        [...정당별컬러스텝[4]],
        "black",
      ],
      "fill-opacity": ["step", ["zoom"], ...level],
    },
  });
}
// 라인그리기
function makeStrokeLayer(props) {
  const { id, source, name, level } = props;
  g.map.addLayer({
    id,
    source,
    type: "line",
    layout: {
      "line-join": "round",
      "line-cap": "round",
    },
    "source-layer": name,
    paint: {
      "line-color": "#333",
      "line-width": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        1.3,
        0.1,
      ],
      "line-opacity": ["step", ["zoom"], ...level],
    },
  });
}
// 마우스이벤트
function handleEvent(props) {
  const { source, sourceLayer, type, layerName } = props;

  switch (type) {
    case "mousemove":
      g.map.on(type, layerName, function (e) {
        if (e.features.length > 0) {
          if (g.hflag[source] !== null) {
            map.setFeatureState(
              {
                source,
                sourceLayer,
                id: g.hflag[source],
              },
              { hover: false }
            );
          }
          g.hflag[source] = e.features[0].id;
          map.setFeatureState(
            {
              source,
              sourceLayer,
              id: g.hflag[source],
            },
            { hover: true }
          );
        }
      });
      break;
    case "mouseleave":
      g.map.on(type, layerName, function () {
        if (g.hflag[source] !== null) {
          map.setFeatureState(
            {
              source,
              sourceLayer,
              id: g.hflag[source],
            },
            { hover: false }
          );
        }

        g.hflag[source] = null;
      });
      break;
  }
}

export {
  generatorColorSteopExpressions,
  makeExpression,
  makeStepFillLayer,
  makeStrokeLayer,
  handleEvent,
};
