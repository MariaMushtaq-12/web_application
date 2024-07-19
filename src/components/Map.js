//perfectly working with all tools
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
import { Circle, Fill, Stroke, Style } from 'ol/style';
import { fromLonLat, transform } from 'ol/proj';
import { GeoJSON } from 'ol/format';
import Draw from 'ol/interaction/Draw';
import Modify from 'ol/interaction/Modify';
import Overlay from 'ol/Overlay';
import { Feature } from 'ol';
import { getArea, getLength } from 'ol/sphere';
import { Circle as CircleGeom } from 'ol/geom';
import { remove } from 'ol/array';
import Chart from 'chart.js/auto';
import {Point} from 'ol/geom';
import {LineString} from 'ol/geom';

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
const WMTSComponent = ({ mapRef, viewshedParams, setClickedCoordinates, activeMeasurement, clearDrawings, bufferParams, onLayerChange, layers,rangeRingsParams,  epToolParams, setElevationData }) => {
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
  const [modify, setModify] = useState(null);
  const [measureTooltipElement, setMeasureTooltipElement] = useState(null);
  const [measureTooltip, setMeasureTooltip] = useState(null);
  const markerRef = useRef(null); // Reference for the moving marker
//--------------------layers from geoserver---------------------------------------------------------------------------------
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
  const base= new ImageLayer({
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
  

  const newMap = new Map({
    target: internalMapRef.current,
    layers: [base,DEM,osm, ROAD,WATER, RAIL,countries, world,  vectorLayer], //add their the additional layers name
    view: new View({
      projection: projection,
      center: [70, 30],
      zoom: 5.8,
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
    { name: 'countries', visible: true },
    { name: 'world', visible: true },
        
//  { name: 'pak_osm', visible: true },  //add here original layer name which is on geoserver, it will fetch it directly from geoserver
// { name: 'pak_dem', visible: true },
  ]);

  newMap.on('click', (evt) => {
    const coordinate = evt.coordinate;
    const lonLat = fromLonLat(coordinate, 'EPSG:4326');
    console.log(`Latitude: ${lonLat[1]}, Longitude: ${lonLat[0]}`);
    setClickedCoordinates(lonLat);
  });

  setMap(newMap);
  mapRef.current = newMap;

  const modifyInteraction = new Modify({ source: vectorSource });
  newMap.addInteraction(modifyInteraction);
  setModify(modifyInteraction);

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
    if (draw) {
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
  }, [activeMeasurement]);

 
  
//---------------------------------viewshed-----------------------------------------------------------------------------------------------
  useEffect(() => {
    if (viewshedParams) {
        const geojsonFormat = new GeoJSON();
        const visibleFeatures = geojsonFormat.readFeatures(viewshedParams.visible);
        const nonVisibleFeatures = geojsonFormat.readFeatures(viewshedParams.non_visible);
        const restFeatures = geojsonFormat.readFeatures(viewshedParams.rest);
///colors
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
        //vectorSource.addFeatures(nonVisibleFeatures);
       
        vectorSource.addFeatures(visibleFeatures);
       vectorSource.addFeatures(restFeatures);
       

        const extent = vectorSource.getExtent();
        if (extent) {
            map.getView().fit(extent, {
                padding: [50, 50, 50, 50],
                duration: 1000,
            });
        }
    }
}, [viewshedParams]);

//---------------------buffer-------------------------------------------------------------------------------------------------------------

useEffect(() => {
  if (bufferParams) {
    const { latitude, longitude, radius } = bufferParams;

    // Clear existing features
    vectorSource.clear();

    // Create a circular buffer feature
    const center = fromLonLat([longitude, latitude], 'EPSG:4326');
    const bufferFeature = new Feature(new CircleGeom(center, radius/100000));

    vectorSource.addFeature(bufferFeature);

    // Fit the map to the buffer
    const extent = bufferFeature.getGeometry().getExtent();
    if (extent) {
      map.getView().fit(extent, {
        padding: [50, 50, 50, 50],
        duration: 1000,
      });
    }
  }
}, [bufferParams]);


//-------------------------------range rings---------------------------------------------------------------------------------------------
useEffect(() => {
  if (rangeRingsParams) {
    const { latitude, longitude, radius, rings } = rangeRingsParams;

    // Clear existing features
    vectorSource.clear();

    // Create circular buffer features
    const center = fromLonLat([longitude, latitude], 'EPSG:4326');
    let ringFeature;
    for (let i = 1; i <= rings; i++) {
      ringFeature = new Feature(new CircleGeom(center, (radius * i) / 100000));
      vectorSource.addFeature(ringFeature);
    }

    // Fit the map to the buffer rings if the extent is valid
    const extent = ringFeature.getGeometry().getExtent();
    if (extent) {
      map.getView().fit(extent, {
        padding: [50, 50, 50, 50],
        duration: 1000,
      });
    }
  }
}, [rangeRingsParams, vectorSource, map]);

//-----------------------------------------elevation profile---------------------------------------------------------------------------------
useEffect(() => {
  if (epToolParams) {
    const { start, end } = epToolParams;
    if (start && end) {
      addMarkerPin(map, start, 'Start Point');
      addMarkerPin(map, end, 'End Point');
      drawStraightLine(map, start, end);
      fetchElevationProfile(start, end);
    }
  }
}, [epToolParams]);

const addMarkerPin = (map, coords, label) => {
  const marker = new Feature({
    geometry: new Point(fromLonLat(coords)),
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
};

const drawStraightLine = (map, startCoords, endCoords) => {
  const lineFeature = new Feature({
    geometry: new LineString([fromLonLat(startCoords), fromLonLat(endCoords)]),
  });

  const lineStyle = new Style({
    stroke: new Stroke({
      color: 'rgba(255, 0, 0, 1)',
      width: 2,
    }),
  });

  lineFeature.setStyle(lineStyle);
  vectorSource.addFeature(lineFeature);
};

const fetchElevationProfile = async (start, end) => {
  try {
    const response = await fetch('http://127.0.0.1:5002/elevation_profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        start: {
          lat: start[1],
          lon: start[0],
        },
        end: {
          lat: end[1],
          lon: end[0],
        },
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    setElevationData(data);
  } 
  
  catch (error) {
    console.error('Error fetching elevation profile:', error);
  }
};




  return (
    <div ref={internalMapRef} style={{ width: '100%', height: '100%' }}>
      <div id="popup" className="ol-popup">
        <a href="#" id="popup-closer" className="ol-popup-closer"></a>
        <div id="popup-content"></div>
      </div>
    </div>
  );
};

export default WMTSComponent;