import React from 'react';
import Footer from './Footer';
import NewEvents from './NewEvents';
import Eve from './Eve';

export default function Landing() {
  return (
    <>
      <header className="header">
        <div className="container">
          <div className="row">
            <div className="col-lg-2 col-md-2">
              <div className="header__logo">
                <h1 style={{ fontFamily: "Lucida Handwriting", fontSize: '3rem', color:'wheat' }}>MUzi</h1>
              </div>
            </div>
            <div className="col-lg-10 col-md-10">
              <div className="header__nav">
                <nav className="header__menu mobile-menu">
                  <ul>
                    <li className="active"><a href="/">Home</a></li>
                    <li><a href=""></a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/"></a></li>
                    <li><a href="/contact">Contact</a></li>
                    
                    <li><a href="/login">Login</a></li>
                  </ul>
                </nav>
                <div className="header__right__social">
                  <a href="#"><i className="fa-brands fa-facebook"></i></a>
                  <a href="#"><i className="fa-brands fa-twitter"></i></a>
                  <a href="#"><i className="fa-brands fa-instagram"></i></a>
                  <a href="#"><i className="fa-brands fa-dribbble"></i></a>
                </div>
              </div>
            </div>
          </div>
          <div id="mobile-menu-wrap"></div>
        </div>
      </header>

      <section className="hero spad set-bg" data-setbg="assets/img/hero-bg.png" style={{ backgroundImage: 'url(assets/img/hero-bg.png)' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="hero__text">
                <span>New single</span>
                <h1>Feel the heart beats</h1>
                <p>Muzi instantly delivers cutting-edge design projects and news each time a new tab is open in your browser <br />Music is the arrangement of sound to create some combination of form, harmony, melody, rhythm, or otherwise expressive content.</p>
                <a href="https://www.youtube.com" className="play-btn video-popup"><i className="fa fa-play"></i></a>
              </div>
            </div>
          </div>
        </div>
        <div className="linear__icon">
          <i className="fa fa-angle-double-down"></i>
        </div>
      </section>

      <section className="track spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-7">
              <div className="section-title">
                {/* <h2>Latest tracks</h2> */}
                <h1>Latest tracks</h1>
              </div>
            </div>
            <div className="col-lg-5">
             
            </div>
          </div>
          <div className="row">
            <div className="col-lg-7 p-0">
              <div className="track__content nice-scroll">
                {['1', '2', '3', '4', '5', '6'].map((track) => (
                  <div className="single_player_container" key={track}>
                    <h4 style={{color:"whitesmoke"}}>David Guetta Miami Ultra</h4>
                    <div className={`jp-jplayer jplayer`} data-ancestor={`.jp_container_${track}`} data-url={`music-files/${track}.mp3`}></div>
                    <div className={`jp-audio jp_container_${track}`} role="application" aria-label="media player">
                      <div className="jp-gui jp-interface">
                        <div className="player_controls_box">
                          <button className="jp-play player_button" tabIndex="0"></button>
                        </div>
                        <div className="player_bars">
                          <div className="jp-progress">
                            <div className="jp-seek-bar">
                              <div>
                                <div className="jp-play-bar">
                                  <div className="jp-current-time" role="timer" aria-label="time" style={{color:"whitesmoke"}}>0:00</div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="jp-duration ml-auto" role="timer" aria-label="duration" style={{color:"whitesmoke"}}>00:00</div>
                        </div>
                        <div className="jp-volume-controls">
                          <button className="jp-mute" tabIndex="0"><i className="fa fa-volume-down" style={{color:"whitesmoke"}}></i></button>
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
                <img src="assets/img/track-right.jpg" alt=""/>
              </div>
            </div>
          </div>
        </div>
      </section>
<Eve/>
      {/* <section className="countdown spad set-bg" data-setbg="assets/img/countdown-bg.jpg">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="countdown__text">
                        <h1>Tomorrowland 2024</h1>
                        <h4>Music festival</h4>
                    </div>
                    <div className="countdown__timer" id="countdown-time" style={{fontSize:"large"}}>
                    A song is a musical composition performed by the human voice. The voice often carries the melody (a series of distinct and fixed pitches) using patterns of sound and silence. Songs have a structure to them, such as the common ABA form, and are usually made of sections that are repeated or performed with variation later. A song without instruments is said to be a cappella.Written words created specifically for music, or for which music is specifically created, are called lyrics. If a pre-existing poem is set to composed music in classical music, it is an art song. Songs that are sung on repeated pitches without distinct contours and patterns that rise and fall are called chants. Songs composed in a simple style that are learned informally "by ear" are often referred to as folk songs. Songs composed for the mass market, designed to be sung by professional singers who sell their recordings or live shows, are called popular songs. These songs, which have broad appeal, are often composed by professional songwriters, composers, and lyricists; art songs are composed by trained classical composers for concert or recital performances. Songs are performed in studios and an audio recording is made, or they are performed "live" for audience. (In some cases a song may be performed live and simultaneously recorded.) Songs may also appear in theatre (e.g., opera), films and TV shows.
                    </div>
                    
                </div>
            </div>
        </div>
      </section> */}

      <Footer/>
    </>
  );
}
