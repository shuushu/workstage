import { useEffect, useState } from "react";
import { buyDraw } from "../components/Map";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import { d소유, d강제경매개시, d압류, area } from "../asset/data/data";
const g = window;
const origin = {
  소유: d소유,
  경매개시: d강제경매개시,
  "압류.가압류": d압류,
};

function delay(v) {
  return new Promise((resolve) => setTimeout(resolve, v));
}

export default function TimelineAll(props) {
  const { setHouseData, pos } = props;
  const [dateValue, setDateValue] = useState("");

  useEffect(async () => {
    g.KEY = "매입";
    g.setDateValue = setDateValue;
    const getCache = localStorage.getItem("timeline3");
    let cache;
    if (getCache) {
      cache = JSON.parse(getCache);
    } else {
      const DATA = [];
      let i = 0;

      while (i < 200) {
        let t1 = origin.소유[i];
        let t2 = origin["압류.가압류"][i];
        let t3 = origin.경매개시[i];
        if (t1 && t2 && t3) {
          let obj = {
            date: null,
            list: [],
          };
          obj.date = t1.date;
          area.forEach((name) => {
            let items = {
              id: name,
              소유: t1[name],
              "압류.가압류": t2[name],
              경매개시: t3[name],
            };
            obj.list.push(items);
          });
          DATA.push(obj);
        } else {
          break;
        }
        i++;
      }

      cache = DATA;
      localStorage.setItem("timeline3", JSON.stringify(DATA));
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

    await delay(2000);
    if (btn[1]) {
      btn[1].setAttribute(
        "d",
        "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
      );
      btn[1].setAttribute("style", "opacity: 1");
    }

    const zone = document.querySelector(".time-title-wrap");
    if (zone) {
      zone.classList.add("active");
    }

    if (g[g.KEY].sliderBar) {
      g[g.KEY].sliderBar.play();
    }
  }, []);
  // [이슈파악완료] async에서는 clear 처리가 안됨- 정리가 안되어 맵 갱신 이슈가 발생
  useEffect(() => {
    return () => {
      if (g[g.KEY] && g[g.KEY].mapChart) {
        g[g.KEY].mapChart.mapChart.reverseGeodata = false;
      }
    };
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
