import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Playmusic({ children }) {
  return(""
  // const [musics, setMusics] = useState([]);
  // const [refresh, setRefresh] = useState(0);
  // const [playingMusic, setPlayingMusic] = useState(null);

  // useEffect(() => {
  //   fetch("http://localhost:3005/Artist/viewmusic")
  //     .then((res) => res.json())
  //     .then((result) => {
  //       console.log(result);
  //       setMusics(result);
  //     });
  // }, [refresh]);


  // const playMusic = (musicFile) => {
  //   setPlayingMusic(`http://localhost:3005/music/${musicFile}`);
  // };

  // return (
  //   <UserHeader>
  //     <div className="container-fluid pt-4 px-4">
  //       <div className="row g-4">
  //         <div className="col-sm-12 col-xl-12">
  //           <div className="bg-secondary rounded h-100 p-4">
  //             <h6 className="mb-4">Music list</h6>

  //             <table className="table">
  //               <thead>
  //                 <tr>
  //                   <th scope="col">SI.NO</th>
  //                   <th scope="col">Music</th>
  //                   <th scope="col">Cost</th>
  //                   <th scope="col">Action</th>
  //                 </tr>
  //               </thead>
  //               <tbody>
  //                 {musics.map((items, index) => (
  //                   <tr key={index}>
  //                     <td>{index + 1}</td>
  //                     <td>{items.music}</td>
  //                     <td>{items.amount}</td>
  //                     <td>
  //                       <button
  //                         type="button"
  //                         onClick={() => playMusic(items.music)}
  //                         className="btn btn-outline-success m-2"
  //                       >
  //                         Play
  //                       </button>
                    
  //                     </td>
  //                   </tr>
  //                 ))}
  //               </tbody>
  //             </table>

  //             {playingMusic && (
  //               <div>
  //                 <h6 className="mt-4">Now Playing:</h6>
  //                 <audio controls src={playingMusic} />
  //               </div>
  //             )}
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </UserHeader>
  );
}

export default Playmusic;
