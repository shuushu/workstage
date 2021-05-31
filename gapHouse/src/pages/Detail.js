import { useEffect, useState } from "react";
import drawChart, { basicMaps } from "../components/Map";
import SliderTab from "../components/Slider";
const g = window;
export default function Home() {
  const [houseData, setHouseData] = useState([
    {
      name: "소유",
      data: 0,
    },
    {
      name: "가압류",
      data: 0,
    },
    {
      name: "신탁",
      data: 0,
    },
    {
      name: "압류",
      data: 0,
    },
  ]);

  useEffect(() => {
    drawChart(setHouseData);

    // HMR 및 SPA라우터에서 페이지 전환 후 돌아 올때 맵이 꺠지는 이슈 수정 [소요시간 5h]
    if (g.mapChart) {
      g.mapChart.mapChart.reverseGeodata = true;
      setTimeout(() => {
        g.mapChart.mapChart.reverseGeodata = false;
      }, 0);
    }

    return () => {
      g.mapChart.container.dispose();
      g.mapChart.mapChart.dispose();
      g.sliderBar.container.dispose();
      g.linechart.container.dispose();
    };
  }, []);
  return (
    <div id="detail">
      <div id="chartdiv">chart</div>
      <div id="sideBottom">
        <div className="sliderTab">
          <SliderTab houseData={houseData} />
        </div>
        <div id="playBtn"></div>
        <div id="linechart"></div>
      </div>
    </div>
  );
}
