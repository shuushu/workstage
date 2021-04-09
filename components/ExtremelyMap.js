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
    map.on("load", () => {
      // map.addSource("시군", {
      //   type: "vector",
      //   url: "mapbox://mapbox.mapbox-streets-v5,shuushu.ak4o6zr0",
      // });

      map.addSource("SIDO", 행정구역시도);
      map.addLayer({
        id: "SIDO-fill-Layer",
        type: "fill",
        source: "SIDO",
        paint: {
          "fill-color": "black",
          "fill-opacity": 0.1,
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
          "line-color": "#777",
          "line-width": [
            "case",
            ["boolean", ["feature-state", "hover"], false],
            1,
            0.1,
          ],
        },
      });

      map.on("mouseenter", "SIDO-fill-Layer", function (e) {
        if (e.features.length > 0) {
          console.log(e.features[0]);
          /*  map.addSource("TEST", {
            type: "geojson",
            data: {
              type: "Feature",
              geometry: e.features[0].geometry,
            },
          });
          map.addLayer({
            id: "outline",
            type: "line",
            source: "TEST",
            layout: {},
            paint: {
              "line-color": "#000",
              "line-width": 3,
            },
          }); */
        }
      });
      map.on("mousemove", "SIDO-fill-Layer", function (e) {
        ///
        //
        console.log(e);
        if (e.features.length > 0) {
          if (hoveredStateId !== null) {
            map.setFeatureState(
              {
                source: "SIDO",
                id: hoveredStateId,
                //sourceLayer: "sisi-61f5i6",
              },
              { hover: false }
            );
          }
          hoveredStateId = e.features[0].id;
          map.setFeatureState(
            {
              source: "SIDO",
              id: hoveredStateId,
              //sourceLayer: "sisi-61f5i6",
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
              //sourceLayer: "sisi-61f5i6",
            },
            { hover: false }
          );
        }
        hoveredStateId = null;
      });
    });

    //getData();
  }, []);

  return <MapContainer id="map" />;
}

export { Map };
