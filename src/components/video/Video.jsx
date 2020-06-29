import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import Text from './Text';
import VideoContainer from './Videocontainer';
import Spin from '../../Loaders/Spin';
import Notification from '../Helpers/Notifications';
import { primary as get } from '../../store/action/primaryActions';

const variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

const Video = ({ createME, data: uploadedVideos, recent, loading, error }) => {
  useEffect(() => {
    if (!uploadedVideos) createME();
  }, [createME, uploadedVideos]);
  return loading ? (
    <>
      {/* Show notification in there is an error */}
      {console.log(error)}
      {error && <Notification>Cannot Connect to the internet</Notification>}
      <Spin value="Almost Done..." />
    </>
  ) : (
    <motion.div
      className="container"
      initial="hidden"
      animate="visible"
      variants={variants}
    >
      <Helmet>
        <title>Remusic Media - Watch videos</title>
        <link rel="canonical" href="https://remusic.media/" />
        <link rel="preconnect" href="https://storage.googleapis.com" />
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
    loading: primary.loading,
    primarys: primary,
    data: primary.data,
    recent: primary.recent,
    error: primary.error,
  };
};

const mapDispatchToProps = (dispatch) => ({
  createME: () => dispatch(get()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Video);

// TypeChecking
Video.propTypes = {
  createME: PropTypes.func.isRequired,
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
  loading: PropTypes.bool,
  error: PropTypes.bool,
};

// default proptypes
Video.defaultProps = {
  data: undefined,
  recent: undefined,
  loading: false,
  error: false,
};
