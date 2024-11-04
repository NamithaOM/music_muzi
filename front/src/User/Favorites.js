import React, { useEffect, useState } from 'react';
import Head from './Head';
import Footer from './Footer';
import Follow from './Follow';

export default function Favorites() {
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('userdata')));
  const [favorite, setFavorites] = useState([]);

  useEffect(() => {
    if (auth) {
      fetchMusicList();
    }
  }, [auth]);

  const fetchMusicList = () => {
    let params = {
      id: auth._id,
    };
    fetch("http://localhost:3005/user/viewfavorite", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })
    .then((res) => res.json())
    .then((result) => {
      setFavorites(result);
    })
    .catch((error) => {
      console.error('Error fetching music:', error);
    });
  };

  const playMusic = (musicFile, index) => {
    const musicUrl = `http://localhost:3005/music/${musicFile}`;
    // Logic to play music
  };

  return (
    <>
      <Head />
      <section className="track spad mb-5 mt-5">
        <Follow/>
        <div className="container mt-5">
          <div className="row">
            <div className="col-lg-7">
              <div className="section-title">
                <h1>Favorites tracks</h1>
              </div>
            </div>
            <div className="col-lg-5"></div>
          </div>
          <div className="row">
            <div className="col-lg-7 p-0">
              <div className="track__content nice-scroll">
                {favorite.map((fav) => (
                  <div className="single_player_container" key={fav._id}>
                    <h4 style={{ color: "whitesmoke" }}>{fav.musicname}</h4>
                    <div className={`jp-jplayer jplayer`} data-ancestor={`.jp_container_${fav._id}`} data-url={`music-files/${fav.music}.mp3`}></div>
                    <div className={`jp-audio jp_container_${fav._id}`} role="application" aria-label="media player">
                      <div className="jp-gui jp-interface">
                        <div className="player_controls_box">
                          <button className="jp-play player_button" tabIndex="0"></button>
                        </div>
                        <div className="player_bars">
                          <div className="jp-progress">
                            <div className="jp-seek-bar">
                              <div>
                                <div className="jp-play-bar">
                                  <div className="jp-current-time" role="timer" aria-label="time" style={{ color: "whitesmoke" }}>0:00</div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="jp-duration ml-auto" role="timer" aria-label="duration" style={{ color: "whitesmoke" }}>00:00</div>
                        </div>
                        <div className="jp-volume-controls">
                          <button className="jp-mute" tabIndex="0"><i className="fa fa-volume-down" style={{ color: "whitesmoke" }}></i></button>
                          <div className="jp-volume-bar">
                            <div className="jp-volume-bar-value" style={{ width: '0%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-lg-5 p-0">
              <div className="track__pic">
                <img src="assets/img/track-right.jpg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
