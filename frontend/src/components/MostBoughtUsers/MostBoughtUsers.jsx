import React from 'react';
import './MostBoughtUsers.css';
const users = [
  { id: 1, name: 'Alice Johnson', items: 12, image: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { id: 2, name: 'Bob Smith', items: 8, image: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { id: 3, name: 'Charlie Lee', items: 15, image: 'https://randomuser.me/api/portraits/men/65.jpg' },
  { id: 4, name: 'Diana Prince', items: 10, image: 'https://randomuser.me/api/portraits/women/68.jpg' },
];

const MostBoughtUsers = () => (
  <div className="most-bought-users-container">
    <h2>Most Bought Users</h2>
    <div className="user-grid">
      {users.map(user => (
        <div className="user-card" key={user.id}>
          <img src={user.image} alt={user.name} className="user-avatar" />
          <div className="user-info">
            <div className="user-name">{user.name}</div>
            <div className="user-items">{user.items} items purchased</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default MostBoughtUsers; 