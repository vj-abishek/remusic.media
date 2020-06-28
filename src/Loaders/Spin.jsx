import React from 'react';

export default function Spin({ value }) {
  return (
    <div className="containers">
      <div className="flex">
        <div className="loader" />
      </div>
      <div className="load-text">{value}</div>
    </div>
  );
}

Spin.defaultProps = {
  value: 'Loading...',
};
