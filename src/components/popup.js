// import React, { useEffect, useRef } from 'react';
// import Chart from 'chart.js/auto';
// import { fromLonLat } from 'ol/proj';
// import { Feature } from 'ol';
// import Point from 'ol/geom/Point';
// import VectorSource from 'ol/source/Vector';
// import VectorLayer from 'ol/layer/Vector';
// import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';

// const Popup = ({ elevationData, handleClose, map, lineFeature }) => {
//   const chartRef = useRef(null);
//   const markerRef = useRef(null);

//   useEffect(() => {
//     if (elevationData) {
//       const profileCoords = elevationData.features[0].geometry.coordinates;
//       const distances = [];
//       const elevations = [];
//       let cumulativeDistance = 0;

//       for (let i = 0; i < profileCoords.length; i++) {
//         if (i > 0) {
//           const prevLon = profileCoords[i - 1][0];
//           const prevLat = profileCoords[i - 1][1];
//           const lon = profileCoords[i][0];
//           const lat = profileCoords[i][1];
//           const distance = calculateDistance(prevLon, prevLat, lon, lat);
//           cumulativeDistance += distance;
//         }
//         distances.push(cumulativeDistance);
//         elevations.push(profileCoords[i][2]);
//       }

//       const ctx = chartRef.current.getContext('2d');
//       if (window.myChart) {
//         window.myChart.destroy(); // Destroy previous chart instance if exists
//       }
//       window.myChart = new Chart(ctx, {
//         type: 'line',
//         data: {
//           labels: distances,
//           datasets: [
//             {
//               label: 'Elevation Profile',
//               data: elevations,
//               borderColor: 'rgba(75, 192, 192, 1)',
//               fill: false,
//               tension: 0.1,
//             },
//           ],
//         },
//         options: {
//           responsive: true,
//           maintainAspectRatio: false,
//           scales: {
//             x: {
//               type: 'linear',
//               position: 'bottom',
//               title: {
//                 display: true,
//                 text: 'Distance (meters)',
//               },
//             },
//             y: {
//               title: {
//                 display: true,
//                 text: 'Elevation (meters)',
//               },
//             },
//           },
//           plugins: {
//             tooltip: {
//               enabled: false,
//               external: externalTooltipHandler,
//             },
//           },
//           onClick: (event, chartElement) => {
//             if (chartElement.length) {
//               const index = chartElement[0].index;
//               const coords = profileCoords[index];
//               updateMovingMarker(coords);
//             }
//           },
//         },
//       });
//     }
//   }, [elevationData, lineFeature, map]);

//   const calculateDistance = (lon1, lat1, lon2, lat2) => {
//     const R = 6371e3; // Earth radius in meters
//     const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
//     const φ2 = (lat2 * Math.PI) / 180;
//     const Δφ = ((lat2 - lat1) * Math.PI) / 180;
//     const Δλ = ((lon2 - lon1) * Math.PI) / 180;

//     const a =
//       Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
//       Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

//     return R * c; // Distance in meters
//   };

//   const externalTooltipHandler = (context) => {
//     // Do nothing, just prevent the default tooltip
//   };

//   const updateMovingMarker = (coords) => {
//     if (!markerRef.current) {
//       const marker = new Feature({
//         geometry: new Point(fromLonLat([coords[0], coords[1]])),
//       });

//       const markerStyle = new Style({
//         image: new CircleStyle({
//           radius: 7,
//           fill: new Fill({
//             color: 'rgba(0, 0, 255, 0.9)',
//           }),
//           stroke: new Stroke({
//             color: '#fff',
//             width: 2,
//           }),
//         }),
//       });

//       marker.setStyle(markerStyle);

//       const vectorSource = new VectorSource({
//         features: [marker],
//       });

//       const markerLayer = new VectorLayer({
//         source: vectorSource,
//       });

//       map.addLayer(markerLayer);
//       markerRef.current = marker;
//     } else {
//       markerRef.current.getGeometry().setCoordinates(fromLonLat([coords[0], coords[1]]));
//     }
//   };

//   return (
//     <div className="popup1 fixed top-4 w-1/3 right-4">
//       <div className="popup-content w-full bg-gray-600 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 p-4">
       
//         <div id="chart-container" className="bg-black w-full h-96 mt-4">
//           <canvas id="elevationChart" className="w-full" ref={chartRef}></canvas>
//         </div>
//         <button className="close-btn text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-4" onClick={handleClose}>
//           Close
//         </button>

        
//       </div>
//     </div>
//   );
// };

// export default Popup;



// //smooth line of graph
// import React, { useEffect, useRef } from 'react';
// import Chart from 'chart.js/auto';
// import { fromLonLat } from 'ol/proj';
// import { Feature } from 'ol';
// import Point from 'ol/geom/Point';
// import VectorSource from 'ol/source/Vector';
// import VectorLayer from 'ol/layer/Vector';
// import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';

// const Popup = ({ elevationData, handleClose, map, lineFeature }) => {
//   const chartRef = useRef(null);
//   const markerRef = useRef(null);

//   useEffect(() => {
//     if (elevationData) {
//       const profileCoords = elevationData.features[0].geometry.coordinates;
//       const distances = [];
//       const elevations = [];
//       let cumulativeDistance = 0;

//       for (let i = 0; i < profileCoords.length; i++) {
//         if (i > 0) {
//           const prevLon = profileCoords[i - 1][0];
//           const prevLat = profileCoords[i - 1][1];
//           const lon = profileCoords[i][0];
//           const lat = profileCoords[i][1];
//           const distance = calculateDistance(prevLon, prevLat, lon, lat);
//           cumulativeDistance += distance;
//         }
//         distances.push(cumulativeDistance);
//         elevations.push(profileCoords[i][2]);
//       }

//       const ctx = chartRef.current.getContext('2d');
//       if (window.myChart) {
//         window.myChart.destroy(); // Destroy previous chart instance if exists
//       }
//       window.myChart = new Chart(ctx, {
//         type: 'line',
//         data: {
//           labels: distances,
//           datasets: [
//             {
//               label: 'Elevation Profile',
//               data: elevations,
//               borderColor: 'rgba(75, 192, 192, 1)',
//               //fill: false,
//               tension: 0.4, // Added tension for smoothing
//               backgroundColor: 'rgba(75, 192, 192, 0.2)', // Fill color
//               fill: true, // Enable fill
//               tension: 0.4, // Added tension for smoothing
//             },
//           ],
//         },
//         options: {
//           responsive: true,
//           maintainAspectRatio: false,
         
//           scales: {
//             x: {
//               type: 'linear',
//               position: 'bottom',
//               title: {
//                 display: true,
//                 text: 'Distance (meters)',
                
//               },
//             },
//             y: {
//               title: {
//                 display: true,
//                 text: 'Elevation (meters)',
//               },
//             },
//           },
//           plugins: {
//             tooltip: {
//               enabled: false,
//               external: externalTooltipHandler,
              
//             },
//           },
//           onClick: (event, chartElement) => {
//             if (chartElement.length) {
//               const index = chartElement[0].index;
//               const coords = profileCoords[index];
//               updateMovingMarker(coords);
//               console.log('Hover index:', index);
//             }
      
//           },
//           onHover: (event, chartElement) => {
//     if (chartElement.length) {
//       const index = chartElement[0].index;
//       const coords = profileCoords[index];
//       updateMovingMarker(coords);
//     }
//   },
          
   
//         },
//       });
//     }
//   }, [elevationData, lineFeature, map]);

//   const calculateDistance = (lon1, lat1, lon2, lat2) => {
//     const R = 6371e3; // Earth radius in meters
//     const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
//     const φ2 = (lat2 * Math.PI) / 180;
//     const Δφ = ((lat2 - lat1) * Math.PI) / 180;
//     const Δλ = ((lon2 - lon1) * Math.PI) / 180;

//     const a =
//       Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
//       Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

//     return R * c; // Distance in meters
//   };

//   const externalTooltipHandler = (context) => {
//     // Do nothing, just prevent the default tooltip
//   };

//   const updateMovingMarker = (coords) => {
//     if (!markerRef.current) {
//       const marker = new Feature({
//         geometry: new Point(fromLonLat([coords[0], coords[1]])),
//       });

//       const markerStyle = new Style({
//         image: new CircleStyle({
//           radius: 7,
//           fill: new Fill({
//             color: 'rgba(0, 0, 255, 0.9)',
//           }),
//           stroke: new Stroke({
//             color: '#fff',
//             width: 2,
//           }),
//         }),
//       });

//       marker.setStyle(markerStyle);

//       const vectorSource = new VectorSource({
//         features: [marker],
//       });

//       const markerLayer = new VectorLayer({
//         source: vectorSource,
//       });

//       map.addLayer(markerLayer);
//       markerRef.current = marker;
//     } else {
//       markerRef.current.getGeometry().setCoordinates(fromLonLat([coords[0], coords[1]]));
//     }
//   };

//   return (
//     <div className="popup1 fixed top-4 w-1/3 right-4">
//       <div className="popup-content w-full bg-gray-600 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 p-4">
       
//         <div id="chart-container" className="bg-black w-full h-96 mt-4">
//           <canvas id="elevationChart" className="w-full" ref={chartRef}></canvas>
//         </div>
//         <button className="close-btn text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-4" onClick={handleClose}>
//           Close
//         </button>

        
//       </div>
//     </div>
//   );
// };

// export default Popup;


import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { fromLonLat } from 'ol/proj';
import { Feature } from 'ol';
import Point from 'ol/geom/Point';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';

const Popup = ({ elevationData, handleClose, map, lineFeature }) => {
  const chartRef = useRef(null);
  const markerRef = useRef(null);
  const [startPoint, setStartPoint] = useState(null);
  const [endPoint, setEndPoint] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [hoveredPoint, setHoveredPoint] = useState(null);

  useEffect(() => {
    if (elevationData) {
      const profileCoords = elevationData.features[0].geometry.coordinates;
      const distances = [];
      const elevations = [];
      let cumulativeDistance = 0;

      for (let i = 0; i < profileCoords.length; i++) {
        if (i > 0) {
          const prevLon = profileCoords[i - 1][0];
          const prevLat = profileCoords[i - 1][1];
          const lon = profileCoords[i][0];
          const lat = profileCoords[i][1];
          const distance = calculateDistance(prevLon, prevLat, lon, lat);
          cumulativeDistance += distance;
        }
        distances.push(cumulativeDistance);
        elevations.push(profileCoords[i][2]);
      }

      const ctx = chartRef.current.getContext('2d');
      if (window.myChart) {
        window.myChart.destroy(); // Destroy previous chart instance if exists
      }
      window.myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: distances,
          datasets: [
            {
              label: 'Elevation Profile',
              data: elevations,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)', // Fill color
              fill: true, // Enable fill
              tension: 0.4, // Added tension for smoothing
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              type: 'linear',
              position: 'bottom',
              title: {
                display: true,
                text: 'Distance (meters)',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Elevation (meters)',
              },
            },
          },
          plugins: {
            tooltip: {
              enabled: false,
              external: externalTooltipHandler,
            },
          },
          onClick: (event, chartElement) => {
            if (chartElement.length) {
              const index = chartElement[0].index;
              const coords = profileCoords[index];
              updateMovingMarker(coords);
              zoomIntoMap(coords);
            }
          },
        },
      });
    }
  }, [elevationData, lineFeature, map]);

  useEffect(() => {
    const canvas = chartRef.current;

    const handleMouseDown = (e) => {
      const rect = canvas.getBoundingClientRect();
      setStartPoint({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      setEndPoint({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      setIsDragging(true);
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      if (isDragging) {
        setEndPoint({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        if (window.myChart) {
          window.myChart.update();
        }
      } else {
        const elements = window.myChart.getElementsAtEventForMode(e, 'nearest', { intersect: true }, true);
        if (elements.length) {
          const index = elements[0].index;
          const coords = elevationData.features[0].geometry.coordinates[index];
          setHoveredPoint({ lon: coords[0], lat: coords[1], elevation: coords[2] });
        } else {
          setHoveredPoint(null);
        }
      }
    };

    const handleMouseUp = (e) => {
      if (isDragging) {
        setIsDragging(false);
        const rect = canvas.getBoundingClientRect();
        const finalEndPoint = { x: e.clientX - rect.left, y: e.clientY - rect.top };
        zoomChart(startPoint, finalEndPoint);
        setStartPoint(null);
        setEndPoint(null);
      }
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, startPoint, endPoint]);

  const zoomChart = (startPoint, endPoint) => {
    const chart = window.myChart;
    const xAxis = chart.scales.x;
    const yAxis = chart.scales.y;

    const startX = Math.min(startPoint.x, endPoint.x);
    const endX = Math.max(startPoint.x, endPoint.x);
    const startY = Math.min(startPoint.y, endPoint.y);
    const endY = Math.max(startPoint.y, endPoint.y);

    const xMin = xAxis.getValueForPixel(startX);
    const xMax = xAxis.getValueForPixel(endX);
    const yMin = yAxis.getValueForPixel(endY);
    const yMax = yAxis.getValueForPixel(startY);

    xAxis.options.min = xMin;
    xAxis.options.max = xMax;
    yAxis.options.min = yMin;
    yAxis.options.max = yMax;

    chart.update();
  };

  const zoomOutChart = () => {
    const chart = window.myChart;
    const xAxis = chart.scales.x;
    const yAxis = chart.scales.y;

    xAxis.options.min = undefined;
    xAxis.options.max = undefined;
    yAxis.options.min = undefined;
    yAxis.options.max = undefined;

    chart.update();
  };

  const calculateDistance = (lon1, lat1, lon2, lat2) => {
    const R = 6371e3; // Earth radius in meters
    const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in meters
  };

  const externalTooltipHandler = (context) => {
    // Create tooltip
    const tooltipEl = document.getElementById('chartjs-tooltip');
    const tooltipModel = context.tooltip;

    if (tooltipModel.opacity === 0) {
      tooltipEl.style.opacity = 0;
      return;
    }

    tooltipEl.classList.remove('above', 'below', 'no-transform');
    if (tooltipModel.yAlign) {
      tooltipEl.classList.add(tooltipModel.yAlign);
    } else {
      tooltipEl.classList.add('no-transform');
    }

    function getBody(bodyItem) {
      return bodyItem.lines;
    }

    if (tooltipModel.body) {
      const titleLines = tooltipModel.title || [];
      const bodyLines = tooltipModel.body.map(getBody);

      let innerHtml = '<thead>';

      titleLines.forEach((title) => {
        innerHtml += '<tr><th>' + title + '</th></tr>';
      });
      innerHtml += '</thead><tbody>';

      bodyLines.forEach((body, i) => {
        const colors = tooltipModel.labelColors[i];
        let style = 'background:' + colors.backgroundColor;
        style += '; border-color:' + colors.borderColor;
        style += '; border-width: 2px';
        const span = '<span style="' + style + '"></span>';
        innerHtml += '<tr><td>' + span + body + '</td></tr>';
      });
      innerHtml += '</tbody>';

      let tableRoot = tooltipEl.querySelector('table');
      tableRoot.innerHTML = innerHtml;
    }

    const position = context.chart.canvas.getBoundingClientRect();
    tooltipEl.style.opacity = 1;
    tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
    tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px';
    tooltipEl.style.font = tooltipModel.options.bodyFont.string;
    tooltipEl.style.padding = tooltipModel.options.padding + 'px ' + tooltipModel.options.padding + 'px';
  };

  const updateMovingMarker = (coords) => {
    if (!markerRef.current) {
      const marker = new Feature({
        geometry: new Point(fromLonLat([coords[0], coords[1]])),
      });

      const markerStyle = new Style({
        image: new CircleStyle({
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

      const vectorSource = new VectorSource({
        features: [marker],
      });

      const markerLayer = new VectorLayer({
        source: vectorSource,
      });

      map.addLayer(markerLayer);
      markerRef.current = marker;
    } else {
      markerRef.current.getGeometry().setCoordinates(fromLonLat([coords[0], coords[1]]));
    }
  };

  const zoomIntoMap = (coords) => {
    const view = map.getView();
    const zoom = view.getZoom();
    const newZoom = zoom + 2; // Adjust the zoom level as needed
    view.setCenter(fromLonLat([coords[0], coords[1]]));
    view.setZoom(newZoom);
  };

  return (
    <div className="popup1 fixed top-4 w-1/3 right-4">
      <div className="popup-content w-full bg-gray-600 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 p-4">
        <div id="chart-container" className="bg-black w-full h-96 mt-4 relative">
          <canvas id="elevationChart" className="w-full" ref={chartRef}></canvas>
          {startPoint && endPoint && isDragging && (
            <div
              style={{
                position: 'absolute',
                border: '1px dashed gray',
                backgroundColor: 'rgba(128, 128, 128, 0.2)',
                left: `${Math.min(startPoint.x, endPoint.x)}px`,
                top: `${Math.min(startPoint.y, endPoint.y)}px`,
                width: `${Math.abs(startPoint.x - endPoint.x)}px`,
                height: `${Math.abs(startPoint.y - endPoint.y)}px`,
              }}
            />
          )}
          {hoveredPoint && (
            <div
              style={{
                position: 'absolute',
                left: `${hoveredPoint.x}px`,
                top: `${hoveredPoint.y}px`,
                backgroundColor: 'white',
                padding: '2px 4px',
                borderRadius: '4px',
                pointerEvents: 'none',
                transform: 'translate(-50%, -100%)',
              }}
            >
              {`Lat: ${hoveredPoint.lat}, Lon: ${hoveredPoint.lon}, Elev: ${hoveredPoint.elevation}`}
            </div>
          )}
        </div>
        <button className="close-btn text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-4" onClick={handleClose}>
          Close
        </button>
        <button className="zoom-out-btn text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-4" onClick={zoomOutChart}>
          Zoom Out
        </button>
      </div>
    </div>
  );
};

export default Popup;


//hovering in console
// import React, { useEffect, useRef } from 'react';
// import Chart from 'chart.js/auto';
// import { fromLonLat } from 'ol/proj';
// import { Feature } from 'ol';
// import Point from 'ol/geom/Point';
// import VectorSource from 'ol/source/Vector';
// import VectorLayer from 'ol/layer/Vector';
// import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
// import Overlay from 'ol/Overlay';

// const Popup = ({ elevationData, handleClose, map }) => {
//   const chartRef = useRef(null);
//   const markerLayerRef = useRef(null);
//   const popupOverlayRef = useRef(null);

//   useEffect(() => {
//     if (elevationData) {
//       console.log('Elevation data received:', elevationData);
//       const profileCoords = elevationData.features[0].geometry.coordinates;
//       const distances = [];
//       const elevations = [];
//       let cumulativeDistance = 0;

//       for (let i = 0; i < profileCoords.length; i++) {
//         if (i > 0) {
//           const prevLon = profileCoords[i - 1][0];
//           const prevLat = profileCoords[i - 1][1];
//           const lon = profileCoords[i][0];
//           const lat = profileCoords[i][1];
//           const distance = calculateDistance(prevLon, prevLat, lon, lat);
//           cumulativeDistance += distance;
//         }
//         distances.push(cumulativeDistance);
//         elevations.push(profileCoords[i][2]);
//       }

//       console.log('Distances:', distances);
//       console.log('Elevations:', elevations);

//       const ctx = chartRef.current.getContext('2d');
//       if (window.myChart) {
//         window.myChart.destroy();
//       }
//       window.myChart = new Chart(ctx, {
//         type: 'line',
//         data: {
//           labels: distances,
//           datasets: [
//             {
//               label: 'Elevation Profile',
//               data: elevations,
//               borderColor: 'rgba(75, 192, 192, 1)',
//               backgroundColor: 'rgba(75, 192, 192, 0.2)',
//               fill: true,
//               tension: 0.4,
//             },
//           ],
//         },
//         options: {
//           responsive: true,
//           maintainAspectRatio: false,
//           scales: {
//             x: {
//               type: 'linear',
//               position: 'bottom',
//               title: {
//                 display: true,
//                 text: 'Distance (meters)',
//               },
//             },
//             y: {
//               title: {
//                 display: true,
//                 text: 'Elevation (meters)',
//               },
//             },
//           },
//           plugins: {
//             tooltip: {
//               enabled: false,
//             },
//           },
//           onHover: (event, chartElement) => {
//             console.log('Hover event:', event);
//             if (chartElement.length) {
//               const index = chartElement[0].index;
//               const coords = profileCoords[index];
//               const elevation = elevations[index];
//               console.log('Hover index:', index);
//               console.log('Hover coordinates:', coords);
//               console.log('Hover elevation:', elevation);
//               updateHoverMarker(coords, elevation);
//             } else {
//               removeHoverMarker();
//             }
//           },
//         },
//       });
//     }
//   }, [elevationData, map]);

//   const calculateDistance = (lon1, lat1, lon2, lat2) => {
//     const R = 6371e3; // Earth radius in meters
//     const φ1 = (lat1 * Math.PI) / 180;
//     const φ2 = (lat2 * Math.PI) / 180;
//     const Δφ = ((lat2 - lat1) * Math.PI) / 180;
//     const Δλ = ((lon2 - lon1) * Math.PI) / 180;

//     const a =
//       Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
//       Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

//     return R * c; // Distance in meters
//   };

//   const updateHoverMarker = (coords, elevation) => {
//     console.log('Updating hover marker:', coords, elevation);
//     if (!markerLayerRef.current) {
//       const marker = new Feature({
//         geometry: new Point(fromLonLat([coords[0], coords[1]])),
//       });

//       const markerStyle = new Style({
//         image: new CircleStyle({
//           radius: 7,
//           fill: new Fill({
//             color: 'rgba(0, 0, 255, 0.9)',
//           }),
//           stroke: new Stroke({
//             color: '#fff',
//             width: 2,
//           }),
//         }),
//       });

//       marker.setStyle(markerStyle);

//       const vectorSource = new VectorSource({
//         features: [marker],
//       });

//       const markerLayer = new VectorLayer({
//         source: vectorSource,
//       });

//       map.addLayer(markerLayer);
//       markerLayerRef.current = markerLayer;

//       // Create popup overlay
//       const popupElement = document.createElement('div');
//       popupElement.className = 'elevation-popup';
//       popupElement.style.position = 'absolute';
//       popupElement.style.padding = '5px';
//       popupElement.style.backgroundColor = 'white';
//       popupElement.style.border = '1px solid black';
//       popupElement.style.borderRadius = '3px';

//       const popupOverlay = new Overlay({
//         element: popupElement,
//         positioning: 'bottom-center',
//         stopEvent: false,
//         offset: [0, -10],
//       });

//       map.addOverlay(popupOverlay);
//       popupOverlayRef.current = popupOverlay;
//     }

//     const marker = markerLayerRef.current.getSource().getFeatures()[0];
//     marker.getGeometry().setCoordinates(fromLonLat([coords[0], coords[1]]));

//     popupOverlayRef.current.getElement().innerHTML = `Elevation: ${elevation} m`;
//     popupOverlayRef.current.setPosition(fromLonLat([coords[0], coords[1]]));
//   };

//   const removeHoverMarker = () => {
//     console.log('Removing hover marker');
//     if (markerLayerRef.current) {
//       map.removeLayer(markerLayerRef.current);
//       markerLayerRef.current = null;
//     }
//     if (popupOverlayRef.current) {
//       map.removeOverlay(popupOverlayRef.current);
//       popupOverlayRef.current = null;
//     }
//   };

//   return (
//     <div className="popup1 fixed top-4 w-1/3 right-4">
//       <div className="popup-content w-full bg-gray-600 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 p-4">
//         <div id="chart-container" className="bg-black w-full h-96 mt-4">
//           <canvas id="elevationChart" className="w-full" ref={chartRef}></canvas>
//         </div>
//         <button className="close-btn text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-4" onClick={handleClose}>
//           Close
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Popup;

