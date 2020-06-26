import React from 'react';
import { Helmet } from 'react-helmet';
import Main from './Layout/Main';

export default function Music() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Remusic media - Listen to music</title>
        <link rel="canonical" href="https://remusic.media/music" />
      </Helmet>
      <Main />
    </>
  );
}
