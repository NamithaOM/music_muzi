import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useLocation, useNavigate } from "react-router-dom";
import {BASE_URL} from '../constant'


function Editgenre() {
  const location = useLocation();
  // console.log("fgh",location);
  const [genres, setGenre] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let param = {
      id: location.state.id,
    };
    fetch(`${BASE_URL}/genre/editgenre`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(param),
    })
      .then((res) => res.json())
      .then((result) => {
        setGenre(result.genre);
      });
  }, []);

  const handleGenre = () => {
    let params = {
      id: location.state.id,
      genre: genres,
    };
    fetch(`${BASE_URL}/genre/updategenre`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    })
      .then((res) => res.json())
      .then((result) => {
        navigate("/genre");
      });
  };

  return (
    <Header>
      <div className="container-fluid pt-4 px-4">
        <div className="col-sm-12 col-xl-12">
          <div className="bg-secondary rounded h-100 p-4">
            <h4 className="mb-4"  style={{color:"white"}}>Edit Genre</h4>
            <div>
              <div className="row mb-3">
                <label for="inputEmail3" className="col-sm-2 col-form-label">
                  Genre
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    name="genre"
                    className="form-control"
                    value={genres}
                    onChange={(event) => setGenre(event.target.value)}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                onClick={() => handleGenre()}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </Header>
  );
}

export default Editgenre;
