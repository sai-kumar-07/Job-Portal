import React from 'react';
import Joi from 'joi-browser';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { toast } from 'react-toastify';
import 'react-tabs/style/react-tabs.css';

import Form from './Form';

class RegisterScreen extends Form {
  state = {
    data1:{
      username: "",
      password: "",
    },
    data: {
    //basic
      username: "",
      password: "",

      //personal
      name: "",
      age: "",
      gender: "",
      email: "",
      phone: "",
      experience:null
    },
    errors: {},
    currentTab: 0
  }

  schema = {
    //basic
    username: Joi.string().min(5).required().label("Username"),
    password: Joi.string().min(5).required().label("Password"),
    //personal
    name: Joi.string().required().label("Name"),
    age: Joi.number().min(18).max(100).required().label("Age"),
    experience: Joi.number().required().label("Experience"),
    gender: Joi.string().required().max(10).label("Gender"),
    email: Joi.string().email().required().label("Email"),
    phone: Joi.string().min(10).max(10).required().label("Phone"),
  }

  handleNext = () => {
    const { currentTab } = this.state;
    const data1 = { ...this.state.data1 };
    const inputs = Array.from(document.getElementsByTagName('input'));
  
    inputs.forEach(input => {
      if (input.name in data1) {
        data1[input.name] = input.value;
      }
    });
    this.setState({ data1 });
    const nextTab = currentTab + 1;
    this.setState({ currentTab: nextTab });
    
  }  
  
  handleSubmit = (event) => {
    event.preventDefault();
    const data1 = { ...this.state.data1 };
    const data = { ...this.state.data };
    data.username = data1.username;
    data.password = data1.password;

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (!errors) {
      fetch('http://127.0.0.1:8000/jobs/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (data.errors) {
          this.setState({errors:data.errors})
          for (const key in data.errors) {
            toast.error(data.errors[key], { autoClose: 3000 });
          }
        } else {
          localStorage.setItem('username', data.username);
          this.props.history.push('/jobs');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }
  }

  handlePrev = () => {
    const currentTab = this.state.currentTab - 1;
    this.setState({ currentTab });
  }

  renderButtons() {
    const { currentTab } = this.state;
    if (currentTab === 0) {
      return (
        <>
          <button className='tab-btn'><a href="/login" >Cancel</a></button>
          <button className='tab-btn' onClick={this.handleNext}>Next</button>
        </>
      );
    } else {
      return (
      <>
      <button className='tab-btn' onClick={this.handlePrev}>Back</button>
      <button className='tab-btn' onClick={this.handleSubmit}>Register</button>
      </>
      )
    }
  }

  render() {
    const { currentTab } = this.state;

    return (
      <div className="lrbg">
          <Tabs selectedIndex={currentTab} onSelect={tabIndex => this.setState({ currentTab: tabIndex })} 
          style={{  
            width: "80%", 
            height:"75vh", 
            backgroundColor:"#fff",
            borderRadius:"9px",
            marginLeft:20, 
            paddingTop:10,
            paddingLeft:10}}>
            <TabList>
              <Tab>Basic Details</Tab>
              <Tab>Personal Details</Tab>
            </TabList>
            <TabPanel>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <h3 className='lr-head'>Sign Up</h3>
              </div>
              <form onSubmit={this.handleSubmit} style={{ width: "100%" }}>
                {this.renderInput('username', 'UserName')}
                {this.renderInput('password', 'Password', 'input', 'password')}
                <div style={{ display: 'flex', justifyContent: 'space-around',  paddingTop:"20px"}}>
                {this.renderButtons()}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-around', paddingTop:"15px" }}>
              <p>already a member? <a href="/login">Log In</a></p>
              </div>
              </form>
            </TabPanel>
            <TabPanel>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <h3 className='lr-head'>Sign Up</h3>
              </div>
              <form onSubmit={this.handleSubmit} style={{ width: "100%" }}>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                  {this.renderInput('name', 'Name')}
                  {this.renderInput('age', 'Age')}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                  {this.renderInput('gender', 'Gender')}
                  {this.renderInput('email', 'Email', 'input', 'email')}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                  {this.renderInput('phone', 'Phone')}
                  {this.renderInput('experience', 'Years of Experience')}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-around', paddingTop:"30px" }}>
                {this.renderButtons()}
              </div>
              
              </form>
            </TabPanel>
          </Tabs>
      </div>
    );
  }
}

export default RegisterScreen;
