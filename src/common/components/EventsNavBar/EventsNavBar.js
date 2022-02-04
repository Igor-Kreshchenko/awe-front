import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import './EventsNavBar.scss';

export const EventsNavBar = () => {
  const { t } = useTranslation();

  return (
    <div className="events_nav">
      <NavLink exact className="navlink" activeClassName="navlink__active" to="/home/all-events">
        { t('events.allEvents') }
      </NavLink>
      <NavLink exact className="navlink" activeClassName="navlink__active" to="/home/my-events">
        { t('events.myEvents') }
      </NavLink>
    </div>
  );
};