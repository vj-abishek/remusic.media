import React from 'react';
import moment from 'moment';
import { Link } from '@reach/router';
import PropTypes from 'prop-types';

export default function Videocontainer({
  id,
  profile,
  thumbnail,
  title,
  time,
}) {
  const handleLoad = (e) => {
    e.target.style.filter = 'blur(0px)';
  };

  return (
    <Link className="margin" to={`/${id}`}>
      <div className="video_contaiern_for_blah">
        <figure className="imagess">
          <img
            alt={title}
            title={title}
            className="img"
            style={{
              filter: 'blur(5px)',
              transition: '.75 -webkit-filter linear',
            }}
            src={thumbnail}
            onLoad={handleLoad}
          />
        </figure>
        <div style={{ paddingLeft: '5px', display: 'flex', paddingTop: '5px' }}>
          <div className="image">
            <img
              alt="Elisha"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
              }}
              src={profile}
            />
          </div>
          <div
            style={{
              lineHeight: 1,
              marginTop: '5px',
              marginLeft: '15px',
              fontSize: '14px',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
            }}
          >
            <div>{title}</div>
            <span style={{ fontSize: '10px' }}>Uploaded - </span>
            <time style={{ fontSize: '10px' }}>{moment(time).from()}</time>
          </div>
        </div>
      </div>
    </Link>
  );
}
Videocontainer.propTypes = {
  profile: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
};
