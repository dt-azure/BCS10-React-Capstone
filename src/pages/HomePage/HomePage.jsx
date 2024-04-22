import React, { useContext, useState } from "react";
import Header from "../../layout/Header/Header";
import Banner from "../../layout/Banner/Banner";
import MovieList from "../../layout/MovieList/MovieList";
import TrailerOverlay from "../../components/Overlay/TrailerOverlay";
import Schedule from "../../layout/Schedule/Schedule";
import { NotifyContext } from "../../template/UserTemplate/UserTemplate";
import "./homePage.scss";
import Footer from "../../layout/Footer/Footer";

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [url, setUrl] = useState("");
  const notify = useContext(NotifyContext);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <Banner toggleModal={toggleModal} setUrl={setUrl} />
      <div className="movie_list container mt-10">
        <MovieList toggleModal={toggleModal} setUrl={setUrl} />
      </div>
      {showModal && <TrailerOverlay url={url} toggleModal={toggleModal} />}
      <Schedule />
    </>
  );
};

export default HomePage;
