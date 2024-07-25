// src/components/Form.js
import React from 'react';
import ViewshedTool from './Viewshed';
import BufferTool from './Buffer';
import LineOfSightTool from './LineOfSight';
import RangeRingsTool from './RangeRings';
import Eptool from './Eptool';
import Routing from './routing';
import Draggable from 'react-draggable'; // Import Draggable
import { FaWindowClose } from 'react-icons/fa';
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
    <Draggable handle=".modal-header">
    <div className={`modal ${activeTool ? 'active' : ''}`}>
      <div className="modal-content">

     
          <div className="p-4">
          
          <div className="modal-header cursor-move bg-gray-100 dark:bg-green-500 p-1 rounded-t-lg flex justify-end">
          <FaWindowClose className="text-red-600 hover:text-red-900" onClick={handleClose}/>
          </div>
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
    </div>
    </Draggable>
  );
};

export default Form;
