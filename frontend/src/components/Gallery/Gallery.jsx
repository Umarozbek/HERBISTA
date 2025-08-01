import React, { useState } from 'react';
import './Gallery.css';

const images = [
  { src: '/src/assets/food_1.png', name: 'Classic Greek Salad' },
  { src: '/src/assets/food_2.png', name: 'Garden Veggie Bowl' },
  { src: '/src/assets/food_3.png', name: 'Clover Avocado Toast' },
  { src: '/src/assets/food_4.png', name: 'Chicken Teriyaki Bowl' },
];

const Gallery = () => {
  const [likedItems, setLikedItems] = useState(new Set());
  const [savedItems, setSavedItems] = useState(new Set());

  const handleLike = (index) => {
    const newLikedItems = new Set(likedItems);
    if (newLikedItems.has(index)) {
      newLikedItems.delete(index);
    } else {
      newLikedItems.add(index);
    }
    setLikedItems(newLikedItems);
  };

  const handleSave = (index) => {
    const newSavedItems = new Set(savedItems);
    if (newSavedItems.has(index)) {
      newSavedItems.delete(index);
    } else {
      newSavedItems.add(index);
    }
    setSavedItems(newSavedItems);
  };

  const handleShare = (image) => {
    if (navigator.share) {
      navigator.share({
        title: image.name,
        text: `Check out this delicious ${image.name}!`,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(`${image.name} - ${window.location.href}`);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="gallery-container">
      <h2>Photo Gallery</h2>
      <div className="gallery-grid">
        {images.map((img, i) => (
          <div className="gallery-card" key={i}>
            <div className="gallery-img-wrapper">
              <img src={img.src} alt={`Gallery ${i+1}`} />
              <div className="gold-shine"></div>
            </div>
            <div className="gallery-meal-name">{img.name}</div>
            <div className="gallery-actions">
              <button 
                className={`gallery-btn ${likedItems.has(i) ? 'liked' : ''}`} 
                title="Like"
                onClick={() => handleLike(i)}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </button>
              <button 
                className={`gallery-btn ${savedItems.has(i) ? 'saved' : ''}`} 
                title="Save"
                onClick={() => handleSave(i)}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
                </svg>
              </button>
              <button 
                className="gallery-btn" 
                title="Share"
                onClick={() => handleShare(img)}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/>
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery; 