import { useEffect, memo, useState } from "react";
import Lottie from "react-lottie-player";
import circle2 from "../asset/data/lottie/circle2.json";

import { useCountUp } from "react-countup";
const total = {
  가압류: 292,
  압류: 114,
  신탁: 85,
  소유권이전: 42,
  김용현소유: 26,
  강제경매개시결정: 23,
  압류또는가압류: 406,
  소유: 582,
};
const g = window;
function seqAuto(callback, N = 58) {
  for (let i = 1; i <= N; i++) {
    callback(i);
  }
}
function setClassName(i) {
  if (i <= 29) {
    return "가압류";
  } else if (i >= 30 && i <= 41) {
    return "압류";
  } else if (i >= 41 && i <= 49) {
    return "신탁";
  } else if (i >= 49 && i <= 53) {
    return "소유권이전";
  } else if (i >= 54 && i <= 56) {
    return "김용현소유";
  } else if (i >= 56 && i <= 58) {
    return "강제경매개시결정";
  }
}

let initState2 = [];
seqAuto((i) => {
  const key = setClassName(i);
  initState2.push({
    type: key,
    switch: false,
  });
});
let key;
const CompleteHook = () => {
  const { countUp, update } = useCountUp({
    start: 0,
    end: 0,
    delay: 1000,
    duration: 5,
  });
  useEffect(() => {
    g.cntUpdata = update;
  }, []);

  return <span>{countUp}</span>;
};

export default memo(function Circle() {
  const [stateValue, setStateValue] = useState(initState2);
  const [cKey, setKey] = useState("소유");

  // 핸들이벤트
  function handleClick(v) {
    const newObj = [];
    stateValue.forEach((state) => {
      state.switch = true;
      newObj.push(state);
    });
    setStateValue(newObj);
    setKey(v);
    g.cntUpdata(total[v]);
  }
  window.setKey = setKey;

  useEffect(() => {}, []);

  return (
    <div className="lottieWrap">
      <div className="utilWrap">
        <button id="cirBtn1" onClick={() => handleClick("압류또는가압류")}>
          압류
        </button>
        <button id="cirBtn2" onClick={() => handleClick("강제경매개시결정")}>
          강제경매개시결정
        </button>
        <div className="countWrap">
          <h3 className="count">
            {cKey} : <CompleteHook />채
          </h3>
        </div>
      </div>
      <div id="lottieCircle" className={cKey}>
        {stateValue.map((obj, i) => {
          return (
            <div className={`lt-items ${obj.type}`} key={`lt-${i}`}>
              <Lottie
                className="circle"
                animationData={circle2}
                play={false}
                loop={true}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
});
