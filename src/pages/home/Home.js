import React, { useState } from 'react';
import { Dashboard, CardsSidebar } from './components';
import PropTypes from 'prop-types';
import './Home.scss';
import { NotificationsPage } from '../notifications/Notifications';

export const Home = ({ openMenu, setOpenMenu }) => {

  return (
    <div className="home-wrapper">
      <Dashboard openMenu={ openMenu } setOpenMenu={ setOpenMenu }/>
      <div className="home-sidebar">
        <CardsSidebar/>
        <NotificationsPage />
      </div>
    </div>
  );
}

Home.propTypes = {
  openMenu: PropTypes.bool,
  setOpenMenu: PropTypes.func
};
