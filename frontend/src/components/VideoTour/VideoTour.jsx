import React from 'react';
import './VideoTour.css';
import { assets } from '../../assets/assets';

const VideoTour = () => (
  <div className="video-tour-container">
    <h2>HERBESTA Restaurant Video Tour</h2>
    <div className="video-responsive">
      <video controls autoPlay muted loop style={{ width: '100%', borderRadius: '12px' }}>
        <source src={assets.video_restaurant} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  </div>
);

export default VideoTour; 