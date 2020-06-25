import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Logo from '../../assets/remusic.media.svg';

const Nav = ({ isPodcast }) => {
  return (
    <nav
      className={
        isPodcast ? 'display navbar podcastColor' : 'display navbar myContainer'
      }
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand container">
        <a className="navbar-item" href="/">
          <img src={Logo} alt="Remusic.media LOGO" />
        </a>
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => {
  const { style } = state;
  return {
    isPodcast: style.is_podcast,
  };
};
export default connect(mapStateToProps)(Nav);

// Proptyles
Nav.propType = {
  isPodcast: PropTypes.bool.isRequired,
};
