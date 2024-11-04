import React, { useState } from 'react';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import {BASE_URL} from '../constant'

function Adds() {
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    };

    const handleAdd = async () => {
        if (!image) {
            console.error('No file selected');
            return;
        }

        const formData = new FormData();
        formData.append('image', image);

        try {
            const response = await fetch(`${BASE_URL}/genre/advertisement`, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Failed to upload file');
            }

            const result = await response.json();

            navigate('/'); // Navigate to the desired route after successful upload
        } catch (error) {
            console.error('Error uploading file:', error);
            // Handle error scenarios, e.g., show a message to the user
        }
    };

    return (
        <Header>
            <div className="container-fluid pt-4 px-4">
                <div className="col-sm-12 col-xl-12">
                    <div className="bg-secondary rounded h-100 p-4">
                        <h4 className="mb-4" style={{ color: "white" }}>Add Advertisements</h4>
                        <div>
                            <div className="row mb-3">
                                <label htmlFor="inputImage" className="col-sm-2 col-form-label">Image</label>
                                <div className="col-sm-10">
                                    <input
                                        type="file"
                                        name='image'
                                        className="form-control"
                                        accept=".jpg, .jpeg, .png"
                                        onChange={handleImageChange}
                                    />
                                </div>
                            </div>
                            <button type="button" className="btn btn-primary" onClick={handleAdd}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </Header>
    );
}

export default Adds;
