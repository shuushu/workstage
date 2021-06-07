import { useEffect, useState } from "react";
import { callSheet } from "../asset/data/house";

import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";

import SwiperCore, { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";

import { ua } from "../../../components/Util";

SwiperCore.use([Autoplay, Pagination]);

export default function TotalCont() {
  const getCache = JSON.parse(localStorage.getItem("areaTotaList"));
  const [data, setData] = useState(getCache ? getCache : []);

  const handleClick = (v) => {
    const filter = getCache.filter((s) => {
      if (s[0].indexOf(v) >= 0) {
        return s;
      }
    });
    setData(v === "전체" ? getCache : filter);
    const bb = window["전체"];
    if (bb && bb.mapChart2) {
      //bb.mapChart2.bubbleSeries.show(0)
      /*  bb.mapChart2.bubbleSeries.dataItems.each((dataItem) => {
        var mapImage = dataItem.mapImage;
        var circle = mapImage.children.getIndex(0);
        console.log(mapImage.dataItem.id)
        if (mapImage.dataItem.value === 0) {
          circle.hide(0);
        } else if (circle.isHidden || circle.isHiding) {
          circle.show();
        }
      }); */
    }
  };
  useEffect(() => {
    callSheet("1qoH5xrmgGTaZih3uegresvbRHcUaLPgMlsrwbR7lZd4", "area").then(
      (res) => {
        const d = Object.entries(res).map((i) => {
          const { add_all, count, sido, gu } = i[1];

          return [add_all, count, sido, gu];
        });
        localStorage.setItem("areaTotaList", JSON.stringify(d));
        setData(d);
      }
    );
  }, []);

  const nodes = [
    <p className="parag">
      MBC 기획취재팀은 임대사업자 김OO 씨가 소유한 주택 800여채 가운데 653채의
      정보를 확보했습니다.
    </p>,
    <p className="parag">
      김 씨가 매입한 주택은 서울, 인천, 경기 전역에 걸쳐 있는데요. 특히 서울
      강서구와 금천구, 경기 부천시 등 서부권에 집중돼 있습니다.
    </p>,
    <p className="parag">
      원의 크기가 클 수록 해당 지역에 갖고 있는 집이 많다는 의미입니다.
    </p>,
    <div className="chip-wrap">
      <Chip
        avatar={<Avatar>653</Avatar>}
        label="전체"
        onClick={() => handleClick("전체")}
      />
      <Chip
        avatar={<Avatar>490</Avatar>}
        label="서울"
        onClick={() => handleClick("서울")}
      />
      <Chip
        avatar={<Avatar>126</Avatar>}
        label="경기도"
        onClick={() => handleClick("경기도")}
      />
      <Chip
        avatar={<Avatar>37</Avatar>}
        label="인천"
        onClick={() => handleClick("인천")}
      />
    </div>,
  ];
  let liArr = [];
  let sw = [];
  let DIV = window.innerWidth === 320 ? 12 : 14;
  data.map((v, ii) => {
    if (ii !== 0 && ii % DIV === 0) {
      sw.push(liArr);
      liArr = [];
    } else {
      liArr.push(
        <div className="list">
          <p className="addr">{v[0]}</p>
          <p className="count">{v[1]}채</p>
        </div>
      );
    }
  });

  if (data.length < DIV) {
    sw.push(liArr);
  }

  return (
    <div id="cont-total" className="map-contents">
      {ua() ? (
        <Swiper
          loop={false}
          autoplay={false}
          slidesPerView={"auto"}
          direction={"vertical"}
        >
          <SwiperSlide className={`slide-items0`}>{nodes[0]}</SwiperSlide>
          <SwiperSlide className={`slide-items1`}>{nodes[1]}</SwiperSlide>
          <SwiperSlide className={`slide-items1`}>{nodes[2]}</SwiperSlide>
          <SwiperSlide className={`slide-items1`}>
            {nodes[3]}
            <div id="list-wrap">
              <Swiper
                pagination={true}
                loop={false}
                autoplay={false}
                slidesPerView={"auto"}
              >
                {sw.map((vv, ix) => {
                  return (
                    <SwiperSlide key={`li-${ix}`}>
                      {vv.map((ss) => {
                        return ss;
                      })}
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </SwiperSlide>
        </Swiper>
      ) : (
        <>
          {nodes[0]}
          {nodes[1]}
          {nodes[2]}
          {nodes[3]}
          <div id="list-wrap">
            {data.map((v, ii) => {
              return (
                <div key={`list-${ii}`} className="list">
                  <p className="addr">{v[0]}</p>
                  <p className="count">{v[1]}채</p>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
