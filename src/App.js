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
import Icon from 'ol/style/Icon';
import Point from 'ol/geom/Point';
import Feature from 'ol/Feature';
import Overlay from 'ol/Overlay';
import locationPin from './img/location_pin.png';
import axios from 'axios';
import Popup from './components/popup';
import "./App.css"
import { Circle as CircleStyle } from 'ol/style';
import {Text} from 'ol/style'
import { getCenter, boundingExtent } from 'ol/extent'; // Import required functions
const App = () => {
  
  

  /////////////add use state of the layers ////////////////////
  const [activeTool, setActiveTool] = useState(null);
  const [viewshedParams, setViewshedParams] = useState(null);
  const [clickedCoordinates, setClickedCoordinates] = useState(null);
  const [activeMeasurement, setActiveMeasurement] = useState(null);
  const mapRef = useRef();
  const [bufferParams, setBufferParams] = useState(null);
  const [lineOfSightParams, setLineOfSightParams] = useState(null);
  const [rangeRingsParams, setRangeRingsParams] = useState(null);
  const [epToolParams, setEpToolParams] = useState(null); //elevation profile
  const [elevationData, setElevationData] = useState(null); // Elevation data
  const [routingParams, setRoutingParams] = useState(null); // Add routingParams state
  const [poiParams, setPointOfInterestParams] = useState(null); // Point of Interest Params
  const [layers, setLayers] = useState([]); //place search
  const [cityName, setCityName] = useState('');
  const [layerOpacity, setLayerOpacity] = useState({});


//----layers-----
  const handleLayerToggle = (layerName) => {
    const updatedLayers = layers.map(layer =>
      layer.name === layerName ? { ...layer, visible: !layer.visible } : layer
    );
    setLayers(updatedLayers);
  };

  const handleLayerChange = (newLayers) => {
    setLayers(newLayers);
  };

  const handleLayerOpacityChange = (layerName, opacity) => {
    setLayerOpacity(prevOpacities => ({
      ...prevOpacities,
      [layerName]: opacity,
    }));
  
    // Apply opacity change to the actual map layer
    if (mapRef.current) {
      const map = mapRef.current;
      const mapLayer = map.getLayers().getArray().find(layer => layer.get('name') === layerName);
      if (mapLayer) {
        mapLayer.setOpacity(parseFloat(opacity));
      }
    }
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
const popupContent =  `<div>${latitude}, ${longitude}</div>`;
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
  // useEffect(() => {
  //   if (lineOfSightParams) {
  //     axios.post('http://192.168.1.200:5001/lineofsight', lineOfSightParams)
  //       .then(response => {
  //         const feature = response.data; // Updated to match the new backend response format
  
  //         // Remove existing Line of Sight layers
  //         if (mapRef.current) {
  //           const map = mapRef.current;
  //           const layers = map.getLayers().getArray();
  //           layers.forEach(layer => {
  //             if (layer.get('name') === 'lineOfSight') {
  //               map.removeLayer(layer);
  //             }
  //           });
  //         }
  
  //         const coordinates = feature.geometry.coordinates.map(coord => fromLonLat(coord, 'EPSG:4326'));
  //         const visibility = feature.properties.visibility;
  
  //         // Create and add individual line segments with their respective colors
  //         const segments = [];
  //         for (let i = 0; i < coordinates.length - 1; i++) {
  //           const segmentCoordinates = [coordinates[i], coordinates[i + 1]];
  //           const lineString = new LineString(segmentCoordinates);
  
  //           const segmentFeature = new Feature({ geometry: lineString });
  
  //           const color = visibility[i] === 1 ? 'green' : 'red';
  //           const style = new Style({
  //             stroke: new Stroke({
  //               color: color,
  //               width: 4,
  //             }),
  //           });
  
  //           segmentFeature.setStyle(style);
  //           segments.push(segmentFeature);
  //         }
  
  //         const vectorSource = new VectorSource({
  //           features: segments,
  //         });
  
  //         const vectorLayer = new VectorLayer({
  //           source: vectorSource,
  //           name: 'lineOfSight',
  //         });
  
  //         if (mapRef.current) {
  //           mapRef.current.addLayer(vectorLayer);
  
  //           // Calculate the extent of the line feature
  //           const extent = boundingExtent(coordinates);
  //           const view = mapRef.current.getView();
  
  //           // Fit the map view to the extent of the line
  //           view.fit(extent, {
  //             duration: 1000, // Duration of the zoom animation
  //             padding: [50, 50, 50, 50], // Padding around the extent
  //           });
  //         }
  //       })
  //       .catch(error => {
  //         console.error('There was an error calculating the Line of Sight!', error);
  //       });
  //   }
  // }, [lineOfSightParams]);

  //--------points enable
  // useEffect(() => {
  //   if (lineOfSightParams) {
  //     axios.post('http://192.168.1.200:5001/lineofsight', lineOfSightParams)
  //       .then(response => {
  //         const feature = response.data; // Updated to match the new backend response format
  
  //         // Remove existing Line of Sight layers
  //         if (mapRef.current) {
  //           const map = mapRef.current;
  //           const layers = map.getLayers().getArray();
  //           layers.forEach(layer => {
  //             if (layer.get('name') === 'lineOfSight') {
  //               map.removeLayer(layer);
  //             }
  //           });
  //         }
  
  //         const coordinates = feature.geometry.coordinates.map(coord => fromLonLat(coord, 'EPSG:4326'));
  //         const visibility = feature.properties.visibility;
  
  //         // Create and add individual line segments with their respective colors
  //         const segments = [];
  //         for (let i = 0; i < coordinates.length - 1; i++) {
  //           const segmentCoordinates = [coordinates[i], coordinates[i + 1]];
  //           const lineString = new LineString(segmentCoordinates);
  
  //           const segmentFeature = new Feature({ geometry: lineString });
  
  //           const color = visibility[i] === 1 ? 'green' : 'red';
  //           const style = new Style({
  //             stroke: new Stroke({
  //               color: color,
  //               width: 4,
  //             }),
  //           });
  
  //           segmentFeature.setStyle(style);
  //           segments.push(segmentFeature);
  //         }
  
  //         const vectorSource = new VectorSource({
  //           features: segments,
  //         });
  
  //         const vectorLayer = new VectorLayer({
  //           source: vectorSource,
  //           name: 'lineOfSight',
  //         });
  
  //         // Add point markers for start and end
  //         const startPoint = new Feature({
  //           geometry: new Point(coordinates[0]),
  //         });
  //         const endPoint = new Feature({
  //           geometry: new Point(coordinates[coordinates.length - 1]),
  //         });
  
  //         const pointStyle = new Style({
  //           image: new CircleStyle({
  //             radius: 6,
  //             fill: new Fill({ color: 'blue' }),
  //             stroke: new Stroke({ color: 'white', width: 2 }),
  //           }),
  //           text: new Text({
  //             text: 'Start',
  //             offsetY: -15,
  //             font: '12px Calibri,sans-serif',
  //             fill: new Fill({ color: 'white' }),
  //             stroke: new Stroke({ color: 'black', width: 3 }),
  //           }),
  //         });
  
  //         const endPointStyle = new Style({
  //           image: new CircleStyle({
  //             radius: 6,
  //             fill: new Fill({ color: 'blue' }),
  //             stroke: new Stroke({ color: 'white', width: 2 }),
  //           }),
  //           text: new Text({
  //             text: 'End',
  //             offsetY: -15,
  //             font: '12px Calibri,sans-serif',
  //             fill: new Fill({ color: 'white' }),
  //             stroke: new Stroke({ color: 'black', width: 3 }),
  //           }),
  //         });
  
  //         startPoint.setStyle(pointStyle);
  //         endPoint.setStyle(endPointStyle);
  //         const pointSource = new VectorSource({
  //           features: [startPoint, endPoint],
  //         });
  
  //         const pointLayer = new VectorLayer({
  //           source: pointSource,
  //           name: 'lineOfSightPoints',
  //         });
  
  //         if (mapRef.current) {
  //           mapRef.current.addLayer(vectorLayer);
  //           mapRef.current.addLayer(pointLayer);
  
  //           // Calculate the extent of the line feature
  //           const extent = boundingExtent(coordinates);
  //           const view = mapRef.current.getView();
  
  //           // Fit the map view to the extent of the line
  //           view.fit(extent, {
  //             duration: 1000, // Duration of the zoom animation
  //             padding: [50, 50, 50, 50], // Padding around the extent
  //           });
  //         }
  //       })
  //       .catch(error => {
  //         console.error('There was an error calculating the Line of Sight!', error);
  //       });
  //   }
  // }, [lineOfSightParams]);



useEffect(() => {
  if (lineOfSightParams) {
    axios.post('http://192.168.1.200:5001/lineofsight', lineOfSightParams)
      .then(response => {
        const feature = response.data; // Updated to match the new backend response format

        // Remove existing Line of Sight layers and Point layers
        if (mapRef.current) {
          const map = mapRef.current;
          const layers = map.getLayers().getArray();
          layers.forEach(layer => {
            if (layer.get('name') === 'lineOfSight' || layer.get('name') === 'lineOfSightPoints') {
              map.removeLayer(layer);
            }
          });
        }
 // Remove existing Line of Sight layers
  //         if (mapRef.current) {
  //           const map = mapRef.current;
  //           const layers = map.getLayers().getArray();
  //           layers.forEach(layer => {
  //             if (layer.get('name') === 'lineOfSight') {
  //               map.removeLayer(layer);
  //             }
  //           });
  //         }
        const coordinates = feature.geometry.coordinates.map(coord => fromLonLat(coord, 'EPSG:4326'));
        const visibility = feature.properties.visibility;

        // Create and add individual line segments with their respective colors
        const segments = [];
        for (let i = 0; i < coordinates.length - 1; i++) {
          const segmentCoordinates = [coordinates[i], coordinates[i + 1]];
          const lineString = new LineString(segmentCoordinates);

          const segmentFeature = new Feature({ geometry: lineString });

          const color = visibility[i] === 1 ? 'green' : 'red';
          const style = new Style({
            stroke: new Stroke({
              color: color,
              width: 4,
            }),
          });

          segmentFeature.setStyle(style);
          segments.push(segmentFeature);
        }

        const vectorSource = new VectorSource({
          features: segments,
        });

        const vectorLayer = new VectorLayer({
          source: vectorSource,
          name: 'lineOfSight',
        });

        // Add point markers for start and end
        const startPoint = new Feature({
          geometry: new Point(coordinates[0]),
        });
        const endPoint = new Feature({
          geometry: new Point(coordinates[coordinates.length - 1]),
        });

        const pointStyle = new Style({
          image: new CircleStyle({
            radius: 6,
            fill: new Fill({ color: 'blue' }),
            stroke: new Stroke({ color: 'white', width: 2 }),
          }),
          text: new Text({
            text: 'Start',
            offsetY: -15,
            font: '12px Calibri,sans-serif',
            fill: new Fill({ color: 'white' }),
            stroke: new Stroke({ color: 'black', width: 3 }),
          }),
        });

        const endPointStyle = new Style({
          image: new CircleStyle({
            radius: 6,
            fill: new Fill({ color: 'blue' }),
            stroke: new Stroke({ color: 'white', width: 2 }),
          }),
          text: new Text({
            text: 'End',
            offsetY: -15,
            font: '12px Calibri,sans-serif',
            fill: new Fill({ color: 'white' }),
            stroke: new Stroke({ color: 'black', width: 3 }),
          }),
        });

        startPoint.setStyle(pointStyle);
        endPoint.setStyle(endPointStyle);
        const pointSource = new VectorSource({
          features: [startPoint, endPoint],
        });

        const pointLayer = new VectorLayer({
          source: pointSource,
          name: 'lineOfSightPoints',
        });

        if (mapRef.current) {
          mapRef.current.addLayer(vectorLayer);
          mapRef.current.addLayer(pointLayer);

          // Calculate the extent of the line feature
          const extent = boundingExtent(coordinates);
          const view = mapRef.current.getView();

          // Fit the map view to the extent of the line
          view.fit(extent, {
            duration: 1000, // Duration of the zoom animation
            padding: [50, 50, 50, 50], // Padding around the extent
          });
        }
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
        const response = await axios.get(`http://192.168.1.200:5004/search?city_name=${cityName}`);
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
}, [cityName, handleJumpToLocation]);




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

      {/* <Sidebar activeTool={activeTool} setActiveTool={setActiveTool} /> */}

      <div className="map-container">
        <Header
          layers={layers}
          setActiveMeasurement={setActiveMeasurement}
          clearDrawings={clearDrawings}
          onLayerToggle={handleLayerToggle}
          onJumpToLocation={handleJumpToLocation}
          onPlaceSearch={handleCitySearch} // Pass handleCitySearch here
          onLayerOpacityChange={handleLayerOpacityChange}
          

        />
     
        <Sidebar 
        layers={layers}
        activeTool={activeTool} 
        setActiveTool={setActiveTool} />

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
          poiParams={poiParams}
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
          setRoutingParams={setRoutingParams} // Pass setRouting
          setPointofInterestParams={setPointOfInterestParams} 


        />
        {elevationData && 
        <Popup elevationData={elevationData} 
        handleClose={handlePopupClose}
        map={mapRef.current} />}
     
     
     
      </div>
    </div>
  );
};

export default App;


