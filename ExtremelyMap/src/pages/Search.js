import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import mapboxgl from "mapbox-gl";
import { callSheet } from "../components/util";
const g = window;
let keyNames;

function getName(v) {
  switch (v) {
    case "더불어민주당_득표율":
      return "문재인";
    case "자유한국당_득표율":
      return "홍준표";
    case "국민의당_득표율":
      return "안철수";
    case "정의당_득표율":
      return "심상정";
    case "바른정당_득표율":
      return "유승민";
    default:
      return "기타";
  }
}

function SearchView() {
  let { id } = useParams();
  let [value, setValue] = useState([]);
  let marker;
  const vparams = id.substr(1).split("&");

  useEffect(() => {
    if (marker) {
      marker.remove();
    }
    const cache = localStorage.getItem("DONG");
    if (cache) {
      const data = JSON.parse(cache);
      setValue(data[vparams[0]]);
    } else {
      callSheet("1HufTDVR1QDb2vhFF2putaFZxeynfMOOmfqAs-z7Q_EE", "DONG").then(
        (res) => {
          const obj = {};
          if (!keyNames) {
            keyNames = res[0]._sheet.headerValues;
            localStorage.setItem("DONG-ROWS", JSON.stringify(keyNames));
          }

          res.forEach((v) => {
            const { 구시군, 읍면동 } = v;
            obj[`${구시군}${읍면동}`] = v._rawData;
          });

          localStorage.setItem("DONG", JSON.stringify(obj));
          setValue(obj[vparams[0]]);
        }
      );
    }

    g.map.flyTo({
      center: [vparams[1].substr(2), vparams[2].substr(2)],
      essential: true,
      zoom: 11,
    });
    marker = new mapboxgl.Marker()
      .setLngLat([vparams[1].substr(2), vparams[2].substr(2)])
      .addTo(g.map);
    return () => {
      marker.remove();
    };
  }, [id]);

  function RrawRank(props) {
    const arr = [],
      rank12 = [],
      rankElse = [];

    props.data.forEach((i) => {
      const head = JSON.parse(localStorage.getItem("DONG-ROWS"));
      arr.push({
        name: head[i],
        value: value[i],
      });
    });

    arr
      .sort((a, b) => b.value - a.value)
      .forEach((n, i) => {
        const vv = (
          <li key={`items${i}`} className={n.name}>
            <div className="info">
              <span className="정당"></span>
              <p className="name">{getName(n.name)}</p>
            </div>
            {n.value}%
          </li>
        );
        if (i < 2) {
          rank12.push(vv);
        } else {
          rankElse.push(vv);
        }
      });

    return (
      <div className="rank-result">
        <ul className="top">{rank12}</ul>
        <ul className="topElse">{rankElse}</ul>
      </div>
    );
  }
  return value && value.length > 0 ? (
    <div>
      {<h3>{`${value[0]} ${value[1]} ${value[2]}`}</h3>}
      <div>선거인수 : {value[4]}</div>
      <div>투표수 : {value[5]}</div>
      <h4>선거 결과</h4>
      <RrawRank data={[24, 25, 26, 27, 28, 29]} />
      <h4>detail</h4>
      {}
    </div>
  ) : null;
}
export default SearchView;
