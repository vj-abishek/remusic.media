import React from 'react';
import poster from '../../../assets/podcast.jpg';

export default function Layout() {
  return (
    <div style={{ padding: '20px' }}>
      <div className="podcastMain">
        <div className="image image_podacst">
          <img
            style={{ width: ' 232px', height: ' 232px', borderaRdius: '12px' }}
            src={poster}
            alt="Podcast artwork"
          />
        </div>
        <div className="text_Container_podcast">
          <h1 className="Text_podcast">AgniSwaram Ministries</h1>
          <h2 className="artist">Elisha Kumar</h2>
        </div>
      </div>
    </div>
  );
}
