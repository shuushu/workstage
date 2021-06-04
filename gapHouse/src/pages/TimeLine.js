import { useEffect, useState } from "react";
import drawChart from "../components/Map";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import { dong, hDate, callSheet } from "../asset/data/house";
const g = window;

export default function TimelineAll(props) {
  const { setHouseData } = props;
  const [dateValue, setDateValue] = useState("");

  useEffect(async () => {
    g.KEY = "상태";
    let cache;

    if (g[g.KEY] && g[g.KEY].point_area) {
      cache = g[g.KEY].point_area;
    } else {
      const getData = await callSheet("when");
      g.setDateValue = setDateValue;
      let temp = {};

      hDate.forEach((date) => {
        temp[date] = {
          date: date,
          list: [],
        };
      });

      dong.forEach((dong, i) => {
        hDate.forEach((date, i2) => {
          temp[date].list.push({
            매입: getData[i]._rawData[i2 + 1],
            id: dong,
          });
        });
      });
      cache = await Object.entries(temp).map((v) => v[1]);
    }

    drawChart(setHouseData, cache);

    g.timer1 = setTimeout(() => {
      const zone = document.querySelector(".time-title-wrap");
      if (zone) {
        zone.classList.add("active");
      }
    }, 2000);
  }, []);
  return (
    <div className="chartWrap">
      <div id="chartdiv">is not support</div>
      <div id="sideBottom">
        <div className="time-title-wrap">
          <h5 className="tit">
            <AccessTimeIcon />
            날짜 별 현황
            <span id="currentDate">{dateValue}</span>
          </h5>
        </div>
        <div id="playBtn"></div>
        <div id="linechart"></div>
      </div>
    </div>
  );
}
