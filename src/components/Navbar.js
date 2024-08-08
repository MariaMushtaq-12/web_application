import React, { useState, useEffect } from 'react';
import {
  FaList,
  FaLayerGroup,
  FaRuler,
  FaMapMarkerAlt,
  FaGlobe,
  FaToolbox,
  FaDrawPolygon,
  FaWindowClose,
  FaEraser,
  FaSearch
} from 'react-icons/fa';

import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import { fromLonLat } from 'ol/proj';

const Header = ({ layers, setActiveMeasurement, clearDrawings, onLayerToggle, onJumpToLocation, onPlaceSearch }) => {
  const [activePopup, setActivePopup] = useState(null);
  const [conversionType, setConversionType] = useState(null);
  const [dmsInput, setDmsInput] = useState({ latDegrees: '', latMinutes: '', latSeconds: '', lonDegrees: '', lonMinutes: '', lonSeconds: '' });
  const [decimalInput, setDecimalInput] = useState({ lat: '', lon: '' });
  const [output, setOutput] = useState({ lat: '', lon: '' });
  const [map, setMap] = useState(null);
  const [place, setPlace] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedPlace, setSelectedPlace] = useState('');


  // Function to fetch place suggestions from the API
const fetchPlaceSuggestions = async (cityName) => {
  try {
  const response = await
  fetch(`http://127.0.0.1:5003/search?city_name=${cityName}`);
  const data = await response.json();
  // Assuming the API returns an array of place names
  return data.places || [];
  } catch (error) {
  console.error('Error fetching place suggestions:', error);
  return [];
  }
  };
  const handleSearch = () => {
    onPlaceSearch(place);
    };
    useEffect(() => {
    if (place.length > 2) {
    const fetchSuggestions = async () => {
    const results = await fetchPlaceSuggestions(place);
    setSuggestions(results);
    };
    fetchSuggestions();
    } else {
    setSuggestions([]);
    }
    }, [place]);
    
    const handleSearchClick = () => {
      if (onPlaceSearch) {
        onPlaceSearch(place);
      } else {
       
      }
    };
    
    const handleSuggestionClick = (suggestion) => {
    setPlace(suggestion.name); // Set the input field value to the selected place
    setSuggestions([]); // Clear suggestions after selection
    if (onPlaceSearch) {
    onPlaceSearch(suggestion.name);
    }
    };

  useEffect(() => {
    const mapInstance = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
          })
        })
      ],
      view: new View({
        center: fromLonLat([0, 0]),
        zoom: 2
      })
    });
    setMap(mapInstance);
  }, []);

  const handleIconClick = (popupName) => {
    setActivePopup(activePopup === popupName ? null : popupName);
    setConversionType(null);
    setOutput({ lat: '', lon: '' });
  };

  const handleClosePopup = () => {
    setActivePopup(null);
    setConversionType(null);
    setOutput({ lat: '', lon: '' });
  };

  const handleMeasurementClick = (measurement) => {
    if (measurement === 'clear') {
      clearDrawings();
    } else {
      setActiveMeasurement(measurement);
    }
  };

  const toggleLayer = (layerName) => {
    onLayerToggle(layerName);
  };

  const handleConversionTypeChange = (type) => {
    setConversionType(type);
    setOutput({ lat: '', lon: '' });
  };

  const handleDmsInputChange = (e) => {
    const { name, value } = e.target;
    setDmsInput({ ...dmsInput, [name]: value });
  };

  const handleDecimalInputChange = (e) => {
    const { name, value } = e.target;
    setDecimalInput({ ...decimalInput, [name]: value });
  };

  const convertDmsToDecimal = () => {
    const { latDegrees, latMinutes, latSeconds, lonDegrees, lonMinutes, lonSeconds } = dmsInput;
    const latDecimal = parseFloat(latDegrees) + parseFloat(latMinutes) / 60 + parseFloat(latSeconds) / 3600;
    const lonDecimal = parseFloat(lonDegrees) + parseFloat(lonMinutes) / 60 + parseFloat(lonSeconds) / 3600;
    setOutput({ lat: latDecimal.toFixed(6), lon: lonDecimal.toFixed(6) });
  };

  const convertDecimalToDms = () => {
    const { lat, lon } = decimalInput;

    const convert = (decimal) => {
      const degrees = Math.floor(decimal);
      const minutes = Math.floor((decimal - degrees) * 60);
      const seconds = ((decimal - degrees - minutes / 60) * 3600).toFixed(2);
      return { degrees, minutes, seconds };
    };

    const latDms = convert(parseFloat(lat));
    const lonDms = convert(parseFloat(lon));
    setOutput({
      lat: `${latDms.degrees}° ${latDms.minutes}' ${latDms.seconds}"`,
      lon: `${lonDms.degrees}° ${lonDms.minutes}' ${lonDms.seconds}"`
    });
  };

 

  const SearchBar = ({ onJumpToLocation }) => {
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    const handleJump = () => {
      if (latitude && longitude) {
        const lat = parseFloat(latitude);
        const lon = parseFloat(longitude);
        if (!isNaN(lat) && !isNaN(lon)) {
          onJumpToLocation(lat, lon);
        } else {
          alert('Please enter valid coordinates.');
        }
      }
    };

    return (
      <div className="flex flex-col justify-center p-2">
        <form className="space-y-4 md:space-y-6">
          <div>
            <label
              htmlFor="latitude"
              className="block mb-2 text-sm font-medium text-white dark:text-white"
            >
              Latitude
            </label>
            <input
              type="number"
              name="latitude"
              id="latitude"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter latitude"
              required
            />
          </div>
          <div>
            <label
              htmlFor="longitude"
              className="block mb-2 text-sm font-medium text-white dark:text-white"
            >
              Longitude
            </label>
            <input
              type="number"
              name="longitude"
              id="longitude"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter longitude"
              required
            />
          </div>
          <button
            type="button"
            onClick={handleJump}
            className="w-full text-white bg-black  hover:bg-green-500 hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Jump to Location
          </button>
        </form>
      </div>
    );
  };

  return (
    <header className="flex flex-col justify-between items-center text-white right-0 p-2.5 fixed w-12 h-screen mt-0 z-50">
      <nav className="flex flex-col gap-3 mt-12">
        <button title="Legend" onClick={() => handleIconClick('legend')} className="text-gray-800 text-2xl cursor-pointer">
          <FaList />
        </button>
        <button title="Layers" onClick={() => handleIconClick('layers')} className="text-gray-800 text-2xl cursor-pointer">
          <FaLayerGroup />
        </button>
        <button title="Measurement" onClick={() => handleIconClick('measurement')} className="text-gray-800 text-2xl cursor-pointer">
          <FaRuler />
        </button>
        <button title="Jump to Location" onClick={() => handleIconClick('coordinates')} className="text-gray-900 text-2xl cursor-pointer">
          <FaMapMarkerAlt />
        </button>
        <button title="Coordinate Converter" onClick={() => handleIconClick('coordinateConverter')} className="text-gray-800 text-2xl cursor-pointer">
          <FaGlobe />
        </button>
        <button title="Place Search" onClick={() => handleIconClick('placeSearch')} className="text-gray-800 text-2xl cursor-pointer">
          <FaSearch />
        </button>
        <button title="Eraser" onClick={() => handleIconClick('eraser')} className="text-gray-800 text-2xl cursor-pointer hover:text-lg">
          <FaEraser/>
        </button>
      </nav>

      {activePopup && (
        <div
        className="absolute left-[-320px] top-8 min-w-72 max-h-[70vh]  z-50 bg-gray-800 text-gray-200 p-2 m-2.5 rounded-md shadow-lg overflow-scroll "
        style={{
          right: (() => {
            switch (activePopup) {
              case 'legend':
                return '70%';
              case 'layers':
                return '65%';
              case 'measurement':
                return '60%';
              case 'coordinates':
                return '55%';
              case 'coordinateConverter':
                return '50%';
              case 'placeSearch':
                return '45%';
              default:
                return '50%';
            }
          })()
        }}
      >

          <div className="p-2 mb-4 flex justify-between items-center">
            <h2 className="text-lg font-semibold">{activePopup.charAt(0).toUpperCase() + activePopup.slice(1)}</h2>
            <button onClick={handleClosePopup} className="text-gray-600 hover:text-white text-lg">
              <FaWindowClose />
            </button>
          </div>

          {activePopup === 'legend' && (
            <div>
              <p>Legend Content</p>
            </div>
          )}
          {activePopup === 'layers' && (
            <div>
              {layers.map((layer) => (
                <div key={layer.name} className="flex items-center gap-2 mb-2">
                  <input
                    type="checkbox"
                    checked={layer.visible}
                    onChange={() => toggleLayer(layer.name)}
                  />
                  <label>{layer.name}</label>
                </div>
              ))}
            </div>
          )}
          {activePopup === 'measurement' && (
            <div className="space-y-2">
              <button
                onClick={() => handleMeasurementClick('line')}
                className="bg-blue-600 hover:bg-blue-500 text-white w-full py-2 rounded-md"
              >
                Measure Distance
              </button>
              <button
                onClick={() => handleMeasurementClick('area')}
                className="bg-blue-600 hover:bg-blue-500 text-white w-full py-2 rounded-md"
              >
                Measure Area
              </button>
              <button
                onClick={() => handleMeasurementClick('clear')}
                className="bg-red-600 hover:bg-red-500 text-white w-full py-2 rounded-md"
              >
                Clear Measurements
              </button>
            </div>
          )}
          {activePopup === 'coordinates' && <SearchBar onJumpToLocation={onJumpToLocation} />}
          {activePopup === 'coordinateConverter' && (
            <div>
              <div className="mb-4">
                <label className="mr-2">
                  <input
                    type="radio"
                    name="conversionType"
                    value="dmsToDecimal"
                    checked={conversionType === 'dmsToDecimal'}
                    onChange={() => handleConversionTypeChange('dmsToDecimal')}
                  />
                  DMS to Decimal
                </label>
                <label className="ml-4">
                  <input
                    type="radio"
                    name="conversionType"
                    value="decimalToDms"
                    checked={conversionType === 'decimalToDms'}
                    onChange={() => handleConversionTypeChange('decimalToDms')}
                  />
                  Decimal to DMS
                </label>
              </div>

              {conversionType === 'dmsToDecimal' && (
                <div>
                  <div className="flex flex-col mb-2">
                    <label>Latitude:</label>
                    <div className="flex space-x-2">
                      <input
                        type="number"
                        name="latDegrees"
                        placeholder="Degrees"
                        value={dmsInput.latDegrees}
                        onChange={handleDmsInputChange}
                        className="w-1/3 p-1"
                      />
                      <input
                        type="number"
                        name="latMinutes"
                        placeholder="Minutes"
                        value={dmsInput.latMinutes}
                        onChange={handleDmsInputChange}
                        className="w-1/3 p-1"
                      />
                      <input
                        type="number"
                        name="latSeconds"
                        placeholder="Seconds"
                        value={dmsInput.latSeconds}
                        onChange={handleDmsInputChange}
                        className="w-1/3 p-1"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col mb-2">
                    <label>Longitude:</label>
                    <div className="flex space-x-2">
                      <input
                        type="number"
                        name="lonDegrees"
                        placeholder="Degrees"
                        value={dmsInput.lonDegrees}
                        onChange={handleDmsInputChange}
                        className="w-1/3 p-1"
                      />
                      <input
                        type="number"
                        name="lonMinutes"
                        placeholder="Minutes"
                        value={dmsInput.lonMinutes}
                        onChange={handleDmsInputChange}
                        className="w-1/3 p-1"
                      />
                      <input
                        type="number"
                        name="lonSeconds"
                        placeholder="Seconds"
                        value={dmsInput.lonSeconds}
                        onChange={handleDmsInputChange}
                        className="w-1/3 p-1"
                      />
                    </div>
                  </div>
                  <button
                    onClick={convertDmsToDecimal}
                    className="bg-blue-600 hover:bg-blue-500 text-white w-full py-2 rounded-md"
                  >
                    Convert to Decimal
                  </button>
                  <div className="mt-2">
                    <p>Latitude: {output.lat}</p>
                    <p>Longitude: {output.lon}</p>
                  </div>
                </div>
              )}

              {conversionType === 'decimalToDms' && (
                <div>
                  <div className="flex flex-col mb-2">
                    <label>Latitude:</label>
                    <input
                      type="number"
                      name="lat"
                      placeholder="Decimal Degrees"
                      value={decimalInput.lat}
                      onChange={handleDecimalInputChange}
                      className="p-1"
                    />
                  </div>
                  <div className="flex flex-col mb-2">
                    <label>Longitude:</label>
                    <input
                      type="number"
                      name="lon"
                      placeholder="Decimal Degrees"
                      value={decimalInput.lon}
                      onChange={handleDecimalInputChange}
                      className="p-1"
                    />
                  </div>
                  <button
                    onClick={convertDecimalToDms}
                    className="bg-blue-600 hover:bg-blue-500 text-white w-full py-2 rounded-md"
                  >
                    Convert to DMS
                  </button>
                  <div className="mt-2">
                    <p>Latitude: {output.lat}</p>
                    <p>Longitude: {output.lon}</p>
                  </div>
                </div>
              )}
            </div>
          )}
             {activePopup === 'placeSearch' && (
        <div className="p-4 min-w-[300px] max-w-[400px] max-h-[80vh] overflow-y-auto border border-gray-300 bg-gray-800 text-gray-200 rounded-md shadow-lg">
          <label htmlFor="place" className="block mb-2 text-sm font-medium text-white">Enter Place Name</label>
          <input
            type="text"
            name="place"
            id="place"
            value={place}
            onChange={(e) => setPlace(e.target.value)} // Update place state on input change
            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            placeholder="Search for a place"
            required
          />
          {suggestions.length > 0 && (
            <ul className="mt-2 max-h-40 overflow-y-auto border border-gray-300 bg-white">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="p-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => handleSuggestionClick(suggestion)} // Set place value on suggestion click
                  style={{ color: 'black' }}
                >
                  {suggestion.name}
                </li>
              ))}
            </ul>
          )}
          <button
            type="button"
            onClick={handleSearchClick}
            className="mt-2 w-full text-white bg-black hover:bg-green-500 hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Search Place
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
