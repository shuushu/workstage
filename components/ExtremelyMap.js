import { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import MapboxLanguage from "@mapbox/mapbox-gl-language";
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

const tempGeoJson = {
  type: "geojson",
  data: {
    type: "Feature",
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [-67.13734351262877, 45.137451890638886],
          [-66.96466, 44.8097],
          [-68.03252, 44.3252],
          [-69.06, 43.98],
          [-70.11617, 43.68405],
          [-70.64573401557249, 43.090083319667144],
          [-70.75102474636725, 43.08003225358635],
          [-70.79761105007827, 43.21973948828747],
          [-70.98176001655037, 43.36789581966826],
          [-70.94416541205806, 43.46633942318431],
          [-71.08482, 45.3052400000002],
          [-70.6600225491012, 45.46022288673396],
          [-70.30495378282376, 45.914794623389355],
          [-70.00014034695016, 46.69317088478567],
          [-69.23708614772835, 47.44777598732787],
          [-68.90478084987546, 47.184794623394396],
          [-68.23430497910454, 47.35462921812177],
          [-67.79035274928509, 47.066248887716995],
          [-67.79141211614706, 45.702585354182816],
          [-67.13734351262877, 45.137451890638886],
        ],
      ],
    },
  },
};

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

    //shuushu.3q5w0olc
    let hoveredStateId = null;
    map.on("load", () => {
      var stateDataLayer = map.getLayer("si");
      console.log(stateDataLayer);

      /* map.addLayer({
        id: "si",
        source: "composite",
        type: "fill",
        sourceLayer: "sisi-4rfnug",
        paint: {
          "fill-color": "red",
        },
      }); */

      map.on("mouseenter", "si", function (e) {
        if (e.features.length > 0) {
          console.log(e.features[0]);

          /*  if (hoveredStateId !== null) {
            map.setFeatureState(
              { source: "si", id: hoveredStateId },
              { hover: false }
            );
          }
          hoveredStateId = e.features[0].id;
          map.setFeatureState(
            { source: "si", id: hoveredStateId },
            { hover: true }
          ); */
        }
      });

      /* map.on("mousemove", function (e) {
        var features = map.queryRenderedFeatures(e.point);
        console.log(features);
        //features[0].layer.
        map.setPaintProperty("gu", "fill-color", "red");
      }); */
    });

    //getData();
  }, []);

  return <MapContainer id="map" />;
}

export { Map };
