import React, { useEffect, useRef, useState } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import ImageLayer from 'ol/layer/Image';
import ImageWMS from 'ol/source/ImageWMS';
import TileWMS from 'ol/source/TileWMS';
import { get as getProjection } from 'ol/proj';
import { getWidth } from 'ol/extent';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Circle, Fill, Stroke, Style, Icon, Text } from 'ol/style';
import { fromLonLat, toLonLat } from 'ol/proj';
import { GeoJSON } from 'ol/format';
import Draw from 'ol/interaction/Draw';
import Overlay from 'ol/Overlay';
import { Feature } from 'ol';
import { Circle as CircleGeom, Point, LineString } from 'ol/geom';
import axios from 'axios';
import Popup from './popup';
import locationPin from '../img/location_pin.png';


const formatLength = (line) => {
  const length = line.clone().transform('EPSG:4326', 'EPSG:3857').getLength();
  let output;
  if (length > 100) {
    output = `${(Math.round((length / 1000) * 100) / 100)} km`;
  } else {
    output = `${(Math.round(length * 100) / 100)} m`;
  }
  return output;
};

const formatArea = (polygon) => {
  const area = polygon.clone().transform('EPSG:4326', 'EPSG:3857').getArea();
  let output;
  if (area > 10000) {
    output = `${(Math.round((area / 1000000) * 100) / 100)} km²`;
  } else {
    output = `${(Math.round(area * 100) / 100)} m²`;
  }
  return output;
};

const WMTSComponent = ({
  mapRef, viewshedParams, setClickedCoordinates, activeMeasurement,
  clearDrawings, bufferParams, onLayerChange, layers, rangeRingsParams, epToolParams, routingParams, setRoutingParams, poiParams
}) => {
  const internalMapRef = useRef();
  const [vectorSource] = useState(new VectorSource());
  const [vectorLayer] = useState(
    new VectorLayer({
      source: vectorSource,
      style: new Style({
        stroke: new Stroke({
          color: 'blue',
          width: 2,
        }),
        fill: new Fill({
          color: 'rgba(0, 0, 255, 0.1)',
        }),
        image: new Circle({
          radius: 5,
          fill: new Fill({ color: 'red' }),
          stroke: new Stroke({ color: 'red', width: 1 }),
        }),
      }),
    })
  );
  const [map, setMap] = useState(null);
  const [draw, setDraw] = useState(null);
  const [measureTooltipElement, setMeasureTooltipElement] = useState(null);
  const [measureTooltip, setMeasureTooltip] = useState(null);
  const [lineFeature, setLineFeature] = useState(null);
  const [elevationData, setElevationData] = useState(null);
  const [profileCoords, setProfileCoords] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const markerRef = useRef(null); // Reference for the moving marker
  
 
  const handleClose = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    const projection = getProjection('EPSG:4326');
    const projectionExtent = projection.getExtent();
    const size = getWidth(projectionExtent) / 256;
    const resolutions = [];
    const matrixIds = [];
    for (let z = 0; z < 19; ++z) {
      resolutions[z] = size / Math.pow(2, z);
      matrixIds[z] = z.toString();
    }

    const countries = new ImageLayer({
      source: new ImageWMS({
        ratio: 1,
        url: 'http://localhost:8080/geoserver/ne/wms/wmts?request=GetCapabilities',
        params: {
          'FORMAT': 'image/jpeg',
          'VERSION': '1.1.1',
          'STYLES': '',
          'LAYERS': 'ne:countries',
        },
      }),
    });
   
    const world = new TileLayer({
      source: new TileWMS({
        url: 'http://localhost:8080/geoserver/ne/wms/wmts?request=GetCapabilities',
        params: {
          'FORMAT': 'image/jpeg',
          'VERSION': '1.1.1',
          'tiled': true,
          'STYLES': '',
          'LAYERS': 'ne:world',
        },
      }),
    });

    const base = new ImageLayer({
      source: new ImageWMS({
        ratio: 1,
        url: 'http://192.168.1.200:8080/geoserver/ne/wms/wmts?request=GetCapabilities',
        params: {
          'FORMAT': 'image/jpeg',
          'VERSION': '1.1.1',
          'STYLES': '',
          'LAYERS': 'ne:base',
        },
      }),
    });

    const osm = new TileLayer({
      source: new TileWMS({
        url: 'http://192.168.1.200:8080/geoserver/ne/wms?request=GetCapabilities',
        params: {
          'FORMAT': 'image/jpeg',
          'VERSION': '1.1.1',
          'tiled': true,
          'STYLES': '',
          'LAYERS': 'ne:osm',
        },
      }),
    });

    const DEM = new TileLayer({
      source: new TileWMS({
        url: 'http://192.168.1.200:8080/geoserver/ne/wms?request=GetCapabilities',
        params: {
          'FORMAT': 'image/jpeg',
          'VERSION': '1.1.1',
          'tiled': true,
          'STYLES': '',
          'LAYERS': 'ne:DEM',
        },
      }),
    });

    const ROAD = new TileLayer({
      source: new TileWMS({
        url: 'http://192.168.1.200:8080/geoserver/ne/wms?request=GetCapabilities',
        params: {
          'FORMAT': 'image/jpeg',
          'VERSION': '1.1.1',
          'tiled': true,
          'STYLES': '',
          'LAYERS': 'ne:ROAD',
        },
      }),
    });

    const WATER = new TileLayer({
      source: new TileWMS({
        url: 'http://192.168.1.200:8080/geoserver/ne/wms?request=GetCapabilities',
        params: {
          'FORMAT': 'image/jpeg',
          'VERSION': '1.1.1',
          'tiled': true,
          'STYLES': '',
          'LAYERS': 'ne:WATER',
        },
      }),
    });

    const RAIL = new TileLayer({
      source: new TileWMS({
        url: 'http://192.168.1.200:8080/geoserver/ne/wms?request=GetCapabilities',
        params: {
          'FORMAT': 'image/jpeg',
          'VERSION': '1.1.1',
          'tiled': true,
          'STYLES': '',
          'LAYERS': 'ne:RAIL',
        },
      }),
    });
    const SAT = new ImageLayer({
      source: new ImageWMS({
        ratio: 1,
        url: 'http://192.168.1.200:8080/geoserver/ne/wms/wmts?request=GetCapabilities',
        params: {
          'FORMAT': 'image/jpeg',
          'VERSION': '1.1.1',
          'STYLES': '',
          'LAYERS': 'ne:SAT',
        },
      }),
    });
    const newMap = new Map({
      target: internalMapRef.current,
    //   layers: [ countries, world, vectorLayer],
      layers: [base, DEM, osm, ROAD, WATER, RAIL,SAT, vectorLayer],
      view: new View({
        projection: projection,
        center: [70, 30],
        zoom: 6.25,
      }),
    });

    console.log(layers);
    onLayerChange([
      { name: 'base', visible: true },
      { name: 'DEM', visible: false },
      { name: 'osm', visible: false },
      { name: 'ROAD', visible: false },
      { name: 'WATER', visible: false },
      { name: 'RAIL', visible: false },
      // { name: 'countries', visible: true },
      // { name: 'world', visible: true },
      { name: 'SAT', visible: true },
    ]);

    newMap.on('click', (evt) => {
      const coordinate = evt.coordinate;
      const lonLat = fromLonLat(coordinate, 'EPSG:4326');
      console.log(`Latitude: ${lonLat[1]}, Longitude: ${lonLat[0]}`);
      setClickedCoordinates(lonLat);
    });

    setMap(newMap);
    mapRef.current = newMap;

    const measureTooltipElement = document.createElement('div');
    measureTooltipElement.className = 'ol-tooltip ol-tooltip-measure';
    const measureTooltip = new Overlay({
      element: measureTooltipElement,
      offset: [0, -15],
      positioning: 'bottom-center',
    });
    newMap.addOverlay(measureTooltip);
    setMeasureTooltipElement(measureTooltipElement);
    setMeasureTooltip(measureTooltip);

    return () => {
      newMap.setTarget(null);
    };
  }, []);

  useEffect(() => {
    if (map) {
      layers.forEach(layer => {
        const mapLayer = map.getLayers().getArray().find(l => l.getSource().getParams().LAYERS === `ne:${layer.name}`);
        if (mapLayer) {
          mapLayer.setVisible(layer.visible);
        }
      });
    }
  }, [layers]);

  //----------------------------------measurement---------------------------------------------------------------------------
  useEffect(() => {
    if (draw && map) {
      map.removeInteraction(draw);
    }

    if (activeMeasurement) {
      if (activeMeasurement === 'clear') {
        clearDrawings();
        return;
      }

      let type;
      if (activeMeasurement === 'length') {
        type = 'LineString';
      } else if (activeMeasurement === 'area') {
        type = 'Polygon';
      }

      const drawInteraction = new Draw({
        source: vectorSource,
        type: type,
      });

      drawInteraction.on('drawstart', (evt) => {
        const sketch = evt.feature;
        let tooltipCoord = evt.coordinate;

        sketch.getGeometry().on('change', (event) => {
          const geom = event.target;
          let output;
          if (geom.getType() === 'Polygon') {
            output = formatArea(geom);
            tooltipCoord = geom.getInteriorPoint().getCoordinates();
          } else if (geom.getType() === 'LineString') {
            output = formatLength(geom);
            tooltipCoord = geom.getLastCoordinate();
          }
          measureTooltipElement.innerHTML = output;
          measureTooltip.setPosition(tooltipCoord);
        });
      });

      drawInteraction.on('drawend', () => {
        measureTooltipElement.className = 'ol-tooltip ol-tooltip-static';
        measureTooltip.setOffset([0, -7]);
        setMeasureTooltipElement(null);
        setMeasureTooltip(null);
        setTimeout(() => {
          const newMeasureTooltipElement = document.createElement('div');
          newMeasureTooltipElement.className = 'ol-tooltip ol-tooltip-measure';
          const newMeasureTooltip = new Overlay({
            element: newMeasureTooltipElement,
            offset: [0, -15],
            positioning: 'bottom-center',
          });
          map.addOverlay(newMeasureTooltip);
          setMeasureTooltipElement(newMeasureTooltipElement);
          setMeasureTooltip(newMeasureTooltip);
        }, 10);
      });

      map.addInteraction(drawInteraction);
      setDraw(drawInteraction);
    }
  }, [activeMeasurement, map]);

  //---------------------------------viewshed-----------------------------------------------------------------------------------------------
  useEffect(() => {
    if (viewshedParams) {
      const geojsonFormat = new GeoJSON();
      const visibleFeatures = geojsonFormat.readFeatures(viewshedParams.visible);
      const nonVisibleFeatures = geojsonFormat.readFeatures(viewshedParams.non_visible);
      const restFeatures = geojsonFormat.readFeatures(viewshedParams.rest);
      // Add styles to the features
      visibleFeatures.forEach(feature => feature.setStyle(new Style({
        stroke: new Stroke({
          color: 'rgba(0, 169, 0, 1)', // Green
          width: 2,
        }),
        fill: new Fill({
          color: 'rgba(0, 169, 0, 1)', // Green
        }),
      })));
      nonVisibleFeatures.forEach(feature => feature.setStyle(new Style({
        stroke: new Stroke({
          color: 'rgba(255, 0, 0, 1)', // Red
          width: 2,
        }),
        fill: new Fill({
          color: 'rgba(255, 0, 0, 1)', // Red
        }),
      })));
      restFeatures.forEach(feature => feature.setStyle(new Style({
        stroke: new Stroke({
          color: 'rgba(255, 0, 0, 1)', // Blue
          width: 2,
        }),
        fill: new Fill({
          color: 'rgba(255, 0, 0, 1)', // Blue
        }),
      })));
      vectorSource.clear();
      vectorSource.addFeatures(restFeatures);
      //vectorSource.addFeatures(nonVisibleFeatures);
      vectorSource.addFeatures(visibleFeatures);
      //vectorSource.addFeatures(restFeatures);
      const extent = vectorSource.getExtent();
      if (extent) {
        map.getView().fit(extent, {
          padding: [50, 50, 50, 50],
          duration: 1000,
        });
      }
    }
  }, [viewshedParams, map, vectorSource]);
//-------------------------------------------buffer-------------------------------------------------------------------------------------------------------------
useEffect(() => {
  console.log('useEffect triggered for bufferParams');

  if (bufferParams) {
    const { latitude, longitude, radius } = bufferParams;
    
    console.log('Buffer Parameters:', bufferParams);

    // Clear existing features
    vectorSource.clear();
    console.log('Cleared existing features');

    // Create a circular buffer feature
    const center = fromLonLat([longitude, latitude], 'EPSG:4326');
    console.log('Center coordinates:', center);
    
    const bufferFeature = new Feature(new CircleGeom(center, radius / 100000));
    vectorSource.addFeature(bufferFeature);
    console.log('Added buffer feature');

    // Add a marker at the center of the buffer
    addMarkerPin(vectorSource, center, 'Center Marker');
    console.log('Added marker feature at center');

    // Fit the map to the buffer
    const extent = bufferFeature.getGeometry().getExtent();
    console.log('Buffer extent:', extent);
    if (extent) {
      map.getView().fit(extent, {
        padding: [50, 50, 50, 50],
        duration: 1000,
      });
      console.log('Fitting map to buffer extent');
    }
  }
}, [bufferParams, map, vectorSource]);
//---------------------------------------range rings---------------------------------------------------------------------------------------------
useEffect(() => {
  console.log('useEffect triggered for rangeRingsParams');

  if (rangeRingsParams) {
    const { latitude, longitude, radius, rings } = rangeRingsParams;
    
    console.log('Range Rings Parameters:', rangeRingsParams);

    // Clear existing features
    vectorSource.clear();
    console.log('Cleared existing features');

    // Create circular range ring features
    const center = fromLonLat([longitude, latitude], 'EPSG:4326');
    let ringFeature;
    for (let i = 1; i <= rings; i++) {
      ringFeature = new Feature(new CircleGeom(center, (radius * i) / 100000));
      vectorSource.addFeature(ringFeature);
    }
    console.log('Added range ring features');

    // Add a marker at the center of the range rings
    addMarkerPin(vectorSource, center, 'Center Marker');
    console.log('Added marker feature at center of range rings');

    // Fit the map to the buffer rings if the extent is valid
    const extent = ringFeature.getGeometry().getExtent();
    if (extent) {
      map.getView().fit(extent, {
        padding: [50, 50, 50, 50],
        duration: 1000,
      });
      console.log('Fitting map to range rings extent');
    }
  }
}, [rangeRingsParams, map, vectorSource]);
//-----------------------------------------elevation profile---------------------------------------------------------------------------------
const addMarkerPin = (vectorSource, coords, label) => {
  if (!coords) return;

  const marker = new Feature({
    geometry: new Point(coords),
    name: label,
  });

  const markerStyle = new Style({
    image: new Circle({
      radius: 7,
      fill: new Fill({
        color: 'rgba(255, 0, 0, 0.9)',
      }),
      stroke: new Stroke({
        color: '#fff',
        width: 2,
      }),
    }),
    text: new Text({
      text: label,
      offsetY: -25,
      fill: new Fill({
        color: '#000',
      }),
      stroke: new Stroke({
        color: '#fff',
        width: 2,
      }),
    }),
  });

  marker.setStyle(markerStyle);
  vectorSource.addFeature(marker);
  console.log(`Added marker: ${label} at coordinates: ${coords}`);
};

const drawStraightLine = (vectorSource, startCoords, endCoords) => {
  if (!startCoords || !endCoords) return;

  console.log(`Drawing line from ${startCoords} to ${endCoords}`);
  
  const lineFeature = new Feature({
    geometry: new LineString([startCoords, endCoords]),
  });

  const lineStyle = new Style({
    stroke: new Stroke({
      color: 'rgba(255, 0, 0, 1)',
      width: 2,
    }),
  });

  lineFeature.setStyle(lineStyle);
  vectorSource.addFeature(lineFeature);
  console.log(`Added line feature from ${startCoords} to ${endCoords}`);
  return lineFeature;
};

const fetchElevationProfile = async (start, end) => {
  if (!start || !end) return;

  console.log(`Fetching elevation profile from ${start} to ${end}`);

  try {
    const response = await axios.post('http://192.168.1.200:5002/elevation_profile', {
      start: {
        lat: start[1],
        lon: start[0],
      },
      end: {
        lat: end[1],
        lon: end[0],
      },
    });

    setElevationData(response.data);
    setProfileCoords(response.data.features[0].geometry.coordinates);
    setShowPopup(true);
    console.log('Elevation profile data:', response.data);
  } catch (error) {
    console.error('Error fetching elevation profile:', error);
  }
};

useEffect(() => {
  console.log('useEffect triggered for epToolParams');

  if (epToolParams && epToolParams.start && epToolParams.end) {
    // Clear existing features
    vectorSource.clear();
    console.log('Cleared existing features');

    const startCoords = fromLonLat(epToolParams.start, 'EPSG:4326');
    const endCoords = fromLonLat(epToolParams.end, 'EPSG:4326');

    addMarkerPin(vectorSource, startCoords, 'Start Point');
    addMarkerPin(vectorSource, endCoords, 'End Point');
    
    const newLineFeature = drawStraightLine(vectorSource, startCoords, endCoords);
    setLineFeature(newLineFeature);
    
    fetchElevationProfile(epToolParams.start, epToolParams.end);

    // Fit the map to the markers and line if the extent is valid
    const extent = newLineFeature.getGeometry().getExtent();
    if (extent) {
      map.getView().fit(extent, {
        padding: [50, 50, 50, 50],
        duration: 1000,
      });
      console.log('Fitting map to elevation profile extent');
    }
  }
}, [epToolParams, map, vectorSource]);

const updateMovingMarker = (coords) => {
  if (!markerRef.current) {
    const marker = new Feature({
      geometry: new Point(fromLonLat([coords[0], coords[1]], 'EPSG:4326')),
    });

    const markerStyle = new Style({
      image: new Circle({
        radius: 7,
        fill: new Fill({
          color: 'rgba(0, 0, 255, 0.9)',
        }),
        stroke: new Stroke({
          color: '#fff',
          width: 2,
        }),
      }),
    });

    marker.setStyle(markerStyle);

    markerRef.current = marker;
    vectorSource.addFeature(marker);
    console.log(`Added moving marker at coordinates: ${toLonLat([coords[0], coords[1]])}`);
  } else {
    markerRef.current.getGeometry().setCoordinates(fromLonLat([coords[0], coords[1]], 'EPSG:4326'));
    console.log(`Updated moving marker to coordinates: ${toLonLat([coords[0], coords[1]])}`);
  }
};

//------------------------------------------Point of interest--------------------------------------------------------------------------
useEffect(() => {
  // Check if POI parameters are available
  if (poiParams && poiParams.latitude && poiParams.longitude && poiParams.radius && poiParams.type) {
    // Clear existing features
    vectorSource.clear();

    // Create and add buffer feature
    const { latitude, longitude, radius } = poiParams;
    const center = fromLonLat([longitude, latitude], 'EPSG:4326');
    const bufferFeature = new Feature({
      geometry: new CircleGeom(center, radius / 100000) // Convert radius from meters to appropriate units
    });

    const bufferStyle = new Style({
      stroke: new Stroke({
        color: 'rgba(0, 0, 255, 0.5)',
        width: 2,
      }),
      fill: new Fill({
        color: 'rgba(0, 0, 255, 0.2)',
      }),
    });

    bufferFeature.setStyle(bufferStyle);
    vectorSource.addFeature(bufferFeature);

    // Fetch POIs from API
    const fetchPOIs = async () => {
      try {
        const response = await axios.get('http://192.168.1.200:5005/poi', {
          params: {
            lat: poiParams.latitude,
            lng: poiParams.longitude,
            radius: poiParams.radius,
            type: poiParams.type,
          },
        });

        const pois = response.data.points; // Access the points array from the response
        console.log("pois", pois);

        pois.forEach((poi) => {
          const { lat, lng, name } = poi; // Note: Adjusted to `lat` and `lng` to match the backend response
          console.log("poi", poi);

          // Create POI feature
          const poiFeature = new Feature({
            geometry: new Point(fromLonLat([lng, lat], 'EPSG:4326')),
            name,
          });
          console.log("poiFeature", poiFeature);

          // Style POI feature
          const poiStyle = new Style({
            image: new Circle({
              radius: 5,
              fill: new Fill({
                color: 'rgba(0, 0, 255, 0.6)',
              }),
              stroke: new Stroke({
                color: '#fff',
                width: 2,
              }),
            }),
            text: new Text({
              text: name,
              offsetY: -15,
              fill: new Fill({
                color: '#000',
              }),
              stroke: new Stroke({
                color: '#fff',
                width: 2,
              }),
            }),
          });

          poiFeature.setStyle(poiStyle);
          vectorSource.addFeature(poiFeature);
        });

        // Adjust map view to fit all features
        const extent = vectorSource.getExtent();
        if (extent) {
          map.getView().fit(extent, {
            padding: [50, 50, 50, 50],
            duration: 1000,
          });
        }
      } catch (error) {
        console.error('Error fetching POIs:', error);
      }
    };

    fetchPOIs();

    // Optional: Add click interaction to show popup for POIs
    const handleClick = (evt) => {
      const feature = map.getFeaturesAtPixel(evt.pixel)[0];
      if (feature && feature.get('name')) {
        // Display popup with POI details
        setShowPopup(true);
        // setElevationData(feature.get('name')); // Set appropriate data to show in popup
      }
    };

    map.on('click', handleClick);

    return () => {
      map.un('click', handleClick); // Cleanup event listener on unmount
    };
  }
}, [poiParams, map, vectorSource]);


//---------------------------------------------- Routing-------------------------------------------------------------------------------------------------------
  useEffect(() => {
    if (routingParams && routingParams.start && routingParams.end) {
      addMarkerPin(map, routingParams.start, 'Start Point');
      addMarkerPin(map, routingParams.end, 'End Point');
      fetchShortestPath(routingParams.start, routingParams.end);
    }
  }, [routingParams, map]);
  const fetchShortestPath = async (start, end) => {
    if (!start || !end) return;
    try {
      const response = await axios.post('http://192.168.1.200:5003/shortest_path', {
        source_lon: start[0],
        source_lat: start[1],
        dest_lon: end[0],
        dest_lat: end[1],
      });
      const geojson = response.data;
      console.log('Server response:', geojson);
      const coordinates = [];
      geojson.features.forEach((feature) => {
        if (feature.geometry && feature.geometry.type === 'Point') {
          const coord = feature.geometry.coordinates;
          if (coord.length === 2) {
            coordinates.push(coord);
            console.log(`Coordinate: ${coord}`);
          }
        }
      });
      console.log('Fetched coordinates:', coordinates);
      if (coordinates.length < 2) {
        throw new Error('Insufficient coordinates to draw the route');
      }
      const newLineFeature = drawRouteLine(coordinates);
      setLineFeature(newLineFeature);
      const extent = newLineFeature.getGeometry().getExtent();
      console.log('Calculated extent:', extent);
      if (extent.every(value => isFinite(value))) {
        map.getView().fit(extent, {
          padding: [50, 50, 50, 50],
          duration: 1000,
        });
        console.log('Map view updated to fit the route.');
      } else {
        throw new Error('Invalid extent');
      }
    } catch (error) {
      console.error('Error fetching shortest path:', error);
    }
  };
  const drawRouteLine = (coordinates) => {
    if (!map || !coordinates.length) return;
    const lineFeature = new Feature({
      geometry: new LineString(coordinates),
    });
    const lineStyle = new Style({
      stroke: new Stroke({
        color: 'rgba(255, 0, 0, 1)',
        width: 2,
      }),
    });
    lineFeature.setStyle(lineStyle);
    vectorSource.clear(); // Clear previous features
    vectorSource.addFeature(lineFeature);
    return lineFeature;
  };
  return (
    <div ref={internalMapRef} style={{ width: '100%', height: '100%' }}>
      <div id="popup" className="ol-popup">
        <a href="#" id="popup-closer" className="ol-popup-closer"></a>
        <div id="popup-content"></div>
      </div>
      {showPopup && (
        <Popup
          elevationData={elevationData}
          handleClose={handleClose}
          map={map}
          lineFeature={lineFeature}
          profileCoords={profileCoords}
          updateMovingMarker={updateMovingMarker}
        />
      )}
    </div>
  );
};
export default WMTSComponent;