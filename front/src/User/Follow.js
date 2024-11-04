import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

export default function Follow() {
  const [artists, setArtists] = useState([]);
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("userdata")));
  const [message, setMessage] = useState("");
  const [artistList, setArtistList] = useState([]);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await fetch('http://localhost:3005/Registration/allartists');
        const result = await response.json();
        setArtists(result.artistList );

      } catch (error) {
        console.error('Error fetching artists:', error);
      }
    };

    fetchArtists();
  }, []);

  const followArtist = (id) => {
    const params = {
      artistid: id,
      userId: auth._id,
    };

    fetch('http://localhost:3005/Registration/followartist', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })
      .then(res => res.json())
      .then((result) => {
        if (result.message === 'Success') {
          setMessage("Followed the artist successfully!");
        } else {
          setMessage("You already followed the artist.");
        }
        fetchFollowList(); // Refetch follow list after updating
      })
      .catch(error => console.error('Error following artist:', error));
  };

  const fetchFollowList = async () => {
    try {
      const userid = auth._id;
      const response = await fetch('http://localhost:3005/Registration/followlist', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userid }),
      });

      const result = await response.json();
      setArtistList(result.artistList);
    } catch (error) {
      console.error('Error fetching follow list:', error);
    }
  };

  useEffect(() => {
    if (auth._id) {
      fetchFollowList();
    }
  }, [auth._id]);

  return (
    <div className="container-fluid pt-4 px-4">
      <div className="row">
        <div className="col-md-6">
          <div className="bg-secondary rounded h-100 p-4">
            <h2 className="mb-4" style={{ color: "white" }}>Artists Recommended for You</h2>
            {message && <div className="alert alert-success">{message}</div>}
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">SI.NO</th>
                    <th scope="col">Artist Name</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {artists.map((artist, index) => (
                    <tr key={artist._id}>
                      <th scope="row">{index + 1}</th>
                      <td>{artist.name}</td>
                      <td>
                        {artistList.some(item => item._id === artist._id && item.status === 1) ? (
                          <button
                            type="button"
                            className="btn btn-outline-secondary m-2"
                            disabled
                          >
                            Followed
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="btn btn-outline-success m-2"
                            onClick={() => followArtist(artist._id)}
                          >
                            Follow
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="bg-secondary rounded h-100 p-4">
            <h2 className="mb-4" style={{ color: "white" }}>Followed Artists</h2>
            {message && <div className="alert alert-success">{message}</div>}
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">SI.NO</th>
                    <th scope="col">Artist Name</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {artistList.map((data, index) => (
                    
                    <tr key={data._id}>
                      <th scope="row">{index + 1}</th>
                      <td>{data.name}</td>
                      <td>
                        <Link to="/viewcollection" state={{ artistid: data.userid }}>
                          <button
                            type="button"
                            className="btn btn-outline-success m-2"
                          >
                            <i className='fa fa-eye'></i>
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
