import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function AdminRoute() {
  const isAdmin = localStorage.getItem('role') === 'admin'; // or use AuthContext

  return isAdmin ? <Outlet /> : <Navigate to="/login" />;
}

export default AdminRoute;
