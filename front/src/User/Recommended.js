import React, { useState, useEffect, useRef } from 'react';
import Head from './Head';
import Footer from './Footer';

const Recommended = () => {
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('userdata')));
  const [musics, setMusics] = useState([]);
  const [playingMusic, setPlayingMusic] = useState(null);
  const [playingIndex, setPlayingIndex] = useState(null);
  const [recommendedMusics, setRecommendedMusics] = useState([]);
  const audioRef = useRef(null);

  useEffect(() => {
    if (auth && auth._id) {
      const params = { userId: auth._id };

      fetch('http://localhost:3005/artist/playbackList', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      })
        .then(res => res.json())
        .then(result => {
          setMusics(result);

          fetch('http://localhost:3005/artist/recommendations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(params),
          })
            .then(res => res.json())
            .then(recommendedResult => {
              console.log(recommendedResult, "recommandedmusics");
              setRecommendedMusics(recommendedResult);
            })
            .catch(error => console.error('Error fetching recommendations:', error));
        })
        .catch(error => console.error('Error fetching playback list:', error));
    }
  }, [auth]);

  const playMusic = (musicFile, index) => {
    const musicUrl = `http://localhost:3005/music/${musicFile}`;
    if (playingMusic === musicUrl) {
      // Stop playback
      audioRef.current.pause();
      setPlayingMusic(null);
    } else {
      // Change the audio source and start playback
      setPlayingMusic(musicUrl);
      setPlayingIndex(index);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      if (playingMusic) {
        audioRef.current.src = playingMusic;
        audioRef.current.play();
      } else {
        audioRef.current.pause();
        audioRef.current.src = ''; // Clear the audio source
      }
    }
  }, [playingMusic]);

  return (
    <>
         <section className="track spad  mt-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-7">
              <div className="section-title">
                <h1>Recommended</h1>
              </div>
            </div>
            <div className="col-lg-5"></div>
          </div>
          <div className="row">
            <div className="col-lg-7 p-0">
            
              <div className="track__content nice-scroll">
                {recommendedMusics.map((track, index) => (
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
                          >
                            {playingMusic === `http://localhost:3005/music/${track.music}` ? 'Pause' : 'Play'}
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
      <audio
        ref={audioRef}
        controls
        style={{ display: 'none' }}
        onError={(e) => console.error('Error playing audio:', e)}
      >
        Your browser does not support the audio element.
      </audio>
    </>
  );
};

export default Recommended;




 {/* All Music Tracks Section */}
            {/* <div className="col-lg-6 p-0">
              <div className="section-title">
                <h2 className='text-white'>Play List</h2>
              </div>
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
            </div> */}

// import React, { useState, useEffect } from 'react';
// import Head from './Head';
// import Footer from './Footer';

// const Recommended = () => {
//   const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('userdata')));
//   const [musics, setMusics] = useState([]);
//   const [playingMusic, setPlayingMusic] = useState(null);
//   const [playingIndex, setPlayingIndex] = useState(null);
//   const [playlist, setPlaylist] = useState([]);
//   const [similarMusics, setSimilarMusics] = useState([]);
//   const [musiclist, setMusicslist] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:3005/artist/viewMusic")
//         .then((res) => res.json())
//         .then((result) => {
//             // console.log(result);
//             setMusicslist(result);
//         })
//         .catch((error) => {
//             console.error('Error fetching music:', error);
//         });
// });

// useEffect(() => {
//   if (auth && auth._id) {
//     const params = { userId: auth._id };

//     fetch('http://localhost:3005/artist/playbackList', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(params),
//     })
//       .then((res) => res.json())
//       .then((result) => {
//         console.log(result, "playlist");
//         setMusics(result);
//       })
//       .catch((error) => console.error('Error fetching music:', error));
//   }
// }, [auth]); 

// const playMusic = (musicFile, index) => {
//   const musicUrl = `http://localhost:3005/music/${musicFile}`;
//   setPlayingMusic(musicUrl);
//   setPlayingIndex(index);
// };

//   return (
//     <>
//       <Head />
//       <section className="track spad mb-5 mt-5">
//         <div className="container">
//           <div className="row">
//             <div className="section-title" style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
//               <h1
//                 className="text-white"
//                 style={{
//                   display: 'inline-block',
//                   animation: 'marquee 10s linear infinite',
//                 }}
//               >
//                 Unlimited Music with MUzi
//               </h1>
//             </div>
//           </div>
//           <div className="row">
//             <div className="col-lg-6 p-0">
//               <div className="section-title">
//                 <h2 className='text-white'>Recommended tracks</h2>
//               </div>
//               <div className="track__content nice-scroll">
//                 {musics.map((track, index) => (
//                   <div className="single_player_container" key={track._id}>
//                     <h4 style={{ color: 'whitesmoke' }}>{track.musicname}</h4>
//                     <div className={`jp-jplayer jplayer`} data-ancestor={`.jp_container_${track._id}`} data-url={`music-files/${track._id}.mp3`}></div>
//                     <div className={`jp-audio jp_container_${track._id}`} role="application" aria-label="media player">
//                       <div className="jp-gui jp-interface">
//                         <div className="player_controls_box">
//                           <button
//                             className="jp-play player_button"
//                             tabIndex="0"
//                             onClick={() => playMusic(track.music, index)}
//                           >
//                             {playingIndex === index ? 'Pause' : 'Play'}
//                           </button>
//                         </div>
//                         <div className="player_bars">
//                           <div className="jp-progress">
//                             <div className="jp-seek-bar">
//                               <div>
//                                 <div className="jp-play-bar">
//                                   <div className="jp-current-time" role="timer" aria-label="time" style={{ color: 'whitesmoke' }}>0:00</div>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                           <div className="jp-duration ml-auto" role="timer" aria-label="duration" style={{ color: 'whitesmoke' }}>00:00</div>
//                         </div>
//                         <div className="jp-volume-controls">
//                           <button className="jp-mute" tabIndex="0"><i className="fa fa-volume-down" style={{ color: 'whitesmoke' }}></i></button>
//                           <div className="jp-volume-bar">
//                             <div className="jp-volume-bar-value" style={{ width: '0%' }}></div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <div className="col-lg-6 p-0">
//               <div className="section-title">
//                 <h2 className='text-white'>Play List</h2>
//               </div>
//               <div className="track__content nice-scroll">
//                 {musics.map((track, index) => (
//                   <div className="single_player_container" key={track._id}>
//                     <h4 style={{ color: 'whitesmoke' }}>{track.musicname}</h4>
//                     <div className={`jp-jplayer jplayer`} data-ancestor={`.jp_container_${track._id}`} data-url={`music-files/${track._id}.mp3`}></div>
//                     <div className={`jp-audio jp_container_${track._id}`} role="application" aria-label="media player">
//                       <div className="jp-gui jp-interface">
//                         <div className="player_controls_box">
//                           <button
//                             className="jp-play player_button"
//                             tabIndex="0"
//                             onClick={() => playMusic(track.music, index)}
//                           >
//                             {playingIndex === index ? 'Pause' : 'Play'}
//                           </button>
//                         </div>
//                         <div className="player_bars">
//                           <div className="jp-progress">
//                             <div className="jp-seek-bar">
//                               <div>
//                                 <div className="jp-play-bar">
//                                   <div className="jp-current-time" role="timer" aria-label="time" style={{ color: 'whitesmoke' }}>0:00</div>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                           <div className="jp-duration ml-auto" role="timer" aria-label="duration" style={{ color: 'whitesmoke' }}>00:00</div>
//                         </div>
//                         <div className="jp-volume-controls">
//                           <button className="jp-mute" tabIndex="0"><i className="fa fa-volume-down" style={{ color: 'whitesmoke' }}></i></button>
//                           <div className="jp-volume-bar">
//                             <div className="jp-volume-bar-value" style={{ width: '0%' }}></div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//       <Footer />
//     </>
//   );
// };

// export default Recommended;
