// src/components/Form.js
import React from 'react';
import ViewshedTool from './Viewshed';
import BufferTool from './Buffer';
import LineOfSightTool from './LineOfSight';
import RangeRingsTool from './RangeRings';
import Eptool from './Eptool';
import Routing from './routing';

const Form = ({ activeTool, setActiveTool, 
  setViewshedParams, clickedCoordinates,
  setBufferParams, setLineOfSightParams, 
  setRangeRingsParams, setEpToolParams,
  setElevationData, setRoutingParams
}) => {
  const handleClose = () => {
    setActiveTool(null); // Close the form by setting activeTool to null
  };

  return (
    <div className={`modal ${activeTool ? 'active' : ''}`}>
      <div className="modal-content">
        {activeTool === 'Viewshed' && (
          <ViewshedTool 
            setViewshedParams={setViewshedParams} 
            clickedCoordinates={clickedCoordinates} 
            onClose={handleClose} 
          />
        )}

        {activeTool === 'Buffer' && (
          <BufferTool 
            setBufferParams={setBufferParams} 
            clickedCoordinates={clickedCoordinates} 
            onClose={handleClose} 
          />
        )}

        {activeTool === 'Line of Sight' && (
          <LineOfSightTool 
            setLineOfSightParams={setLineOfSightParams} 
            clickedCoordinates={clickedCoordinates}
            onClose={handleClose} 
          />
        )}

        {activeTool === 'Range Rings' && (
          <RangeRingsTool 
            setRangeRingsParams={setRangeRingsParams} 
            clickedCoordinates={clickedCoordinates} 
            onClose={handleClose} 
          />
        )}

        {activeTool === 'Elevation Profile' && (
          <Eptool
            setEpToolParams={setEpToolParams}
            clickedCoordinates={clickedCoordinates}
            setElevationData={setElevationData} 
            onClose={handleClose} 
          />
        )}

        {activeTool === 'Shortest Route' && (
          <Routing
            setRoutingParams={setRoutingParams}
            clickedCoordinates={clickedCoordinates}
            onClose={handleClose}
          />
        )}
      </div>
    </div>
  );
};

export default Form;
