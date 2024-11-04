import React, { useState, useEffect } from 'react';
import Header from './Header';
import { useNavigate, Link } from 'react-router-dom';

function ViewAdds() {
    const [images, setImages] = useState([]);
    const [refresh, setRefresh] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:3005/genre/viewAdds")
            .then((res) => res.json())
            .then((result) => {
                setImages(result);
            });
    }, [refresh]);

    const deleteAdd = (id) => {
        fetch('http://localhost:3005/genre/deleteAdd', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        }).then((res) => res.json())
          .then((result) => {
              setRefresh(prev => prev + 1);
          });
    };

    return (
        <Header>
            <div className="container-fluid pt-4 px-4">
                <div className="d-flex justify-content-end mb-3">
                    <Link to="/adds" className="ml-auto">
                        <button type="button" className="btn btn-light">
                            Add Advertisement
                        </button>
                    </Link>
                </div>
                <div className="col-sm-12 col-xl-12">
                    <div className="bg-secondary rounded h-100 p-4">
                        <h4 className="mb-4" style={{ color: "white" }}>Advertisements</h4>
                        {images.map((image, index) => (
                            <div key={index} className="mb-3">
                                <img src={`http://localhost:3005/adds/${image.image}`} alt="advertisement" style={{ maxWidth: '350px' }} /> &nbsp;
                                <button type="button" className="btn btn-danger mt-2" onClick={() => deleteAdd(image._id)}>Delete</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Header>
    );
}

export default ViewAdds;
