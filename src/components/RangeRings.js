// import React, { useState, useEffect } from 'react';

// const RangeRingsTool = ({ setRangeRingsParams, clickedCoordinates }) => {
//   const [latitude, setLatitude] = useState('');
//   const [longitude, setLongitude] = useState('');
//   const [radius, setRadius] = useState('');
//   const [rings, setRings] = useState('');

//   useEffect(() => {
//     if (clickedCoordinates && clickedCoordinates.length === 2) {
//       setLatitude(clickedCoordinates[1].toFixed(6)); // Adjust precision for display
//       setLongitude(clickedCoordinates[0].toFixed(6)); // Adjust precision for display
//     }
//   }, [clickedCoordinates]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (latitude && longitude && radius&&rings) {
//       setRangeRingsParams({
//         latitude: parseFloat(latitude),
//         longitude: parseFloat(longitude),
//         radius: parseFloat(radius),
//         rings:parseInt(rings),
//       });
//     } else {
//       alert('Please fill in all fields.');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label>Latitude:</label>
//         <input
//           type="number"
//           step="any"
//           value={latitude}
//           onChange={(e) => setLatitude(e.target.value)}
//           required
//         />
//       </div>
//       <div>
//         <label>Longitude:</label>
//         <input
//           type="number"
//           step="any"
//           value={longitude}
//           onChange={(e) => setLongitude(e.target.value)}
//           required
//         />
//       </div>
//       <div>
//         <label>Radius (meters):</label>
//         <input
//           type="number"
//           step="any"
//           value={radius}
//           onChange={(e) => setRadius(e.target.value)}
//           required
//         />
//       </div>
//       <div>
//         <label>Number of Rings:</label>
//         <input
//           type="number"
//           step="any"
//           value={rings}
//           onChange={(e) => setRings(e.target.value)}
//           required
//         />
//       </div>
//       <button type="submit">Create Range Rings</button>
//     </form>
//   );
// };

// export default RangeRingsTool;

import React, { useState, useEffect } from 'react';

const RangeRingsTool = ({ setRangeRingsParams, clickedCoordinates, onClose }) => {
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
    if (latitude && longitude && radius && rings) {
      setRangeRingsParams({
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        radius: parseFloat(radius),
        rings: parseInt(rings),
      });
    } else {
      alert('Please fill in all fields.');
    }
    //clear existing fields
    setLatitude('');
    setLongitude('');
    setRadius('');
    setRings('');
  
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      
        <div className="w-full bg-gray-600 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl dark:text-white">
              Create Range Rings
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
             

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="latitude" className="block mb-2 text-sm font-medium text-white dark:text-white">Latitude:</label>
                <input
                  type="number"
                  step="any"
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
                  type="number"
                  step="any"
                  id="longitude"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter longitude"
                  required
                />
              </div>
</div>

<div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="radius" className="block mb-2 text-sm font-medium text-white dark:text-white">Radius (meters):</label>
                <input
                  type="number"
                  step="any"
                  id="radius"
                  value={radius}
                  onChange={(e) => setRadius(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter radius"
                  required
                />
              </div>
              <div>
                <label htmlFor="rings" className="block mb-2 text-sm font-medium text-white dark:text-white">Number of Rings:</label>
                <input
                  type="number"
                  step="1"
                  id="rings"
                  value={rings}
                  onChange={(e) => setRings(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter number of rings"
                  required
                />
              </div>
</div>

              <button type="submit" className="w-full text-white bg-black hover:bg-green-500 hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                Create Range Rings
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

export default RangeRingsTool;
