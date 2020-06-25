/* eslint-disable react/prop-types */
import React, { useRef, useState, useEffect } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import { connect } from 'react-redux';
import { PlaynPause, SetPlayerRef } from '../../../store/action/style';
import './player.scss';

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

          SetPlayerRefFunc(PlayerRef);
        }}
        onPause={() => {
          PlaynPauseFunc(false);

          // SetPlayerRefFunc(PlayerRef);
        }}
        customAdditionalControls={[]}
        customVolumeControls={[]}
        showSkipControls
        showJumpControls={false}
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
