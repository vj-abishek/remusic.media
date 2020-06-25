import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
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

  return loading ? (
    <div
      style={{
        maxWidth: '680px',
        maxHeight: '380px',
        width: '100%',
        background: '#000',
        minHeight: '180px',
      }}
    />
  ) : (
    <>
      <div style={{ maxWidth: '680px', maxHeight: '380px' }}>
        <Player poster={poster} className="player-wrapper" autoPlay src={url}>
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
