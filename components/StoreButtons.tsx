
import React from 'react';
import { APP_STORE_URL, GOOGLE_PLAY_URL } from '../constants';

const StoreButtons: React.FC = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start">
      <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-105 active:scale-95">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" 
          alt="Download on App Store" 
          className="h-12 w-auto"
        />
      </a>
      <a href={GOOGLE_PLAY_URL} target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-105 active:scale-95">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
          alt="Get it on Google Play" 
          className="h-12 w-auto"
        />
      </a>
    </div>
  );
};

export default StoreButtons;
