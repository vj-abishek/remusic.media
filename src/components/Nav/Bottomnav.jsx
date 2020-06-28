import React from 'react';
import { Link } from '@reach/router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Mini from '../Music/Player/Mini';
import { showPlayer } from '../../store/action/style';
import Logo from '../../assets/remusic.media.svg';

const isActive = ({ isCurrent }) => {
  // its okay to have
  return isCurrent && { className: 'flex_me active' };
};

const Bottomnav = ({
  isPodcast,
  isPlaying,
  playerJson,
  clickMusic,
  PlayerRef,
  sPlayer,
  showMainPlayer,
  isBuffering,
}) => {
  const showPlayerss = () => {
    window.location.hash = '#music';
    sPlayer(true);
  };
  return (
    <>
      <Mini
        isPlaying={isPlaying}
        clickMusic={clickMusic}
        PlayerRef={PlayerRef}
        playerJson={playerJson}
        showPlayer={showPlayerss}
        showMainPlayer={showMainPlayer}
        isBuffering={isBuffering}
      />
      <nav
        style={
          isPodcast
            ? {
                backgroundColor: 'rgb(41, 58, 51)',
                transition: 'background 0.75s ease-out',
              }
            : {
                backgroundColor: '#ee2964',
                transition: 'background 0.75s ease-out',
              }
        }
        className={
          isPodcast
            ? 'nav_main my bottomNAv_forLaptop podcastColor'
            : 'nav_main my bottomNAv_forLaptop myContainer'
        }
      >
        <div
          className={
            isPodcast ? 'flexMAin podcastColor' : 'flexMAin myContainer'
          }
        >
          <div className="hideME navbar-brand container">
            <a className="navbar-item" href="/">
              <img src={Logo} alt="Remusic.media LOGO" />
            </a>
          </div>

          <Link to="/" className="flex_me" getProps={isActive}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#fff"
              width="25"
              height="25"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
            </svg>
            <span className="text">Video</span>
          </Link>

          <Link to="/music" className="flex_me" getProps={isActive}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="25"
              fill="#fff"
              viewBox="0 0 24 24"
              width="25"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M12 3v9.28c-.47-.17-.97-.28-1.5-.28C8.01 12 6 14.01 6 16.5S8.01 21 10.5 21c2.31 0 4.2-1.75 4.45-4H15V6h4V3h-7z" />
            </svg>
            <span className="text">Music</span>
          </Link>

          <Link to="/about" className="flex_me" getProps={isActive}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="25"
              fill="#fff"
              viewBox="0 0 24 24"
              width="25"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 15c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1s1 .45 1 1v4c0 .55-.45 1-1 1zm1-8h-2V7h2v2z" />
            </svg>
            <span className="text">About</span>
          </Link>
        </div>
      </nav>
    </>
  );
};

const mapStateToProps = (state) => {
  const { style } = state;
  return {
    isPodcast: style.is_podcast,
    isPlaying: style.is_playing,
    clickMusic: style.clickMusic,
    playerJson: style.player_json,
    PlayerRef: style.PlayerRef,
    showMainPlayer: style.showMainPlayer,
    isBuffering: style.is_buffering,
  };
};

const mapDispatchToProps = (dispatch) => ({
  sPlayer: (boolean) => dispatch(showPlayer(boolean)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Bottomnav);

// Proptyles
Bottomnav.propTypes = {
  isPodcast: PropTypes.bool,
  isPlaying: PropTypes.bool,
  clickMusic: PropTypes.bool,
  playerJson: PropTypes.shape({
    artist: PropTypes.string,
    artwork_url: PropTypes.string,
    description: PropTypes.string,
    duration: PropTypes.number,
    id: PropTypes.number,
    title: PropTypes.string,
  }),
  PlayerRef: PropTypes.shape({
    current: PropTypes.any,
  }),
  sPlayer: PropTypes.func,
  showMainPlayer: PropTypes.bool,
  isBuffering: PropTypes.bool,
};

Bottomnav.defaultProps = {
  isPodcast: false,
  isPlaying: false,
  clickMusic: false,
  playerJson: {},
  showMainPlayer: false,
  PlayerRef: null,
  sPlayer: PropTypes.func,
  isBuffering: true,
};
