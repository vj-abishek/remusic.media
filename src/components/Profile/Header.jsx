import React from 'react';
import Elisha from '../../assets/elisha.jpg';

export default function Header() {
  return (
    <div className="porfile_header">
      <div className="image_con">
        <img
          src={Elisha}
          alt="Singer Elisha Kumar"
          title="Singer Elisha Kumar"
          style={{ width: '100vw', height: '100%', borderRadius: '50%' }}
        />
      </div>
      <h1>Elisha Kumar</h1>
      <h6>Singer.Youtuber.Podcaster</h6>
      <div className="social">
        <a href="https://www.facebook.com/elisha.kumar.583" title="facebook">
          <i className="uil uil-facebook-f white" />
        </a>
        <a
          href="https://www.instagram.com/elisha_kumar_official/"
          title="Instagram"
        >
          <i className="uil uil-instagram white" />
        </a>
        <a
          href="https://www.youtube.com/channel/UCcd3q453HIb69xSH4l2_oJw"
          title="AgniSwaram Youtube"
        >
          <i className="uil uil-youtube white" />
          AgniSwaram
        </a>
      </div>
    </div>
  );
}
