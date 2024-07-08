import React, { useState, useEffect } from 'react';
import '../css/Viewshed.css';

const ViewshedTool = ({ setViewshedParams, clickedCoordinates }) => {
    const [lat, setLat] = useState('');
    const [lon, setLon] = useState('');
    const [radius, setRadius] = useState('');
    const [height, setHeight] = useState('');

    // Update latitude and longitude inputs when clickedCoordinates changes
    useEffect(() => {
        if (clickedCoordinates) {
            setLat(clickedCoordinates[1].toFixed(6)); // Set latitude
            setLon(clickedCoordinates[0].toFixed(6)); // Set longitude
        }
    }, [clickedCoordinates]);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const params = {
            lat: parseFloat(lat),
            lon: parseFloat(lon),
            radius: parseFloat(radius),
            height: parseFloat(height),
        };
    
        try {
            const response = await fetch('http://192.168.1.200:5000/viewshed', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params),
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const viewshedData = await response.json();
            
            console.log('Viewshed Data:', viewshedData);
            setViewshedParams(viewshedData);
        } catch (error) {
            console.error('Error fetching viewshed data:', error);
            alert('Failed to fetch viewshed data. Please try again.');
        }
    
        setLat('');
        setLon('');
        setRadius('');
        setHeight('');
    };
    

    return (
        <div className="viewshed-tool">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="lat">Latitude:</label>
                    <input
                        type="text"
                        id="lat"
                        value={lat}
                        onChange={(e) => setLat(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lon">Longitude:</label>
                    <input
                        type="text"
                        id="lon"
                        value={lon}
                        onChange={(e) => setLon(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="radius">Radius (m):</label>
                    <input
                        type="text"
                        id="radius"
                        value={radius}
                        onChange={(e) => setRadius(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="height">Height Above Ground (m):</label>
                    <input
                        type="text"
                        id="height"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default ViewshedTool;
