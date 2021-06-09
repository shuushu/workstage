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

const handleClick = (e) => {
  const ct = e.target.parentElement;
  const wrap = document.querySelector("#bl-main");
  const t = document.querySelectorAll(".sec");
  if (ct.className.indexOf("bl-expand") > 0) {
    ct.className = "sec";
    wrap.className = "bl-main";
  } else {
    wrap.className = "bl-main bl-expand-item";
    t.forEach((i) => {
      console.log(i === ct);
      if (i === ct) {
        i.className = "sec bl-expand";
        i.setAttribute("style", "z-index:10");
      } else {
        i.className = "sec";
        i.removeAttribute("style");
      }
    });
  }
};

export default function Grid(props) {
  const [active, setActive] = useState(false);

  function DrawItems() {
    return Object.entries(data).map(([key, v], i) => {
      const { url } = v;

      return (
        <section className="sec" key={`box-${i}`} onClick={handleClick}>
          <div className="bl-box">
            <img src={url} alt="" />
          </div>
          <div className="bl-content">222</div>
          <span className="bl-icon bl-icon-close"></span>
        </section>
      );
    });
  }

  return (
    <div id="bl-main" className={active ? "bl-main bl-expand-item" : "bl-main"}>
      <DrawItems />
    </div>
  );
}
