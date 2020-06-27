/* eslint-disable react/prop-types */
import React, { useRef, useState, useEffect } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { PlaynPause, SetPlayerRef } from '../../../store/action/style';
import './player.scss';
import poster512 from '../../../assets/podcast512x512.png';
import poster256 from '../../../assets/podcast256x256.png';

const Player = ({ playerJson, PlaynPauseFunc, SetPlayerRefFunc }) => {
  const PlayerRef = useRef(null);
  const [display, setDisplay] = useState('none');

  // effect to show and hide the player
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#music') {
        setDisplay('block');
      } else {
        setDisplay('none');
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => {
      window.removeEventListener('hashchange', handleHash);
    };
  }, [display]);

  return (
    <div className="music_player" style={{ display: `${display}` }}>
      <Helmet>
        <meta property="og:audio" content={playerJson.audio_url} />
        <meta property="og:audio:secure_url" content={playerJson.audio_url} />
        <meta property="og:audio:type" content="audio/mpeg" />
        <title>{`${playerJson.title} - Now Playing`}</title>
      </Helmet>
      <header>Now Playing</header>
      <div className="poster_photo">
        <img
          src={playerJson.artwork_url}
          alt="poster"
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </div>
      <AudioPlayer
        ref={PlayerRef}
        className="player_Real"
        autoPlay
        src={playerJson.audio_url}
        onPlay={() => {
          PlaynPauseFunc(true);
          const skipTime = 10;
          // set mediaSession
          if ('mediaSession' in navigator) {
            /* eslint-disable-next-line */
            navigator.mediaSession.metadata = new MediaMetadata({
              title: playerJson.title,
              artist: 'Elisha Kumar',
              album: 'AgniSwaram',
              // artwork: [{ src: playerJson.artwork_url }],
              artwork: [
                { src: poster256, sizes: '256x256', type: 'image/png' },
                { src: poster512, sizes: '512x512', type: 'image/png' },
              ],
            });

            navigator.mediaSession.setActionHandler('play', () => {
              PlayerRef.current.audio.current.play();
            });
            navigator.mediaSession.setActionHandler('pause', () => {
              PlayerRef.current.audio.current.pause();
            });
            navigator.mediaSession.setActionHandler('seekbackward', () => {
              PlayerRef.current.audio.current.currentTime = Math.max(
                PlayerRef.current.audio.current.currentTime - skipTime,
                0,
              );
            });
            navigator.mediaSession.setActionHandler('seekforward', () => {
              PlayerRef.current.audio.current.currentTime = Math.min(
                PlayerRef.current.audio.current.currentTime + skipTime,
                PlayerRef.current.audio.current.duration,
              );
            });
          }
          SetPlayerRefFunc(PlayerRef);
        }}
        onPause={() => {
          PlaynPauseFunc(false);

          // SetPlayerRefFunc(PlayerRef);
        }}
        customAdditionalControls={[]}
        customVolumeControls={[]}
        showSkipControls={false}
        // layout="stacked-reverse"
        // other props here
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  PlaynPauseFunc: (bool) => dispatch(PlaynPause(bool)),
  SetPlayerRefFunc: (ref) => dispatch(SetPlayerRef(ref)),
});

export default connect(null, mapDispatchToProps)(Player);
