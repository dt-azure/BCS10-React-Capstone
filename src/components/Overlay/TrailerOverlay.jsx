import React, { useEffect, useState } from "react";
import "./overlay.scss";
import YouTube from "react-youtube";

const TrailerOverlay = ({ url, toggleModal }) => {
  const [trailerSize, setTrailerSize] = useState({
    width: window.innerWidth * 0.7,
    height: window.innerHeight * 0.7,
  });

  const [playerReady, setPlayerReady] = useState(false);

  const opts = {
    height: trailerSize["height"],
    width: trailerSize["width"],
  };

  const onReady = (e) => {
    e.target.playVideo();
    setPlayerReady(true);
  };

  const handleResize = () => {
    let windowWidth = window.innerWidth;
    let width = 300;

    if (windowWidth >= 1024) {
      width = windowWidth * 0.7;
    }
    else if (windowWidth >= 640) {
      width = 600
    }

    setTrailerSize({
      width: width,
      height: (width / 16) * 9,
    });
  };

  useEffect(() => {
    handleResize();
  }, []);

  return (
    <div className="modal-overlay" onClick={toggleModal}>
      <div className="trailer">
        <YouTube videoId={url} onReady={onReady} opts={opts} />
        {playerReady && (
          <div className="close-btn" onClick={toggleModal}>
            <i class="fa-sharp fa-solid fa-xmark"></i>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrailerOverlay;
