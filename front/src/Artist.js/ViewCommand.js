import React, { useState, useEffect } from "react";
import ArtistHeader from "./ArtistHeader";

function Viewcomment() {
  const [comment, setcomment] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("userdata")));
  const artistId = auth._id;

  useEffect(() => {
    fetch("http://localhost:3005/user/viewcommant", {
      method: 'post',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ artistid: artistId })
    })
    .then((res) => res.json())
    .then((result) => {
      setcomment(result);
    })
    .catch((error) => {
      console.error('Error fetching comment list:', error);
      // Handle error state or display error to user
    });
  }, [refresh, artistId]);


  return (
    <ArtistHeader>
      <div className="container-fluid pt-4 px-4">
        <div className="row g-4">
          <div className="col-sm-12 col-xl-12">
            <div className="bg-secondary rounded h-100 p-4">
              <h3 className="mb-4" style={{color:"white"}}>Comments from Users</h3>

              {comment.length > 0 ? (
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">SI.NO</th>
                      <th scope="col">Music</th>
                      <th scope="col">Comment</th>
                      <th scope="col">User</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comment.map((item, index) => (
                      <tr key={item._id}>
                        <td>{index + 1}</td>
                        <td>{item.musicname}</td>
                        <td>{item.comment}</td>
                        <td>
                        {item.customername}
                       
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No comment found.</p>
              )}

             
            </div>
          </div>
        </div>
      </div>
    </ArtistHeader>
  );
}

export default Viewcomment;
