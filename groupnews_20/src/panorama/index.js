import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {
  Switch,
  Route,
  useRouteMatch,
  Link,
  useParams,
  useLocation,
} from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Modal from "../components/Modal.tsx";

import PlaceIcon from "@material-ui/icons/Place";
import IconLight from "@material-ui/icons/WbIncandescent";
import IconExit from "@material-ui/icons/DirectionsRun";
import IconHelp from "@material-ui/icons/EmojiPeople";
import IconNotice from "@material-ui/icons/Report";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";

function removeWhiteSpace(str) {
  var setClassName = str;
  if (setClassName) {
    setClassName = setClassName.split(" ");
    setClassName = setClassName.join("");
    return setClassName;
  } else {
    return false;
  }
}

export default function Panorama() {
  let { path, url } = useRouteMatch();
  let [mdFlag, setMdFlag] = useState(false);
  let location = useLocation();
  let { key } = location;

  const CSV = {
    건축허가일: "2015-06-16",
    사용승인일: "2020-03-31",
    동수: 32,
    지붕형태: "슬라브",
    "옥상 대피공간": "있음",
    "옥상출입문 설치여부": "설치",
    "옥상 출입문 위치": "최상층 아래층",
    "옥상 출입문 재질": "방화문",
    "옥상 출입문 개방관리": "자동개폐장치",
    "유도등 설치여부": "일부설치",
    점등상태: "점등",
    "자동개폐장치 작동상태": "작동",
    "대피공간내 난간설치": "설치",
    "대피공간 면적": 258,
    장애요인: "있음",
    장애내용:
      "옥상 출입문으로 나가면 다음 라인으로 연결 통로(옥상바닥)가 있어 대피 가능함 옥상에서 1-2라인,3-4라인,5-6라인으로 상호 나갈 수 있음",
    참고사항: "",
  };

  function customUI() {
    setTimeout(() => {
      Object.entries(CSV).forEach(([key, value]) => {
        const className = removeWhiteSpace(key);
        const getNode = document.querySelectorAll(`.${className}`);
        const overwriteIcon = document.querySelectorAll(
          `.${className} .info-hotspot-icon-wrapper`
        );
        // const m_overwriteIcon = document.querySelector(
        //   `.${className}.info-hotspot-modal .info-hotspot-icon-wrapper`
        // );
        const overwriteContents = document.querySelectorAll(
          `.${className} .info-hotspot-text`
        );
        // const m_overwriteContents = document.querySelector(
        //   `.${className}.info-hotspot-modal .info-hotspot-text`
        // );

        if (getNode.length > 0) {
          document
            .querySelectorAll(`.${className}`)
            .forEach(
              (v) => (v.querySelector(".info-hotspot-text").innerHTML = value)
            );

          if (className === "유도등설치여부") {
            if (value === "설치") {
              getNode.forEach((v) => v.classList.add("green"));
            } else if (value === "미설치") {
              getNode.forEach((v) => v.classList.add("red"));
            } else {
              getNode.forEach((v) => v.classList.add("yellow"));
            }
            overwriteIcon.forEach((v) => ReactDOM.render(<IconLight />, v));
            //ReactDOM.render(<IconLight />, m_overwriteIcon);
          }

          if (className === "옥상출입문설치여부") {
            let RenderCont = "none";

            if (value === "설치") {
              getNode.forEach((v) => v.classList.add("green"));
              RenderCont = () => {
                return (
                  <div>
                    <ul className="strList">
                      <li>옥상 출입문 재질: {CSV["옥상 출입문 재질"]}</li>
                      <li>
                        옥상 출입문 개방관리: {CSV["옥상 출입문 개방관리"]}
                      </li>
                      <li>옥상 출입문 위치: {CSV["옥상 출입문 위치"]}</li>
                    </ul>
                  </div>
                );
              };
            } else if (value === "미설치") {
              getNode.forEach((v) => v.classList.add("red"));
              RenderCont = () => {
                return <div>옥상대피 공간 없습니다.</div>;
              };
            } else {
              getNode.forEach((v) => v.classList.add("yellow"));
            }
            overwriteIcon.forEach((v) =>
              ReactDOM.render(<IconExit fontSize="large" />, v)
            );
            overwriteContents.forEach((v) =>
              ReactDOM.render(<RenderCont />, v)
            );
          }
          if (className === "옥상대피공간") {
            if (value === "있음" || value === "혼재") {
              getNode.forEach((v) => v.classList.add("green"));
            } else if (value === "없음") {
              getNode.forEach((v) => v.classList.add("red"));
            }
            overwriteIcon.forEach((v) =>
              ReactDOM.render(<IconHelp fontSize="large" />, v)
            );
            const RenderCont = () => {
              return (
                <div>
                  <ul className="strList">
                    <li>대피공간내 난간설치: {CSV["대피공간내 난간설치"]}</li>
                    <li>대피공간 면적: {CSV["대피공간 면적"]}</li>
                  </ul>
                  <div className="수용률">
                    <SupervisorAccountIcon />
                    <span className="곱">
                      <strong>
                        {Math.ceil(
                          Math.ceil(parseInt(CSV["대피공간 면적"]) / 3.3) / 2
                        )}
                      </strong>
                      명
                    </span>
                  </div>
                </div>
              );
            };
            overwriteContents.forEach((v) =>
              ReactDOM.render(<RenderCont />, v)
            );
          }

          if (className === "장애요인") {
            if (value === "없음") {
              getNode.forEach((v) => v.classList.add("green"));
            } else if (value === "있음") {
              getNode.forEach((v) => v.classList.add("red"));
            }
            overwriteIcon.forEach((v) =>
              ReactDOM.render(<IconNotice fontSize="large" />, v)
            );
            overwriteContents.forEach((v) =>
              ReactDOM.render(
                <div>
                  {CSV["장애요인"]} - {CSV["장애내용"]}
                </div>,
                v
              )
            );
          }
        }
      });

      const link = document.querySelector(".link-hotspot.nth-0");
      if (CSV["옥상출입문 설치여부"] === "설치") {
        ReactDOM.render(<PlaceIcon fontSize="large" />, link);
      } else {
        ReactDOM.render(<div className="block-door"></div>, link);
      }
    }, 0);
  }

  useEffect(() => {
    /*
     * Copyright 2016 Google Inc. All rights reserved.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */

    var Marzipano = window.Marzipano;
    var bowser = window.bowser;
    var screenfull = window.screenfull;
    var data = window.APP_DATA;

    // Grab elements from DOM.
    var panoElement = document.querySelector("#pano");
    var sceneNameElement = document.querySelector("#titleBar .sceneName");
    var sceneListElement = document.querySelector("#sceneList");
    var sceneElements = document.querySelectorAll("#sceneList .scene");
    var sceneListToggleElement = document.querySelector("#sceneListToggle");
    var autorotateToggleElement = document.querySelector("#autorotateToggle");
    var fullscreenToggleElement = document.querySelector("#fullscreenToggle");

    // Detect desktop or mobile mode.
    if (window.matchMedia) {
      var setMode = function () {
        if (mql.matches) {
          document.body.classList.remove("desktop");
          document.body.classList.add("mobile");
        } else {
          document.body.classList.remove("mobile");
          document.body.classList.add("desktop");
        }
      };
      var mql = matchMedia("(max-width: 500px), (max-height: 500px)");
      setMode();
      mql.addListener(setMode);
    } else {
      document.body.classList.add("desktop");
    }

    // Detect whether we are on a touch device.
    document.body.classList.add("no-touch");
    window.addEventListener("touchstart", function () {
      document.body.classList.remove("no-touch");
      document.body.classList.add("touch");
    });

    // Use tooltip fallback mode on IE < 11.
    if (bowser.msie && parseFloat(bowser.version) < 11) {
      document.body.classList.add("tooltip-fallback");
    }

    // Viewer options.
    var viewerOpts = {
      controls: {
        mouseViewMode: data.settings.mouseViewMode,
      },
    };

    // Initialize viewer.
    var viewer = new Marzipano.Viewer(panoElement, viewerOpts);

    // Create scenes.
    var scenes = data.scenes.map(function (data) {
      var urlPrefix = "tiles";
      var ID = data.id;
      var source = Marzipano.ImageUrlSource.fromString(
        urlPrefix + "/" + ID + "/{z}/{f}/{y}/{x}.jpg",
        {
          cubeMapPreviewUrl: urlPrefix + "/" + ID + "/preview.jpg",
        }
      );

      var geometry = new Marzipano.CubeGeometry(data.levels);
      // Y축 범위 제한
      var limiter = Marzipano.util.compose(
        Marzipano.RectilinearView.limit.traditional(
          data.faceSize,
          (100 * Math.PI) / 180,
          (120 * Math.PI) / 180
        ),
        Marzipano.RectilinearView.limit.yaw(-4, 4),
        Marzipano.RectilinearView.limit.pitch(-0.4, 0.4)
      );
      var view = new Marzipano.RectilinearView(
        data.initialViewParameters,
        limiter
      );

      var scene = viewer.createScene({
        source: source,
        geometry: geometry,
        view: view,
        pinFirstLevel: true,
      });

      // Create link hotspots.
      data.linkHotspots.forEach(function (hotspot, i) {
        var element = createLinkHotspotElement(hotspot, i);
        scene.hotspotContainer().createHotspot(element, {
          yaw: hotspot.yaw,
          pitch: hotspot.pitch,
        });
      });

      // Create info hotspots.
      data.infoHotspots.forEach(function (hotspot, i) {
        var element = createInfoHotspotElement(hotspot, i);
        scene.hotspotContainer().createHotspot(element, {
          yaw: hotspot.yaw,
          pitch: hotspot.pitch,
        });
      });

      return {
        data: data,
        scene: scene,
        view: view,
      };
    });

    // Set up autorotate, if enabled.
    var autorotate = Marzipano.autorotate({
      yawSpeed: -0.03,
      targetPitch: 0,
      targetFov: Math.PI / 2,
    });
    if (data.settings.autorotateEnabled) {
      autorotateToggleElement.classList.add("enabled");
    }

    // Set handler for autorotate toggle.
    autorotateToggleElement.addEventListener("click", toggleAutorotate);

    // Set up fullscreen mode, if supported.
    if (screenfull.enabled && data.settings.fullscreenButton) {
      document.body.classList.add("fullscreen-enabled");
      fullscreenToggleElement.addEventListener("click", function () {
        screenfull.toggle();
      });
      screenfull.on("change", function () {
        if (screenfull.isFullscreen) {
          fullscreenToggleElement.classList.add("enabled");
        } else {
          fullscreenToggleElement.classList.remove("enabled");
        }
      });
    } else {
      document.body.classList.add("fullscreen-disabled");
    }

    // Set handler for scene list toggle.
    sceneListToggleElement.addEventListener("click", toggleSceneList);

    // Start with the scene list open on desktop.
    if (!document.body.classList.contains("mobile")) {
      showSceneList();
    }

    // Set handler for scene switch.
    scenes.forEach(function (scene) {
      var el = document.querySelector(
        '#sceneList .scene[data-id="' + scene.data.id + '"]'
      );
      el.addEventListener("click", function (e) {
        e.preventDefault();
        switchScene(scene);
        // On mobile, hide scene list after selecting a scene.
        if (document.body.classList.contains("mobile")) {
          hideSceneList();
        }
      });
    });

    // DOM elements for view controls.
    var viewUpElement = document.querySelector("#viewUp");
    var viewDownElement = document.querySelector("#viewDown");
    var viewLeftElement = document.querySelector("#viewLeft");
    var viewRightElement = document.querySelector("#viewRight");
    var viewInElement = document.querySelector("#viewIn");
    var viewOutElement = document.querySelector("#viewOut");

    // Dynamic parameters for controls.
    var velocity = 0.7;
    var friction = 2;

    // Associate view controls with elements.
    var controls = viewer.controls();
    controls.registerMethod(
      "upElement",
      new Marzipano.ElementPressControlMethod(
        viewUpElement,
        "y",
        -velocity,
        friction
      ),
      true
    );
    controls.registerMethod(
      "downElement",
      new Marzipano.ElementPressControlMethod(
        viewDownElement,
        "y",
        velocity,
        friction
      ),
      true
    );
    controls.registerMethod(
      "leftElement",
      new Marzipano.ElementPressControlMethod(
        viewLeftElement,
        "x",
        -velocity,
        friction
      ),
      true
    );
    controls.registerMethod(
      "rightElement",
      new Marzipano.ElementPressControlMethod(
        viewRightElement,
        "x",
        velocity,
        friction
      ),
      true
    );
    controls.registerMethod(
      "inElement",
      new Marzipano.ElementPressControlMethod(
        viewInElement,
        "zoom",
        -3,
        friction
      ),
      true
    );
    controls.registerMethod(
      "outElement",
      new Marzipano.ElementPressControlMethod(
        viewOutElement,
        "zoom",
        velocity,
        friction
      ),
      true
    );

    function sanitize(s) {
      return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;");
    }

    function switchScene(scene) {
      stopAutorotate();
      scene.view.setParameters(scene.data.initialViewParameters);
      scene.scene.switchTo();
      startAutorotate();
      updateSceneName(scene);
      updateSceneList(scene);
    }

    function updateSceneName(scene) {
      sceneNameElement.innerHTML = sanitize(scene.data.name);
    }

    function updateSceneList(scene) {
      for (var i = 0; i < sceneElements.length; i++) {
        var el = sceneElements[i];
        if (el.getAttribute("data-id") === scene.data.id) {
          el.classList.add("current");
        } else {
          el.classList.remove("current");
        }
      }
    }

    function showSceneList() {
      sceneListElement.classList.add("enabled");
      sceneListToggleElement.classList.add("enabled");
    }

    function hideSceneList() {
      sceneListElement.classList.remove("enabled");
      sceneListToggleElement.classList.remove("enabled");
    }

    function toggleSceneList(e) {
      e.preventDefault();
      sceneListElement.classList.toggle("enabled");
      sceneListToggleElement.classList.toggle("enabled");
    }

    function startAutorotate() {
      if (!autorotateToggleElement.classList.contains("enabled")) {
        return;
      }
      viewer.startMovement(autorotate);
      viewer.setIdleMovement(3000, autorotate);
    }

    function stopAutorotate() {
      viewer.stopMovement();
      viewer.setIdleMovement(Infinity);
    }

    function toggleAutorotate(e) {
      e.preventDefault();
      if (autorotateToggleElement.classList.contains("enabled")) {
        autorotateToggleElement.classList.remove("enabled");
        stopAutorotate();
      } else {
        autorotateToggleElement.classList.add("enabled");
        startAutorotate();
      }
    }

    function createLinkHotspotElement(hotspot, z) {
      // Create wrapper element to hold icon and tooltip.
      var wrapper = document.createElement("div");
      wrapper.classList.add("hotspot");
      wrapper.classList.add("link-hotspot");
      wrapper.classList.add(`nth-${z}`);
      // Create image element.
      var icon = document.createElement("img");
      icon.src = "img/link.png";
      icon.classList.add("link-hotspot-icon");

      // Set rotation transform.
      var transformProperties = [
        "-ms-transform",
        "-webkit-transform",
        "transform",
      ];
      for (var i = 0; i < transformProperties.length; i++) {
        var property = transformProperties[i];
        icon.style[property] = "rotate(" + hotspot.rotation + "rad)";
      }
      wrapper.id = `target${hotspot.target}`;
      wrapper.addEventListener("click", function (e) {
        e.preventDefault();
        if (CSV["옥상출입문 설치여부"] === "설치") {
          switchScene(findSceneById(hotspot.target));
        }
      });

      // Prevent touch and scroll events from reaching the parent element.
      // This prevents the view control logic from interfering with the hotspot.

      stopTouchAndScrollEventPropagation(wrapper);

      // Create tooltip element.
      var tooltip = document.createElement("div");
      tooltip.classList.add("hotspot-tooltip");
      tooltip.classList.add("link-hotspot-tooltip");
      tooltip.innerHTML = findSceneDataById(hotspot.target).name;

      wrapper.appendChild(icon);
      wrapper.appendChild(tooltip);

      return wrapper;
    }

    function createInfoHotspotElement(hotspot) {
      // Create wrapper element to hold icon and tooltip.
      var wrapper = document.createElement("div");
      wrapper.classList.add("hotspot");
      wrapper.classList.add("info-hotspot");

      var name = removeWhiteSpace(hotspot.icon);
      var filter = ["유도등설치여부", "옥상대피공간"].filter((v) => v === name);

      if (filter.length === 0) {
      }
      wrapper.classList.add("visible");

      if (name) {
        wrapper.classList.add(`${name}`);
      }

      // Create hotspot/tooltip header.
      var header = document.createElement("div");
      header.classList.add("info-hotspot-header");

      // Create image element.
      var iconWrapper = document.createElement("div");
      iconWrapper.classList.add("info-hotspot-icon-wrapper");
      var icon = document.createElement("img");
      icon.src = "img/info.png";
      icon.classList.add("info-hotspot-icon");
      iconWrapper.appendChild(icon);

      // Create title element.
      var titleWrapper = document.createElement("div");
      titleWrapper.classList.add("info-hotspot-title-wrapper");
      var title = document.createElement("div");
      title.classList.add("info-hotspot-title");
      title.innerHTML = hotspot.title;
      titleWrapper.appendChild(title);

      // Create close element.
      var closeWrapper = document.createElement("div");
      closeWrapper.classList.add("info-hotspot-close-wrapper");
      var closeIcon = document.createElement("img");
      closeIcon.src = "img/close.png";
      closeIcon.classList.add("info-hotspot-close-icon");
      closeWrapper.appendChild(closeIcon);

      // Construct header element.
      header.appendChild(iconWrapper);
      header.appendChild(titleWrapper);
      header.appendChild(closeWrapper);

      // Create text element.
      var text = document.createElement("div");
      text.classList.add("info-hotspot-text");
      text.innerHTML = hotspot.text;

      // Place header and text into wrapper element.
      wrapper.appendChild(header);
      wrapper.appendChild(text);

      // Create a modal for the hotspot content to appear on mobile mode.
      var modal = document.createElement("div");
      modal.innerHTML = wrapper.innerHTML;
      modal.classList.add("info-hotspot-modal");
      modal.classList.add(`${name}`);
      document.body.appendChild(modal);

      var toggle = function (e) {
        e.preventDefault();
        wrapper.classList.toggle("visible");
        modal.classList.toggle("visible");
      };

      // Show content when hotspot is clicked.
      wrapper
        .querySelector(".info-hotspot-header")
        .addEventListener("click", toggle);

      // Hide content when close icon is clicked.
      modal
        .querySelector(".info-hotspot-close-wrapper")
        .addEventListener("click", toggle);

      // Prevent touch and scroll events from reaching the parent element.
      // This prevents the view control logic from interfering with the hotspot.
      stopTouchAndScrollEventPropagation(wrapper);

      return wrapper;
    }

    // Prevent touch and scroll events from reaching the parent element.
    function stopTouchAndScrollEventPropagation(element) {
      var eventList = [
        "touchstart",
        "touchmove",
        "touchend",
        "touchcancel",
        "wheel",
        "mousewheel",
      ];
      for (var i = 0; i < eventList.length; i++) {
        element.addEventListener(eventList[i], function (event) {
          event.stopPropagation();
        });
      }
    }

    function findSceneById(id) {
      for (var i = 0; i < scenes.length; i++) {
        if (scenes[i].data.id === id) {
          return scenes[i];
        }
      }
      return null;
    }

    function findSceneDataById(id) {
      for (var i = 0; i < data.scenes.length; i++) {
        if (data.scenes[i].id === id) {
          return data.scenes[i];
        }
      }
      return null;
    }

    // Display the initial scene.
    switchScene(scenes[0]);
    customUI();
    return () => {
      var infoLabels = document.querySelectorAll(".info-hotspot-modal");
      infoLabels.forEach((i) => {
        document.body.removeChild(i);
      });
    };
  }, []);

  useEffect(() => {
    //
    /* const n1 = document.querySelector(".nth-0");
    const zIn = document.querySelector("#viewIn");
    zIn.id = "shushu";
    zIn.cloneNode(true);
    n1.appendChild(zIn);
    zIn.addEventListener("click", (e) => {
      e.preventDefault();
      setTimeout(() => {
        //console.log(22);
        //window.location.href = `#${path}/aaa`;
        window.location.href = `/#firedoor`;
      }, 1000);
    });

    const n2 = document.querySelector(".nth-1");
    n2.addEventListener("click", (e) => {
      setMdFlag(true);
    }); */
  }, []);

  return (
    <div id="panorama">
      <div id="pano"></div>

      <div id="sceneList">
        <ul className="scenes">
          <li className="text">
            <span className="scene" data-id="0-01"></span>
          </li>
          <li className="text">
            <span className="scene" data-id="1-02"></span>
          </li>
          <li className="text">
            <span className="scene" data-id="2-03"></span>
          </li>
        </ul>
      </div>

      <TransitionGroup>
        <CSSTransition key={key} classNames="fade" timeout={300}>
          <Switch location={location}>
            <Route path={`${path}/aaa`}>111</Route>
          </Switch>
        </CSSTransition>
      </TransitionGroup>
      <Modal mdFlag={mdFlag} setMdFlag={setMdFlag} />

      <div className="말풍선">
        <span className="noti">
          ※ 상기 이미지는 이해를 돕기 위해 제작된 것으로 실제와 다릅니다.
        </span>
        <span
          className={CSV["옥상 출입문 위치"] === "최상층" ? "dong A" : "dong B"}
        >
          <PlaceIcon className="icon" />
        </span>
        <ul className="infobox">
          <li className="title">
            <strong>000아파트 {CSV["동수"]}개동</strong>
            <em>
              건축허가일: {CSV["건축허가일"]} / 사용승인일: {CSV["사용승인일"]}
            </em>
          </li>
          <li className="강조">옥상 출입문 위치: {CSV["옥상 출입문 위치"]}</li>
          <li>지붕형태: {CSV["지붕형태"]}</li>
        </ul>
        {/* 저층에서 화재가 나서 계단으로 내려 갈 수 없는 상황입니다. <br />
          대피 할 수 있는 장소는 옥상 외에는 없습니다. */}
      </div>

      <div id="titleBar">
        <h1 className="sceneName">panorama</h1>
      </div>

      <div id="autorotateToggle">
        <img className="icon off" alt="" src="img/play.png" />
        <img className="icon on" alt="" src="img/pause.png" />
      </div>

      <div id="fullscreenToggle">
        <img className="icon off" alt="" src="img/fullscreen.png" />
        <img className="icon on" alt="" src="img/windowed.png" />
      </div>

      <div id="sceneListToggle">
        <img className="icon off" alt="" src="img/expand.png" />
        <img className="icon on" alt="" src="img/collapse.png" />
      </div>

      <div id="viewUp" className="viewControlButton viewControlButton-1">
        <img className="icon" alt="" src="img/up.png" />
      </div>
      <div id="viewDown" className="viewControlButton viewControlButton-2">
        <img className="icon" alt="" src="img/down.png" />
      </div>
      <div id="viewLeft" className="viewControlButton viewControlButton-3">
        <img className="icon" alt="" src="img/left.png" />
      </div>
      <div id="viewRight" className="viewControlButton viewControlButton-4">
        <img className="icon" alt="" src="img/right.png" />
      </div>
      <div id="viewIn" className="viewControlButton viewControlButton-5">
        <img className="icon" alt="" src="img/plus.png" />
      </div>
      <div id="viewOut" className="viewControlButton viewControlButton-6">
        <img className="icon" alt="" src="img/minus.png" />
      </div>
    </div>
  );
}
