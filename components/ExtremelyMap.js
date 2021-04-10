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
    let caclu = Math.round(Number(v) / 700);
    let value = caclu >= 255 ? 0 : 255 - caclu;

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
      default:
        result = `rgba(0,0,0,1)`;
        break;
    }
    return result;
  };
  const values = ["170000", "150000", "100000", "80000", "60000", "40000", "20000", "10000", "5000", "1000"];

  let temp = ["case"];

  // 값이 단계가 세분화 되어 표현할 때
  values.forEach((v, i) => {
    console.log(name, i, v)
    temp.push([">=", ["get", name], v]);
    temp.push(dyColor(v));
  });
  //temp.push("black");
  temp.push(dyColor(1000));
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
    url: "mapbox://mapbox.mapbox-streets-v5,shuushu.68k17yc7",
    promoteId: "SIG_CD"
  });
  const 정당별컬러스텝 = (() => {
    return [
      ["19대대선구시군_자유한국당홍준표", "red"],
      ["19대대선구시군_더불어민주당문재인", "blue"],
      ["19대대선구시군_국민의당안철수", "green"],
      ["19대대선구시군_정의당심상정", "yellow"],
    ].map(([정당, 컬러]) => {
      return generatorColorSteopExpressions(정당, 컬러);
    });
  })();
  map.addLayer({
    id: "GU-fill-Layer",
    type: "fill",
    source: "GU",
    "source-layer": "SIGUGUN-4j6g82",
    paint: {
      "fill-color": [
        "case",
        ["==", ["get", "19대대선구시군_개표결과"], "자유한국당홍준표"],
        [
          "case",
          ["<", ["get", "19대대선구시군_자유한국당홍준표"], "471"],
          "yellow",
          ["<", ["get", "19대대선구시군_자유한국당홍준표"], "12666"],
          "orange",
          ["<", ["get", "19대대선구시군_자유한국당홍준표"], "29739"],
          "green",
          ["<", ["get", "19대대선구시군_자유한국당홍준표"], "51613"],
          "pink",
          ["<", ["get", "19대대선구시군_자유한국당홍준표"], "86026"],
          "rgb(255,100,100)",
          ["<", ["get", "19대대선구시군_자유한국당홍준표"], "165781"],
          "rgb(255,255,255)",
          "rgb(255,20,20)",
        ],
        //[...정당별컬러스텝[0]],
        ["==", ["get", "19대대선구시군_개표결과"], "더불어민주당문재인"],
        [...정당별컬러스텝[1]],
        ["==", ["get", "19대대선구시군_개표결과"], "국민의당안철수"],
        [...정당별컬러스텝[2]],
        ["==", ["get", "19대대선구시군_개표결과"], "정의당심상정"],
        [...정당별컬러스텝[3]],
        "black",
      ],
      "fill-opacity": ["step", ["zoom"], 0.9, 11, 0],
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
    "source-layer": "SIGUGUN-4j6g82",
    paint: {
      "line-color": "#000",
      "line-width": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        2,
        0.1,
      ],
      "line-opacity": ["step", ["zoom"], 1, 11, 0],
    },
  });
  map.on("mousemove", "GU-fill-Layer", function (e) {
    console.log(e.features[0])
    if (e.features.length > 0) {
      if (hoveredStateId !== null) {
        map.setFeatureState(
          {
            source: "GU",
            id: hoveredStateId,
            sourceLayer: "SIGUGUN-4j6g82",
          },
          { hover: false }
        );
      }
      hoveredStateId = e.features[0].id;
      map.setFeatureState(
        {
          source: "GU",
          id: hoveredStateId,
          sourceLayer: "SIGUGUN-4j6g82",
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
          sourceLayer: "SIGUGUN-4j6g82",
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
