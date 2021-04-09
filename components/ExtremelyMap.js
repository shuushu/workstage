import { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import styled from "styled-components";
import { 행정구역시도 } from "../example/geoData/행정구역_시도";

mapboxgl.accessToken =
  "pk.eyJ1Ijoic2h1dXNodSIsImEiOiJja241YWpkc20wMTZ1MzBxdmYwNnVoNGdqIn0.09g5XcsdpaWW1UyrMU6o2Q";
const KEY = "E67C3AC5-B75A-39CE-85A3-375C132523FB";
const DOMAIN = "localhost:3000";
const MapContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;
// 단계별 색상 채우기
function generatorColorSteopExpressions(name, color) {
  const dyColor = (v) => {
    let result;
    let caclu = Math.round(Number(v) / 550);
    let value = caclu >= 255 ? 0 : 255 - caclu;
    switch (color) {
      case "red":
        result = `rgba(255,${value},${value},0.5)`;
        break;
      case "green":
        result = `rgba(${value},255,${value},0.5)`;
        break;
      case "blue":
        result = `rgba(${value},${value},255,0.5)`;
        break;
      case "yellow":
        result = `rgba(255,255,${value},0.5)`;
        break;
      default:
        result = `rgba(0,0,0,0.5)`;
        break;
    }
    return result;
  };
  const values = ["150000", "100000", "50000", "20000"];

  let temp = ["case"];

  // 값이 단계가 세분화 되어 표현할 때
  values.forEach((v, i) => {
    temp.push([">", ["get", name], v]);
    temp.push(dyColor(v));
  });
  //temp.push("black");
  temp.push(dyColor(50000));
  return temp;
}

function drawSI(map, hoveredStateId) {
  map.addSource("SIDO", 행정구역시도);
  map.addLayer({
    id: "SIDO-fill-Layer",
    type: "fill",
    source: "SIDO",
    paint: {
      "fill-color": [
        "case",
        ["==", ["get", "개표결과"], "자유한국당홍준표"],
        "red",
        ["==", ["get", "개표결과"], "더불어민주당문재인"],
        "blue",
        ["==", ["get", "개표결과"], "국민의당안철수"],
        "green",
        ["==", ["get", "개표결과"], "정의당심상정"],
        "yellow",
        "black",
      ],
      "fill-opacity": ["interpolate", ["linear"], ["zoom"], 0, 0.5, 10, 0],
    },
  });
  map.addLayer({
    id: "SIDO-line-Layer",
    type: "line",
    source: "SIDO",
    layout: {
      "line-join": "round",
      "line-cap": "round",
    },
    paint: {
      "line-color": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        "#000",
        "#ccc",
      ],
      "line-width": 0.1,
      "line-opacity": ["step", ["zoom"], 1, 8, 0],
    },
  });

  map.on("mousemove", "SIDO-fill-Layer", function (e) {
    if (e.features.length > 0) {
      if (hoveredStateId !== null) {
        map.setFeatureState(
          {
            source: "SIDO",
            id: hoveredStateId,
          },
          { hover: false }
        );
      }
      hoveredStateId = e.features[0].id;
      map.setFeatureState(
        {
          source: "SIDO",
          id: hoveredStateId,
        },
        { hover: true }
      );
    }
  });
  map.on("mouseleave", "SIDO-fill-Layer", function () {
    if (hoveredStateId !== null) {
      map.setFeatureState(
        {
          source: "SIDO",
          id: hoveredStateId,
        },
        { hover: false }
      );
    }
    hoveredStateId = null;
  });
}

function drawGU(map, hoveredStateId) {
  map.addSource("GU", {
    type: "vector",
    url: "mapbox://mapbox.mapbox-streets-v5,shuushu.9w6nyfe6",
  });
  const 정당별컬러스텝 = (() => {
    return [
      ["19대대선_자유한국당홍준표", "red"],
      ["19대대선_더불어민주당문재인", "blue"],
      ["19대대선_국민의당안철수", "green"],
      ["19대대선_정의당심상정", "yellow"],
    ].map(([정당, 컬러]) => {
      return generatorColorSteopExpressions(정당, 컬러);
    });
  })();

  map.addLayer({
    id: "GU-fill-Layer",
    type: "fill",
    source: "GU",
    "source-layer": "SIGU-4kit8a",
    paint: {
      "fill-color": [
        "case",
        ["==", ["get", "19대대선_개표결과"], "자유한국당홍준표"],
        [...정당별컬러스텝[0]],
        ["==", ["get", "19대대선_개표결과"], "더불어민주당문재인"],
        [...정당별컬러스텝[1]],
        ["==", ["get", "19대대선_개표결과"], "국민의당안철수"],
        [...정당별컬러스텝[2]],
        ["==", ["get", "19대대선_개표결과"], "정의당심상정"],
        [...정당별컬러스텝[3]],
        "black",
      ],
      "fill-opacity": ["interpolate", ["linear"], ["zoom"], 9, 0.5, 11, 0],
    },
  });
  map.addLayer({
    id: "GU-line-Layer",
    type: "line",
    source: "GU",
    layout: {
      "line-join": "round",
      "line-cap": "round",
    },
    "source-layer": "SIGU-4kit8a",
    paint: {
      "line-color": "#000",
      "line-width": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        2,
        0.1,
      ],
      "line-opacity": ["step", ["zoom"], 1, 9, 0],
    },
  });
  map.on("mousemove", "GU-fill-Layer", function (e) {
    if (e.features.length > 0) {
      if (hoveredStateId !== null) {
        map.setFeatureState(
          {
            source: "GU",
            id: hoveredStateId,
            sourceLayer: "SIGU-4kit8a",
          },
          { hover: false }
        );
      }
      hoveredStateId = e.features[0].id;
      map.setFeatureState(
        {
          source: "GU",
          id: hoveredStateId,
          sourceLayer: "SIGU-4kit8a",
        },
        { hover: true }
      );
    }
  });
  map.on("mouseleave", "GU-fill-Layer", function () {
    if (hoveredStateId !== null) {
      map.setFeatureState(
        {
          source: "GU",
          id: hoveredStateId,
          sourceLayer: "SIGU-4kit8a",
        },
        { hover: false }
      );
    }
    hoveredStateId = null;
  });
}

function Map() {
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/shuushu/ckn6qh3f005na17kir1q7kije",
      center: [127.015063, 37.5358887],
      zoom: 8,
      maxBounds: [
        [123, 33],
        [132, 39],
      ],
    });

    let hoveredStateId = null;
    let hoveredStateId2 = null;
    map.on("load", () => {
      drawSI(map, hoveredStateId);
      drawGU(map, hoveredStateId);
    });

    //getData();
  }, []);

  return <MapContainer id="map" />;
}

export { Map };
