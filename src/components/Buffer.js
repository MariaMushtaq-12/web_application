import React, { useState, useEffect } from 'react';

const BufferTool = ({ setBufferParams, clickedCoordinates }) => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [radius, setRadius] = useState('');

  useEffect(() => {
    if (clickedCoordinates) {
      setLatitude(clickedCoordinates[1]);
      setLongitude(clickedCoordinates[0]);
    }
  }, [clickedCoordinates]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setBufferParams({
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      radius: parseFloat(radius),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Latitude:</label>
        <input
          type="text"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
        />
      </div>
      <div>
        <label>Longitude:</label>
        <input
          type="text"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
        />
      </div>
      <div>
        <label>Radius (meters):</label>
        <input
          type="text"
          value={radius}
          onChange={(e) => setRadius(e.target.value)}
        />
      </div>
      <button type="submit">Create Buffer</button>
    </form>
  );
};

export default BufferTool;
