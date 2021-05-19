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
import Modal from "./components/Modal";
import Button from '@material-ui/core/Button';
function Home() {
  let [mdFlag, setMdFlag] = useState(false);
  let [data, setData] = useState([]);


  const RenderItems = () => {
    if(data.length === 0) {
      return <div className="loading">데이터를 가져오는 중입니다.</div>
    } else {
      return data.map(([k, v],idx) => {
        const { apt_name, addr } = v;
        console.log(v)
        return (
          <div key={`sd-${idx}`} className="items">
            <Button variant="outlined" onClick={() => {
              if (addr && addr !== 'FALSE') {
                window.location.href = `#/detail:${addr}&name=${apt_name}`
              } else {
                alert('선택하신 건물은 확인 할 수 없습니다.')
              }
            }}>
            <span className="tit">{apt_name}</span>
            <span className="addr"> {addr}</span>
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
        <div className="logo">
          <a href="//imnews.imbc.com/"><img src="http://image.imnews.imbc.com/newszoomin/groupnews/groupnews_16/img/mbc_logo.png" alt="MBC" /></a>
        </div>
        <h1 className="tit"> 우리 아파트 옥상은 안전할까?</h1>
        <div className="cell">
          <ComboBox setMdFlag={setMdFlag} setData={setData} />
        </div>
        <div className="combo-help">
          경기도소방재난본부 조사('19.12.14~'20.02.20) 자료를 토대로 MBC가 정리했습니다. 경기도 이외 지역은 자료가 없습니다.  <strong>정확한 내용은 해당 아파트 관리사무소나 관할 소방서에 확인하세요</strong>
        </div>
        <div className="parag">
          불 나면 '생명문'인 옥상출입문, 맨꼭대기층일까요? 꼭 그렇지 않습니다. 작년 12월 군포 아파트 화재 때 주민 2명이 엘리베이터 기계실 문 앞에서 숨진 채 발견됐습니다. 한 층 아래가 옥상출입문이었습니다. 불길과 연기 속에 대피구를 못 찾은 겁니다.
        </div>
        <div className="parag">
          항상 열려있지도 않습니다. 방범이나 안전 차원에서 닫혀있거나 아예 폐쇄된 아파트도 있고요. 문을 열면 대피 공간이 턱없이 좁거나 비탈져 있어 옥상이 더 위험한 경우도 있습니다.
        </div>
        <SliderImage />
        <div className="parag">
        우리 아파트 옥상출입문이 어딘지, 문은 열려있는지, 대피 공간은 넉넉한지 미리 살펴보세요. 내 가족의 목숨이 달린 일입니다.
        </div>
        {/* <div id="home-recent">
          <Recent/>
        </div> */}
        <div>
          <h3 className="s-tit">지역별 설치 현황</h3>
          <Graph />
        </div>
        <footer id="footer">
          <a href="https://news.imbc.com/newszoomin/groupnews/" rel="noreferrer" target="_blank">기획: MBC기획취재팀</a>
          <span>시각화/디자인: 최훈철</span>
          <span>리서처: 김민경, 정다현, 구나연, 이승주</span><span>
            제보/문의: <a href="mailto:seul@mbc.co.kr">seul@mbc.co.kr (데이터전문기자 장슬기)</a></span>
        </footer>
      </div>
      <canvas id="smoke" width="400" height="400"></canvas>
      <canvas id="effect">지원하지않는 브라우져입니다.</canvas>
      <Modal mdFlag={mdFlag} setMdFlag={setMdFlag} >
        <h1>검색 결과 중복 된 데이터가 있습니다</h1>
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
