import React, { useState, useEffect } from "react";
import ArtistHeader from "./ArtistHeader";

function FollowedList() {
  const [follower, setFollower] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("userdata")));

  const artistId = auth?.company?._id;

  useEffect(() => {
    if (!artistId) {
      console.error('Artist ID is not available');
      return;
    }

    fetch("http://localhost:3005/Registration/followers", {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ artistid: artistId })
    })
    .then((res) => res.json())
    .then((result) => {
      setFollower(result);
    })
    .catch((error) => {
      console.error('Error fetching followers:', error);
    });
  }, [refresh]);

  return (
    <ArtistHeader>
      <div className="container-fluid pt-4 px-4">
        <div className="row g-4">
          <div className="col-sm-12 col-xl-12">
            <div className="bg-secondary rounded h-100 p-4">
              <h3 className="mb-4" style={{ color: "white" }}>Followers</h3>

              {follower.length > 0 ? (
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">SI.NO</th>
                      <th scope="col">User</th>
                    </tr>
                  </thead>
                  <tbody>
                    {follower.map((item, index) => (
                      <tr key={item._id}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No followers found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </ArtistHeader>
  );
}

export default FollowedList;
