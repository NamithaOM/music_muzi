import React from 'react';

export default function Eve() {
  return (
    <>
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
            <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
              <div className="youtube__item">
                <h2 className='text-white m-3'>Yesudas Hits</h2>
                <div
                  className="youtube__item__pic"
                  style={{ backgroundImage: 'url(/img/logs/OIP.jpg)', width: "100%", height: "200px", backgroundSize: 'cover', backgroundPosition: 'center' }}
                >
                </div>
                <div className="youtube__item__text">
                  <div className="icons-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h4 style={{ marginRight: '15px' }}><i className='fa fa-calendar'></i>&nbsp; 30/06/2025</h4>
                    <h4><i 
                      className='fa fa-eye' 
                      style={{ cursor: 'pointer' }}
                    ></i></h4>
                  </div>
                  <h4 style={{ marginRight: '15px' }}><i className='fa fa-location-arrow'></i> &nbsp; Lulu mall, Trivandrum</h4>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
              <div className="youtube__item">
                <h2 className='text-white m-3'>Almaram</h2>
                <div
                  className="youtube__item__pic"
                  style={{ backgroundImage: 'url(/img/logs/OIP.jpg)', width: "100%", height: "200px", backgroundSize: 'cover', backgroundPosition: 'center' }}
                >
                </div>
                <div className="youtube__item__text">
                  <div className="icons-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h4 style={{ marginRight: '15px' }}><i className='fa fa-calendar'></i>&nbsp; 01/08/2025</h4>
                    <h4><i 
                      className='fa fa-eye' 
                      style={{ cursor: 'pointer' }}
                    ></i></h4>
                  </div>
                  <h4 style={{ marginRight: '15px' }}><i className='fa fa-location-arrow'></i> &nbsp; Techno park, Trivandrum</h4>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
              <div className="youtube__item">
                <h2 className='text-white m-3'>Malayalam Hits</h2>
                <div
                  className="youtube__item__pic"
                  style={{ backgroundImage: 'url(/img/logs/OIP.jpg)', width: "100%", height: "200px", backgroundSize: 'cover', backgroundPosition: 'center' }}
                >
                </div>
                <div className="youtube__item__text">
                  <div className="icons-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h4 style={{ marginRight: '15px' }}><i className='fa fa-calendar'></i>&nbsp; 21/03/2025</h4>
                    <h4><i 
                      className='fa fa-eye' 
                      style={{ cursor: 'pointer' }}
                    ></i></h4>
                  </div>
                  <h4 style={{ marginRight: '15px' }}><i className='fa fa-location-arrow'></i> &nbsp; Manaveeyam, Trivandrum</h4>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
              <div className="youtube__item">
                <h2 className='text-white m-3'>Ks Chithra Hits</h2>
                <div
                  className="youtube__item__pic"
                  style={{ backgroundImage: 'url(/img/logs/OIP.jpg)', width: "100%", height: "200px", backgroundSize: 'cover', backgroundPosition: 'center' }}
                >
                </div>
                <div className="youtube__item__text">
                  <div className="icons-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h4 style={{ marginRight: '15px' }}><i className='fa fa-calendar'></i>&nbsp; 01/08/2025</h4>
                    <h4><i 
                      className='fa fa-eye' 
                      style={{ cursor: 'pointer' }}
                    ></i></h4>
                  </div>
                  <h4 style={{ marginRight: '15px' }}><i className='fa fa-location-arrow'></i> &nbsp; Infosys park, Trivandrum</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
