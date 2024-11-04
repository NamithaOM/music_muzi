import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Genres() {
  const [genres, setGenres] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3005/genre/generview")
      .then((res) => res.json())
      .then((result) => {
        setGenres(result);
      });
  }, []);

  const handleGenreClick = (genreId) => {
    navigate(`/genremusic?genreId=${genreId}`);
  };

  return (
    <section className="youtube spad" style={{ marginTop: "20px", marginBottom: "10px" }}>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title">
              <h1>Genres</h1>
            </div>
          </div>
        </div>
        <div className="row mt-4">
          {genres.map((data, index) => (
            <div className="col-lg-4 col-md-6 col-sm-6" key={index} onClick={() => handleGenreClick(data._id)}>
              <div className="youtube__item">
                <div
                  className="youtube__item__pic"
                  style={{ backgroundImage: 'url(/img/logs/lll.jpg)' }}
                >
                  <a href="#" className="play-btn video-popup">
                    <i className="fa fa-play"></i>
                  </a>
                </div>
                <div className="youtube__item__text">
                  <h4>{data.genre}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
