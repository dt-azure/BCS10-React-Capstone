import React from "react";
import "./movieList.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handleSelectMovieInfo } from "../../redux/slice/movieSlice";

const MovieListItem = ({ movieList, toggleModal, setUrl }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14 px-8 md:px-0">
      {movieList.map((item, index) => {
        return (
          <div className="movie__item space-y-4">
            <div className="movie__img">
              <div className="overlay w-full h-96 rounded">
                <i
                  className="fa-light fa-circle-play"
                  onClick={() => {
                    console.log(item.trailer);
                    let trailerId = item.trailer.split("v=")[1].split("&")[0];
                    setUrl(trailerId);
                    toggleModal();
                  }}
                ></i>
              </div>
              <img
                className="w-full h-96 object-cover rounded"
                src={item.hinhAnh}
                alt=""
              />
            </div>

            <div className="movie__info">
              <div className="movie__desc">
                <h3 className="mb-3">
                  <span className="bg-orange-600 text-white rounded py-1 px-2 text-lg font-semibold mr-3">
                    C18
                  </span>
                  <span className="text-xl font-semibold">{item.tenPhim}</span>
                </h3>
                <p className="line-clamp-2">{item.moTa}</p>
              </div>

              <div className="btn__buyNow">
                {/* <button
                  type="button"
                  className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-lg px-5 py-2.5 me-2 mb-2 w-full"
                >
                  Buy Ticket
                </button> */}
                <button
                  type="button"
                  className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 me-2 mb-2 w-full"
                  onClick={() => {
                    dispatch(handleSelectMovieInfo(item));
                    navigate(`/movie/${item.tenPhim}`);
                  }}
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MovieListItem;
