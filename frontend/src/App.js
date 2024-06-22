import React, { useEffect, useState } from 'react';
import './App.css'; // Import the CSS file for styling

function App() {
  const [data, setData] = useState([]);
  const [newUserData, setNewUserData] = useState({
    PersonID: '',
    LastName: '',
    FirstName: '',
    Address: '',
    City: ''
  });

  const [insertionMessage, setInsertionMessage] = useState('');
  
  useEffect(() => {
    fetch('http://localhost:8081/users')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.log(err));
  }, []);

  const handleAddUser = () => {
    fetch('http://localhost:8081/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUserData),
    })
    .then(res => res.json())
    .then(result => {
      console.log(result);
      setInsertionMessage('Data inserted successfully');
    })
    .catch(err => {
      console.error('Error adding user:', err);
      setInsertionMessage('Failed to insert data');
    });
  };

  const handleChange = (e) => {
    setNewUserData({
      ...newUserData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="app-container">
      <h1>User Management</h1>
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Last Name</th>
            <th>First Name</th>
            <th>Address</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, i) => (
            <tr key={i}>
              <td>{d.PersonID}</td>
              <td>{d.LastName}</td>
              <td>{d.FirstName}</td>
              <td>{d.Address}</td>
              <td>{d.City}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className="form-container">
        <h2>Add New User</h2>
        <input type="text" name="PersonID" value={newUserData.PersonID} onChange={handleChange} placeholder="PersonID" />
        <input type="text" name="LastName" value={newUserData.LastName} onChange={handleChange} placeholder="Last Name" />
        <input type="text" name="FirstName" value={newUserData.FirstName} onChange={handleChange} placeholder="First Name" />
        <input type="text" name="Address" value={newUserData.Address} onChange={handleChange} placeholder="Address" />
        <input type="text" name="City" value={newUserData.City} onChange={handleChange} placeholder="City" />
        <button onClick={handleAddUser}>Add User</button>
        <div className="message">{insertionMessage}</div>
      </div>
    </div>
  );
}

export default App;
