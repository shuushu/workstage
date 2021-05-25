import SwiperCore, { Autoplay } from "swiper";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
// Import Swiper styles
import "swiper/swiper.scss";

import { ua } from "../../../components/Util";
SwiperCore.use([Autoplay]);

const itmes = [
  {
    name: "김용현",
    data: 0,
  },
  {
    name: "강선범",
    data: 0,
  },
  {
    name: "진현철",
    data: 0,
  },
  {
    name: "육정순",
    data: 0,
  },
];

export default function Slider() {
  const drawItems = () => {
    return itmes.map((v, i) => {
      const { name, data } = v;
      return (
        <SwiperSlide className={`slide-items${i}`} key={`slider-${i}`}>
          <Chip
            data-key={name}
            avatar={<Avatar>{name.substr(0, 1)}</Avatar>}
            label={`${name}: ${data}`}
          />
        </SwiperSlide>
      );
    });
  };

  return (
    <Swiper
      spaceBetween={ua() ? 10 : 20}
      loop={false}
      autoplay={false}
      slidesPerView={"auto"}
    >
      {drawItems()}
    </Swiper>
  );
}
