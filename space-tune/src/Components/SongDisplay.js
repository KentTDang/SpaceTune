import React from 'react'

const songDisplay = ({onClose}) => {
  return (
    <div className = "songInfo">
    <div className = "songInfo-content">
      <span className="close" onClick={onClose}>&times;</span>
      <h1>
        song information
      </h1>
    </div>
    </div>
  );
}

export default songDisplay