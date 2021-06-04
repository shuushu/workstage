import React, { useState, useEffect } from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";
import DATA from "../asset/data/md-text";
import Lottie from "react-lottie-player";
import ani from "../asset/data/lottie/swipe-left.json";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
SwiperCore.use([Autoplay]);

let isCheck = false;
export default function TransitionsModal(props) {
  const { open, setOpen } = props;

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Modal
        className="md-wrap"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className="contents">
            <div className="close">
              <IconButton aria-label="delete" onClick={handleClose}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </div>

            {open && !isCheck ? (
              <Lottie
                className="ani"
                animationData={ani}
                play={true}
                loop={false}
                onComplete={() => {
                  document.querySelector(".md-wrap .ani").style.display =
                    "none";
                  isCheck = true;
                }}
                style={{ width: "200px", height: "200px" }}
              />
            ) : null}

            <Swiper
              spaceBetween={10}
              loop={true}
              autoplay={false}
              slidesPerView={"auto"}
            >
              {DATA.map((t, i) => {
                return (
                  <SwiperSlide
                    key={`slide-md-items${i}`}
                    className={`slide-md-items${i}`}
                  >
                    <div className="contWtap">{t}</div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
