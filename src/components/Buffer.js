// import React, { useState, useEffect } from 'react';

// const BufferTool = ({ setBufferParams, clickedCoordinates }) => {
//   const [latitude, setLatitude] = useState('');
//   const [longitude, setLongitude] = useState('');
//   const [radius, setRadius] = useState('');

//   useEffect(() => {
//     if (clickedCoordinates) {
//       setLatitude(clickedCoordinates[1]);
//       setLongitude(clickedCoordinates[0]);
//     }
//   }, [clickedCoordinates]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setBufferParams({
//       latitude: parseFloat(latitude),
//       longitude: parseFloat(longitude),
//       radius: parseFloat(radius),
//     });
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label>Latitude:</label>
//         <input
//           type="text"
//           value={latitude}
//           onChange={(e) => setLatitude(e.target.value)}
//         />
//       </div>
//       <div>
//         <label>Longitude:</label>
//         <input
//           type="text"
//           value={longitude}
//           onChange={(e) => setLongitude(e.target.value)}
//         />
//       </div>
//       <div>
//         <label>Radius (meters):</label>
//         <input
//           type="text"
//           value={radius}
//           onChange={(e) => setRadius(e.target.value)}
//         />
//       </div>
//       <button type="submit">Create Buffer</button>
//     </form>
//   );
// };

// export default BufferTool;


import React, { useState, useEffect } from 'react';

const BufferTool = ({ setBufferParams, clickedCoordinates, setActiveTool,  onClose   }) => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [radius, setRadius] = useState('');

  useEffect(() => {
    if (clickedCoordinates) {
      setLatitude(clickedCoordinates[1].toFixed(6)); // Set latitude
      setLongitude(clickedCoordinates[0].toFixed(6)); // Set longitude
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
  const handleClose = () => {
    setActiveTool(null);
  };
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
    
        <div className="w-full bg-gray-600 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl dark:text-white">
              Buffer Tool
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4"> 
              <div>
                <label htmlFor="latitude" className="block mb-2 text-sm font-medium text-white dark:text-white">Latitude:</label>
                <input
                  type="text"
                  id="latitude"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter latitude"
                  required
                />
              </div>
              <div>
                <label htmlFor="longitude" className="block mb-2 text-sm font-medium text-white dark:text-white">Longitude:</label>
                <input
                  type="text"
                  id="longitude"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter longitude"
                  required
                />
              </div>
              </div>
              <div>
                <label htmlFor="radius" className="block mb-2 text-sm font-medium text-white dark:text-white">Radius (meters):</label>
                <input
                  type="text"
                  id="radius"
                  value={radius}
                  onChange={(e) => setRadius(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter radius"
                  required
                />
              </div>
              <button type="submit" className="w-full text-white bg-black  hover:bg-green-500 hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                Create Buffer
              </button>
              <button onClick={onClose} className="w-full text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-4">
            Close
          </button>
            </form>
          </div>
        </div>
     
    </section>
  );
};

export default BufferTool;
