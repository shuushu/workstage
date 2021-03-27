import { useEffect, useState } from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom"; // https://reactrouter.com/web/guides/quick-start

import GroupAutoComplete from '../../components/GroupAutoComplete.tsx';
import { Detail } from './pages/Detail.tsx';
import { DATA_ARR} from './DATA';
import {  tooltip } from './utils';
import './asset/scss/style.scss';

//import Button from '@material-ui/core/Button'; // https://material-ui.com/
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import GpsFixedTwoToneIcon from '@material-ui/icons/GpsFixedTwoTone';

//
import FaceIcon from '@material-ui/icons/Face';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Spa from '@material-ui/icons/Spa';//Spa 꽃 [전]
import Nature from '@material-ui/icons/Nature';// Nature r과수원[나무]
import Language from '@material-ui/icons/Language';// Language [답]

// pages
import Search from './pages/Search.tsx';
// 전역변수
let MAP;
// 브이월드: E67C3AC5-B75A-39CE-85A3-375C132523FB
const VWORLD = 'http://api.vworld.kr/req/data?service=data&request=GetFeature&data=LP_PA_CBND_BUBUN&key=E67C3AC5-B75A-39CE-85A3-375C132523FB&domain=http://localhost:3000/'
// 카카오 KEY:	2689abe58499de84e51c75f4f5167cb9
const kakao = window.kakao;
const defaultLevel = 12;
window.state = [];

/**
  xs (extra-small) : 0px ~ 600px
  sm (small) : 600px ~ 960px
  md (medium): 960px ~ 1280px
  lg (large) : 1280px ~ 1920px
  xl (extra-large) : 1920px ~
*/

window.shushu = DATA_ARR;

// 주소 검색 > 좌표 > 마커 및 지적 정보
const getFeature = (data) => {
  return new Promise(resolve => {
    let polygon = null;
    const { 좌표, 폴리곤, 이름 } = data;    
    const coords = new kakao.maps.LatLng(좌표.Ma, 좌표.La);
    // 오버레이 생성
    const customOverlay = new kakao.maps.CustomOverlay({
          position: coords,
          content: tooltip(data),
          yAnchor: 1.6
    });
    // // 마커생성
    const marker = new kakao.maps.Marker({ position: coords });
    marker.이름 = 이름;
    const COLOR = (() => {
      switch (data['종류']) {
        case '전': return '#39DE2A';
        case '답': return 'rgb(222, 204, 42)';
        case '과수원': return 'rgb(222 87 42)';
      }            
    })();
    // // 폴리곤생성
    //new kakao.maps.LatLng(33.452344169439975, 126.56878163224233),
    if (Array.isArray(폴리곤)) { 
      const linePath = 폴리곤.map((items) => {
        return new kakao.maps.LatLng(items[1], items[0])
      })
      polygon = new kakao.maps.Polygon({
        path: linePath, 
        strokeWeight: 1, // 선의 두께입니다
        strokeColor: COLOR, // 선의 색깔입니다
        //strokeOpacity: 0.8, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
        /* strokeStyle: 'longdash', // 선의 스타일입니다 */
        fillColor: COLOR, // 채우기 색깔입니다
        fillOpacity: 0.4 // 채우기 불투명도 입니다
      });
      polygon.setMap(MAP);
      kakao.maps.event.addListener(polygon, 'mouseover', function () {
        polygon.setOptions({ fillColor: '#09f' });
      });
      kakao.maps.event.addListener(polygon, 'mouseout', function () {
        polygon.setOptions({ fillColor: COLOR });
      });
    }
    

    kakao.maps.event.addListener(marker, 'click', function (e) {
      clickMarker(this.getPosition());
      
      kakao.maps.event.preventMap();
      // 지도 확대
      //MAP.setLevel(1, { animate: true });
      // 지도 중앙 이동
      //MAP.panTo(e.latLng);
      setHandler('customOverlay', null);
      customOverlay.setMap(MAP);
      
      //히스토리
      window.location.href =`#:${this.이름}`
    })

    window.state.push({ customOverlay: customOverlay, polygon: polygon, marker: marker })
     resolve(true)
  })
}

// 마커 클릭 이벤트
const clickMarker = (position) => {
  MAP.setLevel(2, { animate: false });          
  setTimeout(() => {
    MAP.setCenter(position);
  }, 100)   
}


// 배열에 추가된 마커들을 지도에 표시하거나 삭제하는 함수입니다
const setHandler = (type, map) => {
  window.state.forEach(i => {    
    if (Array.isArray(type)) {
      type.forEach(t => {
        if (i[t]) {
          i[t].setMap(map)
        }        
      })
    } else {
      i[type].setMap(map)
    }
  }) 
}
// 자동 정렬 데이터 셋팅하기(이름 중복 제거)
const setGroupDate = (d) => {
  const temp = { };
  d.forEach(i => temp[i['이름']] = i['정당']);
  return Object.entries(temp).map(i => {
        return {
            '이름': i[0],
            '정당': i[1]
        }
    })
}
// 필터 
const setFilterData = (v = null) => {
  if (v && typeof v === 'object') {
    const { type, value } = v;
    // 페이지에 데이터 노출 시키고 리렌더 이후 맵에 노출
    return DATA_ARR.filter(items => items[type] === value);
  } else {
    return DATA_ARR;    
  }  
}


const mapReset = () => {
    setHandler(['polygon', 'customOverlay'], null);
    if (window.clusterer) {
        window.clusterer.clear();
    }    
    window.state = [];
}

const rePaint = async (mapData) => {
    // 지도상 레이어 모두 지우기
  mapReset();
  let i = 0;
  while (i < mapData.length) {
      await getFeature(mapData[i]);
      i++;
  }

  // [기존: 비동기 로직이라 싱크가 맞지 않아 수정] mapData.forEach((d) => getFeature(d));
    window.clusterer = new kakao.maps.MarkerClusterer({
      map: MAP, // 마커들을 클러스터로 관리하고 표시할 지도 객체
      averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
      minLevel: 5, // 클러스터 할 최소 지도 레벨
      disableClickZoom: true // 클러스터 마커를 클릭했을 때 지도가 확대되지 않도록 설정한다
    });
    // 클러스터러에 마커들을 추가합니다
    window.clusterer.addMarkers(window.state.map(i => i.marker));
    // 마커 클러스터러에 클릭이벤트를 등록합니다
    // 마커 클러스터러를 생성할 때 disableClickZoom을 true로 설정하지 않은 경우
    // 이벤트 헨들러로 cluster 객체가 넘어오지 않을 수도 있습니다
    kakao.maps.event.addListener(window.clusterer, 'clusterclick', function (cluster) {
        var level = MAP.getLevel()-2;
        // 지도를 클릭된 클러스터의 마커의 위치를 기준으로 확대합니다
        MAP.setLevel(level, {anchor: cluster.getCenter()});
    });
  
    //
    MAP.setLevel(defaultLevel, {animate: true});
}


function App() {
  const [type, setFilterType] = useState();
  const mapData = setFilterData(type);
  
  window.mapData = mapData;
  // 의원 아이템 리스트 렌더링
  const ResultSearchItem = (props) => {
    const { className, handleClick } = props;
    const { name } = useParams();
    const getData = name ? setFilterData({ type: '이름', 'value': name.substr(1) }) : DATA_ARR;
        
    clearTimeout(ResultSearchItem.timer);
    ResultSearchItem.timer = setTimeout(() => {
      rePaint(getData);
    }, 0);

    return getData.map((v, i) => {
      const { 소유주, 신고가액, 종류, 취득경위 } = v;
      const TypeView = () => {
        switch (종류) {
          case '전': return <Spa />
          case '답': return <Language />
          case '과수원': return <Nature/>
        }
      }
      return (
        <div className={className ? 'list search' : 'list'} key={`list-wrap#${i}`} >
          <Search {...v} handleClick={handleClick} index={i} size={getData.length-1}>
            <Chip className="비중조절" size="small" icon={<TypeView />} title={`종류: ${종류}`} label={종류} variant="outlined" />
            <Chip size="small" label={취득경위} title="취득경위" variant="outlined" />
            <Chip size="small"  icon={<FaceIcon />}  title={`소유주: ${소유주}`} label={소유주} variant="outlined" />
            <Chip size="small" label={`신고가액: ${신고가액}`} variant="outlined" />
          </Search>
        </div>
      )
    })
  }
  // 의원 명단 전체보기
  const viewAll = () => {
    setFilterType();
    window.location = '#';
    document.querySelector('.MuiIconButton-label').click();
  }

  // 의원 > 토지 > 상세 정보
  const DetailView = () => {
    const { index } = useParams(); // 데이터 index
    const size = (setFilterData({ type: 'index', 'value': Number(index.substr(1, 3)) })).length;
    const getData = index ? setFilterData({ type: 'pk', 'value': index.substr(1) }) : DATA_ARR;

    clearTimeout(DetailView.timer);
    DetailView.timer = setTimeout(() => {
      rePaint(getData);

      setTimeout(() => {
        clickMarker(window.state[0].marker.getPosition())
        window.state[0].customOverlay.setMap(window.map);
      }, 400)
    }, 0)

    return <Detail {...getData[0]} size={size-1} />
  }


  useEffect(() => {    
    if (!MAP) {
      MAP = new kakao.maps.Map(document.getElementById('map'), {
        center: new kakao.maps.LatLng(36.7401503629549, 127.384733075011),
        level: defaultLevel,
        maxLevel: 12
      });
      window.map = MAP;
      // 지적도로 변환
      //MAP.addOverlayMapTypeId(kakao.maps.MapTypeId.USE_DISTRICT);
      // 지도를 클릭했을때 활성화 된 레이어들 히든
      kakao.maps.event.addListener(MAP, 'click', function () {
          setHandler('customOverlay', null);
      });      
    }
  }, [])



  return (
    <Grid container id="app">
      <Grid item xs id="map" >
            <Button id="btn-zoom" variant="contained" color="primary" onClick={() => {
              const level= MAP.getLevel()+2;  
              MAP.setLevel(level, {anchor: MAP.getCenter()});
            }}>
          <GpsFixedTwoToneIcon/>
        </Button>
          
        </Grid>
        <Grid id="container" item lg={3} md={4} sm={4} xs={12}>

        
        < div className='ContentsWrap'>
          <Router>
            <div id="header">
                
               
                <h3 className="banner">국회의원 농지</h3>              
              <div className="search">
                <Chip
                      className="all"
                      icon={<AccountCircleIcon />}
                      label="의원 전체 명단 보기"
                      clickable
                      color="primary"
                      onClick={ viewAll }
                  />
                <GroupAutoComplete label="이름" setState={setFilterType} groupping="정당" data={setGroupDate(DATA_ARR)} viewAll={viewAll} className="search" />
              </div>
            </div>
            {/* <div onClick={test}>주소변환</div> */}
            <div className="router-contents">
                  <Switch>     
                  <Route path="/detail/:index" ><DetailView /></Route>
                  <Route path="/:name" ><ResultSearchItem className="search" handleClick={clickMarker} /></Route>                  
                  <Route path="*"><ResultSearchItem  /></Route>              
                </Switch>
            </div>
          </Router>
          </div>
      </Grid>
      


    </Grid>
  );
}

export default App;
