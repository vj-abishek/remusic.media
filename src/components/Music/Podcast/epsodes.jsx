import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Layout from './Layout';
import { get, Music } from '../../../store/action/style';
import Singleepiside from './helper/Singleepiside';

const Episodes = ({ setStyle, Music }) => {
  const [value, setValue] = useState();

  useEffect(() => {
    fetch('https://remusic.media/api/podcast')
      .then((res) => res.json())
      .then((data) => {
        setValue(data);
      });
  }, []);

  useEffect(() => {
    setStyle(true);
    return () => {
      setStyle(false);
    };
  }, [setStyle]);

  const handleCick = (e) => {
    const { id } = e.target.dataset;
    if (id !== undefined) {
      const singleSong = value.find((v) => v.id === Number(id));
      Music(singleSong);
    }
  };

  return (
    <div style={{ width: '100vw' }}>
      <div
        style={{
          background: 'linear-gradient(rgb(41,58,51),rgb(0,0,0))',
        }}
      >
        <Layout />
      </div>
      <div style={{ background: '#000', width: '100%' }}>
        <div className=" episodesContainer">
          <h1>All episodes</h1>
          <div className="wholeContainer">
            {value &&
              value.map((data) => {
                const regex = /(<([^>]+)>)/gi;
                const string = data.description;
                const desc = string.replace(regex, '');
                // console.log(desc);
                return (
                  <Singleepiside
                    funcToClick={handleCick}
                    key={data.id}
                    id={data.id}
                    title={data.title}
                    desc={desc}
                    time={data.published_at}
                  />
                );
              })}
          </div>
        </div>
      </div>
      <div
        style={{
          paddingBottom: '70px',
          backgroundColor: '#000',
        }}
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setStyle: (cond) => dispatch(get(cond)),
  Music: (musicJson) => dispatch(Music(musicJson)),
});

export default connect(null, mapDispatchToProps)(Episodes);

// Proptypes
Episodes.propTypes = {
  setStyle: PropTypes.func.isRequired,
  Music: PropTypes.func.isRequired,
};
