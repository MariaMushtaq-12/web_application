import React from 'react';
import ViewshedTool from './Viewshed'; // Ensure this is the correct path to the Viewshed component
import BufferTool from './Buffer'; // Ensure this is the correct path to the Buffer component
import LineOfSightTool from './LineOfSight';
import RangeRingsTool from './RangeRings';
import Eptool from './Eptool';
const Form = ({ activeTool, setActiveTool, 
  setViewshedParams, clickedCoordinates,
  setBufferParams, setLineOfSightParams, 
  setRangeRingsParams,setEpToolParams,
  setElevationData // Add this prop
  }) => {
  const handleClose = () => {
    setActiveTool(null); // Close the form by setting activeTool to null
  };

  return (
    <div className={`modal ${activeTool ? 'active' : ''}`}>
      <div className="modal-content">
       
       {/* <h3>{activeTool}</h3>*/}
        {activeTool === 'Viewshed' && (
          <ViewshedTool 
            setViewshedParams={setViewshedParams} 
            clickedCoordinates={clickedCoordinates} // Pass clickedCoordinates
            onClose={handleClose} // Pass the close handler to viewshed tool
          />
        )}


{activeTool === 'Buffer' && (
          <BufferTool 
            setBufferParams={setBufferParams} 
            clickedCoordinates={clickedCoordinates} // Pass clickedCoordinates
            onClose={handleClose} // Pass the close handler to BufferTool
          />
        )}

{activeTool === 'Line of Sight' && (
          <LineOfSightTool 
            setLineOfSightParams={setLineOfSightParams} 
            clickedCoordinates={clickedCoordinates}
            onClose={handleClose} // Pass the close handler to line of sight
          />
        )}

{activeTool === 'Range Rings' && (
          <RangeRingsTool 
            setRangeRingsParams={setRangeRingsParams} 
            clickedCoordinates={clickedCoordinates} 
            onClose={handleClose} // Pass the close handler to range ringsTool
          />
        )}
  {activeTool === 'Elevation Profile' && (
          <Eptool
            setEpToolParams={setEpToolParams}
            clickedCoordinates={clickedCoordinates}
            setElevationData={setElevationData} // Pass this prop
            onClose={handleClose} // Pass the close handler to elevation profile
          />
        )}
        {/* 
        Add more conditions for other tools if needed */}

      </div>
    </div>
  );
};

export default Form;
