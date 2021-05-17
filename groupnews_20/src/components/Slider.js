import SwiperCore, { Autoplay } from 'swiper';
// Import Swiper React components
import { Swiper, SwiperSlide  } from "swiper/react";
// Import Swiper styles
import "swiper/swiper.scss";
// images
import 옥상문협소 from "../asset/imgs/error/옥상문협소.jpg";
import 점등불량 from "../asset/imgs/error/점등불량.jpg";
import 문열면위험 from "../asset/imgs/error/문열면위험.jpg";
import 열쇠키어디 from "../asset/imgs/error/열쇠키어디.jpg";
import 박공사다리타고 from "../asset/imgs/error/박공사다리타고.jpg";
import 유도등미설치 from "../asset/imgs/error/유도등미설치.jpg";
import 유도등불량 from "../asset/imgs/error/유도등불량.jpg";
import 적재물 from "../asset/imgs/error/적재물.jpg";
import 적재물2 from "../asset/imgs/error/적재물2.jpg";
import 옥상난간없음 from "../asset/imgs/error/옥상난간없음.jpg";
import 대피로어려움 from "../asset/imgs/error/대피로어려움.jpg";
import { ua } from "../../../components/Util";
SwiperCore.use([Autoplay]);

export default function Slider() {
  return (
    <Swiper
      spaceBetween={ua() ? 10 : 20}
      loop={true}
      autoplay={true}
      centeredSlides={true}
      slidesPerView={"auto"}
    >
      <SwiperSlide>
        <span className="thumb">
          <img src={옥상난간없음} alt="" />
        </span>
        <span className="info">
          옥상 난간이 없어 대피공간에 위험이 있습니다.
        </span>
      </SwiperSlide>
      <SwiperSlide>
        <span className="thumb">
          <img src={문열면위험} alt="" />
        </span>
        <span className="info">
          옥상출입문 개방 후 대피로의 안전장치가 없어 위험합니다.
        </span>
      </SwiperSlide>
      <SwiperSlide>
        <span className="thumb">
          <img src={박공사다리타고} alt="" />
        </span>
        <span className="info">
          난간이 설치되어 있지만, 사다리 안전장치가 필요합니다.
        </span>
      </SwiperSlide>
      <SwiperSlide>
        <span className="thumb">
          <img src={적재물} alt="" />
        </span>
        <span className="info">
          적재물이 계단 사이에 쌓여 대피에 방해되며, 적재물 때문에 다치는 사고가
          발생합니다.
        </span>
      </SwiperSlide>
      <SwiperSlide>
        <span className="thumb">
          <img src={적재물2} alt="" />
        </span>
        <span className="info">
          적재물이 계단 사이에 쌓여 대피에 방해되며, 적재물 때문에 다치는 사고가
          발생합니다.
        </span>
      </SwiperSlide>
      <SwiperSlide>
        <span className="thumb">
          <img src={유도등미설치} alt="" />
        </span>
        <span className="info">
          유도등이 설치되어 있지않아, 옥상출입문 확인에 어려움이 있습니다.
        </span>
      </SwiperSlide>
      <SwiperSlide>
        <span className="thumb">
          <img src={유도등불량} alt="" />
        </span>
        <span className="info">
          옥상 출입문이 아닌 기계실에 유도등이 설치되어 있습니다.
        </span>
      </SwiperSlide>
      <SwiperSlide>
        <span className="thumb">
          <img src={옥상문협소} alt="" />
        </span>
        <span className="info">
          옥상 출입문의 공간이 좁아 대피에 어려움이 있습니다.
        </span>
      </SwiperSlide>
      <SwiperSlide>
        <span className="thumb">
          <img src={점등불량} alt="" />
        </span>
        <span className="info">
          점등 및 경보기 불량으로 소방설비 점검이 필요합니다.
        </span>
      </SwiperSlide>
      <SwiperSlide>
        <span className="thumb">
          <img src={열쇠키어디} alt="" />
        </span>
        <span className="info">열쇠는 눈에 띄는곳에 비치해 두어야 합니다.</span>
      </SwiperSlide>
      <SwiperSlide>
        <span className="thumb">
          <img src={대피로어려움} alt="" />
        </span>
        <span className="info">
          사다리를 타고 문을 올려야 개방가능한 상태로 노인분들은 출입이 힘든
          대피로입니다.
        </span>
      </SwiperSlide>
    </Swiper>
  );
}
