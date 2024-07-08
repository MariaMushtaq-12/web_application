import React from 'react';
import ViewshedTool from './Viewshed'; // Ensure this is the correct path to the Viewshed component
import BufferTool from './Buffer'; // Ensure this is the correct path to the Buffer component
import LineOfSightTool from './LineOfSight';
import RangeRingsTool from './RangeRings';
const Form = ({ activeTool, setActiveTool, setViewshedParams, clickedCoordinates,setBufferParams, setLineOfSightParams, setRangeRingsParams }) => {
  const handleClose = () => {
    setActiveTool(null); // Close the form by setting activeTool to null
  };

  return (
    <div className={`modal ${activeTool ? 'active' : ''}`}>
      <div className="modal-content">
       
        <h3>{activeTool}</h3>
        {activeTool === 'Viewshed' && (
          <ViewshedTool 
            setViewshedParams={setViewshedParams} 
            clickedCoordinates={clickedCoordinates} // Pass clickedCoordinates
          />
        )}


{activeTool === 'Buffer' && (
          <BufferTool 
            setBufferParams={setBufferParams} 
            clickedCoordinates={clickedCoordinates} // Pass clickedCoordinates
          />
        )}

{activeTool === 'Line of Sight' && (
          <LineOfSightTool 
            setLineOfSightParams={setLineOfSightParams} 
            clickedCoordinates={clickedCoordinates}
          />
        )}

{activeTool === 'Range Rings' && (
          <RangeRingsTool 
            setRangeRingsParams={setRangeRingsParams} 
            clickedCoordinates={clickedCoordinates} 
          />
        )}

        {/* Add more conditions for other tools if needed */}

        <button className="close-btn" onClick={handleClose}>Close</button>
      </div>
    </div>
  );
};

export default Form;
