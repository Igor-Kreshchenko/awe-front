import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Geocode from 'react-geocode';
import { getBanks } from '../../api';
import { Layout } from '../../common/components/Layout';
import { Map } from '../../common/components/Map';
import { BanksList } from '../../common/components/BanksList';
import { Box } from '@material-ui/core';
import './MapPage.scss'

export const MapPage = ({ openMenu, setOpenMenu }) => {
  const apiKey = process.env.REACT_APP_GM_API_KEY;
  const [ banks, setBanks ] = useState([]);
  const [ userCoordinates, setUserCoordinates ] = useState({});
  const [ coordinates, setCoordinates ] = useState({});

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoordinates({ lat: latitude, lng: longitude });
      setUserCoordinates({ lat: latitude, lng: longitude });
    })
  }, [])

  useEffect(() => {
    try {
      async function start(){
        const city = await getCurrentCity(coordinates);
        const res = await getBanks(city);

        setBanks(res?.data?.banks);
      }

      start();
    } catch (error) {
      console.log('City not found')
    }
  }, [ coordinates ])

  function getCurrentCity(coords) {
    Geocode.setApiKey(apiKey);
    Geocode.setLanguage('ru');
    Geocode.setLocationType('GEOMETRIC_CENTER');

    return Geocode.fromLatLng(coords.lat, coords.lng).then(
      (response) => {
        const addressWithPlusCode = response.results.filter(item => item.plus_code);

        if(!addressWithPlusCode){
          return;
        }

        const plusCodeInfo = addressWithPlusCode[ 0 ]?.plus_code?.compound_code?.split(' ');
        const city = plusCodeInfo?.[ 1 ].slice(0, -1);

        return city;
      }
    ).catch(() => console.log('Wrong coordinates'));
  }

  return (
    <Layout openMenu={ openMenu } setOpenMenu={ setOpenMenu }>
      <Box className="mapPage">
        <BanksList banks={ banks }/>
        <Map userCoordinates={ userCoordinates } banks={ banks } setCoordinates={ setCoordinates } coordinates={ coordinates }/>
      </Box>
    </Layout>
    )
}

MapPage.propTypes = {
    openMenu: PropTypes.bool,
    setOpenMenu: PropTypes.func
};