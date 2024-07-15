import React, { useState, useEffect } from 'react';


const EpTool = ({ setEpToolParams, clickedCoordinates,onClose }) => {
  const [startLat, setStartLat] = useState('');
  const [startLon, setStartLon] = useState('');
  const [endLat, setEndLat] = useState('');
  const [endLon, setEndLon] = useState('');

  useEffect(() => {
    if (clickedCoordinates) {
      if (!startLat && !startLon) {
        setStartLat(clickedCoordinates[1]);
        setStartLon(clickedCoordinates[0]);
       // alert(`Start location set: Lat ${clickedCoordinates[1]}, Lon ${clickedCoordinates[0]}`);
      } else if (!endLat && !endLon) {
        setEndLat(clickedCoordinates[1]);
        setEndLon(clickedCoordinates[0]);
       // alert(`End location set: Lat ${clickedCoordinates[1]}, Lon ${clickedCoordinates[0]}`);
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
      <section className="bg-gray-50 dark:bg-gray-900">
      <div className="w-full bg-gray-600 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
       <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl dark:text-white">
              Elevation Profile
            </h1>
     <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}> 
      <div className="grid grid-cols-2 gap-4">
      <div>
                  <label htmlFor="startLat" className="block mb-2 text-sm font-medium text-white dark:text-white">Start Latitude:</label>
                  <input
                    type="number"
                    id="startLat"
                    value={startLat}
                    onChange={(e) => setStartLat(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter start latitude"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="startLon" className="block mb-2 text-sm font-medium text-white dark:text-white">Start Longitude:</label>
                  <input
                    type="number"
                    id="startLon"
                    value={startLon}
                    onChange={(e) => setStartLon(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter start longitude"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="endLat" className="block mb-2 text-sm font-medium text-white dark:text-white">End Latitude:</label>
                  <input
                    type="number"
                    id="endLat"
                    value={endLat}
                    onChange={(e) => setEndLat(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter end latitude"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="endLon" className="block mb-2 text-sm font-medium text-white dark:text-white">End Longitude:</label>
                  <input
                    type="number"
                    id="endLon"
                    value={endLon}
                    onChange={(e) => setEndLon(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter end longitude"
                    required
                  />
                </div>
</div>

        <button type="submit" className="w-full text-white bg-black  hover:bg-green-500 hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Calculate Line of Sight</button>
        <button onClick={onClose} className="w-full text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-4">
            Close
          </button>
      </form>
</div>
</div>
</section>
    </div>
  );
};

export default EpTool;
