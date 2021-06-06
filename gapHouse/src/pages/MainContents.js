import { useEffect, useState } from "react";
import { useRouteMatch, Switch, Route, Redirect } from "react-router-dom"; // https://reactrouter.com/web/guides/quick-start
import TimelineAll from "./TimeLine";
import Total from "./Total";
import Change from "./Change";
import * as am4core from "@amcharts/amcharts4/core";
const g = window;

export default function Detail() {
  const [houseData, setHouseData] = useState([
    {
      name: "세대기준",
      data: 582,
    },
    {
      name: "빌라기준",
      data: 280,
    },
  ]);
  let match = useRouteMatch();

  useEffect(() => {
    ['상태', '전체'].forEach(i => {
      if (g[i] && g[i].mapChart) {
        g[i].mapChart.mapChart.chartContainer.wheelable = false;
      }
      if (g[i] && g[i].mapChart2) {
        g[i].mapChart2.mapChart.chartContainer.wheelable = false;
      }
    })
    return () => {
      // 정리
    };
  }, []);


  clearTimeout(g.timer);
  clearTimeout(g.timer1);

  useEffect(() => {
    // 모든 차트 dispose
    am4core.options.autoDispose = true;
  }, [window.location.href]);
  return (
    <div id="mainMapContents">
      <div id="detail">
        <Switch>
          <Route exact path={match.path}>
            <TimelineAll
              houseData={houseData}
              setHouseData={setHouseData}
              match={match}
            />
          </Route>
          <Route path={`${match.path}/total`}>
            <Total
              houseData={houseData}
              setHouseData={setHouseData}
              match={match}
            />
          </Route>
          <Route path={`${match.path}/change`}>
            <Change
              houseData={houseData}
              setHouseData={setHouseData}
              match={match}
              pos="mainMap"
            />
          </Route>
          <Route path="/mainMap/*">
            <Redirect to="/mainMap" />
          </Route>
        </Switch>
      </div>
    </div>
  );
}
