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



//smooth line of graph
import React, { useEffect, useRef } from 'react';
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
              //fill: false,
              tension: 0.4, // Added tension for smoothing
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
              console.log('Hover index:', index);
            }
      
          },
          onHover: (event, chartElement) => {
    if (chartElement.length) {
      const index = chartElement[0].index;
      const coords = profileCoords[index];
      updateMovingMarker(coords);
    }
  },
          
   
        },
      });
    }
  }, [elevationData, lineFeature, map]);

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
    // Do nothing, just prevent the default tooltip
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

  return (
    <div className="popup1 fixed top-4 w-1/3 right-4">
      <div className="popup-content w-full bg-gray-600 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 p-4">
       
        <div id="chart-container" className="bg-black w-full h-96 mt-4">
          <canvas id="elevationChart" className="w-full" ref={chartRef}></canvas>
        </div>
        <button className="close-btn text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-4" onClick={handleClose}>
          Close
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

