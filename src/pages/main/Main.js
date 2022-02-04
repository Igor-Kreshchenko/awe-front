import React, { useState } from 'react';
import { Box } from '@material-ui/core';
import  { Menu }  from '../../common/components';
import { Home } from '../home';
import { Route, Switch } from 'react-router-dom';
import Profile from '../profile';
import { MyEventsPage, AllEventsPage } from '../events';
import { PiggyPage } from '..';
import { MapPage } from '../map';

export const Main = () => {
    const [ openMenu, setOpenMenu ] = useState(false)
    return (
      <Box className="home-wrapper">
        <Menu openMenu={ openMenu } setOpenMenu={ setOpenMenu }/>
        <Switch>
          <Route exact path="/home/profile">
            <Profile openMenu={ openMenu } setOpenMenu={ setOpenMenu }/>
          </Route>
          <Route exact path="/home/all-events">
            <AllEventsPage openMenu={ openMenu } setOpenMenu={ setOpenMenu }/>
          </Route>
          <Route exact path="/home/my-events">
            <MyEventsPage openMenu={ openMenu } setOpenMenu={ setOpenMenu }/>
          </Route>
          <Route exact path="/home/piggy">
            <PiggyPage openMenu={ openMenu } setOpenMenu={ setOpenMenu } />
          </Route>
          <Route exact path="/home/map">
            <MapPage openMenu={ openMenu } setOpenMenu={ setOpenMenu } />
          </Route>
          <Route  path="/">
            <Home openMenu={ openMenu } setOpenMenu={ setOpenMenu }/>
          </Route>
        </Switch>
      </Box>
    );
};
