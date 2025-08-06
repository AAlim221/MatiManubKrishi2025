import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const DoctorRoute = ({ children }) => {
  const doctorInfo = JSON.parse(localStorage.getItem('doctorInfo'));
  const location = useLocation();

  if (doctorInfo?.role === 'doctor' && doctorInfo?.isAdmin === true) {
    return children;
  }

  return <Navigate to="/admin-login-doctor" state={{ from: location }} replace />;
};

export default DoctorRoute;
