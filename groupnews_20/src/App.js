import { useEffect, useState } from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import ComboBox from "./components/Search";
// custom
import Panorama from "./panorama/index";
import Result from "./panorama/Result";
import { clearFire, Fire } from "./fire";
import { init, removeSmoke } from "./smoke";
import Graph from "./components/지역별설치현황";
import SliderImage from "./components/Slider";
import "./asset/scss/style.scss";
import Recent from "./panorama/Recent";
import Modal from "./components/Modal.tsx";
import Button from '@material-ui/core/Button';
function Home() {
  let [mdFlag, setMdFlag] = useState(false);
  let [data, setData] = useState([]);

  const linkTo = (params) => {
    if(params && params !== 'FALSE') {
      window.location.href = `#/detail:${params}`
    } else {
      alert('선택하신 건물은 확인 할 수 없습니다.')
    }
  }
  const RenderItems = () => {
    if(data.length === 0) {
      return <div className="loading">데이터를 가져오는 중입니다.</div>
    } else {
      return data.map((i,idx) => {
        return (
          <div key={`sd-${idx}`} className="items">
            <Button variant="outlined" onClick={() => linkTo(i.addr)}>
            <span className="tit">{i.apt_name}</span>
            <span className="addr"> {i.addr}</span>
            </Button>
          </div> 
        )
      })
    }
  }
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
        <h1 className="tit"> 우리 아파트 옥상은 안전할까?</h1>
        <div className="cell">
          <ComboBox setMdFlag={setMdFlag} setData={setData} />
        </div>
        <div className="combo-help">
          경기도소방재난본부 조사('19.12.14~'20.02.20)를 토대로 MBC가 정리했습니다. 경기도 이외 지역은 자료가 없습니다. <a href="#">실제 조사 양식 보기</a>
        </div>
        <div className="parag">
          불 나면 "생명문"인 옥상출입문, 맨꼭대기층일까요? 꼭 그렇지 않습니다. 작년 12월 군포 아파트 화재 때 주민 2명이 엘리베이터 기계실 문 앞에서 숨진 채 발견됐습니다. 한 층 아래가 옥상출입문이었습니다. 불길과 연기 속에 대피구를 못 찾은 겁니다.
        </div>
        <div className="parag">
          항상 열려있지도 않습니다. 방범이나 안전 차원에서 닫혀있거나 아예 폐쇄된 아파트도 있고요. 문을 열면 대피 공간이 턱없이 좁거나 비탈져 있어 옥상이 더 위험한 경우도 있습니다.
        </div>
        <h3 className="s-tit">장애요인 사례</h3>
        <SliderImage />
        <div className="parag">
        열쇠함을 부수고 열쇠를 꺼내 옥상출입문을 열어야 합니다.
        문을 열면 경사지붕(박공지붕)인데다 안전난간도 없습니다.
        사다리로 올라가 철문을 젖혀야 해 노약자는 대피가 어려울 수 있습니다.
        우리 아파트 옥상출입문이 어딘지, 문은 열려있는지, 대피 공간은 넉넉한지 미리 살펴보세요. 내 가족의 목숨이 달린 일입니다.
        </div>
        <div id="home-recent">
          <Recent/>
        </div>
        <div>
          <h3 className="s-tit">지역별 설치 현황</h3>
          <Graph />
        </div>
      </div>
      <canvas id="smoke" width="400" height="400"></canvas>
      <canvas id="effect">지원하지않는 브라우져입니다.</canvas>
      <Modal mdFlag={mdFlag} setMdFlag={setMdFlag} >
        <h1>검색 결과 관련 지역 아파트</h1>
        <div id="searchDetail">          
          <RenderItems />          
        </div>
      </Modal>
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
