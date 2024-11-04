import React, { Children } from "react";
import { Link } from "react-router-dom";
import ArtistHeader from "./ArtistHeader";
function ArtistHome({ children }) {
  return (
    <ArtistHeader>
  <video autoPlay muted loop id="bg-video" style={{width:"100%"}}>
          <source src="/img/small.mp4" type="video/mp4" />
        </video>

    </ArtistHeader>
  )
}
export default ArtistHome