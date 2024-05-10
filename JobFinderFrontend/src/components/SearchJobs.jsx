import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

const SearchJobs = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [locations, setLocations] = useState([]);
  const [roles, setRoles] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/jobs/jobs/')
      .then(response => response.json())
      .then(data => {
        setData(data);
        setFilteredData(data.slice(0, 10));
        const uniqueLocations = [...new Set(data.map(job => job.location))];
        setLocations(uniqueLocations.map(location => ({ value: location, label: location })));
        const uniqueRoles = [...new Set(data.map(job => job.role))];
        setRoles(uniqueRoles.map(role => ({ value: role, label: role })));
      })
  }, []);

  const filterData = () => {
    let filtered = data.filter(job => {
      let roleMatch = job.role.toLowerCase().includes(searchTerm.toLowerCase());
      let locationMatch = !locationFilter || job.location.toLowerCase() === locationFilter.toLowerCase();
      let typeMatch = !typeFilter || job.type.toLowerCase() === typeFilter.toLowerCase();
      return roleMatch && locationMatch && typeMatch;
    });
    setFilteredData(filtered.slice(0, 10));
  };

  const handleLocationChange = (selectedOption) => {
    setLocationFilter(selectedOption.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    filterData();
    setShowAll(false);
  };

  const handleShowAll = () => {
    setFilteredData(data);
    setShowAll(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={styles.container}
    >
      <form onSubmit={handleSubmit} style={styles.form}>
        <Select
          placeholder="Select role"
          options={[{ value: '', label: 'Select Role' }, ...roles]}
          onChange={selectedOption => setSearchTerm(selectedOption.value)}
          styles={customSelectStyles}
        />
  
        <Select
          placeholder="Select location"
          options={[{ value: '', label: 'Select Location' }, ...locations]}
          onChange={handleLocationChange}
          styles={customSelectStyles}
        />
  
        <Select
          value={
            typeFilter === ''
              ? { value: '', label: 'Select Type' }
              : { value: typeFilter, label: typeFilter === 'full_time' ? 'Full Time' : typeFilter === 'part_time'? 'Part Time' :'Other' }
          }
          onChange={selectedOption => setTypeFilter(selectedOption.value)}
          options={[
            { value: '', label: 'Select type' },
            { value: 'full_time', label: 'Full Time' },
            { value: 'part_time', label: 'Part Time' },
            { value: 'other', label: 'Other' },
          ]}
          styles={customSelectStyles}
        />
  
        <FontAwesomeIcon icon={faSearch} onClick={handleSubmit} style={styles.searchIcon} />
      </form>
      <ul style={styles.list}>
        {filteredData.map(job => (
          <motion.li
            key={job.id}
            style={styles.job}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Link to={`/job/${job.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <h3>{job.company_name}</h3>
              <p><strong>Role:</strong> {job.role}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Type:</strong> {job.type === 'full_time' ? 'Full Time' : 'Part Time'}</p>
              {job.time_interval && <p><strong>Time Interval:</strong> {job.time_interval}</p>}
            </Link>
          </motion.li>
        ))}
      </ul>
      {!showAll && data.length > 10 && <button onClick={handleShowAll} style={{border:0}} className='button-link'>Show All Jobs</button>}
    </motion.div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  form: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: '20px',
  },
  searchIcon: {
    color: '#007bff',
    fontSize: '1.5em',
    marginRight: '10px',
    cursor: 'pointer',
    alignSelf: 'center',
  },
  list: {
    listStyleType: 'none',
    padding: '0',
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridGap: '10px',
  },
  job: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
};


const customSelectStyles = {
  control: (provided, state) => ({
    ...provided,
    borderRadius: '5px',
    width:'200px',
    padding: '5px',
    marginRight:'10px',
    cursor:"text",
    boxShadow: state.isFocused ? '0 0 0 1px #007bff' : null,
  }),
};

export default SearchJobs;
