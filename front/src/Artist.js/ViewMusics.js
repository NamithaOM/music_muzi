import React, { useState, useEffect } from "react";
import ArtistHeader from "./ArtistHeader";

function ViewMusics() {
  const [musics, setMusics] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [playingMusic, setPlayingMusic] = useState(null);
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("userdata")));
  const artistId = auth._id;

  useEffect(() => {
    fetch("http://localhost:3005/Artist/viewmusic", {
      method: 'post',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ artistid: artistId })
    })
    .then((res) => res.json())
    .then((result) => {
      setMusics(result);
    })
    .catch((error) => {
      console.error('Error fetching music list:', error);
      // Handle error state or display error to user
    });
  }, [refresh, artistId]);

  const deletemusic = (musicId) => {
    let params = { id: musicId };
    fetch('http://localhost:3005/Artist/deleteMusic', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    })
    .then((res) => res.json())
    .then((result) => {
      setRefresh(prev => prev + 1);
    })
    .catch((error) => {
      console.error('Error deleting music:', error);
      // Handle error state or display error to user
    });
  };

  const playMusic = (musicFile) => {
    setPlayingMusic(`http://localhost:3005/music/${musicFile}`);
  };

  return (
    <ArtistHeader>
      <div className="container-fluid pt-4 px-4">
        <div className="row g-4">
          <div className="col-sm-12 col-xl-12">
            <div className="bg-secondary rounded h-100 p-4">
              <h3 className="mb-4" style={{color:"white"}}>Music list</h3>

              {musics.length > 0 ? (
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">SI.NO</th>
                      <th scope="col">Music</th>
                      <th scope="col">Cost</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {musics.map((item, index) => (
                      <tr key={item._id}>
                        <td>{index + 1}</td>
                        <td>{item.musicname}</td>
                        <td>{item.priceType}</td>
                        <td>
                          <button
                            type="button"
                            onClick={() => playMusic(item.music)}
                            className="btn btn-outline-success m-2"
                          >
                            Play
                          </button>
                          <button
                            onClick={() => deletemusic(item._id)}
                            className="btn btn-outline-danger m-2"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No music tracks found.</p>
              )}

              {playingMusic && (
                <div>
                  <h6 className=" mt-4" style={{color:"white"}}>Now Playing:</h6>
                  <audio controls src={playingMusic} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ArtistHeader>
  );
}

export default ViewMusics;
