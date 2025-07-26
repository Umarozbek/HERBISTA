import React from 'react';
import './Blog.css';

const posts = [
  { date: '30 May | 2025', category: 'Food, flavour', title: "Flavour so good you'll try to eat with your eyes." },
  { date: '25 May | 2025', category: 'Healthy food', title: "Flavour so good you'll try to eat with your eyes." },
  { date: '18 May | 2025', category: 'Recipe', title: "Flavour so good you'll try to eat with your eyes." }
];

const Blog = () => (
  <div className="blog-container">
    <h2>Latest Blog Post</h2>
    <div className="blog-list">
      {posts.map((p, i) => (
        <div className="blog-card" key={i}>
          <p className="blog-date">{p.date}</p>
          <p className="blog-category">{p.category}</p>
          <h3>{p.title}</h3>
        </div>
      ))}
    </div>
  </div>
);

export default Blog; 