import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import Text from './Text';
import VideoContainer from './Videocontainer';
import { primary as get } from '../../store/action/primaryActions';

const variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

const Video = ({ createME, data: uploadedVideos, recent }) => {
  useEffect(() => {
    if (!uploadedVideos) createME();
  }, [createME, uploadedVideos]);
  return (
    <motion.div
      className="container"
      initial="hidden"
      animate="visible"
      variants={variants}
    >
      <Helmet>
        <title>Remusic Media - Watch videos</title>
        <link rel="canonical" href="https://remusic.media/" />
      </Helmet>
      <Text>RECENT UPLOADS</Text>
      {recent && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={variants}
          className="marginLeft"
        >
          <VideoContainer
            id={recent.id}
            thumbnail={recent.thumbnail_photo}
            profile={recent.photoURL}
            title={recent.title}
            time={recent.time}
          />
        </motion.div>
      )}
      <Text>ALL VIDEOS</Text>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={variants}
        className="vidoiContainer"
      >
        {uploadedVideos &&
          uploadedVideos.map((da) => {
            const {
              thumbnail_photo: thumbnailPhoto,
              photoURL,
              title,
              time,
            } = da.data();
            return (
              <VideoContainer
                key={da.id}
                id={da.id}
                thumbnail={thumbnailPhoto}
                profile={photoURL}
                title={title}
                time={time}
              />
            );
          })}
      </motion.div>
      <br />
      <br />
      <br />
    </motion.div>
  );
};
const mapStateToProps = (state) => {
  const { primary } = state;
  return {
    primarys: primary,
    data: primary.data,
    recent: primary.recent,
  };
};

const mapDispatchToProps = (dispatch) => ({
  createME: () => dispatch(get()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Video);

// TypeChecking
Video.propTypes = {
  createME: PropTypes.func.isRequired,
  primarys: PropTypes.shape({
    thumbnail: PropTypes.string.isRequired,
    profile: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      thumbnail_photo: PropTypes.string,
      photoURL: PropTypes.string,
      title: PropTypes.string,
      time: PropTypes.number,
      map: PropTypes.func,
    }),
  ),
  recent: PropTypes.shape({
    thumbnail_photo: PropTypes.string.isRequired,
    photoURL: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    time: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
  }),
};

// default proptypes
Video.defaultProps = {
  data: undefined,
  recent: undefined,
};
