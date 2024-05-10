import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import Home from "./components/Home";
import NavBar from './components/NavBar';
import Profile from './components/Profile';
import SearchJobs from './components/SearchJobs';
import Job from './components/Job';
import LogOut from './components/LogOut';
import ForgotPassword from './components/ForgotPassword';

function App() {
  const username = localStorage.getItem('username');

  return (
    <React.Fragment>
      <NavBar/>
      <Switch>
        <Route path="/home" component={Home}/>
        {!username && <Route path="/login" component={LoginScreen}/>}
        {!username && <Route path="/forgot-password" component={ForgotPassword}/>}
        {!username && <Route path="/register" component={RegisterScreen}/>}
        {username &&<Route path="/profile" component={Profile}/>}
        {username &&<Route path="/log-out" component={LogOut}/>}
        {username &&<Route path="/jobs" component={SearchJobs}/>}
        {username &&<Route path="/job/:id" component={Job} />}
        <Redirect to="/home"/>
      </Switch>
      <ToastContainer />
    </React.Fragment>
  );
}

export default App;
// import React from 'react';
// import ProgressBar from './components/Profile';

// const App = () => {
//   return (
//     <div>
//       <h1>Progress Bar Example</h1>
//       <ProgressBar status="ending" />
//       <ProgressBar status="offer" />
//       <ProgressBar status="reject" />
//     </div>
//   );
// };

// export default App;
