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
        <div id="linechart"></div>
      </div>
      <div id="playBtn"></div>
    </div>
  );
}
