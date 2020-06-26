import React from 'react';
import { Helmet } from 'react-helmet';
import Header from './Header';
import Content from './Content';

export default function Profile() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Elisha Kumar - Profile</title>
        <link rel="canonical" href="http://remusic.media/about" />
        <link
          rel="stylesheet"
          href="https://unicons.iconscout.com/release/v2.1.9/css/unicons.css"
        />
      </Helmet>
      <Header />
      <div className="container">
        <Content />
      </div>
      <br />
      <br />
      <br />
      <br />
    </>
  );
}
