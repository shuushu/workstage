import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";

import { ua } from "../../../components/Util";

SwiperCore.use([Autoplay]);

export default function TimeLineContents() {
  const nodes = [
    <p className="parag">
      김OO 씨는 집을 압류당하는 와중에도 계속해서 집을 사들였습니다.
    </p>,
    <p className="parag">
      2019년 4월 첫 압류가 시작됐는데, 2020년 7월까지 총 8채를 더 샀습니다.
    </p>,
    <p className="parag">
      세금도 못내고 전세금을 돌려주지 못하는 상황인데도 재산을 늘려간 겁니다.
    </p>,
    <p className="parag">
      집주인 김OO 씨와 어머니 서OO씨가 보유한 주택은 현재 892채. 이 가운데
      107채에서 보증금을 돌려주지 못해 사고가 발생했습니다. (2021년 4월 기준,
      주택도시보증공사)
    </p>,
    <p className="parag">압류는 계속해서 이어지고 있습니다.</p>,
    <p className="parag">
      전세금 피해 불길도 계속해서 번지고 있습니다. 나쁜 집주인으로 인한 피해는
      이제 시작입니다.
    </p>,
  ];
  return (
    <div id="cont-total" className="map-contents">
      {ua() ? (
        <Swiper
          loop={false}
          autoplay={false}
          slidesPerView={"auto"}
          direction={"vertical"}
        >
          <SwiperSlide>{nodes[0]}</SwiperSlide>
          <SwiperSlide>{nodes[1]}</SwiperSlide>
          <SwiperSlide>{nodes[2]}</SwiperSlide>
          <SwiperSlide>{nodes[3]}</SwiperSlide>
          <SwiperSlide>{nodes[4]}</SwiperSlide>
          <SwiperSlide>{nodes[5]}</SwiperSlide>
        </Swiper>
      ) : (
        <>
          {nodes[0]}
          {nodes[1]}
          {nodes[2]}
          {nodes[3]}
          {nodes[4]}
          {nodes[5]}
        </>
      )}
    </div>
  );
}
