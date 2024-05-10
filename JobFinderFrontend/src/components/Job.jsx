import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

class Job extends Component {
    state = { 
        job: null,
        loading: true,
        applied: false,
        fileSelected: false
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        fetch(`http://localhost:8000/jobs/jobs/${id}`)
            .then(response => response.json())
            .then(data => {
                this.setState({ job: data });
                setTimeout(() => {
                    this.setState({ loading: false });
                }, 100);
            });
        
        fetch('http://127.0.0.1:8000/jobs/apply/')
            .then(response => response.json())
            .then(records => {
                const user = localStorage.getItem('username');
                if (records.some(record => record.user === user && record.job === parseInt(id))) {
                    this.setState({ applied: true });
                }
            })
            .catch(error => {
            });
    }

    handleApplyNow = () => {
        const { id } = this.props.match.params;
        const user = localStorage.getItem('username');
        
        if (!this.state.fileSelected) {
            toast.error('No file selected', {
                position: 'top-right',
                autoClose: 1500,
            });
            return;
        }
    
        fetch('http://127.0.0.1:8000/jobs/apply/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user, job: parseInt(id) }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(() => {
            this.setState({ applied: true });
            toast.success('Application submitted successfully', {
                position: 'top-right',
                autoClose: 1500,
            });
        })
        .catch(error => {
        });
    };
    

    handleFileChange = (event) => {
        if (event.target.files.length > 0) {
            this.setState({ fileSelected: true });
        } else {
            this.setState({ fileSelected: false });
        }
    };

    render() {
        const { job, loading, applied } = this.state;
    
        if (loading) {
            return (
                <div style={styles.loading}>
                    <div style={styles.loader}></div>
                </div>
            );
        }
    
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                style={styles.container}
            >
                <h1 style={styles.title}>{job.company_name}</h1>
                <p><strong>Role:</strong> {job.role}</p>
                <p><strong>Location:</strong> {job.location}</p>
                <p><strong>Type:</strong> {job.type === 'full_time' ? 'Full Time' : 'Part Time'}</p>
                {job.time_interval && <p><strong>Time Interval:</strong> {job.time_interval}</p>}
                <p><strong>Description:</strong></p>
                <p style={styles.description}>{job.description}</p>
                {!applied &&<h5 style={{marginTop:30, marginBottom:0}}>upload your resume</h5>}
                {!applied && <input type="file" onChange={this.handleFileChange} accept=".pdf" />}
                {applied ? (
                    <button style={styles.button} disabled>Applied</button>
                ) : (
                    <button style={styles.button} onClick={this.handleApplyNow}>Apply Now</button>
                )}
            </motion.div>
        );
    }
}

const styles = {
    container: {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    title: {
        fontSize: '36px',
        marginBottom: '20px',
        fontFamily: 'Arial, sans-serif',
        color: '#333',
    },
    description: {
        fontSize: '18px',
        marginBottom: '20px',
        lineHeight: '1.6',
        color: '#666',
    },
    button: {
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    loading: {
        textAlign: 'center',
        marginTop: '20px',
        fontSize: '18px',
    },
    loader: {
        border: '8px solid #f3f3f3',
        borderTop: '8px solid #3498db',
        borderRadius: '50%',
        width: '50px',
        height: '50px',
        animation: 'spin 1s linear infinite',
        margin: '0 auto 20px',
    },
    '@keyframes spin': {
        '0%': { transform: 'rotate(0deg)' },
        '100%': { transform: 'rotate(360deg)' },
    },
};

export default Job;
