import React, { useState, useEffect } from 'react';

const LineOfSightTool = ({ setLineOfSightParams, clickedCoordinates }) => {
  const [startLat, setStartLat] = useState('');
  const [startLon, setStartLon] = useState('');
  const [endLat, setEndLat] = useState('');
  const [endLon, setEndLon] = useState('');
  const [observerHeight, setObserverHeight] = useState('');
  const [targetHeight, setTargetHeight] = useState('');

  useEffect(() => {
    if (clickedCoordinates) {
      if (!startLat && !startLon) {
        setStartLat(clickedCoordinates[1]);
        setStartLon(clickedCoordinates[0]);
      } else {
        setEndLat(clickedCoordinates[1]);
        setEndLon(clickedCoordinates[0]);
      }
    }
  }, [clickedCoordinates]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLineOfSightParams({
      start: [startLon, startLat],
      end: [endLon, endLat],
      observerHeight: parseFloat(observerHeight),
      targetHeight: parseFloat(targetHeight)
    });
  };

  return (
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
      <label>
        Observer Height:
        <input type="number" value={observerHeight} onChange={(e) => setObserverHeight(e.target.value)} />
      </label>
      <label>
        Target Height:
        <input type="number" value={targetHeight} onChange={(e) => setTargetHeight(e.target.value)} />
      </label>
      <button type="submit">Calculate Line of Sight</button>
    </form>
  );
};

export default LineOfSightTool;