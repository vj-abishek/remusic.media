import React from 'react';
import { Link } from '@reach/router';

export default function Podcast() {
  return (
    <div className="outer">
      <Link to="podcast">
        <div className="podcast">
          <div className="image" style={{ borderRadius: '8px' }}>
            <img
              src="https://storage.buzzsprout.com/variants/65cmby0417av2uftzi3o6f0i5880/f81607a3cd537406cf0cf506c726bfe2824c5e584c9e9dc5e04e42436c820a79.jpg"
              alt="Agniwsaram Ministries Podcast"
            />
          </div>
          <h1 style={{ textAlign: 'center' }}>Agniswaram Ministries</h1>
        </div>
      </Link>
    </div>
  );
}
