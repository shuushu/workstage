import { useEffect, memo, useState } from "react";
import Lottie from "react-lottie-player";
import building from "../asset/data/lottie/building.json";

export default memo(function Sceen1(props) {
  const { state, clicked, keyName, expend, setComplete } = props;
  const [playValue, setPlayValue] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setPlayValue(true);
    }, 1000);
  }, []);

  return (
    <div id="homeSceen1" className={state ? "complete" : null}>
      <div className="title">당신의 빌라는 안녕하십니까?</div>
      <Lottie
        className="building"
        animationData={building}
        play={playValue}
        loop={false}
        onComplete={() =>
          setComplete({
            clicked: false,
            state: true,
            keyName,
            expend,
          })
        }
        //   onLoopComplete={}
        //   onEnterFrame={}
        //   onSegmentStart={}
        onEnterFrame={(props) => {
          const { currentTime } = props;
          if (!clicked && currentTime >= 60) {
            setPlayValue(false);
            setComplete({
              clicked: false,
              state: true,
              keyName,
              expend,
            });
          }
        }}
      />
    </div>
  );
});
