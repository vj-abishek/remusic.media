import React from 'react';
import moment from 'moment';
import poster from '../../../../assets/podcast.jpg';

export default function Singleepiside({ funcToClick, title, desc, time, id }) {
  return (
    <div
      data-id={id}
      onClick={funcToClick}
      role="presentation"
      style={{ cursor: 'pointer' }}
      className="podcastAuioContainer"
    >
      <div className="imageNtitleFlex">
        <img data-id={id} src={poster} alt="artwork" />
        <div data-id={id}>{title}</div>
      </div>
      <h2>{desc}</h2>
      <time>Uploaded - {moment(time).fromNow()}</time>
    </div>
  );
}
