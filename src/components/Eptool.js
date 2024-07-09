import React, { useState, useEffect } from 'react';


const EpTool = ({ setEpToolParams, clickedCoordinates }) => {
  const [startLat, setStartLat] = useState('');
  const [startLon, setStartLon] = useState('');
  const [endLat, setEndLat] = useState('');
  const [endLon, setEndLon] = useState('');

  useEffect(() => {
    if (clickedCoordinates) {
      if (!startLat && !startLon) {
        setStartLat(clickedCoordinates[1]);
        setStartLon(clickedCoordinates[0]);
        alert(`Start location set: Lat ${clickedCoordinates[1]}, Lon ${clickedCoordinates[0]}`);
      } else if (!endLat && !endLon) {
        setEndLat(clickedCoordinates[1]);
        setEndLon(clickedCoordinates[0]);
        alert(`End location set: Lat ${clickedCoordinates[1]}, Lon ${clickedCoordinates[0]}`);
      }
    }
  }, [clickedCoordinates]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (startLat && startLon && endLat && endLon) {
      setEpToolParams({ start: [startLon, startLat], end: [endLon, endLat] });
    } else {
      alert('Please select both start and end points on the map.');
    }
  };

  return (
    <div className="ep-tool">
      <form onSubmit={handleSubmit}>
        <label>
          Start Latitude:
          <input type="number" value={startLat} onChange={(e) => setStartLat(e.target.value)} />
        </label>
        <label>
          Start Longitude:
          <input type="number" value={startLon} onChange={(e) => setStartLon(e.target.value)} />
        </label>
        <label>
          End Latitude:
          <input type="number" value={endLat} onChange={(e) => setEndLat(e.target.value)} />
        </label>
        <label>
          End Longitude:
          <input type="number" value={endLon} onChange={(e) => setEndLon(e.target.value)} />
        </label>
        <button type="submit">Calculate Line of Sight</button>
      </form>
    </div>
  );
};

export default EpTool;
