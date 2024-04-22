import React, { useEffect, useState } from "react";
import { Carousel } from "antd";
import { manageMoviesServ } from "../../services/manageMovies";
import "./banner.scss";
import TrailerOverlay from "../../components/Overlay/TrailerOverlay";
import { useDispatch } from "react-redux";
import {
  handleLoadingOff,
  handleLoadingOn,
} from "../../redux/slice/loadingSlice";

const Banner = ({ toggleModal, setUrl }) => {
  const dispatch = useDispatch();
  const [arrBanner, setArrBanner] = useState([]);
  const bannerTrailerURL = {
    1282: "uqJ9u7GSaYM",
    1283: "kBY2k3G6LsM",
    1284: "JNZv1SgHv68",
  };

  const contentStyle = {
    margin: 0,
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };

  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };

  useEffect(() => {
    dispatch(handleLoadingOn());
    manageMoviesServ
      .getAllBanner()
      .then((res) => {
        setArrBanner(res.data.content);
        // console.log(res.data.content);
        dispatch(handleLoadingOff());
      })
      .catch((err) => {
        console.log(err);
        dispatch(handleLoadingOff());
      });
  }, []);

  return (
    <div className="carousel-banner">
      <Carousel
        arrows={true}
        nextArrow={
          <div>
            <i className="fa-duotone fa-chevron-right"></i>
          </div>
        }
        prevArrow={
          <div>
            <i className="fa-duotone fa-chevron-left"></i>
          </div>
        }
        dots={false}
        afterChange={onChange}
      >
        {arrBanner.map((item, index) => {
          return (
            <div key={index} className="banner__img sm:h-30-screen md:h-50-screen lg:h-80-screen">
              <img className="w-full" src={item.hinhAnh} alt="" />

              <button
                data-modal-target="trailerModal"
                data-modal-toggle="trailerModal"
                className="trailer__btn sm:text-sm"
                type="button"
                onClick={() => {
                  toggleModal();
                  setUrl(bannerTrailerURL[item.maPhim]);
                }}
              >
                <i className="fa-light fa-circle-play"></i>
              </button>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default Banner;
