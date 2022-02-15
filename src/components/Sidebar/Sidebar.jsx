import React from 'react';

import './sidebar.css';

import Logo from '../../assets/images/logo.png';

import SidebarItem from '../../assets/JsonData/sidebar_routes.json';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar__logo">
        <img src={Logo} alt="Admin panel logo" />
      </div>
      {SidebarItem.map((item, index) => (
        <Link to={`/admin${item.route}`} key={index}>
          <div>{item.display_name}</div>
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
