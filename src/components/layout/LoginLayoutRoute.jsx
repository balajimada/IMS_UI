import React, { Component } from 'react';  
import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';   

 
  const LoginLayoutRoute = ({children}) => {  
    <div >  
      {/* <p>This is the First Layout</p>   */}
      {children}                                       
    </div>
  };  
  
export default LoginLayoutRoute;