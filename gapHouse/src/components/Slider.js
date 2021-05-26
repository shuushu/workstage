import SwiperCore, { Autoplay } from "swiper";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
// Import Swiper styles
import "swiper/swiper.scss";

import { ua } from "../../../components/Util";

SwiperCore.use([Autoplay]);

export default function Slider(props) {
  const { houseData } = props;
  const drawItems = () => {
    return houseData.map((v, i) => {
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
