import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Header from './Header';
import {BASE_URL} from '../constant'


export default function ArtistList() {
      const [artists, setArtists] = useState([]);
      const navigate = useNavigate();
    
      useEffect(() => {
        fetch(`${BASE_URL}/Registration/allartists`)
          .then(res => res.json())
          .then(result => {
            setArtists(result.artistList || []);
          })
          .catch(error => console.error('Error fetching:', error));
      }, []);
    
      const artistDelete = (id) => {
        fetch(`${BASE_URL}/Registration/deleteartist`, {
          method: 'POST',
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ id })
        })
        .then(res => res.json())
        .then(result => {
          if (result.success) {
            setArtists(artists.filter(artist => artist._id !== id));
          } else {
            console.error('Error deleting:', result.error);
          }
        })
        .catch(error => console.error('Error deleting:', error));
      };
    
      return (
        <Header>
          <div className="container-fluid pt-4 px-4">
            <div className="col-12">
              <div className="bg-secondary rounded h-100 p-4">
                <h4 className="mb-4"  style={{color:"white"}}>Artist Details</h4>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">SI.NO</th>
                        <th scope="col">Artist Name</th>
                        <th scope="col">Contact</th>
                        <th scope="col">Email</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {artists.map((artist, index) => (
                        <tr key={artist._id}>
                          <th scope="row">{index + 1}</th>
                          <td>{artist.name}</td>
                          <td>{artist.contact}</td>
                          <td>{artist.userid.email}</td>
                          <td>
                          
                            <button type="button" className="btn btn-outline-danger m-2" onClick={() => artistDelete(artist._id)}>
                              Reject
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </Header>
      
    


)
}
