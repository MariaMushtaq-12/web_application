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
              fill: false,
              tension: 0.1,
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
      <div className="popup-content bg-white shadow-lg rounded p-4">
        <button className="close-btn bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600" onClick={handleClose}>
          Close
        </button>
        <div id="chart-container" className="bg-black w-full h-96 mt-4">
          <canvas id="elevationChart" className="w-full" ref={chartRef}></canvas>
        </div>
      </div>
    </div>
  );
};

export default Popup;
