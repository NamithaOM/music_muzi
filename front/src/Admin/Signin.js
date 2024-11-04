import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {BASE_URL} from '../constant'

function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  const logIn = () => {
    let valid = true;

    // Reset errors
    setEmailError('');
    setPasswordError('');
    setSuccessMessage('');

    if (!email) {
      setEmailError('Email is required');
      valid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Invalid email format');
      valid = false;
    }

    if (!password) {
      setPasswordError('Password is required');
      valid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      valid = false;
    }

    if (!valid) {
      return;
    }

    let params = {
      email: email,
      password: password
    };

    fetch(`${BASE_URL}/Registration/login`, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify(params)
    })
      .then((res) => res.json())
      .then((userData) => {
        if (userData !== 'Invalid') {
          localStorage.setItem("userdata", JSON.stringify(userData));
          setSuccessMessage('Login successful! Redirecting...');
          setTimeout(() => {
            navigate('/');
            window.location.reload();
          }, 1000);
        } else {
          setSuccessMessage('Invalid email or password');
        }
      })
      .catch((error) => {
        setSuccessMessage('An error occurred. Please try again later.');
        console.error('Login error:', error);
      });
  }

  return (
    <>
      <div className="container-fluid" style={{ backgroundImage: 'url(/img/logs/log3.jpg)', backgroundSize: 'cover' }}>
        <div className="row h-100 align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
          <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
            <div className="glass-card rounded p-4 p-sm-5 my-4 mx-3">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h3 style={{color:"white"}}>Sign In</h3>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control glass-input"
                  id="floatingInput"
                  placeholder="name@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="floatingInput">Email address</label>
                {emailError && <div className="text-danger">{emailError}</div>}
              </div>
              <div className="form-floating mb-4">
                <input
                  type="password"
                  className="form-control glass-input"
                  id="floatingPassword"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="floatingPassword">Password</label>
                {passwordError && <div className="text-danger">{passwordError}</div>}
              </div>
              {successMessage && <div className="text-success mb-3">{successMessage}</div>}
              <button type="button" onClick={logIn} className="btn btn-primary py-3 w-100 mb-4">Sign In</button>
              <p className="text-center mb-0">Don't have an Account? <Link to="/register">Sign Up</Link></p>
            </div>
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
    </>
  );
}

export default Signin;
