import { useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl";
import styled from "styled-components";
import { makeStepFillLayer, makeStrokeLayer, handleEvent } from "./mapboxUtil";
import ReactTooltip from "react-tooltip";
import Chip from "@material-ui/core/Chip";

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
  const [mapValue, setMapValue] = useState();
  const [prefixValue, setPrefixValue] = useState("");
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
    g.setMapValue = setMapValue;
    g.setPrefixValue = setPrefixValue;
    g.map = map;
  }, []);

  //19대대선시도_투표수
  return (
    <>
      <MapContainer data-tip="" id="map" />
      {mapValue ? (
        <ReactTooltip>
          <div id="tooltip">
            <div className="tit-wrap">
              {mapValue["CTP_KOR_NM"] && <h2>{mapValue["CTP_KOR_NM"]}</h2>}
              {mapValue["SIG_KOR_NM"] && (
                <h2>
                  {mapValue["19대대선구_시도"]} {mapValue["SIG_KOR_NM"]}
                </h2>
              )}
              {mapValue["19대대선동_읍면동"] && (
                <h2>
                  {mapValue["19대대선동_시도"]} {mapValue["19대대선동_구시군"]}{" "}
                  {mapValue["19대대선동_읍면동"]}
                </h2>
              )}
              {Math.abs(
                mapValue[`${prefixValue}_더불어민주당_득표율`] -
                  mapValue[`${prefixValue}_자유한국당_득표율`]
              ) <= 2 ? (
                <Chip label="경합지역" variant="outlined" />
              ) : null}
            </div>
            <h3>개표결과</h3>
            <ul>
              <li>
                투표수:{" "}
                {Number(mapValue[`${prefixValue}_투표수`]).toLocaleString()}
              </li>
              <li>
                더불어민주당: {mapValue[`${prefixValue}_더불어민주당_득표율`]}%
              </li>
              <li>
                자유한국당: {mapValue[`${prefixValue}_자유한국당_득표율`]}%
              </li>
              <li>국민의당: {mapValue[`${prefixValue}_국민의당_득표율`]}%</li>
              <li>바른정당: {mapValue[`${prefixValue}_바른정당_득표율`]}%</li>
              <li>정의당: {mapValue[`${prefixValue}_정의당_득표율`]}%</li>
              <li>기타정당: {mapValue[`${prefixValue}_기타`]}%</li>
            </ul>
          </div>
        </ReactTooltip>
      ) : null}
    </>
  );
}

export { Map };
