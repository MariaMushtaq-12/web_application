import React, { useState, useEffect } from 'react';
import '../css/Viewshed.css';



const ViewshedTool = ({  setViewshedParams, clickedCoordinates,onClose }) => {
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
        <section className="bg-gray-50 dark:bg-gray-900">
             
                <div className="w-full bg-gray-600 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl dark:text-white">
                            Viewshed Analysis
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-4"> 
                            <div>
                                <label htmlFor="lat" className="block mb-2 text-sm font-medium text-white dark:text-white">Latitude:</label>
                                <input
                                    type="text"
                                    id="lat"
                                    value={lat}
                                    onChange={(e) => setLat(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Enter latitude"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="lon" className="block mb-2 text-sm font-medium text-white dark:text-white">Longitude:</label>
                                <input
                                    type="text"
                                    id="lon"
                                    value={lon}
                                    onChange={(e) => setLon(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Enter longitude"
                                    required
                                />
                            </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4"> 
                            <div>
                                <label htmlFor="radius" className="block mb-2 text-sm font-medium text-white dark:text-white">Radius (m):</label>
                                <input
                                    type="text"
                                    id="radius"
                                    value={radius}
                                    onChange={(e) => setRadius(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Enter radius"
                                    required
                                />
                            </div>



                            <div>
                                <label htmlFor="height" className="block mb-2 text-sm font-medium text-white dark:text-white">Height Above Ground (m):</label>
                                <input
                                    type="text"
                                    id="height"
                                    value={height}
                                    onChange={(e) => setHeight(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Enter height above ground"
                                    required
                                />
                            </div>
                            </div>
                            <div className='flex items-center justify-between'>
                            <button type="submit" className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 bg-black  hover:bg-green-500 hover:text-gray-900 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                Run Viewshed
                            </button>
                            <button onClick={onClose} className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
            Close
          </button>
          </div>
                            </form>
                    </div>
                </div>
            
        </section>
    );
};

export default ViewshedTool;
