import React, { useState, useRef, useEffect } from 'react';
import WMTSComponent from './components/Map';
import Header from './components/Navbar';
import Sidebar from './components/Sidebar';
import Form from './components/Forms';
import PointOfInterest from './components/PointOfInterest';
import './css/Navbar.css';
import './App.css';
import './css/Sidebar.css';
import VectorLayer from 'ol/layer/Vector';
import { LineString } from 'ol/geom';
import { fromLonLat } from 'ol/proj';
import VectorSource from 'ol/source/Vector';
import { Vector, Fill, Stroke, Style } from 'ol/style';
// Import required components in WMTSComponent.js
import Icon from 'ol/style/Icon';
import Point from 'ol/geom/Point';
import Feature from 'ol/Feature';
import Overlay from 'ol/Overlay';
import locationPin from './img/location_pin.png';
import axios from 'axios';
import Popup from './components/popup'; 

const App = () => {
  const [activeTool, setActiveTool] = useState(null);
  const [viewshedParams, setViewshedParams] = useState(null);
  const [clickedCoordinates, setClickedCoordinates] = useState(null);
  const [activeMeasurement, setActiveMeasurement] = useState(null);
  const mapRef = useRef();
  const [bufferParams, setBufferParams] = useState(null);
  const [lineOfSightParams, setLineOfSightParams] = useState(null);
  const [rangeRingsParams, setRangeRingsParams] = useState(null);
  const [epToolParams, setEpToolParams] = useState(null);
  const [elevationData, setElevationData] = useState(null); // Elevation
  const [poiParams, setPointOfInterestParams] = useState(null); // Point of Interest Params

  /////////////add use state of the layers ////////////////////
  const [layers, setLayers] = useState([
  ]);
  const [cityName, setCityName] = useState('');
  const handleLayerToggle = (layerName) => {
    const updatedLayers = layers.map(layer =>
      layer.name === layerName ? { ...layer, visible: !layer.visible } : layer
    );
    setLayers(updatedLayers);
  };

  const handleLayerChange = (newLayers) => {
    setLayers(newLayers);
  };

  ////////clear drawings////////////
  const clearDrawings = () => {
    if (mapRef.current) {
      const map = mapRef.current;
      const layers = map.getLayers().getArray();
      const vectorLayer = layers.find(layer => layer instanceof VectorLayer);
      if (vectorLayer) {
        vectorLayer.getSource().clear();
      }
    }
  };


  //-----------------------------------jump to location function---------------------------------------------------------------------------
  const handleJumpToLocation = (latitude, longitude) => {
    if (mapRef.current) {
      const map = mapRef.current;
      const view = map.getView();
      const coords = fromLonLat([longitude, latitude], 'EPSG:4326');
      view.setCenter(coords);
      view.setZoom(10);

      const markerFeature = new Feature({
        geometry: new Point(coords),
      });

      const markerStyle = new Style({
        image: new Icon({
          anchor: [0.5, 1],
          src: locationPin,
          scale: 0.1,
        }),
      });

      markerFeature.setStyle(markerStyle);

      const vectorSource = new VectorSource({
        features: [markerFeature],
      });

      const markerLayer = new VectorLayer({
        source: vectorSource,
      });

      map.addLayer(markerLayer);

      // Add a popup
      const popupContent = `<div> ${latitude}, ${longitude}</div>`;
      const popupElement = document.createElement('div');
      popupElement.innerHTML = popupContent;
      const popupOverlay = new Overlay({
        element: popupElement,
        positioning: 'bottom-center',
        stopEvent: false,
        offset: [0, -50],
      });

      popupOverlay.setPosition(coords);
      map.addOverlay(popupOverlay);
    }
  };

  //--------------------------------------------------------line of sight------------------------------------------------
  useEffect(() => {
    if (lineOfSightParams) {
      axios.post('http://192.168.1.200:5001/lineofsight', lineOfSightParams)
        .then(response => {
          const { features } = response.data;

          // Remove existing Line of Sight layers
          if (mapRef.current) {
            const map = mapRef.current;
            const layers = map.getLayers().getArray();
            layers.forEach(layer => {
              if (layer.get('name') === 'lineOfSight') {
                map.removeLayer(layer);
              }
            });
          }

          // Add new Line of Sight layers
          features.forEach(feature => {
            const coordinates = feature.geometry.coordinates.map(coord => fromLonLat(coord, 'EPSG:4326'));
            const lineString = new LineString(coordinates);
            const vectorSource = new VectorSource({
              features: [new Feature({ geometry: lineString })],
            });

            const style = new Style({
              stroke: new Stroke({
                color: feature.properties.visible ? 'red' : 'green',
                width: 4,
              }),
            });

            const vectorLayer = new VectorLayer({
              source: vectorSource,
              style: style,
              name: 'lineOfSight',
            });

            if (mapRef.current) {
              mapRef.current.addLayer(vectorLayer);
            }
          });
        })
        .catch(error => {
          console.error('There was an error calculating the Line of Sight!', error);
        });
    }
  }, [lineOfSightParams]);




//---------------------------------->PLACE SEARCH---------------------------------------
  

const handleCitySearch = (inputCityName) => {
  if (inputCityName) {
  console.log('Searching for city:', inputCityName);
  setCityName(inputCityName);
  } else {
  alert('Please enter a city name.');
  }
  };
  useEffect(() => {
    const searchCity = async () => {
      if (cityName) {
        try {
          const response = await axios.get(`http://127.0.0.1:5003/search?city_name=${cityName}`);
          console.log(response.data);
          const results = response.data.places;
          if (results.length > 0) {
            const [longitude, latitude] = [results[0].lng, results[0].lat]; // Adjust according to API response
            handleJumpToLocation(latitude, longitude);
          } else {
            alert('No results found for the specified city.');
          }
        } catch (error) {
          console.error('Error searching for city:', error);
          alert('An error occurred while searching for the city.');
        }
      }
    };
    searchCity();
  }, [cityName]);
  
  //-------------------popup of elevation profile--------------------------------------------------------------------
  const handlePopupClose = () => {
    setElevationData(null);
  };



  //-------------------switching of measurement tool--------------------------------------------------------------------
  useEffect(() => {
    if (activeTool && activeMeasurement) {
      setActiveMeasurement(null);
    }
  }, [activeTool]);

  //--------------------------------returning all the functions----------------------------------------------------
  return (
    <div className="app-container">
      <div className="map-container">
        <Header
          layers={layers}
          setActiveMeasurement={setActiveMeasurement}
          clearDrawings={clearDrawings}
          onLayerToggle={handleLayerToggle}
          onJumpToLocation={handleJumpToLocation}
          onPlaceSearch={handleCitySearch}
        />
        <Sidebar
          layers={layers}
          activeTool={activeTool}
          setActiveTool={setActiveTool}
        />
        <WMTSComponent
          className="z-100"
          mapRef={mapRef}
          onLayerChange={handleLayerChange}
          poiParams={poiParams}
          viewshedParams={viewshedParams}
          bufferParams={bufferParams}
          setClickedCoordinates={setClickedCoordinates}
          activeMeasurement={activeMeasurement}
          clearDrawings={clearDrawings}
          rangeRingsParams={rangeRingsParams}
          layers={layers}
          epToolParams={epToolParams}
          setElevationData={setElevationData}
          setPointofInterestParams={setPointOfInterestParams} 

        />
        <Form
          activeTool={activeTool}
          setActiveTool={setActiveTool}
          setViewshedParams={setViewshedParams}
          setBufferParams={setBufferParams}
          clickedCoordinates={clickedCoordinates}
          setLineOfSightParams={setLineOfSightParams}
          setRangeRingsParams={setRangeRingsParams}
          setEpToolParams={setEpToolParams}
          setPointofInterestParams={setPointOfInterestParams} // Ensure this is passed down
        />
        {elevationData && <Popup elevationData={elevationData} handleClose={handlePopupClose} />}
      </div>
    </div>
  );
};

export default App;

