const tooltip = (농지데이터, 정당) => {
  const {
    cate = "본인",
    cate2 = "답",
    area_portion,
    add_detailed,
    name = "이낙연",
    취득방법 = "상속",
    취득일자 = "1991.05.13",
  } = 농지데이터;

  return `
        <div class="custom-layer-tooltip">
            <div class="wrap">
                <h5 class="headline">
                    <span class="당마크">
                    <span class="로고 ${정당}_로고_30x30"}></span>
                    </span><span>${name}</span>
                    <span class="기타정보">
                        <span class="소유주">소유주: ${cate}</span><span class="종류">지목 : ${cate2}</span>
                    </span>
                </h5>
                <p class="parag">
                    <span class="취득정보">[${취득일자}-${취득방법}] ${add_detailed} (지분 ${area_portion})</span>                
                </p>
            </div>
        </div>
    `;
};

const 콤마제거 = (n) => {
  let value = n;
  let getIdx = n.indexOf("원");
  if (getIdx > 0) {
    value = value.substr(0, getIdx);
  }
  return Number(value.split(",").join(""));
};
const 평수계산 = (n) => {
  try {
    if (typeof n === "string" && n.indexOf(",") > 0) {
      const N = 콤마제거(n);
      return (N / 3.3).toFixed(4);
    } else {
      return (n / 3.3).toFixed(3);
    }
  } catch (error) {
    console.log(error);
  }
};
const 콤마추가 = (v) => {
  return (v * 1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const 줄바꿈처리 = (v) => {
  const ul = v.split("\n").reduce((p, n) => {
    const li = document.createElement("li");
    const t = document.createTextNode(n);
    li.appendChild(t);
    p.appendChild(li);
    return p;
  }, document.createElement("ul"));
  return ul;
};

export { tooltip, 평수계산, 콤마제거, 콤마추가, 줄바꿈처리 };
