import './InstagramFeed.css';

const images = [
  '/food_7.png',
  '/food_8.png',
  '/food_9.png',
  '/food_10.png',
  '/food_11.png',
  '/food_12.png',
];

const InstagramFeed = () => (
  <div className="instagram-feed-container">
    <h2>Follow Us <span role="img" aria-label="Instagram">📸</span></h2>
    <div className="instagram-grid">
      {images.map((src, i) => (
        <img src={src} alt={`Instagram ${i+1}`} key={i} />
      ))}
    </div>
  </div>
);

export default InstagramFeed; 