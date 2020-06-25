import React from 'react';
import PropTypes from 'prop-types';
import Player from './Player';

export default function Mini({
  isPlaying,
  playerJson,
  clickMusic,
  PlayerRef,
  showPlayer,
  showMainPlayer,
}) {
  const handleClick = () => {
    if (isPlaying) {
      PlayerRef.current.audio.current.pause();
    } else {
      PlayerRef.current.audio.current.play();
    }
  };

  return clickMusic ? (
    <>
      <Player
        isPlaying={isPlaying}
        ShowPlayer={showMainPlayer}
        playerJson={playerJson}
      />
      <div className="mini">
        <div className="mini_image_container">
          <button
            style={{
              backgroundColor: 'transparent',
              padding: '0px',
              border: '0px',
              outline: 'none',
            }}
            type="button"
            className="ark_work"
            onClick={showPlayer}
          >
            {playerJson.artwork_url ? (
              <img
                src={playerJson.artwork_url}
                width="45px"
                height="45px"
                alt=""
              />
            ) : (
              <div className="placeholder" />
            )}
          </button>
        </div>
        <button
          type="button"
          className="mini_title"
          title={playerJson.title}
          onClick={showPlayer}
        >
          <span>{playerJson.title}</span>
          <span>Elisha</span>
        </button>
        <div className="mini_play_pause">
          <button type="button" className="button" onClick={handleClick}>
            {isPlaying ? (
              <svg
                title="Pause"
                fill="#fff"
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                version="1.1"
              >
                <defs />
                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                  <g
                    transform="translate(-280.000000, -239.000000)"
                    fill="#000000"
                    fillRule="nonzero"
                  >
                    <g transform="translate(20.000000, 213.000000)">
                      <g transform="translate(260.000000, 26.000000)">
                        <path
                          className="fill_path"
                          d="M14,19 L18,19 L18,5 L14,5 L14,19 Z M6,19 L10,19 L10,5 L6,5 L6,19 Z"
                        />
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            ) : (
              <svg
                title="play"
                fill="#334B6E"
                width="24"
                height="24"
                viewBox="0 0 20 24"
              >
                <path
                  className="fill_path"
                  fillRule="evenodd"
                  d="M0 0v24l20-12z"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </>
  ) : (
    ''
  );
}

// Default Props
Mini.defaultProps = {
  isPlaying: false,
  clickMusic: false,
  playerJson: {},
  PlayerRef: null,
  showPlayer: PropTypes.func,
  showMainPlayer: false,
};

Mini.propTypes = {
  isPlaying: PropTypes.bool,
  clickMusic: PropTypes.bool,
  showMainPlayer: PropTypes.bool,
  playerJson: PropTypes.shape({
    artist: PropTypes.string,
    artwork_url: PropTypes.string,
    audio_url: PropTypes.string,
    description: PropTypes.string,
    duration: PropTypes.number,
    id: PropTypes.number,
    title: PropTypes.string,
  }),
  PlayerRef: PropTypes.shape({
    current: PropTypes.any,
  }),
  showPlayer: PropTypes.func,
};
