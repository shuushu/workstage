import { useEffect, useState } from "react";
import { buyDraw } from "../components/Map";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import { dong, hDate, callSheet } from "../asset/data/house";

const g = window;

export default function TimelineAll(props) {
  const { setHouseData, pos } = props;
  const [dateValue, setDateValue] = useState("");
  let cache;

  useEffect(async () => {
    g.KEY = "매입";
    g.setDateValue = setDateValue;
    const getCache = localStorage.getItem("buy");

    if (getCache) {
      cache = JSON.parse(getCache);
    } else {
      const getData = await callSheet("when");

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
      localStorage.setItem("buy", JSON.stringify(cache));
    }

    if (pos === "main") {
      buyDraw(null, cache);
    } else {
      buyDraw(setHouseData, cache);
    }

    g.timer1 = setTimeout(() => {
      const zone = document.querySelector(".time-title-wrap");
      if (zone) {
        zone.classList.add("active");
      }
    }, 2000);
  }, []);

  return (
    <div className="chartWrap">
      <div id="chartdiv3">is not support</div>
      <div id="sideBottom3">
        <div className="time-title-wrap">
          <h5 className="tit">
            <AccessTimeIcon />
            날짜 별 현황
            <span id="currentDate">{dateValue}</span>
          </h5>
        </div>
        <div id="playBtn3"></div>
        <div id="linechart3"></div>
      </div>
    </div>
  );
}
