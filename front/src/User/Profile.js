import React, { useState, useEffect } from 'react';
import './Profile.css';
import Head from './Head';
import Footer from './Footer';

export default function Profile() {
  const [profile, setProfile] = useState({});
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('userdata')));
  const [editing, setEditing] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);

  const userid = auth._id;

  useEffect(() => {
    fetchProfileData();
  }, [userid]);

  const fetchProfileData = () => {
    fetch('http://localhost:3005/Registration/profile', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userid: userid })
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setProfile(result);
        setUpdatedProfile(result);
      })
      .catch((error) => {
        console.error('Error fetching profile data:', error);
      });
  };

  const handleUpdateClick = () => {
    setEditing(true);
  };

  const handleSaveClick = () => {
    const formData = new FormData();
    formData.append('userId', userid);
    formData.append('name', updatedProfile.name || '');
    formData.append('category', updatedProfile.category || '');
    formData.append('address', updatedProfile.address || '');
    formData.append('phone', updatedProfile.contact || '');
    formData.append('dob', updatedProfile.dob || '');
    formData.append('email', updatedProfile.userid.email || '');
    if (selectedFile) {
      formData.append('image', selectedFile);
    }

    fetch('http://localhost:3005/Registration/updateProfile', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        console.log('Profile updated successfully:', result);
        setProfile(result);
        setEditing(false);
      })
      .catch((error) => {
        console.error('Error updating profile:', error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProfile({ ...updatedProfile, [name]: value });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  return (
    <>
      <div className="container-fluid d-flex p-0 mt-5">
        <div className="flex-grow-1">
          <Head />
          <div className="content p-4">
            <section className="section about-section gray-bg ml-5 mt-5" id="about">
              <div className="containers" style={{ width: '1200px' }}>
                <div className="row align-items-center flex-row-reverse">
                  <div className="col-lg-12">
                    <div className="about-text go-to">
                      <h3 className="dark-color">{profile.name}</h3>
                      {editing ? (
                        <>
                          <input
                            type="text"
                            name="name"
                            value={updatedProfile.name}
                            onChange={handleInputChange}
                            placeholder="Name"
                          />
                        </>
                      ) : (
                        <>
                          <h6 className="theme-color lead">About me</h6>
                        </>
                      )}
                      <p>
                        Music is my passion; each song is a journey that connects my soul to the rhythm of the universe.
                        As a music lover, my heart beats in harmony with every note and lyric, finding solace and joy in every melody
                      </p>
                      <div className="row about-list">
                        <div className="col-md-6">
                          <div className="media">
                            <label>Join Date</label>
                            <p>{profile.createdAt}</p>
                          </div>
                          {/* <div className="media">
                            <label>Email</label>
                            {editing ? (
                              <input
                                type="text"
                                name="email"
                                value={updatedProfile.userid.email}
                                onChange={handleInputChange}
                                placeholder="email"
                                style={{ marginLeft: '10px' }}
                              />
                            ) : (
                              // <p>{profile.userid.email}</p>
                              ""
                              
                            )}
                          </div> */}
                          <div className="media">
                            <label>Dob</label>
                            {editing ? (
                              <input
                                type="date"
                                name="dob"
                                value={updatedProfile.dob}
                                onChange={handleInputChange}
                                placeholder="dob"
                                style={{ marginLeft: '10px' }}
                              />
                            ) : (
                              <p>{profile.dob}</p>
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="media">
                            <label>Category</label>
                            {editing ? (
                              <input
                                type="text"
                                name="category"
                                value={updatedProfile.category}
                                onChange={handleInputChange}
                              />
                            ) : (
                              <p>{profile.category}</p>
                            )}
                          </div>
                          <div className="media">
                            <label>Address</label>
                            {editing ? (
                              <input
                                type="text"
                                name="address"
                                value={updatedProfile.address}
                                onChange={handleInputChange}
                              />
                            ) : (
                              <p>{profile.address}</p>
                            )}
                          </div>
                          <div className="media">
                            <label>Phone</label>
                            {editing ? (
                              <input
                                type="text"
                                name="phone"
                                value={updatedProfile.contact}
                                onChange={handleInputChange}
                              />
                            ) : (
                              <p>{profile.contact}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="col-lg-6">
                    <div className="about-avatar" style={{ marginLeft: '150px' }}>
                      <img
                        src={`http://localhost:3005${profile.image}`}
                        title=""
                        alt=""
                      />
                      {editing && (
                        <input
                          type="file"
                          name="image"
                          onChange={handleFileChange}
                        />
                      )}
                    </div>
                  </div> */}
                </div>
                {editing ? (
                  <button className="btn btn-info" onClick={handleSaveClick}>Save</button>
                ) : (
                  <button className='btn btn-success' onClick={handleUpdateClick}>Update</button>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
