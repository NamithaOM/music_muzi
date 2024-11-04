import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

function AdminHome({ children }) {
  return (
    <>
    <Header>
      <div bg-video >
       <video autoPlay muted loop id="bg-video" style={{width:"100%", height:"100%"}}>
          <source src="/img/175864-854230209_tiny.mp4" type="video/mp4" />
        </video>
        </div>
    </Header>
    </>
  );
}

export default AdminHome;
