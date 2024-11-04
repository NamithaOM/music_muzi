import React from 'react'
import Footer from './Footer'

export default function About() {
  return (
    <div>

<header className="header mb-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-2 col-md-2">
                            <div className="header__logo">
                                <h1 style={{ fontFamily: "Lucida Handwriting", fontSize: '3rem', color: 'wheat' }}>MUzi</h1>
                            </div>
                        </div>
                        <div className="col-lg-10 col-md-10">
                            <div className="header__nav">
                                <nav className="header__menu mobile-menu">
                                    <ul>
                                        <li className="active"><a href="/">Home</a></li>
                                        <li><a href="/about">About</a></li>
                                        <li><a href="/contact">Contact</a></li>
                                        <li><a href="./tours.html"></a></li>
                                        <li><a href="/login" >Login</a></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <div id="mobile-menu-wrap"></div>
                </div>
            </header>


    <section class="about about--page spad mt-5">
        <div class="container">
            <div class="row">
                <div class="col-lg-6">
                    <div class="about__pic">
                        <img src="assets/img/about/about.png" alt=""/>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="about__text">
                        <div class="section-title">
                            <h2 style={{color:"white"}}>He heard something that he knew to be music</h2>
                        </div>
                        <p style={{color:"white"}}>A digital music store is a business that sells digital audio files of music recordings over the Internet. Customers gain ownership of a license to use the files, in contrast to a music streaming service, where they listen to recordings without gaining ownership. Customers pay either for each recording or on a subscription basis.</p>
                        <img src="assets/img/about/signature.png" alt=""/>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
<section class="skills spad">
        <div class="container">
            <div class="row">
                <div class="col-lg-6 p-0">
                    <div class="skills__content">
                        <div class="section-title">
                            <h2>DJ Alexandra Rud</h2>
                            <h1>DJ’s skill</h1>
                        </div>
                        <p>DJ Rainflow knows how to move your mind, body and soul by delivering tracks that stand out
                            from the norm.</p>
                        <div class="skill__bar__item">
                            <p>Perform</p>
                            <div id="bar1" class="barfiller">
                                <span class="tip"></span>
                                <span class="fill" data-percentage="95"></span>
                            </div>
                        </div>
                        <div class="skill__bar__item">
                            <p>Use Midi</p>
                            <div id="bar2" class="barfiller">
                                <span class="tip"></span>
                                <span class="fill" data-percentage="85"></span>
                            </div>
                        </div>
                        <div class="skill__bar__item">
                            <p>Remix and mash up</p>
                            <div id="bar3" class="barfiller">
                                <span class="tip"></span>
                                <span class="fill" data-percentage="98"></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 p-0">
                    <div class="skills__video set-bg" data-setbg="assets/img/skill-video.jpg">
                        <a href="https://www.youtube.com" class="play-btn video-popup"><i class="fa fa-play"></i></a>
                    </div>
                </div>
            </div>
        </div>
    </section>

   <Footer/>
    </div>
  )
}
