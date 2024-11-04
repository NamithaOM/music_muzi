import React, { useState, useEffect } from 'react';
import Signin from './Admin/Signin';
import Signup from './Admin/Signup';
import Header from './Admin/Header';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Genre from './Admin/Genre';
import Addgenre from './Admin/Addgenre';
import Artist from './Admin/Artist';
import Editgenre from './Admin/Editgenre';
import AdminHome from './Admin/AdminHome';
import ArtistHome from './Artist.js/ArtistHome';
import ArtistHeader from './Artist.js/ArtistHeader';
import Addmusic from './Artist.js/Addmusic';
import ViewMusics from './Artist.js/ViewMusics';
import Playmusic from './User/PlayMusic'
import Payment from './User/Payment';
import Landing from './User/Landing';
import Home from './User/Home';
import Adds from './Admin/Adds';
import ArtistList from './Admin/ArtistList';
import ViewAdds from './Admin/ViewAdds';
import Subscriber from './User/Subscriber';
import Head from './User/Head';
import About from './User/About';
import Contact from './User/Contact';
import Favorites from './User/Favorites';
import Share from './User/ShareList';
import Genres from './User/Genres';
import GenreMusic from './User/GenreMusic';
import Profile from './User/Profile';
import Profiles from './Artist.js/Profiles';
import Viewcomment from './Artist.js/ViewCommand';
import Events from './Admin/Events';
import ViewEvent from './Admin/ViewEvent';
import EditEvent from './Admin/EditEvent';
import NewEvents from './User/NewEvents';
import FriendsList from './User/FriendsList';
import Follow from './User/Follow';
import ArtistCollection from './User/ArtistCollection';
import FollowedList from './Artist.js/FollowedList';
import Eve from './User/Eve';
import Recommended from './User/Recommended';
function App() {
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("userdata")));

  return (
    <>
      <BrowserRouter>
        {auth === null ? (
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/register' element={<Signup />} />
            <Route path='/login' element={<Signin />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/eve' element={<Eve />} />

          </Routes>
        ) : auth.userstatus === 0 ? (
          <Routes>
            <Route path='/' element={<AdminHome />} />
            <Route path='header' element={<Header />} />
            <Route path='/genre' element={<Genre />} />
            <Route path="/addgenre" element={<Addgenre />} />
            <Route path='/artist' element={<Artist />} />
            <Route path='/editgenre' element={<Editgenre />} />
            <Route path='/adds' element={<Adds />} />
            <Route path='/artistlist' element={<ArtistList />} />
            <Route path='/viewadds' element={<ViewAdds />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/addevents' element={<Events />} />
            <Route path='/viewevents' element={<ViewEvent />} />
            <Route path='/editevents' element={<EditEvent />} />

            
          </Routes>


        ) : auth.userstatus === 2 && auth.payment === 0 ? (
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/head' element={<Head />} />
            {/* <Route path='/addmusic' element={<Addmusic />} /> */}
            <Route path='/playlist' element={<Playmusic />} />
            <Route path='/payment' element={<Payment />} />
            {/* <Route path='/subscriber' element={<Subscriber/>}/> */}
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/group' element={<Genres/>}/>
            <Route path='/genremusic' element={<GenreMusic/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/newevent' element={<NewEvents />} />
            <Route path='/follow' element={<Follow />} />
            <Route path='/share' element={<Share />} />

          </Routes>

        ) : auth.userstatus === 2 && auth.payment === 1 ? (
          <Routes>
            <Route path='/head' element={<Head />} />
            {/* <Route path='/addmusic' element={<Addmusic />} /> */}
            <Route path='/playlist' element={<Playmusic />} />
            <Route path='/' element={<Subscriber />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/favorites' element={<Favorites />} />
            <Route path='/share' element={<Share />} />
            <Route path='/group' element={<Genres/>}/>
            <Route path='/genremusic' element={<GenreMusic/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/newevent' element={<NewEvents />} />
            <Route path='/friends' element={<FriendsList />} />
            <Route path='/follow' element={<Follow />} />
            <Route path='/viewcollection' element={<ArtistCollection />} />
            <Route path='/recom' element={<Recommended />} />


          </Routes>
        ) : auth.userstatus === 1 ? (
          <>
            <Routes>

              <Route path='/' element={<ArtistHome />} />
              <Route path='/headers' element={<ArtistHeader />} />
              <Route path='/addmusic' element={<Addmusic />} />
              <Route path='/viewmusic' element={<ViewMusics />} />
              <Route path='/profiles' element={<Profiles/>}/>
              <Route path='/viewcomment' element={<Viewcomment />} />
              <Route path='/followers' element={<FollowedList />} />

              
            </Routes>
          </>
        ) : (
          <>
            <Routes>

              <Route path='/' element={<Signin />} />

            </Routes>
          </>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
