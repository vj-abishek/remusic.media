import React, { useRef } from 'react';
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
  const thumbnailPhoto = useRef(null);

  return (
    <Link className="margin" to={`watch/${id}`}>
      <div className="video_contaiern_for_blah">
        <figure>
          <img
            alt={title}
            style={{ minWidth: '320px', minHeight: '180px' }}
            ref={thumbnailPhoto}
            src={thumbnail}
          />
          <div style={{ paddingLeft: '5px', display: 'flex' }}>
            <div className="image">
              <img
                alt="Elisha"
                style={{ width: '40px', height: '40px', borderRadius: '50%' }}
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
        </figure>
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
