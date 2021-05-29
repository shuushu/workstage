import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom"; // https://reactrouter.com/web/guides/quick-start

import Grid from "../components/Grid";
import Homescence1 from "../components/HomeScence1";
import HomeNav from "../components/HomeNav";
//import GeoTest from "../components/GeoTest";

// Layout
import * as ScrollMagic from "scrollmagic"; // Or use scrollmagic-with-ssr to avoid server rendering problems
import { TweenMax, TimelineMax } from "gsap"; // Also works with TweenLite and TimelineLite
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";
import { ScrollMagicPluginIndicator } from "scrollmagic-plugins";

import "../asset/scss/layout.scss";

ScrollMagicPluginIndicator(ScrollMagic);
ScrollMagicPluginGsap(ScrollMagic, TweenMax, TimelineMax);

const g = window;
g.scroll = [];
/* const Map = () => {
  useEffect(() => {
    if (g.homeMap) {
      g.homeMap.reverseGeodata = true;
      setTimeout(() => {
        g.homeMap.reverseGeodata = false;
      }, 0);
    }
    GeoTest();
    return () => {
      g.homeMap.dispose();
    };
  }, []);
  return <div id="chartdiv2"></div>;
}; */

// Home
export default function Home() {
  const [complete, setComplete] = useState({
    clicked: false,
    state: false,
    keyName: "",
    expend: false,
  });
  const videoNode = useRef();

  useEffect(() => {
    // VIDEO
    const options = {
      autoplay: 'muted',
      loop: true,
      sources: [
        {
          src: "//vjs.zencdn.net/v/oceans.mp4",
          type: "video/mp4",
        },
      ],
      //fluid: true,
    };
    g.videojs(videoNode.current, options, function onPlayerReady() {
      g.player = this;      
    });

    //
    //
    const controller = new ScrollMagic.Controller({
      globalSceneOptions: {
        triggerHook: "onLeave",
        duration: "100%",
      },
    });
    //
    // scence1
    //
    let scene = new ScrollMagic.Scene({triggerElement: "#scence1"})
      .setClassToggle(".top_nav1", "btnActive")
      .setPin("#scence1", { pushFollowers: false })      
      .addTo(controller);
    // 영상 앞 컨텐츠 영역 저장
    g.playerinitPoint = scene.scrollOffset() + scene.duration();
    g.scroll.push(scene);
    //
    // scence2
    //
    scene = new ScrollMagic.Scene({ triggerElement: "#scence2" })
      .setPin("#scence2", { pushFollowers: false })
      .setClassToggle(".top_nav2", "btnActive")
      .addTo(controller);

    g.playerinitPoint = g.playerinitPoint - scene.scrollOffset();
    function callback(event) {
      if (event.type === 'enter' && g.player) {
        g.player.play()
      } else if (event.type === 'leave' && g.player) {
        g.player.pause()
      }
      let margin = 10;
      // 스크롤 다운:
      // 비디오 장면이 조금(margin) 이라도 보이고, 비디오 장면을 벗어나지 않을떄 실행
      if (g.player && event.type === 'update' && event.scrollPos > g.playerinitPoint + margin && event.scrollPos < event.endPos) {
        g.player.play()
      }
      // 스크롤 업:
      if (g.player && event.type === 'update' && event.scrollPos <= g.playerinitPoint + margin) {
          g.player.pause()
      }
    }
    // add listeners
    scene.on("update start end enter leave", callback);

    g.scroll.push(scene);
    //
    // scence3
    //
    scene = new ScrollMagic.Scene({ triggerElement: "#scence3"})
      .setTween(
        new TimelineMax()
          .to("#scence3 > div:nth-child(1)", 0.3, { y: "100%" })
      )      
      .setClassToggle(".top_nav3", "btnActive")
      .addTo(
        new ScrollMagic.Controller({
          globalSceneOptions: {
            triggerHook: "onEnter",
            duration: "100%",
          },
        })
    );
    scene.triggerHook(0);    
    g.scroll.push(scene);
    //
    // scence4
    //
    scene = new ScrollMagic.Scene({
      triggerElement: "#scence4",
    })
      .setTween(
        new TimelineMax()
          .to("#scence4 > div:nth-child(1)", 0.3, { y: "100%" })
      )
      .setClassToggle(".top_nav4", "btnActive")
      .addTo(
        new ScrollMagic.Controller({
          globalSceneOptions: {
            triggerHook: "onEnter",
            duration: "100%",
          },
        })
    );
    scene.triggerHook(0.2)
    g.scroll.push(scene);
    return () => {
      //g.homeMap.dispose();
      g.scroll.forEach((plugin) => {
        plugin.destroy(true);
      });
      g.scroll = [];
    };
  }, []);
  return (
    <div id="home">
      <HomeNav complete={complete} />
      <div className="scrollContent">
        <section className="items scence1" id="scence1">
            <Grid {...complete} setComplete={setComplete} />
            <Homescence1 {...complete} setComplete={setComplete} />
        </section>
        <section className="items scence2" id="scence2">
          <video ref={videoNode} id="my-video"></video>
        </section>
        <section className="items scence3" id="scence3">
          <div className="pre">
            흥동 제임스네이션 등 김용현이 빌라 전체 소유하고 있는 건물로
            시작(월요일쯤 현장 커버 필요). 건물 전체가 압류 걸렸는데 여전히
            세입자들 남아있어. 근데 주인이 1명. 가가호호 둘러보고. 이런저런
            사연.(기 촬영된 세종팰리스도 반영) - 근데 이 건물뿐 아니라 동네
            전체가 난리(김 소유 빌라 많은 곳 찾아서 드론 촬영). - 서울, 수도권
            전체로는 어디어디 지역에 분포. 임대주택만 580채, 보유주택은 817채.
            압류몇개. - 확정된 피해자 몇명, 예상되는 피해자 몇명?(설문조사 일부
            공개?) 흥동 제임스네이션 등 김용현이 빌라 전체 소유하고 있는 건물로
            시작(월요일쯤 현장 커버 필요). 건물 전체가 압류 걸렸는데 여전히
            세입자들 남아있어. 근데 주인이 1명. 가가호호 둘러보고. 이런저런
            사연.(기 촬영된 세종팰리스도 반영) - 근데 이 건물뿐 아니라 동네
            전체가 난리(김 소유 빌라 많은 곳 찾아서 드론 촬영). - 서울, 수도권
            전체로는 어디어디 지역에 분포. 임대주택만 580채, 보유주택은 817채.
            압류몇개. - 확정된 피해자 몇명, 예상되는 피해자 몇명?(설문조사 일부
            공개?) 흥동 제임스네이션 등 김용현이 빌라 전체 소유하고 있는 건물로
            시작(월요일쯤 현장 커버 필요). 건물 전체가 압류 걸렸는데 여전히
            세입자들 남아있어. 근데 주인이 1명. 가가호호 둘러보고. 이런저런
            사연.(기 촬영된 세종팰리스도 반영) - 근데 이 건물뿐 아니라 동네
            전체가 난리(김 소유 빌라 많은 곳 찾아서 드론 촬영). - 서울, 수도권
            전체로는 어디어디 지역에 분포. 임대주택만 580채, 보유주택은 817채.
            압류몇개. - 확정된 피해자 몇명, 예상되는 피해자 몇명?(설문조사 일부
            공개?) 흥동 제임스네이션 등 김용현이 빌라 전체 소유하고 있는 건물로
            시작(월요일쯤 현장 커버 필요). 건물 전체가 압류 걸렸는데 여전히
            세입자들 남아있어. 근데 주인이 1명. 가가호호 둘러보고. 이런저런
            사연.(기 촬영된 세종팰리스도 반영) - 근데 이 건물뿐 아니라 동네
            </div>
    
          <Link to="/detail:name">ㄱㄱ</Link>
        </section>
        <section className="items scence4" id="scence4">
          <div>
            흥동 제임스네이션 등 김용현이 빌라 전체 소유하고 있는 건물로
            시작(월요일쯤 현장 커버 필요). 건물 전체가 압류 걸렸는데 여전히
            세입자들 남아있어. 근데 주인이 1명. 가가호호 둘러보고. 이런저런
            사연.(기 촬영된 세종팰리스도 반영) - 근데 이 건물뿐 아니라 동네 전체가
            난리(김 소유 빌라 많은 곳 찾아서 드론 촬영). - 서울, 수도권 전체로는
            어디어디 지역에 분포. 임대주택만 580채, 보유주택은 817채. 압류몇개. -
            확정된 피해자 몇명, 예상되는 피해자 몇명?(설문조사 일부 공개?) 흥동
            제임스네이션 등 김용현이 빌라 전체 소유하고 있는 건물로 시작(월요일쯤
            현장 커버 필요). 건물 전체가 압류 걸렸는데 여전히 세입자들 남아있어.
            근데 주인이 1명. 가가호호 둘러보고. 이런저런 사연.(기 촬영된
            세종팰리스도 반영) - 근데 이 건물뿐 아니라 동네 전체가 난리(김 소유
            빌라 많은 곳 찾아서 드론 촬영). - 서울, 수도권 전체로는 어디어디
            지역에 분포. 임대주택만 580채, 보유주택은 817채. 압류몇개. - 확정된
            피해자 몇명, 예상되는 피해자 몇명?(설문조사 일부 공개?)
            </div>
        </section>

      </div>

      {/* <Map /> */}
    </div>
  );
}
