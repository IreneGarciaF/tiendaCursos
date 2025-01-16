import React from 'react';
import ReactPlayer from 'react-player';
import './video.css'

const VideoPlayer = () => {
  return (
    <div className="video-container">
      <h2>Vídeo de bienvenida</h2>
      <div className="ReactVideo">
      <ReactPlayer 
        url="https://youtu.be/pqa09f7NaAo?si=fUCbRR9hokAg3Cu8" 
        playing={false} 
        controls={true} 
        width="100%" 
        height="100%" 
      />
      </div>
    </div>
  );
};

export default VideoPlayer;