import React from 'react';
import './CommonEvents.css';

const events = [
  { id: 1, title: 'Tomato Festival', date: '2024-07-15', description: 'Join us for a celebration of all things tomato! Live music, food stalls, and more.' },
  { id: 2, title: 'Chef Masterclass', date: '2024-08-01', description: 'Learn from our head chef in this exclusive cooking masterclass.' },
  { id: 3, title: 'Family Day', date: '2024-09-10', description: 'Fun activities and special menus for families.' },
];

const CommonEvents = () => (
  <div className="common-events-container">
    <h2>Common Events</h2>
    <div className="events-list">
      {events.map(event => (
        <div className="event-card" key={event.id}>
          <h3>{event.title}</h3>
          <p className="event-date">{event.date}</p>
          <p>{event.description}</p>
        </div>
      ))}
    </div>
  </div>
);

export default CommonEvents; 