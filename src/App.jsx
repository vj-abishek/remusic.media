import React, { Suspense, lazy, useState, useEffect } from 'react';
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
  const [trigger, setTrigger] = useState(false);
  const [updateHappen, setUpdateHappen] = useState(false);
  const [prompt, setPrompt] = useState();

  //listen for update event from the service worker
  useEffect(() => {
    const messages = (e) => {
      console.log(e);
      console.log('Update happen,testing..');
      setUpdateHappen(true);
    };

    if (navigator.serviceWorker) {
      navigator.serviceWorker.ready.then((da) => {
        da.onupdatefound = messages;
      });
    }
    // navigator.serviceWorker.onmessage = messages
  }, [updateHappen]);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setPrompt(e);
      // Update UI notify the user they can install the PWA
      setTrigger(true);
    });
  }, [trigger]);

  const HandleClick = () => {
    // Hide the app provided install promotion
    setTrigger(false);
    // Show the install prompt
    prompt.prompt();
    // Wait for the user to respond to the prompt
    prompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
    });
  };

  const handleCancel = () => setTrigger(false);

  return (
    <div style={{ height: '100%', minHeight: '100vh' }}>
      <div className="paddingLeftIS">
        <main className="mainClass">
          <Bottomnnav />
          {trigger && (
            <Prompt handleClick={HandleClick} Cancel={handleCancel} />
          )}
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
