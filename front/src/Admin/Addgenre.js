import React, { useState } from 'react';
import Header from './Header';
import { Link, useNavigate } from 'react-router-dom';
import {BASE_URL} from '../constant'

function Addgenre() {
    const [genre, setGenre] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleGenre = () => {
        if (genre.trim() === '') {
            setError('Genre cannot be empty');
            return;
        }

        let params = {
            genre: genre
        };

        fetch(`${BASE_URL}/genre/genre`, {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        })
        .then((res) => res.json())
        .then((result) => {
            navigate('/genre');
        })
        .catch((error) => {
            console.error('Error:', error);
            // Handle error state or display error to user
        });
    };

    return (
        <Header>
            <div className="container-fluid pt-4 px-4">
                <div className="col-sm-12 col-xl-12">
                    <div className="bg-secondary rounded h-100 p-4">
                        <h6 className="mb-4" style={{ color: 'white' }}>
                            Add Genre
                        </h6>
                        <div>
                            <div className="row mb-3">
                                <label htmlFor="genreInput" className="col-sm-2 col-form-label">
                                    Genre
                                </label>
                                <div className="col-sm-10">
                                    <input
                                        id="genreInput"
                                        type="text"
                                        name="genre"
                                        className="form-control"
                                        value={genre}
                                        onChange={(event) => setGenre(event.target.value)}
                                    />
                                    {error && <div className="text-danger">{error}</div>}
                                </div>
                            </div>

                            <button type="button" className="btn btn-primary" onClick={handleGenre}>
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Header>
    );
}

export default Addgenre;
