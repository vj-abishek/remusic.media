import React from 'react';
import Elisha from '../../assets/elisha.jpg';

export default function Header() {
  return (
    <div className="porfile_header">
      <div className="image_con">
        <img
          src={Elisha}
          alt="Singer Elisha"
          style={{ width: '100%', height: '100%', borderRadius: '50%' }}
        />
      </div>
      <h1>Elisha Kumar</h1>
      <h6>Singer.Youtuber.Podcaster</h6>
    </div>
  );
}
