import React, { useState, useRef, useEffect } from 'react';
import WMTSComponent from './components/Map';
import Header from './components/Navbar';
import Sidebar from './components/Sidebar';
import Form from './components/Forms';
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
import Routing from './components/routing';

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
  const [elevationData, setElevationData] = useState(null);
  const [routingParams, setRoutingParams] = useState(null); // Add routingParams state
  const [layers, setLayers] = useState([
    { name: 'countries', visible: true },
    { name: 'world', visible: true },
    { name: 'pak', visible: true },
    { name: 'roads', visible: true },
    { name: 'pak_osm', visible: true },
    { name: 'pak_dem', visible: true },
  ]);

  const handleLayerToggle = (layerName) => {
    const updatedLayers = layers.map(layer =>
      layer.name === layerName ? { ...layer, visible: !layer.visible } : layer
    );
    setLayers(updatedLayers);
  };

  const handleLayerChange = (newLayers) => {
    setLayers(newLayers);
  };

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

  const handlePopupClose = () => {
    setElevationData(null);
  };

  useEffect(() => {
    if (activeTool && activeMeasurement) {
      setActiveMeasurement(null);
    }
  }, [activeTool]);

  return (
    <div className="app-container">
      <div className="map-container">
        <Header
          layers={layers}
          setActiveMeasurement={setActiveMeasurement}
          clearDrawings={clearDrawings}
          onLayerToggle={handleLayerToggle}
          onJumpToLocation={handleJumpToLocation}
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
          viewshedParams={viewshedParams}
          bufferParams={bufferParams}
          setClickedCoordinates={setClickedCoordinates}
          activeMeasurement={activeMeasurement}
          clearDrawings={clearDrawings}
          rangeRingsParams={rangeRingsParams}
          layers={layers}
          epToolParams={epToolParams}
          setElevationData={setElevationData}
          routingParams={routingParams} // Pass routingParams
          setRoutingParams={setRoutingParams} // Pass setRoutingParams
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
          setRoutingParams={setRoutingParams} // Pass setRoutingParams
        />
        {elevationData && <Popup elevationData={elevationData} handleClose={handlePopupClose} />}
      </div>
    </div>
  );
};

export default App;