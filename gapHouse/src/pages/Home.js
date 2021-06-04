import { useEffect, useRef, useState } from "react";
import Lottie from "react-lottie-player";
import Grid from "../components/Grid";
import Homescence1 from "../components/HomeScence1";
import HomeNav from "../components/HomeNav";
import Change from "../pages/Change";
// Layout
import * as ScrollMagic from "scrollmagic"; // Or use scrollmagic-with-ssr to avoid server rendering problems
import { TweenMax, TimelineMax } from "gsap"; // Also works with TweenLite and TimelineLite
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";
import { ScrollMagicPluginIndicator } from "scrollmagic-plugins";

import "../asset/scss/layout.scss";
import LottieCircle from "../components/LottieCircle";
import Modal from "../components/Modal";
import shLt from "../asset/data/lottie/sh-lt.json";
import shRb from "../asset/data/lottie/sh-rb.json";
import shBg from "../asset/data/lottie/sh-bg.json";
import hClick from "../asset/data/lottie/hclick.json";
import clickChart from "../asset/data/lottie/clickChart.json";
import Button from "@material-ui/core/Button";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import TEXT from "./MobileText";
import { ua } from "../../../components/Util";

ScrollMagicPluginIndicator(ScrollMagic);
ScrollMagicPluginGsap(ScrollMagic, TweenMax, TimelineMax);

const g = window;
let controller;
g.scroll = [];
function delay(v) {
  return new Promise((resolve) => setTimeout(resolve, v));
}
// 버튼트리거
function triggerBtnReset() {
  // reset
  document.querySelectorAll(".utilWrap button").forEach((v) => {
    v.classList.remove("active");
  });
  g.setKey("");
}
function triggerBtn(name) {
  // add
  const n = document.querySelector(name);
  if (n.className.indexOf("active") < 0) {
    n.click();
    n.classList.add("active");
  }
}
// Home
export default function Home() {
  const [complete, setComplete] = useState({
    clicked: false,
    state: false,
    keyName: "",
    expend: false,
  });
  const [isMobile] = useState(ua());
  const [open, setOpen] = useState(false);
  const videoNode = useRef();

  useEffect(() => {
    [("매입", "상태", "전체")].forEach((i) => {
      if (g[i] && typeof g[i] !== "string" && g[i].mapChart) {
        console.log("HOME", g[i].mapChart.mapChart.reverseGeodata);
        g[i].mapChart.mapChart.reverseGeodata = false;
      }
      if (g[i] && typeof g[i] !== "string" && g[i].sliderBar) {
        g[i].sliderBar.stop();
      }
    });
  }, [window.location.hash]);

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
      .setTween(
        new TimelineMax()
          .to("#scence1 #homeSceen1", 0.3, { y: 0, opacity: 0 })
          .to("#scence1 .house", { className: "house active" })

          .to("#scence1 .s1", 0.3, { y: 0, className: "story active" })
          .to("#scence1 .s1", { className: "story" })

          .to("#scence1 .s2", 0.3, { y: 0, className: "story active" })
          .to("#scence1 .s2", { className: "story" })

          .to("#scence1 .s3", 0.3, { y: 0, className: "story active" })
      )
      .setPin("#scence1", { pushFollowers: ua() ? false : true })
      .addTo(controller);

    if (ua()) {
      scene.on("progress enter leave", (e) => {
        if (e.type === "progress") {
          const pos = Number(e.progress * 10);
          const range = Number((e.progress * 100).toFixed());
          const target = document.querySelector("#test");
          //bg
          const BG = document.querySelector(".sh-bg");
          target.innerHTML = `${pos}     ${range}`;

          if (range < 20) {
            // [2]요소-false
            new TimelineMax().set("#mobile-text .s2", {
              className: "s2 story active",
            });
            new TimelineMax().set("#mobile-text", {
              className: "",
            });
            new TimelineMax().set(".mstory", {
              className: "mstory",
            });
          }
          if (range < 10) {
            BG.classList.remove("active");
            // [1]요소-false
            new TimelineMax().set("#mobile-text .s1", {
              opacity: 0,
              className: "s1 story active",
            });
          } else if (range >= 10 && range < 20) {
            BG.className = "sh-bg active";
            // [1]요소-true
            new TimelineMax().set("#mobile-text .s1", {
              opacity: pos,
              className: "s1 story",
            });
          } else if (range >= 20 && range < 40) {
            new TimelineMax().set("#mobile-text .s1", {
              opacity: 0,
              className: "s1 story active",
            });
            new TimelineMax().set("#mobile-text .s2", {
              opacity: pos,
              className: "s2 story",
            });
            new TimelineMax().set(".mstory", {
              className: "mstory active",
            });
            new TimelineMax().set("#mobile-text", {
              className: "sceen1 active",
            });
            // 이전요소초기화
            new TimelineMax().set("#mobile-text .s3", {
              className: "s3 story active",
            });
          } else if (range >= 40 && range < 60) {
            new TimelineMax().set("#mobile-text .s2", {
              opacity: 0,
              className: "s2 story active",
            });
            new TimelineMax().set("#mobile-text .s3", {
              opacity: pos,
              className: "s3 story",
            });

            const bg1 = document.querySelector("#scence1 .house");
            const bg2 = document.querySelector("#scence1 .sh-bg");
            bg1.removeAttribute("style");
            bg2.removeAttribute("style");
            bg1.className = "house active";
            bg2.className = "sh-bg active";
          } else if (range >= 60 && range < 80) {
            new TimelineMax().set("#mobile-text .s3", {
              opacity: 1 - pos * 0.2,
              className: "s3 story",
            });
            new TimelineMax().set("#scence1 .house", {
              opacity: 1 - pos * 0.2,
              className: "house",
            });
            new TimelineMax().set("#scence1 .sh-bg", {
              opacity: 1 - pos * 0.2,
              className: "sh-bg",
            });
            new TimelineMax().set("#mobile-text", {
              className: "",
            });
            new TimelineMax().set(".mstory", {
              className: "mstory",
            });
          }
        }
        if (e.type === "leave") {
          // new TimelineMax().set("#scence1 .sh-bg", {
          //   display: "none",
          // });
          // new TimelineMax().set("#scence1 .house", {
          //   display: "none",
          // });
          new TimelineMax().set(
            "#mobile-text .s1, #mobile-text .s2, #mobile-text .s3",
            {
              opacity: 0,
            }
          );
          new TimelineMax().set(".mstory.active", {
            className: "mstory",
          });
        }
      });
    } else {
      scene.on("progress  start end enter leave", (e) => {
        if (e.type === "progress") {
          const pos = Number((e.progress * 100).toFixed());
          const target = document.querySelector(".sh-bg");
          if (!target) {
            return;
          }
          if (pos < 30) {
            target.classList.remove("active");
          } else if (pos > 30 && pos < 50) {
            target.className = "sh-bg active";
          } else {
            target.classList.remove("active");
          }
        }
      });
    }

    // 영상 앞 컨텐츠 영역 저장
    g.playerinitPoint = scene.scrollOffset() + scene.duration();
    g.scroll.push(scene);
    //
    // scence2
    //
    scene = new ScrollMagic.Scene({ triggerElement: "#scence2" })
      .setTween(
        new TimelineMax()
          .to("#scence2 .s1", 0.3, { y: "0", className: "story s1 active" })
          .to("#scence2 .s1", 0.3, { y: "140px" })
          .to("#scence2 .s1", 0.3, { y: "200px" })
      )
      .setPin("#scence2", { pushFollowers: ua() ? false : false })
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
    if (ua()) {
      scene.on("progress  start end enter leave", (e) => {
        if (e.type === "progress") {
          const pos = Number(e.progress * 10);
          const range = Number((e.progress * 100).toFixed());
          const target = document.querySelector("#test");
          target.innerHTML = `${pos}     ${range}`;
          if (range > 33) {
            // 글자켜기, 써클켜기
            //
            // [1]요소-false
            new TimelineMax().set(".s5-1", {
              opacity: pos / 10,
            });

            if (range > 50) {
              g.setKey("소유");
            }
            if (range > 70) {
              g.cntUpdata(582);
            }
            if (range < 100) {
              new TimelineMax().set(".s5-2, .s5-3", {
                opacity: 0,
              });
            }
          }
        } else if (e.type === "leave") {
          // 정리
          new TimelineMax().set(".s5-1", {
            opacity: 0,
          });
        }
      });
    } else {
      scene.on("progress  start end enter leave", (e) => {
        const { type, scrollDirection } = e;
        //FORWARD 내릴떄 || REVERSE 올릴때
        if (e.type === "progress") {
          const range = Number((e.progress * 100).toFixed());
          console.log(range);

          if (scrollDirection === "FORWARD") {
            if (range >= 45) {
              new TimelineMax().set("#scence7 .s1", {
                className: "story  s1 on",
              });
            }
            if (range >= 80) {
              g.setKey("소유");
              g.cntUpdata(582);
            }
            if (range >= 90) {
              new TimelineMax().set("#scence7 .s1", {
                className: "story  s1",
              });
              new TimelineMax().set("#scence7 .s2", {
                className: "story  s2 on",
              });
              g.setKey("압류또는가압류");
              g.cntUpdata(406);
            }
          } else if (scrollDirection === "REVERSE") {
            if (range < 45) {
              new TimelineMax().set("#scence7 .s1", {
                className: "story  s1 ",
              });
            }
            if (range < 90) {
              new TimelineMax().set("#scence7 .s1", {
                className: "story  s1 on",
              });
              new TimelineMax().set("#scence7 .s2", {
                className: "story  s2",
              });
              g.setKey("소유");
              g.cntUpdata(582);
            }
          }
        } else if (e.type === "leave") {
          new TimelineMax().set("#scence7 .s1", {
            className: "story  s1",
          });
        }
      });
    }
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
    if (!ua()) {
      scene = new ScrollMagic.Scene({
        triggerElement: "#scence5",
      })
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
      scene.on("progress  start end enter leave", (e) => {
        const { type, scrollDirection } = e;
        //FORWARD 내릴떄 || REVERSE 올릴때
        if (e.type === "progress") {
          const range = Number((e.progress * 100).toFixed());
          if (scrollDirection === "FORWARD") {
            if (range > 3) {
              new TimelineMax().set("#scence5 .s1", {
                className: "story  s1",
              });
            }
          }
        } else if (e.type === "leave") {
          g["매입"].sliderBar.stop();
        }
      });
      g.scroll.push(scene);
    }
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

    if (ua()) {
      //
      // scence7
      //
      scene = new ScrollMagic.Scene({
        triggerElement: "#scence7",
      }).addTo(controller);
      scene.triggerHook(0);
      scene.on("progress  start end enter leave", (e) => {
        if (e.type === "progress") {
          const pos = Number(e.progress * 10);
          const range = Number((e.progress * 100).toFixed());
          const target = document.querySelector("#test");

          target.innerHTML = `[5]: ${pos}-${range}`;

          if (range < 20) {
            new TimelineMax().set(".s5-2", {
              opacity: pos * 2,
            });
            g.setKey("압류또는가압류");
            g.cntUpdata(406);
            new TimelineMax().set(".s5-3", {
              opacity: 0,
            });
          } else if (range > 20 && range < 30) {
            new TimelineMax().set(".s5-2", {
              opacity: 0,
            });
            new TimelineMax().set(".s5-3", {
              opacity: pos * 2,
            });
            g.setKey("강제경매개시결정");
            g.cntUpdata(23);
          }
          if (range < 100) {
            // 정리
            new TimelineMax().set(".s5-1", {
              opacity: 0,
            });
          }
        } else if (e.type === "leave") {
        }
      });

      g.scroll.push(scene);
    } else {
      //  PC
      scene = new ScrollMagic.Scene({
        triggerElement: "#scence7",
      }).addTo(controller);
      scene.triggerHook(0);
      scene.on("progress  start end enter leave", (e) => {
        const { type, scrollDirection } = e;
        //FORWARD 내릴떄 || REVERSE 올릴때
        if (e.type === "progress") {
          const range = Number((e.progress * 100).toFixed());
          console.log("[]-----", range);

          if (scrollDirection === "FORWARD") {
            if (range > 0) {
              new TimelineMax().set("#scence7 .s2", {
                className: "story  s2",
              });
              new TimelineMax().set("#scence7 .s3", {
                className: "story  s3 on",
              });
              g.setKey("강제경매개시결정");
              g.cntUpdata(23);
              if (g["매입"] && g["매입"].sliderBar) {
                clearInterval(g.mainPlayBtn);
                g["매입"].sliderBar.stop();
                g.mainPlayBtn = setInterval(() => {
                  g["매입"].sliderBar.play();
                }, 1000);
              }
            }
            if (range > 60) {
              new TimelineMax().set("#scence5 .s1", {
                className: "story  s1 on",
              });
            }
          } else if (scrollDirection === "REVERSE") {
            if (range < 10) {
              new TimelineMax().set("#scence7 .s2", {
                className: "story  s2 on",
              });
              new TimelineMax().set("#scence7 .s3", {
                className: "story  s3",
              });
              g.setKey("압류또는가압류");
              g.cntUpdata(406);
              clearInterval(g.mainPlayBtn);
              new TimelineMax().set("#scence5 .s1", {
                className: "story  s1",
              });
            }
          }
        }

        /* if (e.type === "enter") {
        
        } else if (e.type === "leave") {
          clearInterval(g.mainPlayBtn);
          new TimelineMax().set("#scence5 .s1", {
            className: "story  s1",
          });
        } else if (e.type === "progress") {
        } */
      });
    }
    //
    // scence6
    //
    scene = new ScrollMagic.Scene({
      triggerElement: "#scence6",
    })
      .setTween(
        new TimelineMax().to("#scence6 > div:nth-child(1)", 0.3, {
          y: "100%",
        })
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
    return () => {
      g.scroll.forEach((plugin) => {
        plugin.destroy(true);
      });
      g.scroll = [];
      if (g["매입"] && g["매입"].sliderBar) {
        g["매입"].sliderBar.stop();
      }
    };
  }, []);

  return (
    <div id="home" className={open ? "none" : null}>
      <HomeNav complete={complete} />
      <div className="scrollContent">
        <section className="items scence1" id="scence1">
          <div className="house">
            {ua() ? null : (
              <div className="link" onClick={() => setOpen(true)}>
                <Lottie
                  className="hClick"
                  animationData={hClick}
                  play={true}
                  loop={true}
                  style={{ width: "240px", height: "240px" }}
                />
              </div>
            )}
          </div>
          <Homescence1 {...complete} setComplete={setComplete} />
          <div className="storyWrap">
            <div className="story-items">
              <p className="story s1">
                첫 독립, 신혼집, 처음 살아보는 신축빌라.. <br />
                부푼 꿈을 안고 서울 시흥동의 작은 빌라에서 시작한 삶이 어느 날
                갑자기 산산히 조각 났습니다. <br />
                전재산과 다름 없는 전세 보증금을 돌려받지 못하고 있는 겁니다.
              </p>
            </div>
            <div className="story-items">
              <p className="story s2">
                8층 짜리 빌라에 세 들어사는 열 네 가족 모두 마찬가지 신세입니다.
                <br />
                집주인 ‘김OO’ 씨는 줄 돈이 없다며 새로운 세입자를 구해서 돈을
                돌려받거나, 웃돈을 주고 직접 빌라를 사라는 무책임한 말 뿐입니다.
                <br />한 푼이라도 더 돌려받기 위해 세입자들은 백방으로
                알아봤지만 소용이 없었습니다.
              </p>
            </div>

            <div className="story-items">
              <p className="story s3">
                빌라 14채 중 9채는 <strong className="강조">강제로 경매</strong>
                에 부쳐졌고, 4채는 주택보증공사에서 1백억 대{" "}
                <strong className="강조2">가압류 상태</strong>입니다.{" "}
                <span className="gosi">(2021.05 기준)</span>
                <br />
                압류된 집에 들어올 세입자를 구할 수도 없고, 이 집을 살 수도
                없습니다.
              </p>
            </div>
          </div>
          <div className="sh-bg">
            <Lottie animationData={shBg} play={true} loop={true} />,
          </div>
          <div className="shLt">
            <Lottie animationData={shLt} play={true} loop={true} />
          </div>
          <div className="shRb">
            <Lottie animationData={shRb} play={true} loop={true} />
          </div>
        </section>
        <section className="items scence2" id="scence2">
          <div className="storyWrap">
            <div className="story-items">
              <p className="story s1">
                그런데 집주인 <strong className="강조2">‘김OO’</strong> 씨가
                가진 집은 한 두 채가 아니었습니다.
              </p>
            </div>
          </div>

          <video ref={videoNode} id="my-video"></video>
        </section>

        {isMobile ? (
          <section className="items scence7" id="scence7">
            <LottieCircle />
          </section>
        ) : (
          <>
            <section className="items scence7 pc" id="scence7">
              <LottieCircle />
              <div className="storyWrap">
                <div className="story-items">
                  <p className="story s1">
                    알고보니 집주인인 ‘김OO’ 씨 는 수도권 일대에 임대주택인
                    빌라만 582채 가진 ‘빌라왕’ 이었습니다. (2020.05 기준)
                  </p>
                </div>
                <div className="story-items">
                  <p className="story s2">
                    이 중 406채가 압류 또는 가압류 상태입니다.
                    <br />
                    모두 전세금을 돌려주지 못하고 있어 주택보증공사나 관할
                    구청이 압류를 한 겁니다.
                  </p>
                </div>

                <div className="story-items">
                  <p className="story s3">
                    23채는 강제 경매가 진행 중입니다. 경매에서 낙찰이 되더라도
                    보증금을 다 돌려받기는 어렵습니다.
                    <br />
                    집주인인 ‘김OO’ 씨 는 전세금을 돌려주지 못해 압류를
                    당하면서도 집을 계속 사들였습니다. 이 모든 게 기획된 겁니다.
                  </p>
                </div>
              </div>
            </section>
            <section className="items scence5" id="scence5">
              <Change
                setHouseData={() => {
                  console.log(22);
                }}
                pos="main"
              />
              <div className="storyWrap">
                <div className="story-items">
                  <p className="story s1">
                    ‘김OO’ 씨의 빌라 매입 흐름을 확인 하실 수 있습니다.
                  </p>
                </div>
              </div>
            </section>
          </>
        )}
        {/* <section className="items scence4" id="scence4">
          <Grid {...complete} setComplete={setComplete} />
        </section> */}

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

      <div className="linkto">
        <Button href="./#detail/total">
          <Lottie
            className="goToDetailMap"
            animationData={clickChart}
            play={true}
            loop={true}
            style={{ width: "100%", height: "100%" }}
          />
          <span className="str">상세보기</span>
        </Button>
      </div>
      <div id="test">0</div>

      {isMobile ? (
        <>
          <TEXT />
          <div className="mstory">
            <Button onClick={() => setOpen(true)}>
              <BorderColorIcon />
              피해 입주자 사연 보기
            </Button>
          </div>
        </>
      ) : null}

      <Modal open={open} setOpen={setOpen} />
    </div>
  );
}
