import React, { useState, useEffect } from 'react';

const RangeRingsTool = ({ setRangeRingsParams, clickedCoordinates }) => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [radius, setRadius] = useState('');
  const [rings, setRings] = useState('');

  useEffect(() => {
    if (clickedCoordinates && clickedCoordinates.length === 2) {
      setLatitude(clickedCoordinates[1].toFixed(6)); // Adjust precision for display
      setLongitude(clickedCoordinates[0].toFixed(6)); // Adjust precision for display
    }
  }, [clickedCoordinates]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (latitude && longitude && radius&&rings) {
      setRangeRingsParams({
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        radius: parseFloat(radius),
        rings:parseInt(rings),
      });
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Latitude:</label>
        <input
          type="number"
          step="any"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Longitude:</label>
        <input
          type="number"
          step="any"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Radius (meters):</label>
        <input
          type="number"
          step="any"
          value={radius}
          onChange={(e) => setRadius(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Number of Rings:</label>
        <input
          type="number"
          step="any"
          value={rings}
          onChange={(e) => setRings(e.target.value)}
          required
        />
      </div>
      <button type="submit">Create Range Rings</button>
    </form>
  );
};

export default RangeRingsTool;

