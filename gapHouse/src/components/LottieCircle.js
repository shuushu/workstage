import { useEffect, memo, useState } from "react";
import Lottie from "react-lottie-player";
import circle2 from "../asset/data/lottie/circle2.json";
import circle3 from "../asset/data/lottie/circle3.json";
const total = {
  가압류: 292,
  압류: 114,
  신탁: 85,
  소유권이전: 42,
  김용현소유: 26,
  강제경매개시결정: 23,
};
const initState = {
  가압류: {
    flag: [],
    n: 2,
  },
  압류: {
    flag: [],
    n: 2,
  },
  신탁: {
    flag: [],
    n: 5,
  },
  소유권이전: {
    flag: [],
    n: 2,
  },
  김용현소유: {
    flag: [],
    n: 6,
  },
  강제경매개시결정: {
    flag: [],
    n: 3,
  },
};
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

export default memo(function Circle(props) {
  const [stateValue, setStateValue] = useState(initState2);
  const [cKey, setKey] = useState("가압류");
  // 핸들이벤트
  function handleClick(v) {
    const newObj = [];
    stateValue.forEach((state) => {
      if (state.type === v) {
        state.switch = true;
      }
      newObj.push(state);
    });
    setStateValue(newObj);
    setKey(v);
  }
  // 그리기
  function RenderItems() {
    return stateValue.map((obj, i) => {
      return (
        <div className={`lt-items ${obj.type}`} key={`lt-${i}`}>
          <Lottie
            className="circle"
            animationData={circle2}
            play={obj.switch}
            loop={false}
            //onComplete={() => setComplete(true)}
            //   onLoopComplete={}
            //   onEnterFrame={}
            //   onSegmentStart={}
            onEnterFrame={(props) => {
              const { currentTime } = props;
              //console.log(currentTime);
            }}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      );
    });
  }

  useEffect(() => {}, []);

  return (
    <div>
      <button onClick={() => handleClick("가압류")}>가압류</button>
      <button onClick={() => handleClick("압류")}>압류</button>
      <button onClick={() => handleClick("신탁")}>신탁</button>
      <button>소유권이전</button>
      <div id="lottieCircle" className={cKey}>
        <RenderItems />
      </div>
    </div>
  );
});
