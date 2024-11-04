import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

export default function FriendsList() {
  const [auth, setAuth] = useState(() => {
    try {
      const userdata = localStorage.getItem("userdata");
      return userdata ? JSON.parse(userdata) : null;
    } catch (error) {
      console.error("Error parsing userdata:", error);
      return null;
    }
  });
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [friends, setFriends] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3005/Registration/allusers')
      .then((res) => res.json())
      .then((result) => {
        const filteredUsers = result.filter(user => user._id !== auth._id && user.name !== auth.company.name);
        setUsers(filteredUsers);
      })
      .catch(error => console.error('Error fetching users:', error));
  }, [auth]);

  const handleUserSelect = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedUsers(selectedOptions);
  };

  const addFriend = () => {
    const params = {
      userId: auth._id,
      friendid: selectedUsers
    };

    fetch('http://localhost:3005/user/addfriend', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    })
      .then(res => res.json())
      .then(result => {
        navigate('/');
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    if (!auth) return; // Prevent fetch if auth is null
    const userId = { userid: auth._id };

    fetch('http://localhost:3005/user/viewfriends', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userId)
    })
      .then((res) => res.json())
      .then((result) => {
        setFriends(result);
      })
      .catch(error => console.error('Error fetching friends:', error));
  }, [auth]);

  useEffect(() => {
    console.log('Friends State Updated:', friends);
  }, [friends]);

  return (
    <>
    <div className="m-5">
              

     <div className="track spad mb-5 mt-5">
      <h1 className='text-white ml-5'>Friends List</h1>
      </div>
      
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
     
      <div style={{ flex: 1, marginRight: '20px' , marginLeft:'20px' }}>
        <div className='col-12 '>
          <h3 style={{ color: "whitesmoke" }}>Select Users for Friend List</h3>
          <select
            multiple
            name='users'
            id="form2Example1"
            className="form-control custom-select-box"
            onChange={handleUserSelect}
          >
            {users.map((data) => (
              <option key={data._id} value={data._id}>😊 &nbsp; {data.name}</option>
            ))}
          </select>
          <button
            onClick={addFriend}
            style={{ backgroundColor: '#5C2FC2', color: 'white', border: 'none', borderRadius: '5px', padding: '10px 10px', margin: "20px 0" }}
          >
            Add
          </button>
          <div>
            <h4 style={{ color: "whitesmoke" }}>Selected Users:</h4>
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {selectedUsers.length > 0 ? (
                selectedUsers.map(userId => {
                  const user = users.find(user => user._id === userId);
                  return user ? (
                    <li key={userId} className="list-item">
                      {user.name} 😊
                    </li>
                  ) : null;
                })
              ) : (
                <li style={{ color: "whitesmoke" }}>No users selected</li>
              )}
            </ul>
          </div>
        </div>
      </div>

      <div style={{ flex: 1 }}>
        <h3 style={{ color: "whitesmoke" }}>Friend List</h3>
        {friends.length > 0 ? (
          friends.map((data) => (
            <h5 className='text-white' key={data._id}>{data.friendid.name}</h5>
          ))
        ) : (
          <p style={{ color: "whitesmoke" }}>No friends found</p>
        )}
      </div>
    </div>
    </div>
    </>
  );
}
