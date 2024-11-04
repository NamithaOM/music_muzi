import React, { useState, useEffect } from 'react';
import Head from './Head';
import Footer from './Footer';
import FriendsList from './FriendsList';

const ShareList = () => {
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('userdata')));
  const [musics, setMusics] = useState([]);
  console.log(musics,"musics")
  const [playingMusic, setPlayingMusic] = useState(null);
  const [playingIndex, setPlayingIndex] = useState(null);

  useEffect(() => {
    if (auth && auth._id) {
      fetchMusicList();
    }
  }, [auth]);

  const fetchMusicList = () => {
    let params = {
      id: auth._id,
    };
    fetch('http://localhost:3005/user/sharelist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })
      .then((res) => res.json())
      .then((result) => {
        setMusics(result);
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

  const handlePlayPause = (musicFile, index) => {
    if (playingIndex === index) {
      setPlayingMusic(null);
      setPlayingIndex(null);
    } else {
      playMusic(musicFile, index);
    }
  };

  return (
    <>
      <Head />
      <FriendsList/>
      <section className="track spad mb-5 mt-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-7">
              <div className="section-title">
                <h1>Shared tracks</h1>
              </div>
            </div>
            <div className="col-lg-5"></div>
          </div>
          <div className="row">
            <div className="col-lg-7 p-0">
              <div className="track__content nice-scroll">
                {musics.map((track, index) => (
                  <div className="single_player_container" key={track._id}>
                    <h4 style={{ color: 'whitesmoke' }}>{track.musicname}</h4>
                    <div className={`jp-jplayer jplayer`} data-ancestor={`.jp_container_${track._id}`} data-url={`music-files/${track._id}.mp3`}></div>
                    <div className={`jp-audio jp_container_${track._id}`} role="application" aria-label="media player">
                      <div className="jp-gui jp-interface">
                        <div className="player_controls_box">
                          <button
                            className="jp-play player_button"
                            tabIndex="0"
                            onClick={() => playMusic(track.music, index)}

                            //  onClick={() => handlePlayPause(track._id, index)} 
                          >
                            {playingIndex === index ? 'Pause' : 'Play'}
                          </button>
                        </div>
                        <div className="player_bars">
                          <div className="jp-progress">
                            <div className="jp-seek-bar">
                              <div>
                                <div className="jp-play-bar">
                                  <div className="jp-current-time" role="timer" aria-label="time" style={{ color: 'whitesmoke' }}>0:00</div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="jp-duration ml-auto" role="timer" aria-label="duration" style={{ color: 'whitesmoke' }}>00:00</div>
                        </div>
                        <div className="jp-volume-controls">
                          <button className="jp-mute" tabIndex="0"><i className="fa fa-volume-down" style={{ color: 'whitesmoke' }}></i></button>
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
      <audio controls src={playingMusic} autoPlay style={{ display: playingMusic ? 'block' : 'none' }}>
        Your browser does not support the audio element.
      </audio>
      <Footer />
    </>
  );
};

export default ShareList;
