import { useEffect } from "react";
import { TotalDraw } from "../components/Map";
import SliderTab from "../components/Slider";
const g = window;
export default function TimelineAll(props) {
  const { houseData, setHouseData } = props;
  useEffect(() => {
    g.KEY = "전체";

    TotalDraw(setHouseData);
    // HMR 및 SPA라우터에서 페이지 전환 후 돌아 올때 맵이 꺠지는 이슈 수정 [소요시간 5h]
    if (g[g.KEY].mapChart2) {
      g[g.KEY].mapChart2.mapChart.reverseGeodata = true;
      // setTimeout(() => {
      //   g[g.KEY].mapChart2.mapChart.reverseGeodata = false;
      // }, 300);
    }

    return () => {
      if (g[g.KEY].mapChart2) {
        g[g.KEY].mapChart2.mapChart.reverseGeodata = false;
        g[g.KEY].mapChart2.container.dispose();
        g[g.KEY].mapChart2.mapChart.dispose();
      }
    };
  }, []);
  return (
    <div className="chartWrap">
      <div id="chartdiv2">is not support</div>
      <div className="sliderTab">
        <SliderTab houseData={houseData} />
      </div>
    </div>
  );
}
