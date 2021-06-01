import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom"; // https://reactrouter.com/web/guides/quick-start
import Lottie from "react-lottie-player";
import Grid from "../components/Grid";
import Homescence1 from "../components/HomeScence1";
import HomeNav from "../components/HomeNav";
import Detail from "../pages/Detail";
//import GeoTest from "../components/GeoTest";

// Layout
import * as ScrollMagic from "scrollmagic"; // Or use scrollmagic-with-ssr to avoid server rendering problems
import { TweenMax, TimelineMax } from "gsap"; // Also works with TweenLite and TimelineLite
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";
import { ScrollMagicPluginIndicator } from "scrollmagic-plugins";

import { ua } from "../../../components/Util";
import "../asset/scss/layout.scss";
import LottieCircle from "../components/LottieCircle";

import clickChart from "../asset/data/lottie/clickChart.json";
import Button from "@material-ui/core/Button";

ScrollMagicPluginIndicator(ScrollMagic);
ScrollMagicPluginGsap(ScrollMagic, TweenMax, TimelineMax);

const g = window;
let controller;
g.scroll = [];
function delay(v) {
  return new Promise((resolve) => setTimeout(resolve, v));
}

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
      autoplay: "muted",
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
    controller = new ScrollMagic.Controller({
      globalSceneOptions: {
        triggerHook: "onLeave",
        duration: "100%", // scence END포인트 배수로 지정됨 200%는 2배 비율
      },
    });
    //
    // scence1
    //
    let scene = new ScrollMagic.Scene({ triggerElement: "#scence1" })
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
      if (event.type === "enter" && g.player) {
        g.player.play();
      } else if (event.type === "leave" && g.player) {
        g.player.pause();
      }
      let margin = 10;
      // 스크롤 다운:
      // 비디오 장면이 조금(margin) 이라도 보이고, 비디오 장면을 벗어나지 않을떄 실행
      if (
        g.player &&
        event.type === "update" &&
        event.scrollPos > g.playerinitPoint + margin &&
        event.scrollPos < event.endPos
      ) {
        g.player.play();
      }
      // 스크롤 업:
      if (
        g.player &&
        event.type === "update" &&
        event.scrollPos <= g.playerinitPoint + margin
      ) {
        g.player.pause();
      }
    }
    // add listeners
    scene.on("update start end enter leave", callback);

    g.scroll.push(scene);
    //
    // scence3
    //
    scene = new ScrollMagic.Scene({ triggerElement: "#scence3" })
      .setTween(
        new TimelineMax().to("#scence3 > div:nth-child(1)", 0.3, { y: "30%" })
      )
      .setPin("#scence3", { pushFollowers: false })
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
    scene = new ScrollMagic.Scene({ triggerElement: "#scence4" })
      .setClassToggle(".top_nav4", "btnActive")
      .setPin("#scence4", { pushFollowers: false })
      .addTo(controller);
    g.scroll.push(scene);
    //
    // scence5
    //
    scene = new ScrollMagic.Scene({
      triggerElement: "#scence5",
    })
      .setTween(new TimelineMax().to("#scence5 #chartdiv", 0.3, { y: "30%" }))
      .setClassToggle(".top_nav5", "btnActive")
      .addTo(
        new ScrollMagic.Controller({
          globalSceneOptions: {
            triggerHook: "onEnter",
            duration: "100%",
          },
        })
      );
    scene.triggerHook(0);
    /* scene.on("update start end enter leave", (event) => {
      if (event.type === "start") {
        clearTimeout(g.lineChartSeries.timer);
        g.lineChartSeries.timer = setTimeout(async () => {
          // 그래프 켜기
          for (let key in g.lineChartSeries) {
            await delay(400);
            if (g.lineChartSeries[key].show) {
              g.lineChartSeries[key].show();
              delete g.lineChartSeries.timer;
            }
          }
          //g.sliderBar.play();
        }, 1000);
      }
    }); */
    g.scroll.push(scene);
    //
    // scence6
    //
    scene = new ScrollMagic.Scene({
      triggerElement: "#scence6",
    })
      .setTween(
        new TimelineMax().to("#scence6 > div:nth-child(1)", 0.3, { y: "100%" })
      )
      .setClassToggle(".top_nav6", "btnActive")
      .addTo(
        new ScrollMagic.Controller({
          globalSceneOptions: {
            triggerHook: "onEnter",
            duration: "100%",
          },
        })
      );
    scene.triggerHook(0.2);
    g.scroll.push(scene);
    //
    // scence7
    //
    // 요소
    // init Position
    new TimelineMax().set("#scence7 .text", { y: "-50px", opacity: 0 });

    scene = new ScrollMagic.Scene({
      triggerElement: "#scence7",
    })
      .setTween(
        new TimelineMax()
          .to("#scence7 .st1", 0.3, { y: 0, opacity: 1 })
          .to("#scence7 .st1", 0.3, { opacity: 0 })

          .to("#scence7 .st2", 0.3, { y: 0, opacity: 1 })
          .to("#scence7 .st2", 0.2, { opacity: 0 })

          .to("#scence7 .st3", 0.3, { y: 0, opacity: 1 })
      )
      //.setClassToggle(".top_nav7", "btnActive")
      .setPin("#scence7", { pushFollowers: true }) // 스크롤 잠시 고정
      .addTo(
        new ScrollMagic.Controller({
          globalSceneOptions: {
            triggerHook: "onEnter",
            duration: "100%",
          },
        })
      );
    scene.triggerHook(0);
    // 버튼트리거
    function triggerBtnReset() {
      // reset
      document.querySelectorAll(".utilWrap button").forEach((v) => {
        v.classList.remove("active");
      });
      g.setKey("소유");
      g.cntUpdata(582);
    }
    function triggerBtn(name) {
      // add
      const n = document.querySelector(name);
      if (n.className.indexOf("active") < 0) {
        n.click();
        n.classList.add("active");
      }
    }
    scene.on("progress  start end enter leave", (e) => {
      if (e.type === "progress") {
        const pos = Number((e.progress * 100).toFixed());
        if (pos > 40 && pos <= 70) {
          triggerBtn("#cirBtn1");
        } else if (pos > 70) {
          triggerBtn("#cirBtn2");
        }
      } else if (e.type === "enter") {
        triggerBtnReset();
      }
    });

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
          <Homescence1 {...complete} setComplete={setComplete} />
        </section>
        <section className="items scence2" id="scence2">
          <video ref={videoNode} id="my-video"></video>
        </section>
        <section className="items scence3" id="scence3">
          <div className="pre" id="start">
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
            공개?)
          </div>
        </section>
        <section className="items scence4" id="scence4">
          <Grid {...complete} setComplete={setComplete} />
        </section>
        <section className="items scence7" id="scence7">
          <div className="linkto">
            <Button href="/#detail">
              <Lottie
                className="goToDetailMap"
                animationData={clickChart}
                play={true}
                loop={true}
                style={{ width: "100%", height: "100%" }}
              />
              <span className="str">자세히 보기</span>
            </Button>
          </div>

          <div className="text st1">
            알고보니 집주인인 ‘김OO’ 씨 는 수도권 일대에 임대주택인 빌라만 582채
            가진 ‘빌라왕’ 이었습니다. (2020.05 기준)
          </div>
          <div className="text st2">
            이 중 406채가 압류 또는 가압류 상태입니다.
            <br />
            모두 전세금을 돌려주지 못하고 있어 주택보증공사나 관할 구청이 압류를
            한 겁니다.
          </div>
          <div className="text st3">
            23채는 강제 경매가 진행 중입니다. 경매에서 낙찰이 되더라도 보증금을
            다 돌려받기는 어렵습니다.
          </div>
          <div className="text st4">
            집주인인 ‘김OO’ 씨 는 전세금을 돌려주지 못해 압류를 당하면서도 집을
            계속 사들였습니다. 이 모든 게 기획된 겁니다.
          </div>
          <LottieCircle />
        </section>
        <section className="items scence5" id="scence5">
          lorem
        </section>
        <section className="items scence6" id="scence6">
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
            공개?)
          </div>
        </section>
      </div>

      {/* <Map /> */}
    </div>
  );
}
