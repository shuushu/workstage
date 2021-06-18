import { useEffect } from "react";
import mapboxgl from "!mapbox-gl";
import styled from "styled-components";
import { makeStepFillLayer, makeStrokeLayer, handleEvent } from "./mapboxUtil";

window.hflag = {
  SIDO: null,
  GU: null,
  EMD: null,
};
const g = window;
mapboxgl.accessToken =
  "pk.eyJ1Ijoic2h1dXNodSIsImEiOiJja241YWpkc20wMTZ1MzBxdmYwNnVoNGdqIn0.09g5XcsdpaWW1UyrMU6o2Q";
const MapContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

function drawSI() {
  g.map.addSource("SIDO", {
    type: "vector",
    url: "mapbox://mapbox.mapbox-streets-v5,shuushu.8ev129f5",
    promoteId: "CTP_ENG_NM", // 필드네임
  });
  const valuesRange = [35, 40, 45, 50, 55, 100];
  const identifier = {
    source: "SIDO",
    name: "SIDO19-9tpa1q",
    sourceLayer: "SIDO19-9tpa1q",
    level: [0.5, 11, 0],
  };
  makeStepFillLayer(valuesRange, {
    ...identifier,
    id: "SIDO-fill-Layer",
    prefix: "19대대선시도",
  });

  makeStrokeLayer({
    ...identifier,
    id: "SIDO-line-Layer",
  });

  handleEvent({
    ...identifier,
    type: "mousemove",
    layerName: "SIDO-fill-Layer",
  });
  handleEvent({
    ...identifier,
    type: "mouseleave",
    layerName: "SIDO-fill-Layer",
  });
}

function drawGU() {
  g.map.addSource("GU", {
    type: "vector",
    url: "mapbox://mapbox.mapbox-streets-v5,shuushu.5f8q1cqr",
    promoteId: "SIG_CD",
  });
  const valuesRange = [35, 40, 45, 50, 55, 100];
  const identifier = {
    source: "GU",
    name: "GU19v2-4we0h8",
    sourceLayer: "GU19v2-4we0h8",
    level: [0, 9, 1],
  };
  makeStepFillLayer(valuesRange, {
    ...identifier,
    id: "GU-fill-Layer",
    prefix: "19대대선구",
  });
  makeStrokeLayer({
    ...identifier,
    id: "GU-line-Layer",
  });

  g.map.addLayer({
    id: "GU-HOVER-SIDO-AREA",
    type: "fill",
    source: "SIDO",
    "source-layer": "SIDO19-9tpa1q",
    paint: {
      "fill-opacity": [
        "step",
        ["zoom"],
        ["case", ["boolean", ["feature-state", "hover"], false], 0.2, 0],
        11,
        0,
      ],
    },
  });

  handleEvent({
    type: "mousemove",
    ...identifier,
    layerName: "GU-fill-Layer",
  });

  handleEvent({
    type: "mouseleave",
    ...identifier,
    layerName: "GU-fill-Layer",
  });
}
function drawDONG() {
  g.map.addSource("DONG", {
    type: "vector",
    url: "mapbox://mapbox.mapbox-streets-v5,shuushu.8afmuqyo",
    promoteId: "adm_dr_cd", // 필드명을 고유아디로 지정
  });
  const valuesRange = [35, 40, 45, 50, 55, 100];
  const identifier = {
    source: "DONG",
    name: "DONG19-a7ywpv",
    sourceLayer: "DONG19-a7ywpv",
    level: [0, 10, 1],
  };

  makeStepFillLayer(valuesRange, {
    ...identifier,
    id: "DONG-fill-Layer",
    prefix: "19대대선동",
    layout: {
      "text-size": 11,
      "text-letter-spacing": 0.05,
      "text-offset": [0, 1.5],
    },
  });
  makeStrokeLayer({
    ...identifier,
    id: "DONG-line-Layer",
  });

  // 지역라벨보이기
  /*map.addLayer({
    id: "DONG-label",
    type: "symbol",
    source: "DONG",
    "source-layer": "DONG19-a7ywpv",
    layout: {
      "text-field": "{19대대선동_구시군} {adm_dr_nm}",
      "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
      "text-size": 12,
    },
    paint: {
      "text-opacity": ["step", ["zoom"], ...identifier.level],
    },
  });*/

  g.map.addLayer({
    id: "DONG-HOVER-GU-AREA",
    type: "fill",
    source: "GU",
    "source-layer": "GU19v2-4we0h8",
    paint: {
      "fill-opacity": [
        "step",
        ["zoom"],
        0,
        10,
        ["case", ["boolean", ["feature-state", "hover"], false], 0.2, 0],
      ],
    },
  });

  handleEvent({
    type: "mousemove",
    ...identifier,
    layerName: "DONG-fill-Layer",
  });

  handleEvent({
    type: "mouseleave",
    ...identifier,
    layerName: "DONG-fill-Layer",
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

    map.on("load", () => {
      drawSI();
      drawGU();
      drawDONG();
    });

    g.map = map;
  }, []);

  //19대대선시도_투표수
  return (
    <>
      <MapContainer data-tip="" id="map" />
    </>
  );
}

export { Map };
