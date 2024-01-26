import logo from './logo.svg';
import './App.css';
import MainLayout from './components/layout/DashboardLayoutRoute';
import Sidebar from './components/pages/Sidebar';
import Dashboard from './components/pages/Dashboard';
import { BrowserRouter, Routes, Route, Navigate, BrowserRouter as Router, Switch } from "react-router-dom";
import NoPage from './components/pages/NoPage';
import Login from './components/pages/Login';
import { lazy,Suspense } from 'react';

/** Layouts **/
import LoginLayoutRoute from './components/layout/LoginLayoutRoute';
import DashboardLayoutRoute from "./components/layout/DashboardLayoutRoute";
import Loading from './components/pages/Loading';


const Products = lazy(() => import('./components/pages/Products'));


function App() {
  return (
    <>
    <Suspense fallback={<Loading></Loading> }> 
   
      <Router>
        <Routes>
          <Route path="/" element={<Login />} ></Route>
          <Route path="/Dashboard" element={<DashboardLayoutRoute><Dashboard></Dashboard> </DashboardLayoutRoute>}></Route>
          <Route path="/Products" element={<DashboardLayoutRoute><Products></Products> </DashboardLayoutRoute>}></Route>
        </Routes>

      </Router>

      </Suspense>


      <footer class="container-fluid footer fixed-botton fixed-bottom">
        <p class="text-center small">©2023-2024 Inventory Management System</p>
      </footer>
    </>
  );
}

export default App;
