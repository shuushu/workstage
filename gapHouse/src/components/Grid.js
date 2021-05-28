import { useEffect, useRef, useState } from "react";

function delay(v) {
  return new Promise((resolve) => setTimeout(resolve, v));
}

const data = {
  key1: {
    url: "https://picsum.photos/id/41/300/300",
    temp: "",
  },
  key2: {
    url: "https://picsum.photos/id/42/300/300",
    temp: "",
  },
  key3: {
    url: "https://picsum.photos/id/44/300/300",
    temp: "",
  },
  key4: {
    url: "https://picsum.photos/id/45/300/300",
    temp: "",
  },
  key5: {
    url: "https://picsum.photos/id/61/300/300",
    temp: "",
  },
  key6: {
    url: "https://picsum.photos/id/51/300/300",
    temp: "",
  },
};

let timer;
function DrawItems(props) {
  const { setActive, active, state, keyName, clicked, setComplete } = props;
  const handleClick = async (e, key) => {
    // lottie 애니매이션이 끝났을때 클릭 이벤트 실행 됨
    if (!state) return;
    if (active === key) {
      // 내비클래스설정
      document.getElementById("homeNav").className = "active";
      document.querySelector("#bl-main");
      setActive("");
      setComplete({
        clicked,
        state,
        keyName,
        expend: false,
      });
      e.target.parentElement.setAttribute("style", "z-index: 100");
      clearTimeout(timer);
      timer = setTimeout(() => {
        const sectionNodes = document.querySelectorAll(".bl-main section");
        sectionNodes.forEach((v) => v.removeAttribute("style"));
      }, 600);
    } else {
      // 내비클래스삭제
      document.getElementById("homeNav").className = "";
      setComplete({
        clicked,
        state,
        keyName,
        expend: true,
      });
      setActive(key);
    }
  };

  return Object.entries(data).map(([key, v], i) => {
    const { url } = v;

    return (
      <section
        key={`box-${i}`}
        className={key === active ? "bl-expand" : null}
        onClick={(e) => handleClick(e, key)}
      >
        <div className="bl-box">
          <img src={url} alt="" />
        </div>
        <div className="bl-content">222</div>
        <span className="bl-icon bl-icon-close"></span>
      </section>
    );
  });
}
export default function Grid(props) {
  const [active, setActive] = useState("");
  return (
    <div
      id="bl-main"
      className={props.expend ? "bl-main bl-expand-item" : "bl-main"}
    >
      <DrawItems setActive={setActive} active={active} {...props} />
    </div>
  );
}
