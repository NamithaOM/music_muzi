import React from "react";
import { Link,useNavigate } from "react-router-dom";

function ArtistHeader({children}) {
    const navigate= useNavigate()
    const logout=()=>{
        localStorage.clear()
        setTimeout(()=>{
            navigate('/')
            window.location.reload();
        },100)
    }
  return (
   

<div className="container-fluid position-relative d-flex p-0">
      
      
     
        <div className="sidebar pe-4 pb-3">
            <nav className="navbar bg-secondary navbar-dark">
                
                <div className="d-flex align-items-center ms-4 mb-4">
                    <div className="position-relative">
                        <img className="rounded-circle" src="img/user.jpg" alt="" style={{width: "40px", height: "40px"}}/>
                        <div className="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1"></div>
                    </div>
                    <div className="ms-3">
                        <h6 className="mb-0">Jhon Doe</h6>
                        <span>Artist</span>
                    </div>
                </div>
                <div className="navbar-nav w-100">
                   
                <Link to="/" className="nav-item nav-link"><i className="fa fa-keyboard me-2"></i>Dashboard</Link> 
                <Link to="/profiles" className="nav-item nav-link"><i className="fa fa-user me-2"></i>Profile</Link> 
                   <Link to="/addmusic" className="nav-item nav-link"><i className="fa fa-th me-2"></i>Add song</Link> 
                   <Link to="/viewmusic" className="nav-item nav-link"><i className="fa fa-keyboard me-2"></i>Music list</Link> 
                   <Link to="/followers" className="nav-item nav-link"><i className="fa fa-star me-2"></i>Followers</Link> 
                   <Link to="/viewcomment" className="nav-item nav-link"><i className="fa fa-message me-2"></i>Comments</Link> 

                </div>
            </nav>
        </div>
   
        <div className="content">
           
            <nav className="navbar navbar-expand bg-secondary navbar-dark sticky-top px-4 py-0">
                <a href="index.html" className="navbar-brand d-flex d-lg-none me-4">
                    <h2 className="text-primary mb-0"><i className="fa fa-user-edit"></i></h2>
                </a>
                
                
                <h2 style={{color:"white"}}>MUzi</h2>

                <div className="navbar-nav align-items-center ms-auto">
                    
                    
                    <div className="nav-item dropdown">
                        <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                            {/* <img className="rounded-circle me-lg-2" src="img/user.jpg" alt="" style="width: 40px; height: 40px;"/> */}
                            <span className="d-none d-lg-inline-flex">Artist</span>
                        </a>
                        <div className="dropdown-menu dropdown-menu-end bg-secondary border-0 rounded-0 rounded-bottom m-0">
                           
                            <a href="#" className="dropdown-item" onClick={logout}>Log Out</a>
                        </div>
                    </div>
                </div>
            </nav>
        
        {children}
        </div>
       
    </div> 
  );
}

export default ArtistHeader;
