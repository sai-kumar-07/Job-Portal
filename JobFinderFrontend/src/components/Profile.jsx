import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ status }) => {
  const getStatusPercentage = (status) => {
    switch (status) {
      case 'pending':
        return 33;
      case 'interview':
        return 66;
      case 'offer':
        return 99;
      default:
        return 0;
    }
  };

  const percentage = getStatusPercentage(status);

  return (
    <div className="progressBarContainer">
      <div className="progressBar">
        <div className="progress" style={{ '--percentage': `${percentage}%` }} />
        <span className="progressMarker" style={{ left: '-1.5%', }}>◆</span>
        <span className="progressMarker" style={{ left: '30.5%' }}>◆</span>
        <span className="progressMarker" style={{ left: '63.5%' }}>◆</span>
        <span className="progressMarker" style={{ left: '96%' }}>◆</span>
        <span className="progressText" style={{ left: '-6%' }}>Applied</span>
        <span className="progressText" style={{ left: '24%' }}>Processing</span>
        <span className="progressText" style={{ left: '58%' }}>Interview</span>
        <span className="progressText" style={{ left: '93%' }}>Offer</span>
      </div>
    </div>
  );
};

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const username = localStorage.getItem('username');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDetailsResponse = await fetch(`http://127.0.0.1:8000/jobs/users/${username}/`);
        const userDetails = await userDetailsResponse.json();

        const appliedJobsResponse = await fetch('http://127.0.0.1:8000/jobs/apply/');
        const appliedJobs = await appliedJobsResponse.json();
        const userAppliedJobs = appliedJobs.filter(job => job.user === username);

        const jobIds = userAppliedJobs.map(job => job.job);
        const jobsResponse = await fetch(`http://127.0.0.1:8000/jobs/jobs/`);
        const jobs = await jobsResponse.json();
        const filteredJobs = jobs.filter(job => jobIds.includes(job.id));

        const updatedAppliedJobs = filteredJobs.map(job => {
          const appliedJob = userAppliedJobs.find(appliedJob => appliedJob.job === job.id);
          return {
            ...job,
            status: appliedJob ? appliedJob.status : 'unknown',
          };
        });

        setUserData({
          name: userDetails.name,
          username: userDetails.username,
          email: userDetails.email,
          age: userDetails.age,
          gender: userDetails.gender,
          phone: userDetails.phone,
          appliedJobs: updatedAppliedJobs.map(job => ({
            company_name: job.company_name,
            role: job.role,
            status: job.status,
          })),
        });
      } catch (error) {
        console.error(error);
      }
    };

    if (username) {
      fetchData();
    }
  }, [username]);

  return (
    <div style={styles.container}>
      {userData ? (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          style={styles.profile}
        >
          <h2 style={styles.title}>{userData.name}'s Profile</h2>
          <div style={styles.details}>
            <p><strong>Username:</strong> {userData.username}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Age:</strong> {userData.age}</p>
            <p><strong>Gender:</strong> {userData.gender}</p>
            <p><strong>Phone:</strong> {userData.phone}</p>
          </div>
          <div>
            <h3>Applied Jobs:</h3>
            <ul style={styles.list}>
              {userData.appliedJobs.length !== 0 && userData.appliedJobs.map((job, index) => (
                <li key={index}>
                  <strong>{index + 1}. Company:</strong> {job.company_name} <strong>Role:</strong> {job.role}
                  {job.status !== "reject" && <ProgressBar status={job.status} />}
                  {job.status === "reject" && <p style={{ color: "red",textAlign:"center", marginTop: 20, marginBottom: 40 }}><i>Your application has been rejected by {job.company_name}. Better Luck Next Time.</i></p>}
                </li>
              ))}
              {userData.appliedJobs.length === 0 && <a href='/jobs' className='button-link'>Apply Now</a>}
              {userData.appliedJobs.length !== 0 && <a href='/jobs' className='button-link'>Apply More</a>}
            </ul>
          </div>
        </motion.div>
      ) : (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{ ...styles.profile, textAlign: 'center' }}
        >
          Loading...
        </motion.p>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: '#f9f9f9',
  },
  profile: {
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    background: '#fff',
    maxWidth: '800px',
    width: '100%',
    textAlign: 'left',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    margin: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    color: '#333',
    borderBottom: '1px solid #ccc',
    paddingBottom: '10px',
    marginBottom: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  details: {
    marginBottom: '20px',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
};

export default Profile;
