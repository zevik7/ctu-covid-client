import React from 'react';

import './layout.css';

import Sidebar from '../Sidebar/Sidebar';

import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="adminLayout">
      <Sidebar />
      <div className="adminLayout__body">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
