import React, { useState,useEffect  } from 'react';
import { FaDownload, FaBook, FaList, FaLayerGroup, FaImage, FaMapMarkerAlt, FaRuler, FaCogs, FaGlobe, FaLine, FaDrawPolygon, FaToolbox } from 'react-icons/fa';
import '../css/Navbar.css';
import logo_animated from '../img/logo_animated.mp4';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import { Point } from 'ol/geom';
import { Circle as CircleFeature } from 'ol/geom';
import { fromLonLat } from 'ol/proj';
import { Draw } from 'ol/interaction';
import { Style, Fill, Stroke } from 'ol/style';

const Header = ({ layers, setActiveMeasurement, clearDrawings,onLayerToggle }) => {
  const [activePopup, setActivePopup] = useState(null);

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

  // const handleIconClick = (popupName) => {
  //   setActivePopup(activePopup === popupName ? null : popupName);
  //   setConversionType(null);
  //   setOutput({ lat: '', lon: '' });
  // };
  //   const handleClosePopup = () => {
  //   setActivePopup(null);
  //   setConversionType(null);
  //   setOutput({ lat: '', lon: '' });
  // };



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

////////////////coordinate converters//////////////////////
const [conversionType, setConversionType] = useState(null);
  const [dmsInput, setDmsInput] = useState({ latDegrees: '', latMinutes: '', latSeconds: '', lonDegrees: '', lonMinutes: '', lonSeconds: '' });
  const [decimalInput, setDecimalInput] = useState({ lat: '', lon: '' });
  const [output, setOutput] = useState({ lat: '', lon: '' });
  const [circles, setCircles] = useState([]);
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

  return (
    <header className="header">
      <video width="70" height="70" loop autoPlay muted>
        <source src={logo_animated} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <h2>GEOSPATIAL WEB APP</h2>
      <nav className="nav-icons">
        <button title="Legend" onClick={() => handleIconClick('legend')}><FaList /></button>
        <button title="Layers" onClick={() => handleIconClick('layers')}><FaLayerGroup /></button>
        <button title="Measurement" onClick={() => handleIconClick('measurement')}><FaRuler /></button>
        <button title="Jump to Location" onClick={() => handleIconClick('coordinates')}><FaMapMarkerAlt /></button>

        <button title="Coordinate Converter" onClick={() => handleIconClick('coordinateConverter')}><FaGlobe /></button>
        <button title="Tools" onClick={() => handleIconClick('tools')}><FaToolbox /></button>

      </nav>

      {activePopup && (
        <div
          className="popup"
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
          <div className="popup-content">
            <button className="close-btn" onClick={handleClosePopup}>
              X
            </button>

            {activePopup === 'legend' && (
              <div>
                <h3>Legend</h3>
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
    <h3>Layers</h3>
    <ul>
      {layers.map((layer, index) => (
        <li key={index}>
          <input 
            type="checkbox" 
            id={`layer-${index}`} 
            checked={layer.visible} 
            onChange={() => toggleLayer(layer.name)} 
          />
          <label htmlFor={`layer-${index}`}>{layer.name}</label>
        </li>
      ))}
    </ul>
  </div>
)}

            {activePopup === 'measurement' && (
              <div className="measurement-popup">
                <button title="Measure Length" onClick={() => handleMeasurementClick('length')}><FaLine /> Length</button>
                <button title="Measure Area" onClick={() => handleMeasurementClick('area')}><FaDrawPolygon /> Area</button>
                <button title="Erase all drawings" onClick={() => handleMeasurementClick('clear')}>Clear</button>
              </div>
            )}

            {activePopup === 'coordinates' && (
              <div>Jump to Location</div>
            )}

{activePopup === 'coordinateConverter' && (
              <div className="coordinate-converter">
                <h3>Coordinate Converter</h3>
                {!conversionType && (
                  <div className="conversion-type">
                    <button onClick={() => handleConversionTypeChange('DMS_TO_DECIMAL')}>DMS to Decimal</button>
                    <button onClick={() => handleConversionTypeChange('DECIMAL_TO_DMS')}>Decimal to DMS</button>
                  </div>
                )}

                {conversionType === 'DMS_TO_DECIMAL' && (
                  <form>
                    <h4>Latitude:</h4>
                    <div className="row">
                      <label>
                        Degrees:
                        <input
                          type="number"
                          name="latDegrees"
                          value={dmsInput.latDegrees}
                          onChange={handleDmsInputChange}
                        />
                      </label>
                      <label>
                        Minutes:
                        <input
                          type="number"
                          name="latMinutes"
                          value={dmsInput.latMinutes}
                          onChange={handleDmsInputChange}
                        />
                      </label>
                      <label>
                        Seconds:
                        <input
                          type="number"
                          name="latSeconds"
                          value={dmsInput.latSeconds}
                          onChange={handleDmsInputChange}
                        />
                      </label>
                    </div>

                    <h4>Longitude:</h4>
                    <div className="row">
                      <label>
                        Degrees:
                        <input
                          type="number"
                          name="lonDegrees"
                          value={dmsInput.lonDegrees}
                          onChange={handleDmsInputChange}
                        />
                      </label>
                      <label>
                        Minutes:
                        <input
                          type="number"
                          name="lonMinutes"
                          value={dmsInput.lonMinutes}
                          onChange={handleDmsInputChange}
                        />
                      </label>
                      <label>
                        Seconds:
                        <input
                          type="number"
                          name="lonSeconds"
                          value={dmsInput.lonSeconds}
                          onChange={handleDmsInputChange}
                        />
                      </label>
                    </div>

                    <button type="button" onClick={convertDmsToDecimal}>
                      Convert
                    </button>
                  </form>
                )}

                {conversionType === 'DECIMAL_TO_DMS' && (
                  <form>
                    <h4>Latitude:</h4>
                    <div className="row">
                      <label>
                        DecimalDegree:
                        <input
                          type="number"
                          name="lat"
                          value={decimalInput.lat}
                          onChange={handleDecimalInputChange}
                        />
                      </label>
                    </div>

                    <h4>Longitude:</h4>
                    <div className="row">
                      <label>
                        DecimalDegree:
                        <input
                          type="number"
                          name="lon"
                          value={decimalInput.lon}
                          onChange={handleDecimalInputChange}
                        />
                      </label>
                    </div>

                    <button type="button" onClick={convertDecimalToDms}>
                      Convert
                    </button>
                  </form>
                )}

                {output.lat && (
                  <div>
                    <h4>Converted Coordinates:</h4>
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

