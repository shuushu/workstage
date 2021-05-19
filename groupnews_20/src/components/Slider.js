import SwiperCore, { Autoplay } from 'swiper';
// Import Swiper React components
import { Swiper, SwiperSlide  } from "swiper/react";
// Import Swiper styles
import "swiper/swiper.scss";
// images
import s01 from "../asset/imgs/error/01.jpg";
import s02 from "../asset/imgs/error/02.jpg";
import s03 from "../asset/imgs/error/03.jpg";
import s04 from "../asset/imgs/error/04.jpg";
import s05 from "../asset/imgs/error/05.jpg";
import s06 from "../asset/imgs/error/06.jpg";
import s07 from "../asset/imgs/error/07.jpg";
import s08 from "../asset/imgs/error/08.jpg";
import s09 from "../asset/imgs/error/09.jpg";
import s10 from "../asset/imgs/error/10.jpg";

import { ua } from "../../../components/Util";
SwiperCore.use([Autoplay]);


const imgData = [
  {
    url: s01,
    desc: '옥상출입문이 잠겨있고 열쇠는 관리자가 관리합니다'
  },
  {
    url: s02,
    desc: '대피공간이 지붕 내부라 연기 유입시 위험합니다'
  },
  {
    url: s03,
    desc: '비상문자동개폐기가 고장나 잠겨진 상태입니다'
  },
  {
    url: s04,
    desc: '옥상문을 열면 경사지붕 위 2~3명 설 수 있는 대피공간이 있습니다'
  },
  
  {
    url: s05,
    desc: '대피 불가능한 구조라 출입문이 항상 잠겨 있습니다'
  },
  {
    url: s06,
    desc: '최상층 2개층 아래층이 옥상출입문입니다'
  },
  {
    url: s07,
    desc: '경사지붕인데다 난간이 없어 추락 위험이 있습니다'
  },
  {
    url: s08,
    desc: '적재물이 복도에 쌓여 있어 대피에 방해가 됩니다'
  },

  {
    url: s09,
    desc: '비상구 유도등이 없어 옥상출입문을 찾기가 어렵습니다'
  },
  {
    url: s10,
    desc: '엘리베이터 기계실에 비상구 유도등이 설치돼 있습니다'
  },
  
]

export default function Slider() {

  const drawItems = () => {
    return imgData.map((v, i) => {
      const { url, desc } = v;
      return (
        <SwiperSlide className={`slide-items${i}`} key={`slider-${i}`}>
          <span className="thumb">
            <img src={url} alt="" />
          </span>
          <span className="info">{ desc }</span>
        </SwiperSlide>
      )
    })
  }

  return (
    <Swiper
      spaceBetween={ua() ? 10 : 20}
      loop={true}
      autoplay={true}
      centeredSlides={true}
      slidesPerView={"auto"}
    >
      { drawItems()}
    </Swiper>
  );
}
