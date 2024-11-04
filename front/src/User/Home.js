import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Genres from './Genres';
import Footer from './Footer';

export default function Home() {
    const navigate = useNavigate();
    const [musics, setMusics] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [playingMusic, setPlayingMusic] = useState(null);
    const [playingIndex, setPlayingIndex] = useState(null);
    const [images, setImages] = useState([]);
    const [refresh, setRefresh] = useState(0);
    const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("userdata")));

    const logout = () => {
        localStorage.clear();
        setTimeout(() => {
            navigate('/');
            window.location.reload();
        }, 100);
    }

    useEffect(() => {
        fetch("http://localhost:3005/Artist/viewMusics")
            .then((res) => res.json())
            .then((result) => {
                setMusics(result);
            })
            .catch((error) => {
                console.error('Error fetching music:', error);
            });
    }, []);

    useEffect(() => {
        fetch("http://localhost:3005/genre/viewAdds")
            .then((res) => res.json())
            .then((result) => {
                setImages(result);
            });
    }, [refresh]);

    const playMusic = (musicFile) => {
        setPlayingMusic(`http://localhost:3005/music/${musicFile}`);
    };

    // const handleSubscribe = () => {
    //     let params = {
    //         id: auth._id
    //     };
    //     fetch('http://localhost:3005/Registration/updatePaymentStatus', {
    //         method: 'post',
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(params)
    //     }).then((res) => res.json()).then((result) => {
    //         console.log(result);
    //     });
    // };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredMusics = musics.filter(music =>
        music.musicname.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <header className="header">
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
                                        <li><a href="/payment">Subscribe</a></li>
                                        <li><a href="/profile">Profile</a></li>
                                        {/* <li><a href="/favorites">Favorites</a></li> */}
                                        <li><a href="/newevent">Events</a></li>
                                        <li><a href="/share">Shared list</a></li>
                                        <li><a href='/' onClick={logout}>Logout</a></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <div id="mobile-menu-wrap"></div>
                </div>
            </header>
            <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel" style={{ marginTop: "150px" }}>
                <ol className="carousel-indicators">
                    {images.map((image, index) => (
                        <li key={index} data-target="#carouselExampleIndicators" data-slide-to={index} className={index === 0 ? "active" : ""}></li>
                    ))}
                </ol>
                <div className="carousel-inner">
                    {images.map((image, index) => (
                        <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                            <img className="d-block w-100" src={`http://localhost:3005/adds/${image.image}`} alt={`Slide ${index}`} style={{ height: "500px" }} />
                        </div>
                    ))}
                </div>
                <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
            <Genres />

            <section className="track spad mb-5 mt-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7">
                            <div className="section-title">
                                <h1>Trending tracks</h1>
                            </div>
                        </div>

                    </div>
                    <div className="row">
                        <div className="col-lg-5 m-5">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search by music name..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                                style={{ border: '1px solid white' }} // Inline style for white border
                            />
                        </div>
                        <div className="col-lg-7 p-0">
                            <div className="track__content nice-scroll">
                                {filteredMusics.map((fav) => (
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
