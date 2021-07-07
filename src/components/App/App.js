import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';
import Dashboard from '../Dashboard/Dashboard';
import Login from '../Login/Login';
import Preferences from '../Preferences/Preferences';
import useToken from './useToken';

import Container from 'react-bootstrap/Container';

function setToken(userToken) {
  sessionStorage.setItem('token', JSON.stringify(userToken));
}

function getToken() {
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken?.access;
}

function App() {
  const { token, setToken } = useToken();



  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <Container fluid>
    <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
      <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="">Affiliate Home</a>
      <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
          <a class="nav-link" href="">Sign out</a>
        </li>
      </ul>
    </header>
    <div class="container-fluid">
  <div class="row">
    <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
      <div class="position-sticky pt-3">
        <ul class="nav flex-column">
          <li class="nav-item">
            <a class="nav-link " aria-current="page" href="">
              <span data-feather="home"></span>
              Leads
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link " aria-current="page" href="">
              <span data-feather="home"></span>
              Profile
            </a>
          </li>
        </ul>
      </div>
    </nav>

    <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
       <div className="wrapper">
      <h1>Application</h1>
      <BrowserRouter>
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/preferences">
            <Preferences />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
    </main>
  </div>
</div>
    
    </Container>
  );
}

export default App;