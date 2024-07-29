import React, { useEffect, useState } from 'react';

const PointOfInterest = ({ setPointofInterestParams, clickedCoordinates, onClose, setActiveTool }) => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [radius, setRadius] = useState('');
  const [type, setType] = useState('alpine_hut');
  const [pois, setPois] = useState([]); // State to store the fetched POIs
  const [loading, setLoading] = useState(false); // State to handle loading state
  const [error, setError] = useState(''); // State to handle errors
  
  useEffect(() => {
    if (clickedCoordinates) {
      setLatitude(clickedCoordinates[1].toFixed(6));
      setLongitude(clickedCoordinates[0].toFixed(6));
    }
  }, [clickedCoordinates]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setPois([]); // Reset POIs state before fetching

    const params = {
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      radius: parseFloat(radius),
      type,
    };

    setPointofInterestParams(params);
    const response = await fetch(`http://127.0.0.1:5000/buffer?lat=${params.latitude}&lng=${params.longitude}&radius=${params.radius}&type=${params.type}`);
    if (!response.ok) {
      throw new Error('Failed to fetch POIs');
    }
    const data = await response.json();
    console.log(data)
    setPois(data.points);
    
    // try {
    //   console.log('Fetching data with params:', params);
    //   const response = await fetch(`http://127.0.0.1:5000/buffer?lat=${params.latitude}&lng=${params.longitude}&radius=${params.radius}&type=${params.type}`);
    //   if (!response.ok) {
    //     throw new Error('Failed to fetch POIs');
    //   }
    //   const data = await response.json();
    //   console.log('Data received:', data);
    //   setPois(data.points);
    // } catch (err) {
    //   console.error('Error fetching data:', err);
    //   setError(err.message);
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="w-full bg-gray-600 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl dark:text-white">
            Point of Interest
          </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="lat" className="block mb-2 text-sm font-medium text-white dark:text-white">Latitude:</label>
                <input
                  type="text"
                  id="latitude"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  placeholder="Enter latitude"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="lng" className="block mb-2 text-sm font-medium text-white dark:text-white">Longitude:</label>
                <input
                  type="text"
                  id="longitude"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  placeholder="Enter longitude"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="radius" className="block mb-2 text-sm font-medium text-white dark:text-white">Radius (meters):</label>
                <input
                  type="text"
                  id="radius"
                  value={radius}
                  onChange={(e) => setRadius(e.target.value)}
                  placeholder="Enter radius"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="type" className="block mb-2 text-sm font-medium text-white dark:text-white">Type:</label>
                <select
                  id="type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                >
                  {/* Add all the options here */}
                  <option value="alpine_hut">Alpine Hut</option>
                  <option value="archaeological">Archaeological</option>
                  <option value="arts_centre">Arts Centre</option>
                  <option value="artwork">Artwork</option>
                  <option value="atm">ATM</option>
                  <option value="attraction">Attraction</option>
                  <option value="bakery">Bakery</option>
                  <option value="bank">Bank</option>
                  <option value="bar">Bar</option>
                  <option value="battlefield">Battlefield</option>
                  <option value="beauty_shop">Beauty Shop</option>
                  <option value="beverages">Beverages</option>
                  <option value="bicycle_shop">Bicycle Shop</option>
                  <option value="bookshop">Bookshop</option>
                  <option value="butcher">Butcher</option>
                  <option value="cafe">Cafe</option>
                  <option value="camp_site">Camp Site</option>
                  <option value="car_dealership">Car Dealership</option>
                  <option value="car_wash">Car Wash</option>
                  <option value="castle">Castle</option>
                  <option value="chemist">Chemist</option>
                  <option value="cinema">Cinema</option>
                  <option value="clinic">Clinic</option>
                  <option value="clothes">Clothes</option>
                  <option value="college">College</option>
                  <option value="community_centre">Community Centre</option>
                  <option value="computer_shop">Computer Shop</option>
                  <option value="convenience">Convenience</option>
                  <option value="courthouse">Courthouse</option>
                  <option value="dentist">Dentist</option>
                  <option value="department_store">Department Store</option>
                  <option value="doctors">Doctors</option>
                  <option value="doityourself">Do It Yourself</option>
                  <option value="drinking_water">Drinking Water</option>
                  <option value="embassy">Embassy</option>
                  <option value="fast_food">Fast Food</option>
                  <option value="fire_station">Fire Station</option>
                  <option value="florist">Florist</option>
                  <option value="food_court">Food Court</option>
                  <option value="fort">Fort</option>
                  <option value="fountain">Fountain</option>
                  <option value="furniture_shop">Furniture Shop</option>
                  <option value="garden_centre">Garden Centre</option>
                  <option value="general">General</option>
                  <option value="gift_shop">Gift Shop</option>
                  <option value="golf_course">Golf Course</option>
                  <option value="graveyard">Graveyard</option>
                  <option value="greengrocer">Greengrocer</option>
                  <option value="guesthouse">Guesthouse</option>
                  <option value="hairdresser">Hairdresser</option>
                  <option value="hospital">Hospital</option>
                  <option value="hostel">Hostel</option>
                  <option value="hotel">Hotel</option>
                  <option value="jeweller">Jeweller</option>
                  <option value="kindergarten">Kindergarten</option>
                  <option value="laundry">Laundry</option>
                  <option value="library">Library</option>
                  <option value="mall">Mall</option>
                  <option value="market_place">Market Place</option>
                  <option value="memorial">Memorial</option>
                  <option value="monument">Monument</option>
                  <option value="motel">Motel</option>
                  <option value="museum">Museum</option>
                  <option value="optician">Optician</option>
                  <option value="parking">Parking</option>
                  <option value="pharmacy">Pharmacy</option>
                  <option value="place_of_worship">Place of Worship</option>
                  <option value="police">Police</option>
                  <option value="post_office">Post Office</option>
                  <option value="pub">Pub</option>
                  <option value="restaurant">Restaurant</option>
                  <option value="school">School</option>
                  <option value="stationery">Stationery</option>
                  <option value="supermarket">Supermarket</option>
                  <option value="taxi">Taxi</option>
                  <option value="theatre">Theatre</option>
                  <option value="toilets">Toilets</option>
                  <option value="university">University</option>
                  <option value="veterinary">Veterinary</option>
                  <option value="zoo">Zoo</option>
                </select>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <button type="submit" className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Fetch POIs</button>
              <button type="button" onClick={() => { onClose(); setActiveTool(null); }} className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Close</button>
            </div>
          </form>
          {/* {loading && <p className="text-white">Loading...</p>}
          {error && <p className="text-red-500">{error}</p>} */}
          {/* {pois.length > 0 && (
            <div className="mt-4">
              <h2 className="text-lg font-bold text-white">Points of Interest</h2>
              <ul className="list-disc list-inside text-white">
                {pois.map((poi, index) => (
                  <li key={index}>{poi.name} - {poi.type}</li>
                ))}
              </ul>
            </div>
          )} */}
        </div>
      </div>
    </section>
  );
};

export default PointOfInterest;



// // PointOfInterest.js

// import React, { useEffect, useState } from 'react';

// const PointOfInterest = ({ setPointofInterestParams, clickedCoordinates, onClose, setActiveTool }) => {
//   const [latitude, setLatitude] = useState('');
//   const [longitude, setLongitude] = useState('');
//   const [radius, setRadius] = useState('');
//   const [type, setType] = useState('alpine_hut');
//   const [pois, setPois] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     if (clickedCoordinates) {
//       setLatitude(clickedCoordinates[1].toFixed(6));
//       setLongitude(clickedCoordinates[0].toFixed(6));
//     }
//   }, [clickedCoordinates]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
//     setPois([]);

//     const params = {
//       latitude: parseFloat(latitude),
//       longitude: parseFloat(longitude),
//       radius: parseFloat(radius),
//       type,
//     };

//     setPointofInterestParams(params);

//     try {
//       const response = await fetch(`http://127.0.0.1:5000/buffer?lat=${params.latitude}&lng=${params.longitude}&radius=${params.radius}&type=${params.type}`);
//       if (!response.ok) {
//         throw new Error('Failed to fetch POIs');
//       }
//       const data = await response.json();
//       setPois(data.points);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section className="bg-gray-50 dark:bg-gray-900">
//       <div className="w-full bg-gray-600 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
//         <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
//           <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl dark:text-white">
//             Point of Interest
//           </h1>
//           <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label htmlFor="latitude" className="block mb-2 text-sm font-medium text-white dark:text-white">Latitude:</label>
//                 <input
//                   type="text"
//                   id="latitude"
//                   value={latitude}
//                   onChange={(e) => setLatitude(e.target.value)}
//                   placeholder="Enter latitude"
//                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   required
//                 />
//               </div>
//               <div>
//                 <label htmlFor="longitude" className="block mb-2 text-sm font-medium text-white dark:text-white">Longitude:</label>
//                 <input
//                   type="text"
//                   id="longitude"
//                   value={longitude}
//                   onChange={(e) => setLongitude(e.target.value)}
//                   placeholder="Enter longitude"
//                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   required
//                 />
//               </div>
//             </div>
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label htmlFor="radius" className="block mb-2 text-sm font-medium text-white dark:text-white">Radius (meters):</label>
//                 <input
//                   type="text"
//                   id="radius"
//                   value={radius}
//                   onChange={(e) => setRadius(e.target.value)}
//                   placeholder="Enter radius"
//                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   required
//                 />
//               </div>
//               <div>
//                 <label htmlFor="type" className="block mb-2 text-sm font-medium text-white dark:text-white">Type:</label>
//                 <select
//                   id="type"
//                   value={type}
//                   onChange={(e) => setType(e.target.value)}
//                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   required
//                 >
//                   {/* Add all the options here */}
//                   <option value="alpine_hut">Alpine Hut</option>
//                   <option value="archaeological">Archaeological</option>
//                   <option value="arts_centre">Arts Centre</option>
//                   <option value="artwork">Artwork</option>
//                   <option value="atm">ATM</option>
//                   <option value="attraction">Attraction</option>
//                   <option value="bakery">Bakery</option>
//                   <option value="bank">Bank</option>
//                   <option value="bar">Bar</option>
//                   <option value="beach">Beach</option>
//                   <option value="bus_station">Bus Station</option>
//                   <option value="cafe">Cafe</option>
//                   <option value="camp_site">Camp Site</option>
//                   <option value="car_rental">Car Rental</option>
//                   <option value="car_repair">Car Repair</option>
//                   <option value="council_office">Council Office</option>
//                   <option value="courthouse">Courthouse</option>
//                   <option value="cruise_terminal">Cruise Terminal</option>
//                   <option value="dentist">Dentist</option>
//                   <option value="doctors">Doctors</option>
//                   <option value="embassy">Embassy</option>
//                   <option value="fast_food">Fast Food</option>
//                   <option value="fire_station">Fire Station</option>
//                   <option value="florist">Florist</option>
//                   <option value="fountain">Fountain</option>
//                   <option value="fuel">Fuel</option>
//                   <option value="hospital">Hospital</option>
//                   <option value="hotel">Hotel</option>
//                   <option value="information">Information</option>
//                   <option value="landmark">Landmark</option>
//                   <option value="library">Library</option>
//                   <option value="memorial">Memorial</option>
//                   <option value="monument">Monument</option>
//                   <option value="museum">Museum</option>
//                   <option value="nature_reserve">Nature Reserve</option>
//                   <option value="nightclub">Nightclub</option>
//                   <option value="pharmacy">Pharmacy</option>
//                   <option value="place_of_worship">Place of Worship</option>
//                   <option value="police">Police</option>
//                   <option value="post_office">Post Office</option>
//                   <option value="pub">Pub</option>
//                   <option value="recycling">Recycling</option>
//                   <option value="restaurant">Restaurant</option>
//                   <option value="school">School</option>
//                   <option value="shopping_mall">Shopping Mall</option>
//                   <option value="sports_centre">Sports Centre</option>
//                   <option value="telephone">Telephone</option>
//                   <option value="theatre">Theatre</option>
//                   <option value="toilets">Toilets</option>
//                   <option value="train_station">Train Station</option>
//                   <option value="university">University</option>
//                   <option value="waterfall">Waterfall</option>
//                 </select>
//               </div>
//             </div>
//             <button type="submit" className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
//               {loading ? 'Loading...' : 'Search POIs'}
//             </button>
//             {error && <p className="text-red-600">{error}</p>}
//             <div className="flex items-center justify-between">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
//               >
//                 Close
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setActiveTool(null)}
//                 className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//               >
//                 Switch Tool
//               </button>
//             </div>
//           </form>
//           {pois.length > 0 && (
//             <div className="mt-4">
//               <h2 className="text-lg font-semibold">Found POIs:</h2>
//               <ul className="list-disc list-inside">
//                 {pois.map((poi, index) => (
//                   <li key={index}>{poi.name}</li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default PointOfInterest;
