import SwiperCore, { Autoplay } from "swiper";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import Chip from "@material-ui/core/Chip";
// Import Swiper styles
import "swiper/swiper.scss";

import { ua } from "../../../components/Util";

SwiperCore.use([Autoplay]);

const g = window;
export default function Slider(props) {
  const handleClick = (type) => {
    if (g[g.KEY].mapChart2) {
      if (type === "세대기준") {
        g[g.KEY].mapChart2.bubbleSeries.heatRules.getIndex(0).max = 102;
      } else if (type === "빌라기준") {
        g[g.KEY].mapChart2.bubbleSeries.heatRules.getIndex(0).max = 60;
      }
      setTimeout(() => {
        g[g.KEY].mapChart2.updateChart(type);
      }, 0);
    }
  };

  return (
    <Swiper
      spaceBetween={ua() ? 5 : 10}
      loop={false}
      autoplay={false}
      slidesPerView={"auto"}
    >
      <SwiperSlide className={`slide-items0`}>
        <Chip
          onClick={() => handleClick("세대기준")}
          label={`세대기준`}
        />
      </SwiperSlide>
      <SwiperSlide className={`slide-items1`}>
        <Chip
          onClick={() => handleClick("빌라기준")}
          label={`빌라기준`}
        />
      </SwiperSlide>
    </Swiper>
  );
}
