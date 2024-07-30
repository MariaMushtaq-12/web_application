import React, { useEffect, useRef, useState } from 'react';
import 'ol/ol.css';



const PointOfInterest = ({ clickedCoordinates, setPointofInterest, setActiveTool,onClose}) => {
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
    setPointofInterest({
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
            Point of Interest
          </h1>
          <div className="space-y-4 md:space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="lat" className="block mb-2 text-sm font-medium text-white dark:text-white">Latitude:</label>
                <input
                  type="text"
                  id="latitude"
                  value={latitude}
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
                  placeholder="Enter radius"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="type" className="block mb-2 text-sm font-medium text-white dark:text-white">Type:</label>
                <select
                  id="type"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                >
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
            <option value="caravan_site">Caravan Site</option>
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
            <option value="mobile_phone_shop">Mobile Phone Shop</option>
            <option value="monument">Monument</option>
            <option value="motel">Motel</option>
            <option value="museum">Museum</option>
            <option value="nightclub">Nightclub</option>
            <option value="optician">Optician</option>
            <option value="park">Park</option>
            <option value="pharmacy">Pharmacy</option>
            <option value="picnic_site">Picnic Site</option>
            <option value="pitch">Pitch</option>
            <option value="playground">Playground</option>
            <option value="police">Police</option>
            <option value="post_box">Post Box</option>
            <option value="post_office">Post Office</option>
            <option value="prison">Prison</option>
            <option value="restaurant">Restaurant</option>
            <option value="ruins">Ruins</option>
            <option value="school">School</option>
            <option value="shelter">Shelter</option>
            <option value="shoe_shop">Shoe Shop</option>
            <option value="sports_centre">Sports Centre</option>
            <option value="sports_shop">Sports Shop</option>
            <option value="stadium">Stadium</option>
            <option value="stationery">Stationery</option>
            <option value="supermarket">Supermarket</option>
            <option value="swimming_pool">Swimming Pool</option>
            <option value="theatre">Theatre</option>
            <option value="theme_park">Theme Park</option>
            <option value="tourist_info">Tourist Info</option>
            <option value="tower">Tower</option>
            <option value="town_hall">Town Hall</option>
            <option value="toy_shop">Toy Shop</option>
            <option value="travel_agent">Travel Agent</option>
            <option value="university">University</option>
            <option value="veterinary">Veterinary</option>
            <option value="viewpoint">Viewpoint</option>
            <option value="wastewater_plant">Wastewater Plant</option>
            <option value="water_tower">Water Tower</option>
            <option value="wayside_shrine">Wayside Shrine</option>
            <option value="zoo">Zoo</option>
                </select>
              </div>
            </div>
            <button type='submit' className="w-full text-white bg-black hover:bg-green-500 hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
              Create Buffer
            </button>
            <button onClick={onClose} className="w-full text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-4">
            Close
          </button>
          </div>
        </div>
      </div>
     
    </section>
  );
};

export default PointOfInterest;
