import React, { Children, useState, useEffect } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
import {BASE_URL} from '../constant'

function Genre({ children }) {
  const [genres, setGenres] = useState([]);
  const [refresh, setRefresh] = useState(0)

  useEffect(() => {
    fetch(`${BASE_URL}/genre/generview`)
      .then((res) => res.json())
      .then((result) => {
        setGenres(result);
      });
  }, [refresh]);

  const deleteGenre = (iD) =>{
    
    let params = {

        id:iD
    }
    fetch(`${BASE_URL}/genre/deletegenre`,{
        method:'post',
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify(params)
    }).then((res)=>res.json()).then((result)=>{
        setRefresh(pre=>pre+1)
        // navigate('/genre')
    })
}

  return (
    <Header>
      <div className="container-fluid pt-4 px-4">
        <div className="row g-4">
          <div className="col-sm-12 col-xl-12">
            <Link to="/addgenre">
              {" "}
              <button type="button" class="btn btn-light m-2">
                Add Genre
              </button>
            </Link>
            <div className="bg-secondary rounded h-100 p-4">
              <h4 className="mb-4"  style={{color:"white"}}>Genre Table</h4>

              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">SI.NO</th>
                    <th scope="col">Genre</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {genres.map((items, index) => {
                    return (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{items.genre}</td>
                        <td>
                          <Link to="/editgenre" state={{ id: items._id }}>
                            <button
                              type="button"
                              class="btn btn-outline-success m-2"
                            >
                              Edit
                            </button>
                          </Link>
                          <button
                            onClick={() => {
                              deleteGenre(items._id);
                            }}
                            class="btn btn-outline-danger m-2"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Header>
  );
}

export default Genre;
