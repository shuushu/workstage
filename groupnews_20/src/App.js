import { useEffect } from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import ComboBox from "./components/Search.tsx";

// custom
import Panorama from "./panorama/index";
import Result from "./panorama/Result";
import { clearFire, Fire } from "./fire";
import { init, removeSmoke } from "./smoke";
import SidoSVG from "./components/지도.tsx";
import SliderImage from "./components/Slider";
import "./asset/scss/style.scss";

function Home() {
  useEffect(() => {
    init();
    setTimeout(Fire, 0);
    return () => {
      clearFire();
      removeSmoke();
    };
  }, []);

  return (
    <div className="home">
      <div className="homeContents">
        <h1 className="tit">우리 아파트 옥상은 어떻게 되어 있을까?</h1>
        <div className="cell">
          <ComboBox />
        </div>
        <div className="parag">
          아파트나 건물 거주자나 근무자는 옥상피난문을 확인하지 않는 한 거주하는
          아파트의 구조를 모르는 경우가 많으며, 응급상황과 농연속에서 옥상으로
          대피 시 막다른 구조에 막혀 사고를 당하는 경우가 빈번합니다.
        </div>
        <div className="parag">
          이러한 사고를 사전에 예방하고자 MBC는 경기도 내 공동주택 옥상 출입문
          실태 조사를 꼼꼼히 검증하고 있습니다. 여러분 아파트의 소방 설비가 잘
          되어있는지 함께 확인해 주세요.
        </div>
        <h3 className="s-tit">장애요인 사례</h3>
        <SliderImage />
        <div>
          <h3 className="s-tit">소방특별조사 결과(30층 이상 고층건축물)</h3>
          <SidoSVG />
        </div>
      </div>
      <canvas id="smoke" width="400" height="400"></canvas>
      <canvas id="effect">지원하지않는 브라우져입니다.</canvas>
    </div>
  );
}

function Pages() {
  let location = useLocation();
  return (
    <TransitionGroup>
      <CSSTransition key={location.key} classNames="fade" timeout={300}>
        <Switch location={location}>
          <Route path="/result:id">
            <Result />
          </Route>
          <Route path="/detail:id">
            <Panorama />
          </Route>
          <Route path="*">
            <Home />
          </Route>
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  );
}

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="*">
            <Pages />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
