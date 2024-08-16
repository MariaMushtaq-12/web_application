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
  FaSearch,
  FaEraser
} from 'react-icons/fa';

import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import { fromLonLat } from 'ol/proj';

const Header = ({ layers, setActiveMeasurement, clearDrawings, onLayerToggle, onJumpToLocation,onPlaceSearch }) => {
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
  const [selectAll, setSelectAll] = useState(false);
//--------------------------------------------------

//-------------------------------------------------
  // Function to fetch place suggestions from the API
const fetchPlaceSuggestions = async (cityName) => {
  try {
  const response = await
  fetch(`http://192.168.1.200:5004/search?city_name=${cityName}`);
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
   
    const handleSelectAllToggle = () => {
      setSelectAll(!selectAll);
    }; 
    useEffect(() => {
      layers.forEach(layer => {
        onLayerToggle(layer.name, selectAll);
      });
    }, [selectAll]);
  
  useEffect(() => {
    const mapInstance = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new XYZ({
            //url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
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
//----------------------layers---------------------------------

const toggleLayer = (layerName) => {
    onLayerToggle(layerName);
  };



  
//-----------------------------------constants for the coordinate converters---------------------------------------------------------------------
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
//--------------------------------------jump to location--------------------------------------------------------------------------------------------------
 
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
 
//---------------------------------------------returning vertical navbar--------------------------------------------------------------------------------------
  return (
    
    
    <header className="flex flex-col justify-between items-center text-white right-0 p-2.5 fixed w-12 h-screen mt-0 z-50">
{/*--------------------------------------Symbols and buttons------------------------------------------------------------------------------------------- */}

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
{/*--------------------------------------Popup containers------------------------------------------------------------------------------------------- */}

      {activePopup && (
        <div
        className="absolute left-[-320px] top-8 min-w-72 max-h-[70vh]  z-50 bg-gray-800 text-gray-200 p-2 m-2.5 rounded-md shadow-lg overflow-y-auto "
        style={{
          right: (() => {
            switch (activePopup) {
              case 'legend':
                return '70%';
              case 'layers':
                return '72%';
              case 'measurement':
                return '74%';
              case 'coordinates':
                return '77%';
              case 'coordinateConverter':
                return '79%';
                case 'placeSearch':
                  return '82%';
              case 'eraser':
                return '84%';
              default:
                return '0';
            }
          })()
        }}
      >
          <div className="popup-content left-0 relative">
            <button className="absolute flex justify-center right-0 rounded  hover:bg-gray-900" onClick={handleClosePopup}>
              <FaWindowClose className="text-gray-300 hover:text-green-500"/>
            </button>
{/*--------------------------------------legends------------------------------------------------------------------------------------------- */}
            {activePopup === 'legend' && (
              <div>
                <h3 className="font-bold">Legend</h3>
              </div>
            )}
{/*--------------------------------------layers------------------------------------------------------------------------------------------- */}
{/* 
            {activePopup === 'layers' && (
              <div>
                <h3 className="font-bold">Layers</h3>
             
                <ul>
                  {layers.map((layer, index) => (
                   
                    <li key={index}>
                      <input
                        type="checkbox"
                        id={`layer-${index}`}
                        checked={layer.visible}
                        onChange={() => toggleLayer(layer.name)}
                        className="mr-2"
                      />
                      <label htmlFor={`layer-${index}`}>{layer.name}</label>
                    </li>
                 
                  ))}
                </ul>
                
              </div>
            )}  */}

{activePopup === 'layers' && (
        <div>
          <h3 className="font-bold">Maps</h3>

          <ul className="ml-4 list-none">
            {layers.map((layer, index) => (
              <li key={index} className="mb-2">
                <input
                  type="checkbox"
                  id={`layer-${index}`}
                  checked={layer.visible}
                  onChange={() => toggleLayer(layer.name)}
                  className="mr-2"
                />
                <label htmlFor={`layer-${index}`} className="capitalize">{layer.name}</label>
              </li>
            ))}
          </ul>

         
        </div>
      )}

{/*--------------------------------------Measurements------------------------------------------------------------------------------------------- */}

            {activePopup === 'measurement' && (
              <div className="flex flex-col justify-center p-2">
                <p className="text-white top-2 font-bold text-lg text-center">Measure</p>
                <button title="Measure Length" onClick={() => handleMeasurementClick('length')} className="flex  mb-2 p-2.5 bg-gray-900 text-white text-center justify-center h-10 w-full rounded cursor-pointer hover:bg-green-500 hover:text-gray-900 font-semibold">
                  
                  <FaRuler className="relative top-[5px] mr-1 " /> Length
                </button>
                <button title="Measure Area" onClick={() => handleMeasurementClick('area')} className="flex justify-center w-full mr-2.5 mb-2 p-2.5 bg-gray-900 text-white rounded h-10 cursor-pointer hover:bg-green-500 hover:text-gray-900  font-semibold">
                  <FaDrawPolygon className="relative top-[5px] mr-1 " /> Area
                </button>
                <div className="flex justify-center w-full">
                  <button title="Erase all drawings" onClick={() => handleMeasurementClick('clear')} className="relative flex justify-center w-full mb-2 p-2.5 bg-gray-900 text-white rounded-lg h-10 cursor-pointer hover:bg-green-500 hover:text-gray-900 font-semibold">
                    Clear
                  </button>
                </div>
              </div>
            )}
{/*--------------------------------------jump to location------------------------------------------------------------------------------------------- */}

            {activePopup === 'coordinates' && (
              <div className= "flex flex-col justify-center p-2">
                <p className="text-white top-2 font-bold text-lg text-center ">Jump to Location</p>
                <SearchBar onJumpToLocation={onJumpToLocation} />
              </div>
            )}
{/*--------------------------------------Coordinate converter------------------------------------------------------------------------------------------- */}

            {activePopup === 'coordinateConverter' && (
              <div className="flex flex-col justify-center p-2">
                <p className="text-white mb-2 mt-3 font-bold text-sm text-center">Coordinate Converter</p>
                {!conversionType && (
                  <div className="flex flex-col items-center">
                    <button onClick={() => handleConversionTypeChange('DMS_TO_DECIMAL')} className="flex justify-center w-full mr-2.5 mb-2 p-2.5 bg-gray-900 text-white rounded h-10 cursor-pointer hover:bg-green-500 hover:text-gray-900  font-semibold">DMS to Decimal</button>
                    <button onClick={() => handleConversionTypeChange('DECIMAL_TO_DMS')} className="relative flex justify-center w-full mr-2.5 mb-2 p-2.5 bg-gray-900 text-white rounded h-10 cursor-pointer hover:bg-green-500 hover:text-gray-900  font-semibold">Decimal to DMS</button>
                  </div>
                )}

                {conversionType === 'DMS_TO_DECIMAL' && (
                  <form className="flex flex-col justify-center p-2">
                    <h4 className="text-white top-2 font-bold text-lg text-center">Latitude:</h4>
                    <div className="flex flex-col">
                      <label className="mr-2.5">
                        Degrees:
                        <input
                          type="number"
                          name="latDegrees"
                          value={dmsInput.latDegrees}
                          onChange={handleDmsInputChange}
                          className="flex  mb-2 p-2.5 bg-gray-900 text-white text-start caret-white justify-center h-10 w-full rounded cursor-pointer font-semibold"
                        />
                      </label>
                      <label className="mr-2.5">
                        Minutes:
                        <input
                          type="number"
                          name="latMinutes"
                          value={dmsInput.latMinutes}
                          onChange={handleDmsInputChange}
                          className="flex  mb-2 p-2.5 bg-gray-900 text-white text-start caret-white justify-center h-10 w-full rounded cursor-pointer font-semibold"
                        />
                      </label>
                      <label className="mr-2.5">
                        Seconds:
                        <input
                          type="number"
                          name="latSeconds"
                          value={dmsInput.latSeconds}
                          onChange={handleDmsInputChange}
                          className="flex  mb-2 p-2.5 bg-gray-900 text-white text-start caret-white justify-center h-10 w-full rounded cursor-pointer font-semibold"
                        />
                      </label>
                    </div>

                    <h4 className="font-bold">Longitude:</h4>
                    <div className="flex flex-col">
                      <label className="mr-2.5">
                        Degrees:
                        <input
                          type="number"
                          name="lonDegrees"
                          value={dmsInput.lonDegrees}
                          onChange={handleDmsInputChange}
                          className="flex  mb-2 p-2.5 bg-gray-900 text-white text-start caret-white justify-center h-10 w-full rounded cursor-pointer font-semibold"
                        />
                      </label>
                      <label className="mr-2.5">
                        Minutes:
                        <input
                          type="number"
                          name="lonMinutes"
                          value={dmsInput.lonMinutes}
                          onChange={handleDmsInputChange}
                          className="flex  mb-2 p-2.5 bg-gray-900 text-white text-start caret-white justify-center h-10 w-full rounded cursor-pointer font-semibold"
                        />
                      </label>
                      <label className="mr-2.5">
                        Seconds:
                        <input
                          type="number"
                          name="lonSeconds"
                          value={dmsInput.lonSeconds}
                          onChange={handleDmsInputChange}
                          className="flex  mb-2 p-2.5 bg-gray-900 text-white text-start caret-white justify-center h-10 w-full rounded cursor-pointer font-semibold"
                        />
                      </label>
                    </div>

                    <button type="button" onClick={convertDmsToDecimal} className="mt-2.5 p-2.5 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-500">
                      Convert
                    </button>
                  </form>
                )}

                {conversionType === 'DECIMAL_TO_DMS' && (
                  <form>
                    <h4 className="font-bold">Latitude:</h4>
                    <div className="flex">
                      <label className="mr-2.5">
                        Decimal Degree:
                        <input
                          type="number"
                          name="lat"
                          value={decimalInput.lat}
                          onChange={handleDecimalInputChange}
                          className="flex  mb-2 p-2.5 bg-gray-900 text-white text-start caret-white justify-center h-10 w-full rounded cursor-pointer font-semibold"
                        />
                      </label>
                    </div>

                    <h4 className="font-bold">Longitude:</h4>
                    <div className="flex">
                      <label className="mr-2.5">
                        Decimal Degree:
                        <input
                          type="number"
                          name="lon"
                          value={decimalInput.lon}
                          onChange={handleDecimalInputChange}
                          className="flex  mb-2 p-2.5 bg-gray-900 text-white text-start caret-white justify-center h-10 w-full rounded cursor-pointer font-semibold"
                        />
                      </label>
                    </div>

                    <button type="button" onClick={convertDecimalToDms} className="mt-2.5 p-2.5 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-500">
                      Convert
                    </button>
                  </form>
                )}

                {output.lat && (
                  <div>
                    <h4 className="font-bold">Converted Coordinates:</h4>
                    <p>Latitude: {output.lat}</p>
                    <p>Longitude: {output.lon}</p>
                  </div>
                )}
              </div>
            )}
{/*-------------------------------------Place Search------------------------------------------------------------------------------------------- */}

        {activePopup === 'placeSearch' && (
        <div className="p-2">
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
  
{/*--------------------------------------Eraser------------------------------------------------------------------------------------------- */}

            {activePopup === 'eraser' && (
              <div>eraser</div>
            )}
        
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
