// import React, { useState } from 'react';

// const SearchBar = ({ onJumpToLocation }) => {
//   const [latitude, setLatitude] = useState('');
//   const [longitude, setLongitude] = useState('');

//   const handleJump = () => {
//     if (latitude && longitude) {
//       const lat = parseFloat(latitude);
//       const lon = parseFloat(longitude);
//       if (!isNaN(lat) && !isNaN(lon)) {
//         onJumpToLocation(lat, lon);
//       } else {
//         alert('Please enter valid coordinates.');
//       }
//     }
//   };

//   return (
//     <div className="ml-10 p-4 flex flex-col bg-transparent w-40 h-40">
//       <input 
//         className="w-14 bg-transparent text-green-950"
//         type="text"
//         placeholder="Latitude"
//         value={latitude}
//         onChange={(e) => setLatitude(e.target.value)}
//       />
//       <input
//         className="w-14 bg-transparent text-green-950"
//         type="text"
//         placeholder="Longitude"
//         value={longitude}
//         onChange={(e) => setLongitude(e.target.value)}
//       />
//       <button className="" onClick={handleJump}>Jump to Location</button>
//     </div>
//   );
// };

// export default SearchBar;
