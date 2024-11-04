import React, { useState } from 'react';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import {BASE_URL} from '../constant'

function Events() {
    const [image, setImage] = useState(null);
    const [datetime, setDatetime] = useState('');
    const [place, setPlace] = useState('');
    const [error, setError] = useState('');
    const [title, setTitle] = useState('');

    const navigate = useNavigate();

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    };

    const handleAdd = async () => {
        if (!image || !datetime || !place) {
            setError('Please fill in all fields and select an image.');
            return;
        }

        const formData = new FormData();
        formData.append('image', image);
        formData.append('datetime', datetime);
        formData.append('place', place);
        formData.append('title', title);


        try {
            const response = await fetch(`${BASE_URL}/genre/addevents`, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Failed to upload file');
            }

            const result = await response.json();
            console.log(result); // Log the server response (e.g., file upload success message)
alert("Event successfully added")
            navigate('/viewevents'); // Navigate to the desired route after successful upload
        } catch (error) {
            console.error('Error uploading file:', error);
            setError('Error uploading file. Please try again.');
        }
    };

    return (
        <Header>
            <div className="container-fluid pt-4 px-4">
                <div className="col-sm-12 col-xl-12">
                    <div className="bg-secondary rounded h-100 p-4">
                        <h4 className="mb-4" style={{ color: "white" }}>Add Events</h4>
                        <div>
                        <div className="row mb-3">
                                <label htmlFor="titleInput" className="col-sm-2 col-form-label">
                                    Title
                                </label>
                                <div className="col-sm-10">
                                    <textarea
                                        id="placeInput"
                                        name="title"
                                        className="form-control"
                                        value={title}
                                        onChange={(event) => setTitle(event.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label htmlFor="placeInput" className="col-sm-2 col-form-label">
                                    Place
                                </label>
                                <div className="col-sm-10">
                                    <textarea
                                        id="placeInput"
                                        name="place"
                                        className="form-control"
                                        value={place}
                                        onChange={(event) => setPlace(event.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label htmlFor="datetimeInput" className="col-sm-2 col-form-label">
                                    Date & Time
                                </label>
                                <div className="col-sm-10">
                                    <input
                                        id="datetimeInput"
                                        type="datetime-local"
                                        name="datetime"
                                        className="form-control"
                                        value={datetime}
                                        onChange={(event) => setDatetime(event.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label htmlFor="inputImage" className="col-sm-2 col-form-label">Image</label>
                                <div className="col-sm-10">
                                    <input
                                        type="file"
                                        name="image"
                                        className="form-control"
                                        accept=".jpg, .jpeg, .png"
                                        onChange={handleImageChange}
                                    />
                                </div>
                            </div>
                            {error && <div className="text-danger">{error}</div>}
                            <button type="button" className="btn btn-primary" onClick={handleAdd}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </Header>
    );
}

export default Events;
