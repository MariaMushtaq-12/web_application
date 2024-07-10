import React, { useState, useEffect } from 'react';
import {
  FaDownload,
  FaBook,
  FaList,
  FaLayerGroup,
  FaImage,
  FaMapMarkerAlt,
  FaRuler,
  FaCogs,
  FaGlobe,
  FaLine,
  FaDrawPolygon,
  FaToolbox
} from 'react-icons/fa';
import logo_animated from '../img/logo_animated.mp4';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import { fromLonLat } from 'ol/proj';
import { Draw } from 'ol/interaction';
import { Style, Fill, Stroke } from 'ol/style';

const Header = ({ layers, setActiveMeasurement, clearDrawings, onLayerToggle, onJumpToLocation }) => {
  const [activePopup, setActivePopup] = useState(null);
  const [conversionType, setConversionType] = useState(null);
  const [dmsInput, setDmsInput] = useState({ latDegrees: '', latMinutes: '', latSeconds: '', lonDegrees: '', lonMinutes: '', lonSeconds: '' });
  const [decimalInput, setDecimalInput] = useState({ lat: '', lon: '' });
  const [output, setOutput] = useState({ lat: '', lon: '' });
  const [map, setMap] = useState(null);

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
      <div className="flex flex-col p-2">
        <input
          type="text"
          placeholder="Latitude"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          className="mb-2 p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Longitude"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          className="mb-2 p-2 border rounded"
        />
        <button onClick={handleJump} className="p-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-500">
          Jump
        </button>
      </div>
    );
  };

  return (
    <header className="flex flex-col justify-between items-center bg-transparent text-white right-0 p-2.5 fixed w-12 h-screen mt-0 z-50">
      <nav className="flex flex-col gap-3 mt-12">
        <button title="Legend" onClick={() => handleIconClick('legend')} className="text-black text-2xl cursor-pointer">
          <FaList />
        </button>
        <button title="Layers" onClick={() => handleIconClick('layers')} className="text-black text-2xl cursor-pointer">
          <FaLayerGroup />
        </button>
        <button title="Measurement" onClick={() => handleIconClick('measurement')} className="text-black text-2xl cursor-pointer">
          <FaRuler />
        </button>
        <button title="Jump to Location" onClick={() => handleIconClick('coordinates')} className="text-black text-2xl cursor-pointer">
          <FaMapMarkerAlt />
        </button>
        <button title="Coordinate Converter" onClick={() => handleIconClick('coordinateConverter')} className="text-black text-2xl cursor-pointer">
          <FaGlobe />
        </button>
        <button title="Tools" onClick={() => handleIconClick('tools')} className="text-black text-2xl cursor-pointer">
          <FaToolbox />
        </button>
      </nav>

      {activePopup && (
        <div
          className="absolute top-20 z-50 bg-white text-black p-5 mt-2.5 rounded shadow-lg"
          style={{
            left: (() => {
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
                case 'tools':
                  return '84%';
                default:
                  return '0';
              }
            })()
          }}
        >
          <div className="popup-content left-0 relative">
            <button className="absolute top-2 right-2 text-black" onClick={handleClosePopup}>
              X
            </button>

            {activePopup === 'legend' && (
              <div>
                <h3 className="font-bold">Legend</h3>
                {/* 
                <ul>
                  {layers && layers.map((layer, index) => (
                    <li key={index}>{layer.get('name')}</li>
                  ))}
                </ul>
                */}
              </div>
            )}

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
            )}

            {activePopup === 'measurement' && (
              <div className="flex flex-col items-center bg-cover p-5 border border-gray-300 rounded shadow-md" style={{ backgroundImage: "url('../img/camaflauge.PNG')" }}>
                <button title="Measure Length" onClick={() => handleMeasurementClick('length')} className="mb-2.5 p-2.5 bg-green-600 text-white rounded cursor-pointer hover:bg-green-500">
                  <FaRuler className="mr-2.5" /> Length
                </button>
                <button title="Measure Area" onClick={() => handleMeasurementClick('area')} className="mb-2.5 p-2.5 bg-green-600 text-white rounded cursor-pointer hover:bg-green-500">
                  <FaDrawPolygon className="mr-2.5" /> Area
                </button>
                <button title="Erase all drawings" onClick={() => handleMeasurementClick('clear')} className="mb-2.5 p-2.5 bg-green-600 text-white rounded cursor-pointer hover:bg-green-500">
                  Clear
                </button>
              </div>
            )}

            {activePopup === 'coordinates' && (
              <div>
                <h3 className="font-bold">Jump to Location</h3>
                <SearchBar onJumpToLocation={onJumpToLocation} />
              </div>
            )}

            {activePopup === 'coordinateConverter' && (
              <div className="coordinate-converter">
                <h3 className="font-bold">Coordinate Converter</h3>
                {!conversionType && (
                  <div className="flex flex-col items-center">
                    <button onClick={() => handleConversionTypeChange('DMS_TO_DECIMAL')} className="mb-2.5 p-2.5 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-500">DMS to Decimal</button>
                    <button onClick={() => handleConversionTypeChange('DECIMAL_TO_DMS')} className="mb-2.5 p-2.5 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-500">Decimal to DMS</button>
                  </div>
                )}

                {conversionType === 'DMS_TO_DECIMAL' && (
                  <form>
                    <h4 className="font-bold">Latitude:</h4>
                    <div className="flex">
                      <label className="mr-2.5">
                        Degrees:
                        <input
                          type="number"
                          name="latDegrees"
                          value={dmsInput.latDegrees}
                          onChange={handleDmsInputChange}
                          className="border rounded p-1"
                        />
                      </label>
                      <label className="mr-2.5">
                        Minutes:
                        <input
                          type="number"
                          name="latMinutes"
                          value={dmsInput.latMinutes}
                          onChange={handleDmsInputChange}
                          className="border rounded p-1"
                        />
                      </label>
                      <label className="mr-2.5">
                        Seconds:
                        <input
                          type="number"
                          name="latSeconds"
                          value={dmsInput.latSeconds}
                          onChange={handleDmsInputChange}
                          className="border rounded p-1"
                        />
                      </label>
                    </div>

                    <h4 className="font-bold">Longitude:</h4>
                    <div className="flex">
                      <label className="mr-2.5">
                        Degrees:
                        <input
                          type="number"
                          name="lonDegrees"
                          value={dmsInput.lonDegrees}
                          onChange={handleDmsInputChange}
                          className="border rounded p-1"
                        />
                      </label>
                      <label className="mr-2.5">
                        Minutes:
                        <input
                          type="number"
                          name="lonMinutes"
                          value={dmsInput.lonMinutes}
                          onChange={handleDmsInputChange}
                          className="border rounded p-1"
                        />
                      </label>
                      <label className="mr-2.5">
                        Seconds:
                        <input
                          type="number"
                          name="lonSeconds"
                          value={dmsInput.lonSeconds}
                          onChange={handleDmsInputChange}
                          className="border rounded p-1"
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
                          className="border rounded p-1"
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
                          className="border rounded p-1"
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

            {activePopup === 'tools' && (
              <div>Tools</div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;