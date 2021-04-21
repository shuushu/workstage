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
import { clearFire, Fire } from "./fire";
import { init, removeSmoke } from "./smoke";

import "./asset/scss/style.scss";

const gisa = [
  {
    thumb: "https://cdn.kihoilbo.co.kr/news/photo/202012/899731_313585_956.jpg",
    link: "https://www.kihoilbo.co.kr/news/articleView.html?idxno=899731",
    tit:
      "여기는 괜찮을까… 옥상문 열러 갔더니 도로 내려와야 했다 여기는 괜찮을까… ",
    provider: "기호일보",
    date: "2020.12.03",
  },
  {
    thumb:
      "https://thumb.mt.co.kr/06/2020/12/2020120211338296959_1.jpg/dims/optimize/",
    link: "https://news.mt.co.kr/mtview.php?no=2020120211338296959",
    tit: "4명 숨진 군포 아파트 화재 '특이 구조'가 화 키웠나…옥상 혼동 가능성",
    provider: "뉴스1 ",
    date: "2020.12.02",
  },
  {
    thumb: "https://cdn.kihoilbo.co.kr/news/photo/202012/899731_313585_956.jpg",
    link: "https://www.kihoilbo.co.kr/news/articleView.html?idxno=899731",
    tit:
      "여기는 괜찮을까… 옥상문 열러 갔더니 도로 내려와야 했다 여기는 괜찮을까… ",
    provider: "기호일보",
    date: "2020.12.03",
  },
  {
    thumb:
      "https://thumb.mt.co.kr/06/2020/12/2020120211338296959_1.jpg/dims/optimize/",
    link: "https://news.mt.co.kr/mtview.php?no=2020120211338296959",
    tit: "4명 숨진 군포 아파트 화재 '특이 구조'가 화 키웠나…옥상 혼동 가능성",
    provider: "뉴스1 ",
    date: "2020.12.02",
  },
];

function Home() {
  useEffect(() => {
    init();
    setTimeout(Fire, 0);
    return () => {
      clearFire();
      removeSmoke();
    };
  }, []);
  const RenderExample = () => {
    return gisa.map((items, i) => {
      const { thumb, link, tit, provider, date } = items;
      return (
        <li key={`itmes-${i}`} className="items-wrap">
          <a
            href={link}
            className="itmes"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="thumb">
              <img src={thumb} alt="" />
            </span>
            <span className="info">
              <span className="ell">{tit}</span>
              <span className="date">
                [{provider}]<em>{date}</em>
              </span>
            </span>
          </a>
        </li>
      );
    });
  };

  return (
    <div className="home">
      <div className="homeContents">
        <h1 className="tit">공동주택조회</h1>
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
          실태 조사를 꼼꼼히 검증하고 있습니다. 여러분의 아파트가 소방 설비가 잘
          되어있는지 함께 확인해 주세요.
        </div>
        <div>
          <h3 className="s-tit">관련기사</h3>
          <ul className="items-container">
            <RenderExample />
          </ul>
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
