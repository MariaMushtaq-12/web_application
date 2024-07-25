import React, { useEffect, useRef, useState } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import Circle from 'ol/geom/Circle';
import Point from 'ol/geom/Point';
import Feature from 'ol/Feature';
import { fromLonLat, toLonLat } from 'ol/proj';
import { Fill, Stroke, Style, Icon } from 'ol/style';
import Overlay from 'ol/Overlay';
import './MapComponent.css';

const MapComponent = () => {
  const mapElement = useRef();
  const [map, setMap] = useState(null);
  const [vectorSource, setVectorSource] = useState(new VectorSource());
  const tooltipElement = useRef();
  const [tooltipVisible, setTooltipVisible] = useState(false);

  useEffect(() => {
    const initialMap = new Map({
      target: mapElement.current,
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        new VectorLayer({
          source: vectorSource
        })
      ],
      view: new View({
        center: fromLonLat([71.5, 30.0]),
        zoom: 6
      })
    });

    setMap(initialMap);

    const tooltip = new Overlay({
      element: tooltipElement.current,
      positioning: 'bottom-center',
      stopEvent: false,
      offset: [0, -10]
    });

    initialMap.addOverlay(tooltip);

    initialMap.on('pointermove', (event) => {
      if (tooltipVisible) {
        const feature = initialMap.forEachFeatureAtPixel(event.pixel, (feature) => feature);
        if (feature && feature.get('name')) {
          tooltipElement.current.innerHTML = feature.get('name');
          tooltip.setPosition(event.coordinate);
          tooltipElement.current.style.display = 'block';
        } else {
          tooltipElement.current.style.display = 'none';
        }
      }
    });

    initialMap.on('click', (event) => {
      const [lon, lat] = toLonLat(event.coordinate);
      document.getElementById('lat').value = lat.toFixed(6);
      document.getElementById('lng').value = lon.toFixed(6);
      createBuffer();
    });

    return () => initialMap.setTarget(undefined);
  }, [vectorSource, tooltipVisible]);

  const getIconUrl = (type) => {
    switch (type) {
      case 'alpine_hut':
        return '/alpinehut.png'; // Ensure this path is correct and GIF is accessible
      case 'archaeological':
        return '/archeology.png';
      case 'arts_centre':
        return '/artcenter.png'; 
      case 'artwork':
        return '/artwork.png'; 
        case 'atm':
          return '/atm.png';
        case 'attraction':
          return '/attraction.png';
        case 'bakery':
          return '/bakery.png';
        case 'bank':
          return '/bank.png';
        case 'bar':
          return '/bar.png';
        case 'battlefield':
          return '/battlefield.png';
        case 'beauty_shop':
          return '/beautyshop.png';
        case 'beverages':
          return '/beverages.png';
        case 'bicycle_shop':
          return '/bicycleshop.png';
        case 'bookshop':
          return '/bookstore.png';
        case 'butcher':
          return '/butcher.png';
        case 'cafe':
          return '/cafe.png';
        case 'camp_site':
          return '/campsite.png';
        case 'car_dealership':
          return '/cardealership.png';
        case 'car_wash':
          return '/carwash.png';
        case 'castle':
          return '/castle.png';
        case 'chemist':
          return '/chemist.png';
        case 'cinema':
          return '/cinema.png';
        case 'clinic':
          return '/clinic.png';
        case 'clothes':
          return '/clothes.png';
        case 'college':
          return '/college.png';
        case 'community_centre':
          return '/community_centre.png';
        case 'computer_shop':
          return '/computer.png';
        case 'convenience':
          return '/convenience_store.png';
        case 'courthouse':
          return '/court_house.png';
        case 'dentist':
          return '/dentist.png';
        case 'department_store':
          return '/departmentstore.png';
        case 'doctors':
          return '/doctor.jpeg';
        case 'doityourself':
          return '/doityourself.png';
        case 'drinking_water':
          return '/drinking_water.png';
        case 'embassy':
          return '/embassy.png';
        case 'fast_food':
          return '/fast_food.png';
        case 'fire_station':
          return '/fire_station.png';
        case 'florist':
          return '/florist.png';
        case 'food_court':
          return '/food_court.png';
        case 'fort':
          return '/fort.png';
        case 'fountain':
          return '/fountain.png';
        case 'furniture_shop':
          return '/furniture.png';
        case 'garden_centre':
          return '/gardening.png';
        case 'general':
          return '/general_store.png';
        case 'gift_shop':
          return '/gift.png';
        case 'golf_course':
          return '/golf.png';
        case 'graveyard':
          return '/graveyard.png';
        case 'greengrocer':
          return '/greengrocer.png';
        case 'guesthouse':
          return '/guesthouse.png';
        case 'hairdresser':
          return '/hairdresser.png';
        case 'hospital':
          return '/hospital.png';
        case 'hostel':
          return '/hostel.png';
        case 'hotel':
          return '/hotel.png';
        case 'jeweller':
          return '/jewelry.png';
        case 'kindergarten':
          return '/kindergarden.png';
        case 'laundry':
          return '/laundry.png';
        case 'library':
          return '/library.png';
        case 'mall':
          return '/mall.png';
        case 'market_place':
          return '/market_place.png';
        case 'memorial':
          return '/memorial.png';
        case 'mobile_phone_shop':
          return '/mobile_phone_shop.png';
        case 'monument':
          return '/monument.png';
        case 'motel':
          return '/motel.png';
        case 'museum':
          return '/museum.png';
        case 'nightclub':
          return '/night_club.png';
        case 'optician':
          return '/optician.png';
        case 'park':
          return '/park.png';
        case 'pharmacy':
          return '/pharmacy.png';
        case 'picnic_site':
          return '/picnic_site.png';
        case 'pitch':
          return '/pitch.png';
        case 'playground':
          return '/playground.png';
        case 'police':
          return '/police.png';
        case 'post_box':
          return '/post_box.png';
        case 'post_office':
          return '/post_office.png';
        case 'prison':
          return '/prison.png';
        case 'restaurant':
          return '/restaurant.png';
        case 'ruins':
          return '/ruins.png';
        case 'school':
          return '/school.png';
        case 'shelter':
          return '/shelter.png';
        case 'shoe_shop':
          return '/shoe_shop.png';
        case 'sports_centre':
          return '/sports_centre.png';
        case 'sports_shop':
          return '/sports_shop.png';
        case 'stadium':
          return '/stadium.png';
        case 'stationery':
          return '/stationary.png';
        case 'supermarket':
          return '/supermarket.png';
        case 'swimming_pool':
          return '/swimming_pool.png';
        case 'theatre':
          return '/theater.png';
        case 'theme_park':
          return '/theme_park.png';
        case 'tourist_info':
          return '/tourist_info.jpeg';
        case 'tower':
          return '/tower.png';
        case 'town_hall':
          return '/town_hall.jpeg';
        case 'toy_shop':
          return '/toy_shop.jpeg';
        case 'travel_agent':
          return '/travel_agent.jpeg';
        case 'university':
          return '/university.jpeg';
        case 'veterinary':
          return '/veterinary.jpeg';
        case 'viewpoint':
          return '/viewpoint.jpeg';
       
        case 'water_tower':
          return '/watertower.jpeg';
        case 'wayside_shrine':
          return '/wayside_shrine.jpeg';
        case 'zoo':
          return '/zoo.jpeg';
      default:
        return '/icons/default.png'; // Example for default icon
    }
  };

  const createBuffer = async () => {
    const lat = parseFloat(document.getElementById('lat').value);
    const lng = parseFloat(document.getElementById('lng').value);
    const radius = parseFloat(document.getElementById('radius').value);
    const type = document.getElementById('type').value;
    if (!lat || !lng || !radius || !type) {
      return;
    }
    
    const center = fromLonLat([lng, lat]);
    
    const bufferGeometry = new Circle(center, radius);
    const bufferFeature = new Feature(bufferGeometry);
    
    const bufferStyle = new Style({
      stroke: new Stroke({
        color: 'blue',
        width: 2
      }),
      fill: new Fill({
        color: 'rgba(0, 0, 255, 0.1)'
      })
    });
    bufferFeature.setStyle(bufferStyle);
    
    vectorSource.clear();
    vectorSource.addFeature(bufferFeature);
    
    const markerGeometry = new Point(center);
    const markerFeature = new Feature(markerGeometry);
    vectorSource.addFeature(markerFeature);
    
    if (map) {
      map.getView().fit(bufferGeometry.getExtent(), { padding: [50, 50, 50, 50] });
    }
    
    try {
      const response = await fetch(`/buffer?lat=${lat}&lng=${lng}&radius=${radius}&type=${type}`);
      const data = await response.json();
    
      data.points.forEach(point => {
        const feature = new Feature({
          geometry: new Point(fromLonLat([point.lng, point.lat])),
          name: point.name
        });
    
        if (bufferGeometry.intersectsCoordinate(feature.getGeometry().getCoordinates())) {
          feature.setStyle(new Style({
            image: new Icon({
              src: getIconUrl(type),
              scale: 0.06, // Adjust scale if needed
            })
          }));
          vectorSource.addFeature(feature);
        }
      });
    
      setTooltipVisible(true);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <div className="controls">
        <label htmlFor="lat">Latitude:</label>
        <input type="text" id="lat" placeholder="Enter latitude" />
        <label htmlFor="lng">Longitude:</label>
        <input type="text" id="lng" placeholder="Enter longitude" />
        <label htmlFor="radius">Radius (meters):</label>
        <input type="text" id="radius" placeholder="Enter radius" />
        <label htmlFor="type">Type:</label>
        <select id="type">
        <option value="alpine_hut">Alpine Hut</option>
            <option value="archaeological">Archaeological</option>
            <option value="arts_centre">Arts Centre</option>
            <option value="artwork">Artwork</option>
            <option value="atm">ATM</option>
            <option value="attraction">Attraction</option>
            <option value="bakery">Bakery</option>
            <option value="bank">Bank</option>
            <option value="bar">Bar</option>
            <option value="battlefield">Battlefield</option>
            <option value="beauty_shop">Beauty Shop</option>
            <option value="beverages">Beverages</option>
            <option value="bicycle_shop">Bicycle Shop</option>
            <option value="bookshop">Bookshop</option>
            <option value="butcher">Butcher</option>
            <option value="cafe">Cafe</option>
            <option value="camp_site">Camp Site</option>
            <option value="car_dealership">Car Dealership</option>
            <option value="car_wash">Car Wash</option>
            <option value="caravan_site">Caravan Site</option>
            <option value="castle">Castle</option>
            <option value="chemist">Chemist</option>
            <option value="cinema">Cinema</option>
            <option value="clinic">Clinic</option>
            <option value="clothes">Clothes</option>
            <option value="college">College</option>
            <option value="community_centre">Community Centre</option>
            <option value="computer_shop">Computer Shop</option>
            <option value="convenience">Convenience</option>
            <option value="courthouse">Courthouse</option>
            <option value="dentist">Dentist</option>
            <option value="department_store">Department Store</option>
            <option value="doctors">Doctors</option>
            <option value="doityourself">Do It Yourself</option>
            <option value="drinking_water">Drinking Water</option>
            <option value="embassy">Embassy</option>
            <option value="fast_food">Fast Food</option>
            <option value="fire_station">Fire Station</option>
            <option value="florist">Florist</option>
            <option value="food_court">Food Court</option>
            <option value="fort">Fort</option>
            <option value="fountain">Fountain</option>
            <option value="furniture_shop">Furniture Shop</option>
            <option value="garden_centre">Garden Centre</option>
            <option value="general">General</option>
            <option value="gift_shop">Gift Shop</option>
            <option value="golf_course">Golf Course</option>
            <option value="graveyard">Graveyard</option>
            <option value="greengrocer">Greengrocer</option>
            <option value="guesthouse">Guesthouse</option>
            <option value="hairdresser">Hairdresser</option>
            <option value="hospital">Hospital</option>
            <option value="hostel">Hostel</option>
            <option value="hotel">Hotel</option>
            <option value="jeweller">Jeweller</option>
            <option value="kindergarten">Kindergarten</option>
            <option value="laundry">Laundry</option>
            <option value="library">Library</option>
            <option value="mall">Mall</option>
            <option value="market_place">Market Place</option>
            <option value="memorial">Memorial</option>
            <option value="mobile_phone_shop">Mobile Phone Shop</option>
            <option value="monument">Monument</option>
            <option value="motel">Motel</option>
            <option value="museum">Museum</option>
            <option value="nightclub">Nightclub</option>
            <option value="optician">Optician</option>
            <option value="park">Park</option>
            <option value="pharmacy">Pharmacy</option>
            <option value="picnic_site">Picnic Site</option>
            <option value="pitch">Pitch</option>
            <option value="playground">Playground</option>
            <option value="police">Police</option>
            <option value="post_box">Post Box</option>
            <option value="post_office">Post Office</option>
            <option value="prison">Prison</option>
            <option value="restaurant">Restaurant</option>
            <option value="ruins">Ruins</option>
            <option value="school">School</option>
            <option value="shelter">Shelter</option>
            <option value="shoe_shop">Shoe Shop</option>
            <option value="sports_centre">Sports Centre</option>
            <option value="sports_shop">Sports Shop</option>
            <option value="stadium">Stadium</option>
            <option value="stationery">Stationery</option>
            <option value="supermarket">Supermarket</option>
            <option value="swimming_pool">Swimming Pool</option>
            <option value="theatre">Theatre</option>
            <option value="theme_park">Theme Park</option>
            <option value="tourist_info">Tourist Info</option>
            <option value="tower">Tower</option>
            <option value="town_hall">Town Hall</option>
            <option value="toy_shop">Toy Shop</option>
            <option value="travel_agent">Travel Agent</option>
            <option value="university">University</option>
            <option value="veterinary">Veterinary</option>
            <option value="viewpoint">Viewpoint</option>
            <option value="wastewater_plant">Wastewater Plant</option>
            <option value="water_tower">Water Tower</option>
            <option value="wayside_shrine">Wayside Shrine</option>
            <option value="zoo">Zoo</option>
        </select>
        <button onClick={createBuffer}>Create Buffer</button>
      </div>
      <div ref={mapElement} id="map" className="map"></div>
      <div ref={tooltipElement} className="tooltip"></div>
    </div>
  );
};

export default MapComponent;
