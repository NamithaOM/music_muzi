import React, { useState, useEffect } from 'react';
import Header from './Header';
import { useNavigate, useLocation } from 'react-router-dom';
import {BASE_URL} from '../constant'

function EditEvent() {
    const [image, setImage] = useState(null);
    const [datetime, setDatetime] = useState('');
    const [place, setPlace] = useState('');
    const [title, setTitle] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const eventId = location.state?.id;

    useEffect(() => {
        // Fetch existing event details
        fetch(`${BASE_URL}/genre/viewevent/${eventId}`)
            .then(res => res.json())
            .then(event => {
                setPlace(event.place);
                setTitle(event.title);
                setDatetime(event.datetime);
                // Optionally, set the image preview if needed
            });
    }, [eventId]);

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    };

    const handleUpdate = async () => {
        if (!datetime || !place) {
            setError('Please fill in all fields.');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('image', image);
        formData.append('datetime', datetime);
        formData.append('place', place);
        formData.append('id', eventId); // Include the event ID

        try {
            const response = await fetch('${BASE_URL}/genre/updateevent', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Failed to update event');
            }

            const result = await response.json();
            console.log(result); // Log the server response
            alert("Event successfully updated");
            navigate('/viewevents'); // Navigate to the desired route after successful update
        } catch (error) {
            console.error('Error updating event:', error);
            setError('Error updating event. Please try again.');
        }
    };

    return (
        <Header>
            <div className="container-fluid pt-4 px-4">
                <div className="col-sm-12 col-xl-12">
                    <div className="bg-secondary rounded h-100 p-4">
                        <h4 className="mb-4" style={{ color: "white" }}>Edit Event</h4>
                        <div>
                        <div className="row mb-3">
                                <label htmlFor="datetimeInput" className="col-sm-2 col-form-label">
Name of event                                </label>
                                <div className="col-sm-10">
                                    <input
                                        id="titleInput"
                                        type="text"
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
                            <button type="button" className="btn btn-primary" onClick={handleUpdate}>Update</button>
                        </div>
                    </div>
                </div>
            </div>
        </Header>
    );
}

export default EditEvent;
