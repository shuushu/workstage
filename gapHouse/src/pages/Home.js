import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom"; // https://reactrouter.com/web/guides/quick-start

import Grid from "../components/Grid";
import HomeSceen1 from "../components/HomeSceen1";
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
      autoPlay: true,
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
        duration: "200%",
      },
    });
    //
    // SCEEN1
    //
    let temp = new ScrollMagic.Scene({ triggerElement: "#sceen1" })
      .addIndicators()
      .setPin("#sceen1", { pushFollowers: false })
      .setClassToggle(".top_nav2", "btnActive")
      .addTo(controller);
    g.scroll.push(temp);
    //
    // SCEEN2
    //
    temp = new ScrollMagic.Scene({ triggerElement: "#sceen2" })
      .setPin("#sceen2", { pushFollowers: false })
      .addIndicators()
      .addTo(controller)
      .triggerPosition((v) => {
        console.log(v, this);
      });

    g.scroll.push(temp);
    //
    // SCEEN3
    //
    temp = new ScrollMagic.Scene({ triggerElement: "#sceen3" })
      .setTween(new TimelineMax().to("#sceen3 > div", 0.3, { y: "50%" }))
      .addIndicators()
      .addTo(
        new ScrollMagic.Controller({
          globalSceneOptions: {
            triggerHook: "onEnter",
            duration: "200%",
          },
        })
      );
    g.scroll.push(temp);

    console.log(controller);

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
        <section className="items sceen1" id="sceen1">
          <Grid {...complete} setComplete={setComplete} />
          <HomeSceen1 {...complete} setComplete={setComplete} />
        </section>
        <section className="items sceen2" id="sceen2">
          <video ref={videoNode} id="my-video"></video>
        </section>
        <section className="items sceen3" id="sceen3">
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
            전체가 난리(김 소유 빌라 많은 곳 찾아서 드론 촬영). - 서울, 수도권
            전체로는 어디어디 지역에 분포. 임대주택만 580채, 보유주택은 817채.
            압류몇개. - 확정된 피해자 몇명, 예상되는 피해자 몇명?(설문조사 일부
            공개?)
          </div>
          <Link to="/detail:name">ㄱㄱ</Link>
        </section>
        <section className="items sceen4" id="sceen4">
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
        </section>
      </div>

      {/* <Map /> */}
    </div>
  );
}
