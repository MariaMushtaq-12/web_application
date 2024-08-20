import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Routing = ({ setRoutingParams, clickedCoordinates, onClose }) => {
  const [startLat, setStartLat] = useState('');
  const [startLon, setStartLon] = useState('');
  const [endLat, setEndLat] = useState('');
  const [endLon, setEndLon] = useState('');
  const [totalDistance, setTotalDistance] = useState('');
  const [totalTime, setTotalTime] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');

  useEffect(() => {
    if (clickedCoordinates) {
      if (!startLat && !startLon) {
        setStartLat(clickedCoordinates[1]);
        setStartLon(clickedCoordinates[0]);
      } else if (!endLat && !endLon) {
        setEndLat(clickedCoordinates[1]);
        setEndLon(clickedCoordinates[0]);
      }
    }
  }, [clickedCoordinates]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (startLat && startLon && endLat && endLon) {
      setRoutingParams({ start: [startLon, startLat], end: [endLon, endLat] });
      fetchRouteDetails(startLon, startLat, endLon, endLat);


      //clear existing fields
      setStartLat('');
      setStartLon('');
      setEndLat('');
      setEndLon('');
    } else {
      alert('Please select both start and end points on the map.');
    }
  };

  const fetchRouteDetails = async (startLon, startLat, endLon, endLat) => {
    const url = `http://192.168.1.200:5003/shortest_path`;
    try {
      const response = await axios.post(url, {
        source_lon: startLon,
        source_lat: startLat,
        dest_lon: endLon,
        dest_lat: endLat
      });
      const geojson = response.data;

      const coordinates = geojson.features.map(feature => feature.geometry.coordinates.reverse());
      
      let totalDistance = 0;
      for (let i = 1; i < coordinates.length; i++) {
        const startPoint = coordinates[i - 1];
        const endPoint = coordinates[i];
        totalDistance += calculateDistance(startPoint, endPoint);
      }

      setTotalDistance(totalDistance.toFixed(2) + " meters");

      const travelTime = totalDistance / 83.3;
      setTotalTime(travelTime.toFixed(0) + " min");

      const currentTime = new Date();
      const newTime = new Date(currentTime.getTime() + travelTime * 60 * 1000);
      setArrivalTime(newTime.toLocaleString());
    } catch (error) {
      console.error("Error loading GeoJSON: ", error);
    }
  };

  const calculateDistance = (startPoint, endPoint) => {
    const [lat1, lon1] = startPoint;
    const [lat2, lon2] = endPoint;

    const toRad = (value) => (value * Math.PI) / 180;

    const R = 6371000; // Radius of the Earth in meters
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance;
  };

  return (
    <div className="ep-tool">
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="w-full bg-gray-600 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl dark:text-white">
              Shortest Distance
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
<div className="flex items-center justify-between">
              <button type="submit" className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 bg-black  hover:bg-green-500 hover:text-gray-900 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Calculate Routing</button>
              <button onClick={onClose} className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                Close
              </button>
              </div>
            </form>

            {totalDistance && (
              <div className="bg-white p-4 mt-4 rounded shadow-sm">
                <h2 className="text-lg font-bold mb-2">Route Details</h2>
                <p><strong>Total Distance:</strong> {totalDistance}</p>
                <p><strong>Total Time:</strong> {totalTime}</p>
                <p><strong>Arrival Time:</strong> {arrivalTime}</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Routing;
