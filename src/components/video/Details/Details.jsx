import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import {
  Player,
  BigPlayButton,
  ControlBar,
  ReplayControl,
  ForwardControl,
  VolumeMenuButton,
} from 'video-react';
import moment from 'moment';
import PropTypes from 'prop-types';
import './videostyle.scss';
import { getById } from '../../../store/action/primaryActions';

const Details = ({ single, id, getByid }) => {
  const [url, setURL] = useState(null);
  const [poster, setPoster] = useState();
  const [titles, setTitle] = useState('');
  const [descriptions, setDescription] = useState('');
  const [times, setTime] = useState();
  const [loading, setLoading] = useState(true);

  // player ref
  const PlayerRef = useRef(null);

  // GET the data
  useEffect(() => {
    getByid(id);
  }, [getByid, id]);

  // set the data
  useEffect(() => {
    try {
      if (single !== undefined && url === null) {
        const singleArray = single.find((v) => v.id === id);
        const finalData = singleArray.data();

        const {
          title,
          time,
          description,
          thumbnail_photo: Poster,
          video,
        } = finalData;
        setURL(video);
        setPoster(Poster);
        setTitle(title);
        setDescription(description);
        setTime(time);
        setLoading(false);
      }
    } catch (err) {
      console.log('I think it is loading..');
      setLoading(true);
    }
  }, [single, url, poster, titles, descriptions, times, loading, id, getByid]);

  // when single is found in the library
  useEffect(() => {}, [single, url, poster, titles, descriptions, times]);

  const handShare = async () => {
    const shareData = {
      title: { titles },
      text: `Watch ${titles} on Remusic Media.
      `,
      url: `https://remusic.media/${id}`,
    };
    try {
      await navigator.share(shareData);
    } catch (err) {
      console.log('Cannot share', err);
    }
  };

  const mediaSession = () => {
    // set mediaSession
    if ('mediaSession' in navigator) {
      /* eslint-disable-next-line */
      navigator.mediaSession.metadata = new MediaMetadata({
        title: titles,
        artwork: [{ src: poster }],
      });

      navigator.mediaSession.setActionHandler('play', () => {
        PlayerRef.current.play();
      });
      navigator.mediaSession.setActionHandler('pause', () => {
        PlayerRef.current.pause();
      });
      navigator.mediaSession.setActionHandler('seekbackward', () => {
        PlayerRef.current.seek(10);
      });
      navigator.mediaSession.setActionHandler('seekforward', () => {
        PlayerRef.current.forward(10);
      });
    }
  };

  return loading ? (
    <div
      style={{
        paddingTop: '56%',
        width: '100%',
        background: '#000',
        minHeight: '180px',
      }}
    />
  ) : (
    <>
      <Helmet>
        <title>{`${titles} - Now Playing`}</title>
        <meta property="og:image" content={poster} />
        <meta property="og:image:secure_url" content={poster} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="300" />
        <meta property="og:image:alt" content={titles} />
      </Helmet>
      <div style={{ maxWidth: '680px', maxHeight: '380px' }}>
        <Player
          ref={PlayerRef}
          poster={poster}
          className="player-wrapper"
          autoPlay
          src={url}
          onPlay={mediaSession}
          onPause={mediaSession}
        >
          <BigPlayButton position="center" />
          <ControlBar autoHide={false}>
            <ReplayControl seconds={10} order={1} />
            <VolumeMenuButton vertical />
            <ForwardControl seconds={10} order={3.2} />
          </ControlBar>
        </Player>
        <div
          style={{
            background: '#120a38',
            padding: '10px',
            color: '#fff',
            borderBottom: '1px solid #10044a',
          }}
        >
          <h2 style={{ color: '#fff' }}>{titles}</h2>
          <h3 style={{ fontSize: '10px' }}>{descriptions}</h3>
          <time style={{ fontSize: '10px' }}>
            Uploaded - {moment(times).from()}
          </time>
          <div>
            <button
              type="button"
              onClick={handShare}
              className="inline_sharing"
            >
              <span className="icon is-small">
                <svg
                  fill="#fff"
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 0 24 24"
                  width="24"
                >
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92zM18 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM6 13c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm12 7.02c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
                </svg>
              </span>

              <div>Share</div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  const { primary } = state;
  return {
    single: primary.original,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getByid: (id) => dispatch(getById(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Details);

Details.propTypes = {
  single: PropTypes.array,
  id: PropTypes.string,
  getByid: PropTypes.func,
};

// default PropTypes
Details.defaultProps = {
  single: undefined,
  id: PropTypes.string,
  getByid: undefined,
};
