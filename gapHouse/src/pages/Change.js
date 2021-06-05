import { useEffect, useState } from "react";
import { buyDraw } from "../components/Map";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import { dong, hDate, callSheet } from "../asset/data/house";

const g = window;
function delay() {
  return new Promise((resolve) => setTimeout(resolve, 3000));
}

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
      cache =  Object.entries(temp).map((v) => v[1]);
      localStorage.setItem("buy", JSON.stringify(cache));
    }

    if (pos === "main") {
      buyDraw(null, cache);
    } else {      
      buyDraw(setHouseData, cache);
    }
    // HMR 및 SPA라우터에서 페이지 전환 후 돌아 올때 맵이 꺠지는 이슈 수정 [소요시간 5h]
    if (g[g.KEY] && g[g.KEY].mapChart) {
      g[g.KEY].mapChart.mapChart.reverseGeodata = true;
    }
    // 버튼 스타일 변경
    const btn = document.querySelectorAll(
      `.amcharts-shushu .amcharts-RoundedRectangle`
    );

    await delay(400);
    if (btn[1]) {
      btn[1].setAttribute(
        "d",
        "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
      );
      btn[1].setAttribute("style", "opacity: 1");
    }


    g.timer1 = setTimeout(() => {
      const zone = document.querySelector(".time-title-wrap");
      if (zone) {
        zone.classList.add("active");
      }
    }, 2000);
  }, []);
  // [이슈파악완료] async에서는 clear 처리가 안됨- 정리가 안되어 맵 갱신 이슈가 발생
  useEffect(() => {
    return () => {
      if (g[g.KEY] && g[g.KEY].mapChart) {
        g[g.KEY].mapChart.mapChart.reverseGeodata = false;        
      }    
    }
   }, [])

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
