import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ArtistHeader from './ArtistHeader';

function Addmusic() {
  const [musicFile, setMusicFile] = useState(null);
  const [priceType, setPriceType] = useState('free');
  // const [amount, setAmount] = useState('');
  const [genre, setGenre] = useState('');
  const [musicname, setMusicname] = useState('');
  const [genres, setGenres] = useState([]);
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("userdata")));
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3005/genre/generview")
      .then((res) => res.json())
      .then((result) => {
        setGenres(result);
      });
  }, []);

  const artistId = auth._id;

  const validateForm = () => {
    const errors = {};
    if (!musicFile) errors.musicFile = "Music file is required.";
    if (!musicname) errors.musicname = "Music name is required.";
    if (!genre) errors.genre = "Genre is required.";
    // if (priceType === 'paid' && !amount) errors.amount = "Amount is required.";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleMusic = async () => {
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append('music', musicFile);
    formData.append('musicname', musicname);
    formData.append('priceType', priceType);
    formData.append('artistId', artistId);
    formData.append('genre', genre);
    // if (priceType === 'paid') {
    //   formData.append('amount', amount);
    // } else {
    //   formData.append('amount', 0);
    // }

    try {
      const response = await fetch('http://localhost:3005/Artist/addmusic', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload file');
      }

      const result = await response.json();
      setMessage('Music uploaded successfully!');
      setTimeout(() => {
        navigate('/viewmusic'); // Navigate to home after successful upload
      }, 2000);
    } catch (error) {
      console.error('Error uploading file:', error);
      setMessage('Error uploading file. Please try again.');
    }
  };

  return (
    <ArtistHeader>
      <div className="container-fluid pt-4 px-4">
        <div className="col-sm-12 col-xl-12">
          <div className="bg-secondary rounded h-100 p-4">
            <form method='post' encType='multipart/form-data'>
              <h2 className="mb-4" style={{ color: "white" }}>Add Music</h2>

              {message && <div className={`alert ${message.startsWith('Error') ? 'alert-danger' : 'alert-success'}`}>{message}</div>}

              <div className="row mb-3">
                <label htmlFor="genre" className="col-sm-2 col-form-label">Genre</label>
                <div className="col-sm-10">
                  <select
                    className="form-control"
                    value={genre}
                    onChange={(event) => setGenre(event.target.value)}
                  >
                    <option value="">Select Genre</option>
                    {genres.map((g) => (
                      <option key={g._id} value={g._id}>{g.genre}</option>
                    ))}
                  </select>
                  {errors.genre && <div className="text-danger">{errors.genre}</div>}
                </div>
              </div>

              <div className="row mb-3">
                <label htmlFor="musicname" className="col-sm-2 col-form-label">Music Name</label>
                <div className="col-sm-10">
                  <input type="text" name='musicname' className="form-control" onChange={(event) => setMusicname(event.target.value)} />
                  {errors.musicname && <div className="text-danger">{errors.musicname}</div>}
                </div>
              </div>

              <div className="row mb-3">
                <label htmlFor="music" className="col-sm-2 col-form-label">Upload File</label>
                <div className="col-sm-10">
                  <input
                    type="file"
                    name="music"
                    className="form-control"
                    accept=".mp3, .mp4"
                    onChange={(event) => setMusicFile(event.target.files[0])}
                  />
                  {errors.musicFile && <div className="text-danger">{errors.musicFile}</div>}
                </div>
              </div>

              <div className="row mb-3">
                <label htmlFor="priceType" className="col-sm-2 col-form-label">Price Type</label>
                <div className="col-sm-10">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="priceType"
                      id="free"
                      value="free"
                      checked={priceType === 'free'}
                      onChange={(event) => setPriceType(event.target.value)}
                    />
                    <label className="form-check-label" htmlFor="free">
                      Free
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="priceType"
                      id="paid"
                      value="paid"
                      checked={priceType === 'paid'}
                      onChange={(event) => setPriceType(event.target.value)}
                    />
                    <label className="form-check-label" htmlFor="paid">
                      Paid
                    </label>
                  </div>
                </div>
              </div>
{/* 
              {priceType === 'paid' && (
                <div className="row mb-3">
                  <label htmlFor="amount" className="col-sm-2 col-form-label">Amount</label>
                  <div className="col-sm-10">
                    <input
                      type="number"
                      name="amount"
                      className="form-control"
                      value={amount}
                      onChange={(event) => setAmount(event.target.value)}
                    />
                    {errors.amount && <div className="text-danger">{errors.amount}</div>}
                  </div>
                </div>
              )} */}

              <button type="button" className="btn btn-primary" onClick={handleMusic}>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </ArtistHeader>
  );
}

export default Addmusic;
