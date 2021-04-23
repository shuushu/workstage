import { useEffect } from "react";
import mapboxgl from "mapbox-gl";
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
    url: "mapbox://mapbox.mapbox-streets-v5,shuushu.95qxj8nm",
    promoteId: "SIG_CD",
  });
  const valuesRange = [35, 40, 45, 50, 55, 100];
  const identifier = {
    source: "GU",
    name: "GU19-63mwoh",
    sourceLayer: "GU19-63mwoh",
    level: [0, 8, 1],
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

function Map() {
  useEffect(() => {
    g.map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/shuushu/ckn6qh3f005na17kir1q7kije",
      center: [127.015063, 37.5358887],
      zoom: 8,
      maxBounds: [
        [123, 33],
        [132, 39],
      ],
    });

    g.map.on("load", () => {
      drawSI();
      drawGU();
    });

    //getData();
  }, []);

  return <MapContainer id="map" />;
}

export { Map };
