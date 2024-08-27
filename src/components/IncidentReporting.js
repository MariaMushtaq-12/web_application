
import React, { useState, useEffect } from 'react';
// import '../css/IncidentForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const IncidentForm = ({ onClose, clickedCoordinates, setIncidentParams }) => {
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [typesOfDisaster, setTypesOfDisaster] = useState('');
  const [casualtyTypes, setCasualtyTypes] = useState([]);
  const [casualtyStatuses, setCasualtyStatuses] = useState([]);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [reportingDate, setReportingDate] = useState('');
  const [casualties, setCasualties] = useState([
    { category: '', status: '', count: '' },
  ]);
  const [categories, setCategories] = useState([]);
  const [disasterTypes, setDisasterTypes] = useState([]);
  const [terroristTypes, setTerroristTypes] = useState([]);
  const [categoryError, setCategoryError] = useState('');
  const [latitudeError, setLatitudeError] = useState('');
  const [longitudeError, setLongitudeError] = useState('');
  const [dateError, setDateError] = useState('');
  const [reportingDateError, setReportingDateError] = useState('');

  useEffect(() => {
    if (clickedCoordinates) {
      setLatitude(clickedCoordinates[1]?.toFixed(5) || '');
      setLongitude(clickedCoordinates[0]?.toFixed(5) || '');
    }
  }, [clickedCoordinates]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/categories');
        setCategories(response.data);
      } catch (error) {
        toast.error('Failed to fetch categories');
        console.error('Error fetching categories:', error);
      }
    };

    const fetchDisasterTypes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/natural-disaster-types');
        setDisasterTypes(response.data);
      } catch (error) {
        toast.error('Failed to fetch disaster types');
        console.error('Error fetching disaster types:', error);
      }
    };

    const fetchTerroristTypes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/terrorist-types');
        setTerroristTypes(response.data);
      } catch (error) {
        toast.error('Failed to fetch terrorist types');
        console.error('Error fetching terrorist types:', error);
      }
    };

    const fetchCasualtyTypes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/casualty-types');
        setCasualtyTypes(response.data);
      } catch (error) {
        toast.error('Failed to fetch casualty types');
        console.error('Error fetching casualty types:', error);
      }
    };

    const fetchCasualtyStatuses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/casualty-statuses');
        setCasualtyStatuses(response.data);
      } catch (error) {
        toast.error('Failed to fetch casualty statuses');
        console.error('Error fetching casualty statuses:', error);
      }
    };

    fetchCategories();
    fetchDisasterTypes();
    fetchTerroristTypes();
    fetchCasualtyTypes();
    fetchCasualtyStatuses();
  }, []);

  const handleCasualtyChange = (index, field, value) => {
    const newCasualties = casualties.slice();
    newCasualties[index][field] = value;
    setCasualties(newCasualties);
  };

  const handleAddCasualty = () => {
    setCasualties([...casualties, { category: '', status: '', count: '' }]);
  };

  const handleRemoveCasualty = (index) => {
    setCasualties(casualties.filter((_, i) => i !== index));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setCategoryError('');
    setLatitudeError('');
    setLongitudeError('');
    setDateError('');
    setReportingDateError('');

    let isValid = true;

    if (!category) {
      setCategoryError('Please select a category');
      isValid = false;
    }

    if (category === 'Natural Disaster' && !typesOfDisaster) {
      setTypesOfDisaster('None');
    }

    if (!latitude) {
      setLatitudeError('Please enter latitude');
      isValid = false;
    } else if (!isValidLatitude(latitude)) {
      setLatitudeError('Invalid latitude format');
      isValid = false;
    }

    if (!longitude) {
      setLongitudeError('Please enter longitude');
      isValid = false;
    } else if (!isValidLongitude(longitude)) {
      setLongitudeError('Invalid longitude format');
      isValid = false;
    }

    if (!date) {
      setDateError('Please enter date');
      isValid = false;
    }

    if (!reportingDate) {
      setReportingDateError('Please enter reporting date');
      isValid = false;
    }

    if (isValid) {
      const incident = {
        category,
        typesOfDisaster,
        location: `POINT(${longitude} ${latitude})`, // Store location as POINT
        date,
        time: time || '00:00',
        reportingDate,
        casualties,
      };

      console.log('Submitting incident:', incident);

      // Pass incident details back to parent component or perform API request here
      setIncidentParams(incident); // Assuming setIncidentParams is a function to handle the form data

      try {
        const response = await axios.post('http://localhost:5000/incidents', incident);

        if (response.status === 200 || response.status === 201) {
          toast.success('Incident submitted successfully');
          console.log('Incident submitted successfully');
          onClose(); // Close the form after successful submission
        } else {
          toast.error('Failed to submit incident');
          console.error('Failed to submit incident:', response.status, response.data);
        }
      } catch (error) {
        toast.error('Error submitting incident');
        console.error('Error submitting incident:', error.response ? error.response.data : error.message);
      }
    }
  };

  const isValidLatitude = (lat) => {
    return /^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}/.test(lat);
  };

  const isValidLongitude = (long) => {
    return /^-?((1[0-7]|[1-9])?\d{1}\.{1}\d{1,6}|180{1}\.0{1,6})$/.test(long);
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <ToastContainer />
      <div className="w-full bg-gray-600 rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700  overflow-y-auto max-h-100" >
        <div className="p-6 space-y-4 sm:p-8">
          <h2 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl dark:text-white">
            Report Incident
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">

         
   






          <div className="grid grid-cols-2 gap-4">
            <div className={`form-group ${reportingDateError ? 'error' : ''}`}>
              <label htmlFor="reportingDate" className="block mb-2 text-sm font-medium text-white dark:text-white">
                Reporting Date: <span className="required-asterisk">*</span>
              </label>
              <input
                type="date"
                id="reportingDate"
                value={reportingDate}
                onChange={(e) => setReportingDate(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
              {reportingDateError && <p className="error-message text-red-500">{reportingDateError}</p>}
            </div>

            <div className={`form-group ${categoryError ? 'error' : ''}`}>
              <label htmlFor="category" className="block mb-2 text-sm font-medium text-white dark:text-white">
                Category: <span className="required-asterisk">*</span>
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {categoryError && <p className="error-message text-red-500">{categoryError}</p>}
            </div>
</div>
            {category === 'Natural Disaster' && (
              <div className="form-group">
                <label htmlFor="typesOfDisaster" className="block mb-2 text-sm font-medium text-white dark:text-white">
                  Type of Natural Disaster:
                </label>
                <select
                  id="typesOfDisaster"
                  value={typesOfDisaster}
                  onChange={(e) => setTypesOfDisaster(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="">Select a type</option>
                  {disasterTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {category === 'Terrorism' && (
              <div className="form-group">
                <label htmlFor="typesOfDisaster" className="block mb-2 text-sm font-medium text-white dark:text-white">
                  Type of Terrorist Attack:
                </label>
                <select
                  id="typesOfDisaster"
                  value={typesOfDisaster}
                  onChange={(e) => setTypesOfDisaster(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="">Select a type</option>
                  {terroristTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            )}
<div className="grid grid-cols-2 gap-4">
            <div className={`form-group ${latitudeError ? 'error' : ''}`}>
              <label htmlFor="latitude" className="block mb-2 text-sm font-medium text-white dark:text-white">
                Latitude: <span className="required-asterisk">*</span>
              </label>
              <input
                type="number"
                id="latitude"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter Latitude"
                required
              />
              {latitudeError && <p className="error-message text-red-500">{latitudeError}</p>}
            </div>

            <div className={`form-group ${longitudeError ? 'error' : ''}`}>
              <label htmlFor="longitude" className="block mb-2 text-sm font-medium text-white dark:text-white">
                Longitude: <span className="required-asterisk">*</span>
              </label>
              <input
                type="number"
                id="longitude"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter Longitude"
                required
              />
              {longitudeError && <p className="error-message text-red-500">{longitudeError}</p>}
            </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
            <div className={`form-group ${dateError ? 'error' : ''}`}>
              <label htmlFor="date" className="block mb-2 text-sm font-medium text-white dark:text-white">
                Date of Incident: <span className="required-asterisk">*</span>
              </label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
              {dateError && <p className="error-message text-red-500">{dateError}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="time" className="block mb-2 text-sm font-medium text-white dark:text-white">
                Time of Incident:
              </label>
              <input
                type="time"
                id="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
</div>


<div className="form-group">
              <label htmlFor="description" className="block mb-2 text-sm font-medium text-white dark:text-white">
                Description of Incident:
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                rows="4"
              ></textarea>
            </div>
  
            {casualties.map((casualty, index) => (
              <div key={index} className="casualty-group border border-gray-300 p-3 rounded-md my-3">
                <div class="flex space-x-4 p-4 bg-gray-900">
                 
                 
                  <div className="form-group">
                    <label
                      htmlFor={`casualtyCategory-${index}`}
                      className="block mb-2 text-sm font-medium text-white dark:text-white"
                    >
                      Casualty Category:
                    </label>
                    <select
                      id={`casualtyCategory-${index}`}
                      value={casualty.category}
                      onChange={(e) => handleCasualtyChange(index, 'category', e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option value="">Select a category</option>
                      {casualtyTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label
                      htmlFor={`casualtyStatus-${index}`}
                      className="block mb-2 text-sm font-medium text-white dark:text-white"
                    >
                      Casualty Status:
                    </label>
                    <select
                      id={`casualtyStatus-${index}`}
                      value={casualty.status}
                      onChange={(e) => handleCasualtyChange(index, 'status', e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option value="">Select a status</option>
                      {casualtyStatuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label
                      htmlFor={`casualtyCount-${index}`}
                      className="block mb-2 text-sm font-medium text-white dark:text-white"
                    >
                      Number of Casualties:
                    </label>
                    <input
                      type="number"
                      id={`casualtyCount-${index}`}
                      value={casualty.count}
                      onChange={(e) => handleCasualtyChange(index, 'count', e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveCasualty(index)}
                  className="mt-2 text-sm text-red-500 hover:text-red-700"
                >
                  Remove Casualty
                </button>
              </div>
            ))}



            <button
              type="button"
              onClick={handleAddCasualty}
              className="text-sm text-blue-500 hover:text-blue-700 mt-4"
            >
              Add Casualty
            </button>


         

            <button
              type="submit"
              className="inline-block mt-6 px-6 py-2 text-sm font-medium leading-6 text-center text-white uppercase transition bg-blue-600 rounded shadow ripple hover:shadow-lg hover:bg-blue-800 focus:outline-none"
            >
              Submit
            </button>




          </form>
        </div>
      </div>











    </section>
  );
};

export default IncidentForm;





