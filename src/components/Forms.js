import React from 'react';
import ViewshedTool from './Viewshed'; // Ensure this is the correct path to the Viewshed component
import BufferTool from './Buffer'; // Ensure this is the correct path to the Buffer component
import LineOfSightTool from './LineOfSight'; // Ensure this is the correct path to the LineOfSight component
import RangeRingsTool from './RangeRings'; // Ensure this is the correct path to the RangeRings component
import Eptool from './Eptool'; // Ensure this is the correct path to the Eptool component
import PointOfInterest from './PointOfInterest'; // Ensure this is the correct path to the PointOfInterest component

const Form = ({
  activeTool, setActiveTool, 
  setViewshedParams, clickedCoordinates,
  setBufferParams, setLineOfSightParams, 
  setRangeRingsParams, setEpToolParams,
  setElevationData // Add this prop
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
            clickedCoordinates={clickedCoordinates} // Pass clickedCoordinates
            onClose={handleClose} // Pass the close handler to ViewshedTool
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
            clickedCoordinates={clickedCoordinates} // Pass clickedCoordinates
            onClose={handleClose} // Pass the close handler to LineOfSightTool
          />
        )}
        {activeTool === 'Range Rings' && (
          <RangeRingsTool 
            setRangeRingsParams={setRangeRingsParams} 
            clickedCoordinates={clickedCoordinates} // Pass clickedCoordinates
            onClose={handleClose} // Pass the close handler to RangeRingsTool
          />
        )}
        {activeTool === 'Elevation Profile' && (
          <Eptool
            setEpToolParams={setEpToolParams}
            clickedCoordinates={clickedCoordinates} // Pass clickedCoordinates
            setElevationData={setElevationData} // Pass this prop
            onClose={handleClose} // Pass the close handler to Eptool
          />
        )}
        {activeTool === 'Point of Interest' && (
          <PointOfInterest
            clickedCoordinates={clickedCoordinates} // Pass clickedCoordinates
            onClose={handleClose} // Pass the close handler to PointOfInterest
          />
        )}
      </div>
    </div>
  );
};

export default Form;
