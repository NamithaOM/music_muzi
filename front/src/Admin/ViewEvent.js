import React, { useState, useEffect } from 'react';
import Header from './Header';
import { useNavigate, Link } from 'react-router-dom';

function ViewEvent() {
    const [event, setEvent] = useState([]);
    const [refresh, setRefresh] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:3005/genre/viewevent")
            .then((res) => res.json())
            .then((result) => {
                setEvent(result);
            });
    }, [refresh]);

    const deleteAdd = (id) => {
        fetch('http://localhost:3005/genre/deleteevent', {
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
          <div className="row g-4">
            <div className="col-sm-12 col-xl-12">
              <Link to="/addevents">
                {" "}
                <button type="button" class="btn btn-light m-2">
                  Add Event
                </button>
              </Link>
              <div className="bg-secondary rounded h-100 p-4">
                <h4 className="mb-4"  style={{color:"white"}}>Event Table</h4>
  
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">SI.NO</th>
                      <th scope="col">Name of the Event</th>
                      <th scope="col">Place</th>
                      <th scope="col">Date and time</th>
                      <th scope="col">Document</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {event.map((items, index) => {
                      return (
                        <tr>
                          <td>{index + 1}</td>
                          <td>{items.title}</td>
                          <td>{items.place}</td>
                          <td>{items.datetime}</td>

                          <td>
                          <img src={`http://localhost:3005/events/${items.image}`} alt="advertisement" style={{ maxWidth: '350px' }} /> &nbsp;
                          </td>
                          <td>
                            <Link to="/editevents" state={{ id: items._id }}>
                              <button
                                type="button"
                                class="btn btn-outline-success m-2"
                              >
                                Edit
                              </button>
                            </Link>
                            <button type="button" className="btn btn-outline-danger m-2" onClick={() => deleteAdd(items._id)}>Delete</button>

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


        // <Header>
        //     <div className="container-fluid pt-4 px-4">
        //         <div className="d-flex justify-content-end mb-3">
        //             <Link to="/addevents" className="ml-auto">
        //                 <button type="button" className="btn btn-light">
        //                     Add event
        //                 </button>
        //             </Link>
        //         </div>
        //         <div className="col-sm-12 col-xl-12">
        //             <div className="bg-secondary rounded h-100 p-4">
        //                 <h4 className="mb-4" style={{ color: "white" }}>Events</h4>
        //                 {event.map((image, index) => (
        //                     <div key={index} className="mb-3">
        //                         <img src={`http://localhost:3005/events/${image.image}`} alt="advertisement" style={{ maxWidth: '350px' }} /> &nbsp;
        //                         <button type="button" className="btn btn-danger mt-2" onClick={() => deleteAdd(image._id)}>Delete</button>
        //                     </div>
        //                 ))}
        //             </div>
        //         </div>
        //     </div>
        // </Header>
    );
}

export default ViewEvent;
