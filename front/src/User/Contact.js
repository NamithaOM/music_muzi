import React from 'react'

export default function Contact() {
  return (
    <div>  <header className="header">
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

        <section class="contact spad" style={{marginTop:"100px"}}>
    <div class="container">
        <div class="row">
            <div class="col-lg-4">
                <div class="contact__address">
                    <div class="section-title">
                        <h2 style={{color:"wheat"}}>Contact info</h2>
                    </div>
                    <p>The realization of the market for downloadable music grew widespread with the development of Napster, a music and file sharing service created by Shawn Fanning that made a major impact on the Internet scene in 2000</p>
                    <ul>
                        <li>
                            <i class="fa fa-map-marker"></i>
                            <h5 style={{color:"wheat"}}>Address</h5>
                            <p>Los Angeles Gournadi, 1230 Bariasl</p>
                        </li>
                        <li>
                            <i class="fa fa-phone"></i>
                            <h5 style={{color:"wheat"}}>Hotline</h5>
                            <span style={{color:"wheat"}}>1-677-124-44227</span>
                            <span style={{color:"wheat"}}>1-688-356-66889</span>
                        </li>
                        <li>
                            <i class="fa fa-envelope"></i>
                            <h5  style={{color:"wheat"}}>Email</h5>
                            <p  style={{color:"wheat"}} >MUzi@gamail.com</p>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="col-lg-8">
                <div class="contact__form">
                    <div class="section-title">
                        <h2  style={{color:"wheat"}}>Get in touch</h2>
                    </div>
                    <p>The first free, high-fidelity online music archive of downloadable songs on the Internet was the Internet Underground Music Archive (IUMA),[1] which was started by Rob Lord, Jeff Patterson and Jon Luini from the University of California </p>
                    <form action="#">
                        <div class="input__list">
                            <input type="text" placeholder="Name"/>
                            <input type="text" placeholder="Email"/>
                            <input type="text" placeholder="Website"/>
                        </div>
                        <textarea placeholder="Comment"></textarea>
                        <button type="submit" class="site-btn">SEND MESSAGE</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</section>
<footer className="footer spad set-bg fixed-bottom" data-setbg="assets/img/footer-bg.png" style={{marginTop:"100px",marginBottom:"0px"}}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-6">
                            <div className="footer__address">
                                <ul>
                                    <li>
                                        <i className="fa fa-phone"></i>
                                        <p>Phone</p>
                                        <h6>1-677-124-44227</h6>
                                    </li>
                                    <li>
                                        <i className="fa fa-envelope"></i>
                                        <p>Email</p>
                                        <h6>DJ.muzi@gmail.com</h6>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-4 offset-lg-1 col-md-6">
                            <div className="footer__social">
                                <h2>MUzi</h2>
                                <div className="footer__social__links">
                                    <a href="#"><i className="fa-brands fa-facebook"></i></a>
                                    <a href="#"><i className="fa-brands fa-twitter"></i></a>
                                    <a href="#"><i className="fa-brands fa-instagram"></i></a>
                                    <a href="#"><i className="fa-brands fa-dribbble"></i></a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 offset-lg-1 col-md-6">
                            <div className="footer__newslatter">
                                <h4 style={{color:"wheat"}}>Stay With me</h4>
                                <form action="#">
                                    <input type="text" placeholder="Email" />
                                    <button type="submit"><i className="fa fa-send-o"></i></button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
</div>
  )
}
