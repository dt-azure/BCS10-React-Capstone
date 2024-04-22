import React, { useEffect } from "react";
import Header from "../../layout/Header/Header";
import Footer from "../../layout/Footer/Footer";
import { useSelector } from "react-redux";
import "./movieDetails.scss";
import { formatDate } from "../../components/UserBookingDetails.jsx/UserBookingDetails";
import { Rate } from "antd";
import ButtonCustom from "../../components/Button/ButtonCustom";
import ScheduleMini from "../../layout/Schedule/ScheduleMini";
import { useNavigate } from "react-router-dom";

const MovieDetailsTemplate = () => {
  const { selectedMovieInfo } = useSelector((state) => state.movieSlice);
  const navigate = useNavigate();
  useEffect(() => {
    if (!selectedMovieInfo.tenPhim) {
      navigate("/");
    }

    window.scrollTo(0, 0);
  });

  return (
    <>
      <Header />
      <div className="flex-1 p-5 md:px-10 lg:px-20">
        <div className="md:flex bg-black bg-opacity-80 rounded-md">
          <div className="movie-img mr-4 p-5 lg:mr-10">
            <img src={selectedMovieInfo.hinhAnh} className="" alt="" />
          </div>
          <div className="movie-details p-5 text-white space-y-7">
            <p className="font-bold text-3xl">{selectedMovieInfo.tenPhim}</p>
            <p className="font-light">{selectedMovieInfo.moTa}</p>
            <p>
              Ngày khởi chiếu:{" "}
              <span className="font-bold ml-5 text-orange-500">
                {formatDate(selectedMovieInfo.ngayKhoiChieu)}
              </span>
            </p>
            <p>
              Đánh giá:{" "}
              <Rate
                allowHalf
                disabled
                value={selectedMovieInfo.danhGia / 2}
                className="ml-5"
              />
            </p>
            <div className="mt-10 flex">
              <ButtonCustom
                label="Watch Trailer"
                classNameAdd="bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 movie-details-btn"
              />
              <ButtonCustom
                label="Buy Ticket"
                classNameAdd="bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 movie-details-btn"
              />
            </div>
          </div>
        </div>
        <div className="mt-10">
          <ScheduleMini id={selectedMovieInfo.maPhim} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MovieDetailsTemplate;
