 
import './App.css';
import MainLayout from './components/layout/DashboardLayoutRoute';
import Sidebar from './components/pages/Sidebar';
import Dashboard from './components/pages/Dashboard';
import { BrowserRouter, Routes, Route, Navigate, BrowserRouter as Router } from "react-router-dom";
import NoPage from './components/pages/NoPage';
import Login from './components/pages/Login';
import React, { lazy, Suspense } from 'react';

/** Layouts **/
import LoginLayoutRoute from './components/layout/LoginLayoutRoute';
import DashboardLayoutRoute from "./components/layout/DashboardLayoutRoute";
import Loading from './components/pages/Loading';
import Billing from './components/pages/Billing';


const Products = lazy(() => import('./components/pages/Products'));
const AddEditProduct = lazy(() => import('./components/pages/AddEditProduct'));
const Categories = lazy(() => import('./components/pages/Categories'));
// const AddEditCategory = lazy(()=>import('./components/pages/AddEditCategory'));

function App() {
  return (
    <>
      <Suspense fallback={<Loading></Loading>}>

        <Router>
          <Routes>
            <Route path="/" element={<Login />} ></Route>
            <Route path="/Dashboard" element={<DashboardLayoutRoute><Dashboard></Dashboard> </DashboardLayoutRoute>}></Route>
            <Route path="/Products" element={<DashboardLayoutRoute><Products></Products> </DashboardLayoutRoute>}></Route>
            {/* <Route path="/AddEditProduct" element={<DashboardLayoutRoute><AddEditProduct ></AddEditProduct> </DashboardLayoutRoute>}></Route> */}
            <Route path="/Categories" element={<DashboardLayoutRoute><Categories></Categories> </DashboardLayoutRoute>}></Route>
            <Route path="/Billing" element={<DashboardLayoutRoute><Billing></Billing> </DashboardLayoutRoute>}></Route>
            {/* <Route path="/AddEditCategory" element={<DashboardLayoutRoute><AddEditCategory></AddEditCategory> </DashboardLayoutRoute>}></Route> */}
          </Routes>

        </Router>

      </Suspense>
      <footer className="container-fluid footer fixed-botton fixed-bottom">
        <p className="text-center small">©2023-2024 Inventory Management System</p>
      </footer>
    </>
  );
}

export default App;
