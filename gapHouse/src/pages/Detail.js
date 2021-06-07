import { useEffect, useState } from "react";
import { useRouteMatch, Switch, Route, Redirect } from "react-router-dom"; // https://reactrouter.com/web/guides/quick-start
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Lottie from "react-lottie-player";
import TimelineAll from "./TimeLine";
import TimeLineContents from "./TimeLineContents";
import Total from "./Total";
import Change from "./Change";
import TotalContents from "./TotalContents";
import ChangeContents from "./ChangeContents";
import * as am4core from "@amcharts/amcharts4/core";
import HomeIcon from "@material-ui/icons/Home";
import "../asset/scss/layout.scss";
import { ua } from "../../../components/Util";
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
  const [animationData, setAnimationData] = useState();
  let match = useRouteMatch();
  useEffect(() => {
    import("../asset/data/lottie/sidebg.json").then((res) => {
      // [이슈: 라우터 이동시 메모리릭 발생] lottie애니메이션 데이터를 파싱해서 매번 새데이터로 교체한다.
      const newData = JSON.parse(JSON.stringify(res));
      setAnimationData(newData);
    });
    return () => {
      // 정리
    };
  }, []);

  const handleClick = () => {
    window.location.href = "http://badlandlords.mbc-interactive.com/";
  };
  const setClassStr = () => {
    const link = window.location.href;
    if (link.indexOf("total") > 0) {
      return "nth1";
    } else if (link.indexOf("change") > 0) {
      return "nth2";
    } else {
      return "nth3";
    }
  };

  useEffect(() => {
    // 모든 차트 dispose
    am4core.options.autoDispose = true;
  }, [window.location.href]);
  return (
    <>
      <div id="detail" className={setClassStr()}>
        <div className="contents">
          <nav id="detailNav" className={setClassStr()}>
            <IconButton onClick={handleClick}>
              <HomeIcon />
            </IconButton>
            <Button href="./#/map/total" className="top_nav1">
              어디에 샀나
            </Button>
            <Button href="./#/map/change" className="top_nav2">
              언제 샀나
            </Button>
            <Button href="./#/map" className="top_nav3">
              끝나지 않았다
            </Button>
          </nav>
          <div className="wrap">
            <Switch>
              <Route exact path={match.path}>
                <TimeLineContents />
              </Route>
              <Route path={`${match.path}/total`}>
                <TotalContents />
              </Route>
              <Route path={`${match.path}/change`}>
                <ChangeContents />
              </Route>
              <Route path="/map/*">
                <Redirect to="/map" />
              </Route>
            </Switch>
          </div>
          {ua() ? null : (
            <div className="sideBG">
              <Lottie
                animationData={animationData}
                play={true}
                loop={true}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          )}
        </div>

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
              pos="detail"
            />
          </Route>
          <Route path="/detail/*">
            <Redirect to="/detail" />
          </Route>
        </Switch>
      </div>
      <a href="//imnews.imbc.com/" id="mbc">
        <img
          src="//image.imnews.imbc.com/newszoomin/groupnews/groupnews_16/img/mbc_logo.png"
          alt="MBC"
        />
      </a>
    </>
  );
}
