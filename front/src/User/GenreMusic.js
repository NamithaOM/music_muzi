import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Head from './Head';
import Footer from './Footer';

export default function GenreMusic() {
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('userdata')));
  const [matched, setMatched] = useState([]);
  const [playingIndex, setPlayingIndex] = useState(null);
  const [playingMusic, setPlayingMusic] = useState('');
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const genreId = queryParams.get('genreId');

  useEffect(() => {
    if (auth) {
      fetchMusicList();
    }
  }, [auth, genreId]);

  const fetchMusicList = () => {
    let params = {
      id: auth._id,
      genre: genreId,
    };
    fetch("http://localhost:3005/artist/viewmatched", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })
      .then((res) => res.json())
      .then((result) => {
        if (auth.payment === 0) {
          const freeMusic = result.filter((music) => music.priceType === 'free');
          setMatched(freeMusic);
        } else {
          setMatched(result);
        }
      })
      .catch((error) => {
        console.error('Error fetching music:', error);
      });
  };

  const playMusic = (musicFile, index) => {
    const musicUrl = `http://localhost:3005/music/${musicFile}`;
    setPlayingMusic(musicUrl);
    setPlayingIndex(index);
  };

  return (
    <>
      <Head />
      <section className="track spad mb-5 mt-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-7">
              <div className="section-title">
                <h1>Trending tracks</h1>
              </div>
            </div>
            <div className="col-lg-5"></div>
          </div>
          <div className="row">
            <div className="col-lg-7 p-0">
              <div className="track__content nice-scroll">
                {matched.map((fav, index) => (
                  <div className="single_player_container" key={fav._id}>
                    <h4 style={{ color: "whitesmoke" }}>{fav.musicname}</h4>
                    <div className={`jp-jplayer jplayer`} data-ancestor={`.jp_container_${fav._id}`} data-url={`music-files/${fav.music}.mp3`}></div>
                    <div className={`jp-audio jp_container_${fav._id}`} role="application" aria-label="media player">
                      <div className="jp-gui jp-interface">
                        <div className="player_controls_box">
                       
                          <button onClick={() => playMusic(fav.music, index)}
                            className="jp-play player_button" tabIndex="0"></button>
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
                    {playingIndex === index && (
                    <audio controls autoPlay src={playingMusic} style={{ width: '100%', marginTop: '10px' }}>
                      Your browser does not support the audio element.
                    </audio>
                  )}
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
