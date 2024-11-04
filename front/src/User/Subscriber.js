import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Head from './Head';
import Footer from './Footer';
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import './Sub.css';
import Genres from './Genres';
import Recommended from './Recommended';

export default function Subscriber() {
    const navigate = useNavigate();
    const [musics, setMusics] = useState([]);
    const [playingMusic, setPlayingMusic] = useState(null);
    const [playingIndex, setPlayingIndex] = useState(null);
    const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("userdata")));
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [sharingMusic, setSharingMusic] = useState(null); // State for the music being shared
    const [searchQuery, setSearchQuery] = useState('');
    const [comment, setComment] = useState();
    const [messageIndex, setMessageIndex] = useState(null);
    // console.log(auth);
   const userId = auth._id
    useEffect(() => {
        fetchMusicList();
    }, []);

    const fetchMusicList = () => {
        fetch("http://localhost:3005/artist/viewMusic")
            .then((res) => res.json())
            .then((result) => {
                setMusics(result);
            })
            .catch((error) => {
                console.error('Error fetching music:', error);
            });
    };

    useEffect(() => {
        if (!auth) return; // Prevent fetch if auth is null
        const userId = { userid: auth._id };
    
        fetch('http://localhost:3005/user/viewfriends', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userId)
        })
          .then((res) => res.json())
          .then((result) => {
            setUsers(result);
          })
          .catch(error => console.error('Error fetching friends:', error));
      }, [auth]);

   

    // const playMusic = (musicFile, index) => {
    //     const musicUrl = `http://localhost:3005/music/${musicFile}`;
    //     setPlayingMusic(musicUrl);
    //     setPlayingIndex(index);
    // };

    const playMusic = async (musicFile, index, musicId) => {
        const musicUrl = `http://localhost:3005/music/${musicFile}`;
        setPlayingMusic(musicUrl);
        setPlayingIndex(index);
    
        try {
          const response = await fetch('http://localhost:3005/artist/playback', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId,
              musicId
            }),
          });
    
          if (!response.ok) {
            throw new Error('Failed to save playback information');
          }
    
          const data = await response.json();
        } catch (error) {
          console.error('Error saving playback information:', error);
        }
      };

    const addFavorite = (musicItem) => {
        const params = {
            musicid: musicItem._id,
            artistid: musicItem.artistId,
            music: musicItem.music,
            musicname: musicItem.musicname,
            userId: auth._id,
            customeremail: auth.email,
            customername: auth.company?.name // added optional chaining
        };

        fetch('http://localhost:3005/user/addfavorites', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Failed to add music to favorites');
                }
                return res.json();
            })
            .then((result) => {
                alert('Music added to favorites successfully!');
            })
            .catch((error) => {
                alert('Failed to add music to favorites.');
            });
    };

    const downloadMusic = (musicItem) => {
        const musicUrl = `http://localhost:3005/music/${musicItem.music}`;
        const anchor = document.createElement('a');
        anchor.href = musicUrl;
        anchor.download = musicItem.musicname;
        anchor.click();
    };

    const handleUserSelect = (event) => {
        const { options } = event.target;
        const selected = [];
        for (let i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                // Find the selected user and push their friend's user ID to selectedUsers
                const selectedUser = users.find(user => user._id === options[i].value);
                if (selectedUser) {
                    selected.push(selectedUser.friendid.userid); // Use friendid.userid
                }
            }
        }
        setSelectedUsers(selected);
    };
    

    const shareMusic = () => {
        if (!sharingMusic) return;

        const params = {
            musicDetails: {
                musicid: sharingMusic._id,
                artistid: sharingMusic.artistId,
                music: sharingMusic.music,
                musicname: sharingMusic.musicname,
                userId: auth._id,
                customeremail: auth.email,
                customername: auth.company?.name
            },
            selectedUsers: selectedUsers
        };

        fetch('http://localhost:3005/user/share', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Failed to share music');
                }
                return res.json();
            })
            .then((result) => {
                alert('Music shared successfully!');
                setSharingMusic(null); // Reset sharing music
                setSelectedUsers([]); // Reset selected users
            })
            .catch((error) => {
                alert('Failed to share music.');
            });
    };

    const [showCommentBox, setShowCommentBox] = useState(false);
    const [message, setMessage] = useState('');

    const commentMusics = (musicItem) => {
        const params = {
            musicDetails: {
                musicid: musicItem._id,
                artistid: musicItem.artistId,
                comment: comment,
                music: musicItem.music,
                musicname: musicItem.musicname,
                userId: auth._id,
                customeremail: auth.email,
                customername: auth.company?.name
            },
        };

        fetch('http://localhost:3005/user/addcomment', {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        })
            .then((res) => res.json())
            .then((result) => {
                // console.log(result);
                alert('Comment added successfully');    
                setShowCommentBox(false);
                setComment('');
                // Optionally navigate or perform other actions
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Failed to add comment');
            });
    }

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredMusics = musics.filter(music =>
        music.musicname.toLowerCase().includes(searchQuery.toLowerCase())
    );
   
    
    return (
        <>
            <Head />
            <Recommended/>

            <Genres />

            <section className="track spad" style={{ marginTop: "20px", marginBottom: "10px" }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7">
                            <div className="section-title">
                                <h1>Latest tracks</h1>
                            </div>
                        </div>
                        {/* <div className="col-lg-5 m-5">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search by music name..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                                style={{ border: '1px solid white' }} // Inline style for white border
                            />
                        </div> */}

<div className="col-lg-5 m-5" style={{ position: 'relative', display: 'inline-block' }}>
  <input
    type="text"
    className="form-control"
    placeholder="Search by music name..."
    value={searchQuery}
    onChange={handleSearchChange}
    style={{ border: '1px solid white', paddingRight: '30px' }} 
  />
  <span className="search-icon me-3" style={{
    position: 'absolute',
    right: '10px', 
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: '20px',
    color: 'white'
  }}>
    🔍
  </span>
</div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 p-0">
                            <div className="track__content nice-scroll">
                                {filteredMusics.map((item, index) => (
                                    <div className="single_player_container" key={index} style={{ marginBottom: '20px' }}>
                                        <h4 style={{ color: "whitesmoke" }}>{item.musicname}</h4>
                                        {/* <p>{item.music}</p> */}
                                        <div className="player_controls">
                                            <button className="jp-play player_button"
                                                style={{ cursor: 'pointer', color: 'white', fontSize: '1.5rem' }}
                                                onClick={() => playMusic(item.music, index, item._id)}>

                                                {/* onClick={() => playMusic(item.music, index)}> */}
                                                <i className="fa fa-play"></i>
                                            </button>
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
                                            <div className="icon-container" style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                                                <button className='icon-button' onClick={() => addFavorite(item)}>
                                                    <i className="fa fa-heart" style={{ color: "red" }}></i>
                                                </button>
                                                <button className='icon-button' onClick={() => setSharingMusic(item)}>
                                                    <i className="fa fa-share" style={{ color: "white" }}></i>
                                                </button>
                                                <button className='icon-button' onClick={() => downloadMusic(item)}>
                                                    <i className="fa fa-download" style={{ color: "blue" }}></i>
                                                </button>
                                                <button className='icon-button' onClick={() => setShowCommentBox(showCommentBox === index ? null : index)}>
                                                    <i className="fa fa-comment" style={{ color: "yellow" }}></i>
                                                </button>
                                                {showCommentBox === index && (
                                                    <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                                        <input
                                                            type="text"
                                                            value={comment}
                                                            onChange={(e) => setComment(e.target.value)}
                                                            placeholder="Enter your comment"
                                                            style={{ padding: '5px', borderRadius: '5px', border: '1px solid #ddd' }}
                                                        />
                                                        <button 
                                                            onClick={() => commentMusics(item, index)}
                                                            style={{ backgroundColor: '#5C2FC2', color: 'white', border: 'none', borderRadius: '5px', padding: '5px 10px' }}
                                                        >
                                                            Submit Comment
                                                        </button>
                                                    </div>
                                                )}
                                                {messageIndex === index && <div>Comment added successfully</div>}
                                            </div>
                                            {playingIndex === index && (
                                                <audio controls autoPlay src={playingMusic} style={{ width: '100%', marginTop: '10px' }}>
                                                    Your browser does not support the audio element.
                                                </audio>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="col-lg-6 p-0">
                            <div className="track__pic">
                                <img src="assets/img/about/2034851.jpg" alt="" />
                            </div>
                            {sharingMusic && (
                                <div className='mt-5'>
                                    <h3 style={{ color: "whitesmoke" }}>Select Users to Share With:</h3>
                                    <select
                                        multiple
                                        name='users'
                                        id="form2Example1"
                                        className="form-control custom-select-box"
                                        onChange={handleUserSelect}
                                    >
                                        {users.map((data, index) => (
                                            <option key={index} value={data._id}>😊 &nbsp; {data.friendid.name}</option>
                                        ))}
                                    </select>
                                    <button 
                                        onClick={shareMusic}
                                        style={{ backgroundColor: '#5C2FC2', color: 'white', border: 'none', borderRadius: '5px', padding: '10px 10px', margin: "20px 0" }}
                                    >
                                        Share
                                    </button>
                                    <div>
                                        <h4 style={{ color: "whitesmoke" }}>Selected User:</h4>
                                        <ul style={{ listStyleType: "none", padding: 0 }}>
                                            {selectedUsers.length > 0 ? (
                                                selectedUsers.map(userId => {
                                                    const user = users.find(user => user._id === userId);
                                                    return user ? (
                                                        <li 
                                                            key={userId} 
                                                            className="list-item"
                                                        >
                                                            {user.friendid.name} 😊
                                                        </li>
                                                    ) : null;
                                                })
                                            ) : (
                                                <li style={{ color: "whitesmoke" }}>No users selected</li>
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
    
            <style>
                {`
                .custom-select-box {
                    background-color: rosybrown;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    padding: 10px;
                    margin: 20px 0;
                    cursor: pointer;
                }
    
                .custom-select-box option:checked {
                    background-color: #5C2FC2;
                    color: white;
                }
    
                .list-item {
                    color: whitesmoke;
                    cursor: grab;
                }
    
                 .custom-select-box:hover {
                    color: #5C2FC2;
                }
                `}
            </style>
        </>
    );
}

//     return (
//         <>
//             <Head />
//             <Genres />
//             <section className="track spad" style={{ marginTop: "20px", marginBottom: "10px" }}>
//                 <div className="container">
//                     <div className="row">
//                         <div className="col-lg-7">
//                             <div className="section-title">
//                                 <h1>Latest tracks</h1>
//                             </div>
//                         </div>
//                         <div className="col-lg-5 m-5">
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 placeholder="Search by music name..."
//                                 value={searchQuery}
//                                 onChange={handleSearchChange}
//                                 style={{ border: '1px solid white' }} // Inline style for white border
//                             />
//                         </div>
//                     </div>
//                     <div className="row">
//                         <div className="col-lg-6 p-0">
//                             <div className="track__content nice-scroll">
//                                 {filteredMusics.map((item, index) => (
//                                     <div className="single_player_container" key={index} style={{ marginBottom: '20px' }}>
//                                         <h4 style={{ color: "whitesmoke" }}>{item.musicname}</h4>
//                                         <div className="player_controls">
//                                             <button className="jp-play player_button"
//                                                 style={{ cursor: 'pointer', color: 'white', fontSize: '1.5rem' }}
//                                                 onClick={() => playMusic(item.music, index)}>
//                                                 <i className="fa fa-play"></i>
//                                             </button>
//                                             <div className="player_bars">
//                                                 <div className="jp-progress">
//                                                     <div className="jp-seek-bar">
//                                                         <div>
//                                                             <div className="jp-play-bar">
//                                                                 <div className="jp-current-time" role="timer" aria-label="time" style={{ color: "whitesmoke" }}>0:00</div>
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                                 <div className="jp-duration ml-auto" role="timer" aria-label="duration" style={{ color: "whitesmoke" }}>00:00</div>
//                                             </div>
//                                             <div className="icon-container" style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
//                                                 <button className='icon-button' onClick={() => addFavorite(item)}>
//                                                     <i className="fa fa-heart" style={{ color: "red" }}></i>
//                                                 </button>
//                                                 <button className='icon-button' onClick={() => setSharingMusic(item)}>
//                                                     <i className="fa fa-share" style={{ color: "white" }}></i>
//                                                 </button>
//                                                 <button className='icon-button' onClick={() => downloadMusic(item)}>
//                                                     <i className="fa fa-download" style={{ color: "blue" }}></i>
//                                                 </button>
//                                                 <button className='icon-button' onClick={() => setShowCommentBox(showCommentBox === index ? null : index)}>
//                                                     <i className="fa fa-comment" style={{ color: "yellow" }}></i>
//                                                 </button>
//                                                 {showCommentBox === index && (
//                                                     <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
//                                                         <input
//                                                             type="text"
//                                                             value={comment}
//                                                             onChange={(e) => setComment(e.target.value)}
//                                                             placeholder="Enter your comment"
//                                                             style={{ padding: '5px', borderRadius: '5px', border: '1px solid #ddd' }}
//                                                         />
//                                                         <button 
//                                                             onClick={() => commentMusics(item, index)}
//                                                             style={{ backgroundColor: '#5C2FC2', color: 'white', border: 'none', borderRadius: '5px', padding: '5px 10px' }}
//                                                         >
//                                                             Submit Comment
//                                                         </button>
//                                                     </div>
//                                                 )}
//                                                 {messageIndex === index && <div>Comment added successfully</div>}
//                                             </div>
//                                             {playingIndex === index && (
//                                                 <audio controls autoPlay src={playingMusic} style={{ width: '100%', marginTop: '10px' }}>
//                                                     Your browser does not support the audio element.
//                                                 </audio>
//                                             )}
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                         <div className="col-lg-6 p-0">
//                             <div className="track__pic">
//                                 <img src="assets/img/about/2034851.jpg" alt="" />
//                             </div>
//                             {sharingMusic && (
//                                 <div className='mt-5'>
//                                     <h3 style={{ color: "whitesmoke" }}>Select Users to Share With:</h3>
//                                     <select
//                                         multiple
//                                         name='users'
//                                         id="form2Example1"
//                                         className="form-control custom-select-box"
//                                         onChange={handleUserSelect}
//                                     >
//                                         {users.map((data, index) => (
//                                             <option key={index} value={data._id}>😊 &nbsp; {data.name}</option>
//                                         ))}
//                                     </select>
//                                     <button 
//                                         onClick={shareMusic}
//                                         style={{ backgroundColor: '#5C2FC2', color: 'white', border: 'none', borderRadius: '5px', padding: '10px 10px', margin: "20px 0" }}
//                                     >
//                                         Share
//                                     </button>
//                                     <div>
//                                         <h4 style={{ color: "whitesmoke" }}>Selected User:</h4>
//                                         <ul style={{ listStyleType: "none", padding: 0 }}>
//                                             {selectedUsers.length > 0 ? (
//                                                 selectedUsers.map(userId => {
//                                                     const user = users.find(user => user._id === userId);
//                                                     return user ? (
//                                                         <li 
//                                                             key={userId} 
//                                                             className="list-item"
//                                                         >
//                                                             {user.name} 😊
//                                                         </li>
//                                                     ) : null;
//                                                 })
//                                             ) : (
//                                                 <li style={{ color: "whitesmoke" }}>No users selected</li>
//                                             )}
//                                         </ul>
//                                     </div>
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </section>
//             <Footer />
    
//             <style>
//                 {`
//                 .custom-select-box {
//                     background-color: rosybrown;
//                     color: white;
//                     border: none;
//                     border-radius: 5px;
//                     padding: 10px;
//                     margin: 20px 0;
//                     cursor: pointer;
//                 }
    
//                 .list-item {
//                     color: whitesmoke;
//                 }

//                 .custom-select-box:hover {
//                     color: #5C2FC2;
//                 }
//                 `}
//             </style>
//         </>
//     );
// }




    // return (
    //     <>
    //         <Head />
    //         <Genres />
    //         <section className="track spad" style={{ marginTop: "20px", marginBottom: "10px" }}>
    //             <div className="container">
    //                 <div className="row">
    //                     <div className="col-lg-7">
    //                         <div className="section-title">
    //                             <h1>Latest tracks</h1>
    //                         </div>
    //                     </div>
    //                     <div className="col-lg-5 m-5">
    //                         <input
    //                             type="text"
    //                             className="form-control"
    //                             placeholder="Search by music name..."
    //                             value={searchQuery}
    //                             onChange={handleSearchChange}
    //                             style={{ border: '1px solid white' }} // Inline style for white border
    //                         />
    //                     </div>
    //                 </div>
    //                 <div className="row">

    //                     <div className="col-lg-6 p-0">
    //                         <div className="track__content nice-scroll">
    //                             {filteredMusics.map((item, index) => (
    //                                 <div className="single_player_container" key={index} style={{ marginBottom: '20px' }}>
    //                                     <h4 style={{ color: "whitesmoke" }}>{item.musicname}</h4>
    //                                     <div className="player_controls">
    //                                         <button className="jp-play player_button"
    //                                             style={{ cursor: 'pointer', color: 'white', fontSize: '1.5rem' }}
    //                                             onClick={() => playMusic(item.music, index)}>
    //                                             <i className="fa fa-play"></i>
    //                                         </button>
    //                                         <div className="player_bars">
    //                                             <div className="jp-progress">
    //                                                 <div className="jp-seek-bar">
    //                                                     <div>
    //                                                         <div className="jp-play-bar">
    //                                                             <div className="jp-current-time" role="timer" aria-label="time" style={{ color: "whitesmoke" }}>0:00</div>
    //                                                         </div>
    //                                                     </div>
    //                                                 </div>
    //                                             </div>
    //                                             <div className="jp-duration ml-auto" role="timer" aria-label="duration" style={{ color: "whitesmoke" }}>00:00</div>
    //                                         </div>
    //                                         <div className="icon-container" style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
    //                                             <button className='icon-button' onClick={() => addFavorite(item)}>
    //                                                 <i className="fa fa-heart" style={{ color: "red" }}></i>
    //                                             </button>
    //                                             <button className='icon-button' onClick={() => setSharingMusic(item)}>
    //                                                 <i className="fa fa-share" style={{ color: "white" }}></i>
    //                                             </button>
    //                                             <button className='icon-button' onClick={() => downloadMusic(item)}>
    //                                                 <i className="fa fa-download" style={{ color: "blue" }}></i>
    //                                             </button>
    //                                             <button className='icon-button' onClick={() => setShowCommentBox(!showCommentBox)}>
    //             <i className="fa fa-comment" style={{ color: "yellow" }}></i>
    //         </button>
    //         {showCommentBox && (
    //             <div>
    //                 <input
    //                     type="text"
    //                     value={comment}
    //                     onChange={(e) => setComment(e.target.value)}
    //                     placeholder="Enter your comment"
    //                 />
    //                 <button onClick={() => commentMusics(item)}>Submit Comment</button>
    //             </div>
    //         )}
    //         {message && <div>{message}</div>}
    //                                         </div>
    //                                         {playingIndex === index && (
    //                                             <audio controls autoPlay src={playingMusic} style={{ width: '100%', marginTop: '10px' }}>
    //                                                 Your browser does not support the audio element.
    //                                             </audio>
    //                                         )}
                                            
    //                                     </div>
    //                                 </div>
                                    
    //                             ))}
    //                         </div>
    //                     </div>
    //                     <div className="col-lg-6 p-0">
    //                         <div className="track__pic">
    //                             <img src="assets/img/about/2034851.jpg" alt="" />
    //                         </div>
    //                         {sharingMusic && (
    //                             <div>
    //                                 <h3 style={{ color: "whitesmoke" }}>Select Users to Share With:</h3>
    //                                 <select multiple name='users' id="form2Example1" className="form-control" onChange={handleUserSelect}>
    //                                     {users.map((data, index) => (
    //                                         <option key={index} value={data._id}>{data.name}</option>
    //                                     ))}
    //                                 </select>
    //                                 <button className='btn btn-info' onClick={shareMusic}>Share Music</button>
    //                                 <div>
    //                                     <h4 style={{ color: "whitesmoke" }}>Selected Users:</h4>
    //                                     <ul>
    //                                         {selectedUsers.map(userId => (
    //                                             <li key={userId}>{users.find(user => user._id === userId)?.username}</li>
    //                                         ))}
    //                                     </ul>
    //                                 </div>
    //                             </div>
    //                         )}
    //                     </div>
                        
    //                 </div>
    //             </div>
    //         </section>
    //         <Footer />
    //     </>
    // )
