import React from 'react';
import './Stats.css';

const stats = [
  { label: 'Monthly Visitors', value: '10,000+' },
  { label: 'Positive Reviews', value: '2,000+' },
  { label: 'Secret Recipes', value: '50+' },
  { label: 'Awards & Honors', value: '12' },
];

const Stats = () => (
  <div className="stats-container">
    <h2>Our Achievements</h2>
    <div className="stats-list">
      {stats.map((s, i) => (
        <div className="stat-card" key={i}>
          <div className="stat-value">{s.value}</div>
          <div className="stat-label">{s.label}</div>
        </div>
      ))}
    </div>
  </div>
);

export default Stats; 