// import React, { useState, useEffect } from 'react';

// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const IncidentForm = ({ setIncidentParams, clickedCoordinates, onClose }) => {
//   const [latitude, setLatitude] = useState('');
//   const [longitude, setLongitude] = useState('');
//   const [incidentDate, setIncidentDate] = useState('');
//   const [reportingDate, setReportingDate] = useState('');
//   const [incidentType, setIncidentType] = useState('');

//   useEffect(() => {
//     if (clickedCoordinates) {
//       setLatitude(clickedCoordinates[1]?.toFixed(5) || '');
//       setLongitude(clickedCoordinates[0]?.toFixed(5) || '');
//     }
//   }, [clickedCoordinates]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     const incidentParams = {
//       latitude: parseFloat(latitude),
//       longitude: parseFloat(longitude),
//       incidentDate,
//       reportingDate,
//       incidentType
//     };

//     setIncidentParams(incidentParams);
    
//     // Optionally clear the fields after submission
//     setLatitude('');
//     setLongitude('');
//     setIncidentDate('');
//     setReportingDate('');
//     setIncidentType('');

//     toast.success('Incident reported successfully');
//   };

//   return (
//     <section className="bg-gray-50 dark:bg-gray-900">
//       <ToastContainer />
//       <div className="w-full bg-gray-600 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
//         <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
//           <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl dark:text-white">
//             Report Incident
//           </h1>
//           <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label htmlFor="latitude" className="block mb-2 text-sm font-medium text-white dark:text-white">Latitude:</label>
//                 <input
//                   type="number"
//                   id="latitude"
//                   value={latitude}
//                   onChange={(e) => setLatitude(e.target.value)}
//                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   placeholder="Enter latitude"
//                   required
//                 />
//               </div>
//               <div>
//                 <label htmlFor="longitude" className="block mb-2 text-sm font-medium text-white dark:text-white">Longitude:</label>
//                 <input
//                   type="number"
//                   id="longitude"
//                   value={longitude}
//                   onChange={(e) => setLongitude(e.target.value)}
//                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   placeholder="Enter longitude"
//                   required
//                 />
//               </div>
//             </div>
//             <div>
//               <label htmlFor="incidentType" className="block mb-2 text-sm font-medium text-white dark:text-white">Incident Type:</label>
//               <input
//                 type="text"
//                 id="incidentType"
//                 value={incidentType}
//                 onChange={(e) => setIncidentType(e.target.value)}
//                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                 placeholder="Enter incident type"
//                 required
//               />
//             </div>
//             <div>
//               <label htmlFor="incidentDate" className="block mb-2 text-sm font-medium text-white dark:text-white">Incident Date:</label>
//               <input
//                 type="date"
//                 id="incidentDate"
//                 value={incidentDate}
//                 onChange={(e) => setIncidentDate(e.target.value)}
//                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                 required
//               />
//             </div>
//             <div>
//               <label htmlFor="reportingDate" className="block mb-2 text-sm font-medium text-white dark:text-white">Reporting Date:</label>
//               <input
//                 type="date"
//                 id="reportingDate"
//                 value={reportingDate}
//                 onChange={(e) => setReportingDate(e.target.value)}
//                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                 required
//               />
//             </div>
//             <div className="button-group">
//               <button type="submit" className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Report Incident</button>
//               <button type="button" onClick={onClose} className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Close</button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default IncidentForm;

// IncidentForm.js
import React, { useState, useEffect } from 'react';
// import '../css/IncidentForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const IncidentForm = ({ onClose, clickedCoordinates, setIncidentParams }) => {
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
    <div className="incident-form-container">
      <ToastContainer />
      <div className="incident-form">
       
        <h2>Report Incident</h2>
        <form onSubmit={handleSubmit}>
            
          <div className={`form-group ${reportingDateError ? 'error' : ''}`}>
            <label htmlFor="reportingDate">Reporting Date: <span className="required-asterisk">*</span></label>
            <input
              type="date"
              id="reportingDate"
              value={reportingDate}
              onChange={(e) => setReportingDate(e.target.value)}
              required
            />
            {reportingDateError && <p className="error-message">{reportingDateError}</p>}
          </div>

          <div className={`form-group ${categoryError ? 'error' : ''}`}>
            <label htmlFor="category">Category: <span className="required-asterisk">*</span></label>
            <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} required>
              <option value="">Select Category</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.category_name}>
                  {cat.category_name}
                </option>
              ))}
            </select>
            {categoryError && <p className="error-message">{categoryError}</p>}
          </div>
          {category === 'Natural Disaster' && (
            <div className="form-group">
              <label htmlFor="typesOfDisaster">Type:</label>
              <select id="typesOfDisaster" value={typesOfDisaster} onChange={(e) => setTypesOfDisaster(e.target.value)}>
                <option value="">Select Type</option>
                {disasterTypes.map(type => (
                  <option key={type.id} value={type.type_name}>
                    {type.type_name}
                  </option>
                ))}
              </select>
            </div>
          )}
          {category === 'Terrorist Attack' && (
            <div className="form-group">
              <label htmlFor="terroristTypes">Type:</label>
              <select id="terroristTypes" value={typesOfDisaster} onChange={(e) => setTypesOfDisaster(e.target.value)}>
                <option value="">Select Type</option>
                {terroristTypes.map(type => (
                  <option key={type.id} value={type.type_name}>
                    {type.type_name}
                  </option>
                ))}
              </select>
            </div>
          )}
 <div className="grid grid-cols-2 gap-4"> 
          <div className={`form-group ${latitudeError ? 'error' : ''}`}>
            <label htmlFor="latitude">Latitude: <span className="required-asterisk">*</span></label>
            <input
              type="text"
              id="latitude"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              required
            />
            {latitudeError && <p className="error-message">{latitudeError}</p>}
          </div>
          <div className={`form-group ${longitudeError ? 'error' : ''}`}>
            <label htmlFor="longitude">Longitude: <span className="required-asterisk">*</span></label>
            <input
              type="text"
              id="longitude"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              required
            />
            {longitudeError && <p className="error-message">{longitudeError}</p>}
          </div>
</div>
<div className="grid grid-cols-2 gap-4"> 
          <div className={`form-group ${dateError ? 'error' : ''}`}>
            <label htmlFor="date">Date: <span className="required-asterisk">*</span></label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
            {dateError && <p className="error-message">{dateError}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="time">Time:</label>
            <input
              type="time"
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
</div>


          <div className="casualty-section">
            <h3>Casualties</h3>
            {casualties.map((casualty, index) => (
              <div key={index} className="casualty-entry">
                <div className="form-group">
                  <label htmlFor={`casualty-category-${index}`}>Category:</label>
                  <select
                    id={`casualty-category-${index}`}
                    value={casualty.category}
                    onChange={(e) =>
                      handleCasualtyChange(index, 'category', e.target.value)
                    }
                  >
                    <option value="">Select Category</option>
                    {casualtyTypes.map(type => (
                      <option key={type.id} value={type.type_name}>
                        {type.type_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor={`casualty-status-${index}`}>Status:</label>
                  <select
                    id={`casualty-status-${index}`}
                    value={casualty.status}
                    onChange={(e) =>
                      handleCasualtyChange(index, 'status', e.target.value)
                    }
                  >
                    <option value="">Select Status</option>
                    {casualtyStatuses.map(status => (
                      <option key={status.id} value={status.status_name}>
                        {status.status_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor={`casualty-count-${index}`}>Count:</label>
                  <input
                    type="number"
                    id={`casualty-count-${index}`}
                    value={casualty.count}
                    onChange={(e) =>
                      handleCasualtyChange(index, 'count', e.target.value)
                    }
                  />
                </div>
                {casualties.length > 1 && (
                  <button
                    type="button"
                    className="remove-button"
                    onClick={() => handleRemoveCasualty(index)}
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </button>
                )}
              </div>
            ))}
            <button type="button" className="add-button" onClick={handleAddCasualty}>
              <FontAwesomeIcon icon={faPlus} /> Add Casualty
            </button>
          </div>
          <button type="submit" className="submit-button">Submit Incident</button>
        </form>
      </div>
    </div>
  );
};

export default IncidentForm;

