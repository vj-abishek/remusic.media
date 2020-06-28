import React, { Suspense, lazy } from 'react';
import { Router } from '@reach/router';
import Loader from './Loaders/Spin';
import './styles/styles.scss';
import Nav from './components/Nav/Nav';
import Bottomnnav from './components/Nav/Bottomnav';
import Player from './components/Music/Player/Player';

// lazy load the component

// eslint-disable-next-line
const Home = lazy(() => import('./components/Home/Home'));
const Music = lazy(() => import('./components/Music/Music'));
const Podcast = lazy(() => import('./components/Music/Podcast/epsodes'));
const About = lazy(() => import('./components/Profile/Profile'));
const Details = lazy(() => import('./components/video/Details/Details'));

function App() {
  return (
    <div style={{ height: '100%', minHeight: '100vh' }}>
      <div className="paddingLeftIS">
        <main className="mainClass">
          <Bottomnnav />

          <section>
            <Nav />
            <Suspense fallback={<Loader />}>
              <Router>
                <Home path="/" />
                <Details path="/:id" />
                <Music path="music" />
                <Podcast path="music/podcast" />
                <Player path="/music/player" />
                <About path="/about" />
              </Router>
            </Suspense>
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
