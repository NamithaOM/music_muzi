import React, { useState, useEffect } from 'react';
import Head from './Head';
import Footer from './Footer';

export default function NewEvents() {
  const [event, setEvent] = useState([]);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    fetch("http://localhost:3005/genre/viewevent")
      .then((res) => res.json())
      .then((result) => {
        setEvent(result);
      })
      .catch((error) => console.error('Error fetching events:', error));
  }, [refresh]);

  return (
    <>
      <Head />
      <section className="youtube spad" style={{ marginTop: "200px", marginBottom: "10px" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title mb-5">
                <h1>Upcoming Events</h1>
              </div>
            </div>
          </div>
          <div className="row mt-4">
            {event.map((data, index) => (
              <div key={index} className="col-lg-6 col-md-12 col-sm-12">
                <div className="youtube__item">
                  <h2 className='text-white m-3'>{data.title}</h2>

                  <div
                    className="youtube__item__pic"
                    style={{ backgroundImage: 'url(/img/logs/OIP.jpg)' }}
                    // style={{ backgroundImage: `url(http://localhost:3005/events/${data.image})`, width: "365px", height: "200px" }}
                  >
                  </div>
                  <div className="youtube__item__text">
                  <div className="icons-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <h4 style={{ marginRight: '15px' }}><i className='fa fa-calendar'></i>&nbsp; {data.datetime}</h4>
                      <h4><i 
                        className='fa fa-eye' 
                        onClick={() => window.open(`http://localhost:3005/events/${data.image}`, '_blank')}
                        style={{ cursor: 'pointer' }}
                      ></i> </h4>
                    </div>
                    <h4 style={{ marginRight: '15px' }}><i className='fa fa-location-arrow'></i> &nbsp; {data.place}</h4>

                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
