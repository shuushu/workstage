import { useEffect, useState } from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom"; // https://reactrouter.com/web/guides/quick-start
//import Button from '@material-ui/core/Button'; // https://material-ui.com/
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";
import ButtonGroup from "@material-ui/core/ButtonGroup";
// ICONS
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

// components
import { setDataPerson } from "./asset/data/person";
import GroupAutoComplete from "../../components/GroupAutoComplete.tsx";
import { 정당별토지카운터 } from "./components/정당별토지안내.tsx";
import { ResultSearchItem } from "./components/데이터필터.tsx";
import { 의원별농지시각화 } from "./components/의원별농지시각화.tsx";
import 리스트필터버튼 from "./components/리스트필터버튼.tsx";
// 기타
import { Detail } from "./pages/Detail.tsx";
import { tooltip } from "./utils";

import "./asset/scss/style.scss";

// 전역변수
let MAP;
// 브이월드: E67C3AC5-B75A-39CE-85A3-375C132523FB
// const VWORLD =
//   "http://api.vworld.kr/req/data?service=data&request=GetFeature&data=LP_PA_CBND_BUBUN&key=E67C3AC5-B75A-39CE-85A3-375C132523FB&domain=http://localhost:3000/";
// 카카오 KEY:	2689abe58499de84e51c75f4f5167cb9
const kakao = window.kakao;
// 모바일체크
const M = window.innerWidth <= 600;
const defaultLevel = M ? 14 : 12;
window.isM = M;
window.state = [];
window.mapObj = {};
window.flick = null;

//window.shushu = setDataPerson;

// 주소 검색 > 좌표 > 마커 및 지적 정보
const getFeature = (data, 정당) => {
  return new Promise((resolve) => {
    let polygon = null;
    const { 좌표, 폴리곤, name, pk } = data;
    const coords = new kakao.maps.LatLng(좌표.Ma, 좌표.La);
    // 오버레이 생성
    const customOverlay = new kakao.maps.CustomOverlay({
      position: coords,
      content: tooltip(data, 정당),
      yAnchor: M ? 1.4 : 1.6,
      zIndex: 10,
    });
    // // 마커생성
    const marker = new kakao.maps.Marker({ position: coords });

    marker["이름"] = name;
    marker["pk"] = pk;
    const COLOR = (() => {
      switch (data.cate2) {
        case "전":
          return "#39DE2A";
        case "답":
          return "rgb(222, 204, 42)";
        case "과수원":
          return "rgb(222 87 42)";
      }
    })();
    // // 폴리곤생성
    //new kakao.maps.LatLng(33.452344169439975, 126.56878163224233),
    if (Array.isArray(폴리곤)) {
      const linePath = 폴리곤.map((items) => {
        return new kakao.maps.LatLng(items[1], items[0]);
      });
      polygon = new kakao.maps.Polygon({
        path: linePath,
        strokeWeight: 1, // 선의 두께입니다
        strokeColor: COLOR, // 선의 색깔입니다
        //strokeOpacity: 0.8, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
        /* strokeStyle: 'longdash', // 선의 스타일입니다 */
        fillColor: COLOR, // 채우기 색깔입니다
        fillOpacity: 0.4, // 채우기 불투명도 입니다
      });
      polygon.setMap(MAP);
      kakao.maps.event.addListener(polygon, "mouseover", function () {
        polygon.setOptions({ fillColor: "#09f" });
      });
      kakao.maps.event.addListener(polygon, "mouseout", function () {
        polygon.setOptions({ fillColor: COLOR });
      });
    }

    kakao.maps.event.addListener(marker, "click", function (e) {
      clickMarker(this.getPosition());

      kakao.maps.event.preventMap();
      // 지도 확대
      //MAP.setLevel(1, { animate: true });
      // 지도 중앙 이동
      //MAP.panTo(e.latLng);
      setHandler("customOverlay", null);
      customOverlay.setMap(MAP);

      //히스토리
      window.location.href = `#/detail/:${this.pk}`;
    });

    window.mapObj[pk] = {
      customOverlay: customOverlay,
      polygon: polygon,
      marker: marker,
    };
    resolve(true);
  });
};

// 마커 클릭 이벤트
const clickMarker = (position) => {
  MAP.setLevel(2, { animate: false });
  setTimeout(() => {
    MAP.setCenter(position);
  }, 100);
};

// 마커들을 지도에 표시하거나 삭제하는 함수입니다
const setHandler = (type, map) => {
  for (let 토지인덱스 in window.mapObj) {
    const target = window.mapObj[토지인덱스];
    if (Array.isArray(type)) {
      type.forEach((타입목록) => {
        target[타입목록].setMap(map);
      });
    } else {
      target[type].setMap(map);
    }
  }
};
// 자동 정렬 데이터 셋팅하기(이름 중복 제거)
const setGroupDate = (d) => {
  const temp = {};
  d.forEach((i) => (temp[i["name"]] = i["party_new"]));
  return Object.entries(temp).map((i) => {
    return {
      이름: i[0],
      정당: i[1],
    };
  });
};
// 필터
const setFilterData = (v = null) => {
  if (v && typeof v === "object") {
    const { type, value } = v;
    // 페이지에 데이터 노출 시키고 리렌더 이후 맵에 노출
    return setDataPerson.filter((items) => items[type] === value);
  } else {
    return setDataPerson;
  }
};

const mapReset = () => {
  setHandler(["polygon", "customOverlay"], null);
  if (window.clusterer) {
    window.clusterer.clear();
  }
  window.mapObj = {};
};

const rePaint = async (mapData) => {
  // 지도상 레이어 모두 지우기
  mapReset();
  let i = 0;
  while (i < mapData.length) {
    let ss = 0;
    const target = mapData[i].estate;
    if (target && target.length > 0) {
      while (ss < target.length) {
        if (target[ss]) {
          await getFeature(target[ss], mapData[i].party_new);
        }
        ss++;
      }
    }
    i++;
  }

  // [기존: 비동기 로직이라 싱크가 맞지 않아 수정] mapData.forEach((d) => getFeature(d));
  window.clusterer = new kakao.maps.MarkerClusterer({
    map: MAP, // 마커들을 클러스터로 관리하고 표시할 지도 객체
    averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
    minLevel: 5, // 클러스터 할 최소 지도 레벨
    calculator: [10, 30, 50],
    disableClickZoom: true, // 클러스터 마커를 클릭했을 때 지도가 확대되지 않도록 설정한다
    styles: (() => {
      if (M) {
        return [
          {
            // calculator 각 사이 값 마다 적용될 스타일을 지정한다
            width: "30px",
            height: "30px",
            background: "rgba(124, 106, 226, .8)",
            borderRadius: "100%",
            color: "#fff",
            textAlign: "center",
            lineHeight: "30px",
            fontSize: "16px",
          },
          {
            width: "50px",
            height: "50px",
            background: "rgba(118, 196, 83, .8)",
            borderRadius: "100%",
            color: "#fff",
            textAlign: "center",
            fontWeight: "bold",
            lineHeight: "50px",
            fontSize: "18px",
          },
          {
            width: "80px",
            height: "80px",
            background: "rgba(98, 132, 247, .8)",
            borderRadius: "100%",
            color: "#fff",
            textAlign: "center",
            fontWeight: "bold",
            lineHeight: "80px",
            fontSize: "26px",
            zIndex: "3",
          },
        ];
      } else {
        return [
          {
            // calculator 각 사이 값 마다 적용될 스타일을 지정한다
            width: "40px",
            height: "40px",
            background: "rgba(124, 106, 226, .8)",
            borderRadius: "100%",
            color: "#fff",
            textAlign: "center",
            lineHeight: "40px",
          },
          {
            width: "80px",
            height: "80px",
            background: "rgba(118, 196, 83, .8)",
            borderRadius: "100%",
            color: "#fff",
            textAlign: "center",
            fontWeight: "bold",
            lineHeight: "80px",
            fontSize: "24px",
          },
          {
            width: "120px",
            height: "120px",
            background: "rgba(98, 132, 247, .8)",
            borderRadius: "100%",
            color: "#fff",
            textAlign: "center",
            fontWeight: "bold",
            lineHeight: "120px",
            fontSize: "32px",
            zIndex: "3",
          },
        ];
      }
    })(),
  });
  // 클러스터러에 마커들을 추가합니다
  window.clusterer.addMarkers(
    Object.entries(window.mapObj).map(([a, i]) => i.marker)
  );
  // 마커 클러스터러에 클릭이벤트를 등록합니다
  // 마커 클러스터러를 생성할 때 disableClickZoom을 true로 설정하지 않은 경우
  // 이벤트 헨들러로 cluster 객체가 넘어오지 않을 수도 있습니다
  kakao.maps.event.addListener(window.clusterer, "clusterclick", function (
    cluster
  ) {
    var level = MAP.getLevel() - 2;
    // 지도를 클릭된 클러스터의 마커의 위치를 기준으로 확대합니다
    MAP.setLevel(level, { anchor: cluster.getCenter() });
  });

  //
  MAP.setLevel(defaultLevel, { animate: true });
};

function App() {
  const [type, setFilterType] = useState();
  const mapData = setFilterData(type);
  const [searchValue, setSerchValue] = useState(null);
  const [sort, setSort] = useState("all");
  window.mapData = mapData;

  // 의원 명단 전체보기
  /*  const viewAll = () => {
    //setFilterType();
    window.location = "#";
    //document.querySelector('.MuiIconButton-label').click();
  }; */

  // 의원 > 토지 > 상세 정보
  const DetailView = () => {
    const { index } = useParams(); // 토지 index
    const [사람인덱스, 토지인덱스] = index.substr(1).split("_");
    const getData = 사람인덱스
      ? setFilterData({ type: "index", value: Number(사람인덱스) })
      : setDataPerson;
    const pk = `${사람인덱스}_${토지인덱스}`;
    clearTimeout(DetailView.timer);
    clearTimeout(DetailView.timer);
    DetailView.timer = setTimeout(() => {
      rePaint(getData);

      setTimeout(() => {
        clickMarker(window.mapObj[pk].marker.getPosition());
        window.mapObj[pk].customOverlay.setMap(window.map);
      }, 0);
    }, 0);

    return (
      <div id="detail-wrap">
        <Detail {...getData[0]} 토지인덱스={토지인덱스 - 1} />
      </div>
    );
  };

  const 정당별카운터버튼 = () => {
    return (
      <div className="모바일햄버거">
        <Fab
          size="small"
          onClick={() => {
            document.getElementById("정당별갯수").classList.toggle("active");
          }}
        >
          <AddIcon />
        </Fab>
      </div>
    );
  };

  useEffect(() => {
    if (!MAP) {
      MAP = new kakao.maps.Map(document.getElementById("map"), {
        center: new kakao.maps.LatLng(36.7401503629549, 127.384733075011),
        level: defaultLevel,
        maxLevel: defaultLevel,
      });
      window.map = MAP;
      // 지적도로 변환
      //MAP.addOverlayMapTypeId(kakao.maps.MapTypeId.USE_DISTRICT);
      // 지도를 클릭했을때 활성화 된 레이어들 히든
      kakao.maps.event.addListener(MAP, "click", function () {
        setHandler("customOverlay", null);
      });
    }
  }, []);

  return (
    <Router>
      <Grid container id="app">
        <Grid item xs id="map">
          <a href="//imnews.imbc.com/" class="mbc">
            <img
              src="//image.imnews.imbc.com/newszoomin/groupnews/groupnews_16/img/mbc_logo.png"
              alt="MBC"
            />
          </a>
          <div id="범례영역">
            <div className="wrap">
              <footer id="footer">
                기획 MBC기획취재팀
                <br />
                시각화/디자인 최훈철
                <br />
                리서처 김민경, 정다현, 구나연, 이승주
                <br />
                제보/문의 <a href="mailto:seul@mbc.co.kr">seul@mbc.co.kr</a>
              </footer>
              {window.innerWidth <= 812 && <정당별카운터버튼 />}

              <Paper id="정당별갯수">
                <정당별토지카운터 setSort={setSort} />
              </Paper>

              <div id="zooinOut">
                <ButtonGroup>
                  <Button
                    aria-label="reduce"
                    onClick={() => {
                      const level = MAP.getLevel() + 2;
                      MAP.setLevel(level, { anchor: MAP.getCenter() });
                    }}
                  >
                    <RemoveIcon fontSize="small" />
                  </Button>
                  <Button
                    aria-label="increase"
                    onClick={() => {
                      const level = MAP.getLevel() - 2;
                      MAP.setLevel(level, { anchor: MAP.getCenter() });
                    }}
                  >
                    <AddIcon fontSize="small" />
                  </Button>
                </ButtonGroup>
              </div>
            </div>
            <Switch>
              <Route exact path="/:name">
                {/* <의원별농지시각화 {...setFilterData} /> */}
              </Route>
            </Switch>
          </div>
        </Grid>
        {/* xs (extra-small) : 0px ~ 600px sm (small) : 600px ~ 960px md
        (medium): 960px ~ 1280px lg (large) : 1280px ~ 1920px xl (extra-large) :
        1920px ~ */}
        <Grid id="container" item lg={3} md={4} sm={5} xs={12}>
          <div className="ContentsWrap">
            <div id="header">
              <h3 className="banner">
                <strong className="한자"></strong>
              </h3>
              <div className="search">
                <GroupAutoComplete
                  label="이름"
                  setState={setFilterType}
                  groupping="정당"
                  data={setGroupDate(setDataPerson)}
                  className="search"
                  selectedName={searchValue}
                  setSort={setSort}
                />
              </div>
              <리스트필터버튼 sort={sort} setSort={setSort} />
            </div>

            <div className="router-contents">
              <Switch>
                <Route path="/detail/:index">
                  <DetailView />
                </Route>
                <Route path="/:name">
                  <ResultSearchItem
                    className="search"
                    rePaint={rePaint}
                    setFilterData={setFilterData}
                    handleClick={clickMarker}
                    setSerchValue={setSerchValue}
                    sortType={sort}
                  />
                </Route>
                <Route path="*">
                  <ResultSearchItem
                    rePaint={rePaint}
                    setFilterData={setFilterData}
                    setSerchValue={setSerchValue}
                    sortType={sort}
                  />
                </Route>
              </Switch>
            </div>
          </div>
        </Grid>
      </Grid>
    </Router>
  );
}

export default App;
