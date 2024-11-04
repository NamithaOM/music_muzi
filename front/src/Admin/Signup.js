import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {BASE_URL} from '../constant'

function Signup() {
    const [name, setName] = useState("");
    const [contact, setContact] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [category, setCategory] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleRoleChange = (e) => {
        setCategory(e.target.value);
    };

    const validateForm = () => {
        let formErrors = {};
        let valid = true;

        if (!name) {
            formErrors.name = "Name is required";
            valid = false;
        }

        if (!contact) {
            formErrors.contact = "Contact is required";
            valid = false;
        } else if (!/^\d{10}$/.test(contact)) {
            formErrors.contact = "Contact must be exactly 10 digits";
            valid = false;
        }

        if (!email) {
            formErrors.email = "Email is required";
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            formErrors.email = "Email is invalid";
            valid = false;
        }

        if (!password) {
            formErrors.password = "Password is required";
            valid = false;
        } else if (password.length < 6 || password.length > 8) {
            formErrors.password = "Password must be 6-8 characters long";
            valid = false;
        }

        if (!category) {
            formErrors.category = "Category is required";
            valid = false;
        }

        setErrors(formErrors);
        return valid;
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        if (!validateForm()) {
            return;
        }

        let userstatus;
        switch (category) {
            case 'User':
                userstatus = 2;
                break;
            case 'Artist':
                userstatus = 5;
                break;
            default:
                userstatus = 0;
        }

        const data = {
            name: name,
            email: email,
            contact: contact,
            password: password,
            category: category,
            userstatus: userstatus,
            payment: 0
        };

        fetch(`${BASE_URL}/Registration/register`, {
            method: "post",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((result) => {
                navigate('/');
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    return (
        <div className="container-fluid" style={{ backgroundImage: 'url(/img/logs/log3.jpg)', backgroundSize: 'cover' }}>
            <div className="row h-100 align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
                <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
                    <div className="glass-card rounded p-4 p-sm-5 my-4 mx-3">
                        <div className="d-flex align-items-center justify-content-between mb-3">
                            <h3 style={{ color: "white" }}>Sign Up</h3>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    name='name'
                                    className="form-control glass-input"
                                    id="floatingText"
                                    placeholder="jhondoe"
                                    required
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <label htmlFor="floatingText">Name</label>
                                {errors.name && <div className="text-danger">{errors.name}</div>}
                            </div>

                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    name='contact'
                                    className="form-control glass-input"
                                    id="floatingContact"
                                    placeholder="1234567890"
                                    required
                                    onChange={(e) => setContact(e.target.value)}
                                />
                                <label htmlFor="floatingContact">Contact</label>
                                {errors.contact && <div className="text-danger">{errors.contact}</div>}
                            </div>
                            <div className="form-floating mb-3">
                                <div className="form-check">
                                    <input
                                        type="radio"
                                        className="form-check-input"
                                        name='category'
                                        id="userRadio"
                                        value="User"
                                        checked={category === "User"}
                                        onChange={handleRoleChange}
                                    />
                                    <label className="form-check-label" htmlFor="userRadio">
                                        User
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        type="radio"
                                        name='category'
                                        className="form-check-input"
                                        id="artistRadio"
                                        value="Artist"
                                        checked={category === "Artist"}
                                        onChange={handleRoleChange}
                                    />
                                    <label className="form-check-label" htmlFor="artistRadio">
                                        Artist
                                    </label>
                                </div>
                                {errors.category && <div className="text-danger">{errors.category}</div>}
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="email"
                                    name='email'
                                    className="form-control glass-input"
                                    id="floatingInput"
                                    placeholder="name@example.com"
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <label htmlFor="floatingInput">Email address</label>
                                {errors.email && <div className="text-danger">{errors.email}</div>}
                            </div>
                            <div className="form-floating mb-4">
                                <input
                                    type="password"
                                    name='password'
                                    className="form-control glass-input"
                                    id="floatingPassword"
                                    placeholder="Password"
                                    required
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <label htmlFor="floatingPassword">Password</label>
                                {errors.password && <div className="text-danger">{errors.password}</div>}
                            </div>
                            <button type="submit" className="btn btn-primary py-3 w-100 mb-4">Sign Up</button>
                        </form>
                        <p className="text-center mb-0 text-white">
                            Already have an Account?
                            <Link to="/login"> Sign In</Link>
                        </p>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .container-fluid {
                    position: relative;
                    z-index: 1;
                }

                .glass-card {
                    background: rgba(255, 255, 255, 0.1);
                    backdrop-filter: blur(10px);
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    border: 1px solid rgba(255, 255, 255, 0.3);
                }

                .glass-input {
                    background: rgba(255, 255, 255, 0.2) !important;
                    backdrop-filter: blur(5px) !important;
                    border: 1px solid rgba(255, 255, 255, 0.3) !important;
                    color: white !important;
                }

                .glass-input::placeholder {
                    color: rgba(255, 255, 255, 0.7);
                }

                .glass-input:focus {
                    background: rgba(255, 255, 255, 0.3) !important;
                    outline: none;
                    box-shadow: 0 0 0 0.2rem rgba(255, 255, 255, 0.3);
                }
            `}</style>
        </div>
    );
}

export default Signup;
