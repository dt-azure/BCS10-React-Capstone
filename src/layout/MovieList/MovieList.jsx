import React, { useEffect, useState } from "react";
import { manageMoviesServ } from "../../services/manageMovies";
import "./movieList.scss";
import { Carousel, Divider } from "antd";
import MovieListItem from "./MovieListItem";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllMoviesThunk,
  handleGetAllMovies,
} from "../../redux/slice/movieSlice";

const MovieList = ({ toggleModal, setUrl }) => {
  // const [arrMovie, setArrMovie] = useState([]);
  const { arrMovie } = useSelector((state) => state.movieSlice);
  const dispatch = useDispatch();

  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };

  const renderMovieList = () => {
    const movieList = [];

    for (let i = 0; i < arrMovie.length; i += 8) {
      if (i + 8 < arrMovie.length) {
        movieList.push(
          <div>
            <MovieListItem
              movieList={arrMovie.slice(i, i + 8)}
              toggleModal={toggleModal}
              setUrl={setUrl}
            />
          </div>
        );
      } else {
        movieList.push(
          <div>
            <MovieListItem
              movieList={arrMovie.slice(i)}
              toggleModal={toggleModal}
              setUrl={setUrl}
            />
          </div>
        );
      }
    }

    return movieList;
  };

  useEffect(() => {
    dispatch(getAllMoviesThunk());
  }, []);

  return (
   
    <>
      <div className="mt-6 mb-10">
        <Divider plain>
          <h2 className="font-bold text-2xl text-center">Now Showing</h2>
        </Divider>
      </div>
      <Carousel afterChange={onChange}>{renderMovieList()}</Carousel>
    </>
  );
};

export default MovieList;
