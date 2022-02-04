import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';
import GoogleMapReact from 'google-map-react';
import Geocode from 'react-geocode';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import './Map.scss';

export const Map = ({ userCoordinates, banks, setCoordinates, coordinates }) => {
    const apiKey = process.env.REACT_APP_GM_API_KEY;
    const [ coords, setCoords ] = useState([]);

    useEffect(() => {
      const promises = banks.map((bank) => {
        return getCoordsFromAddress(bank).catch(e => e);
      });

      Promise.all(promises)
        .then(response => setCoords(response))
        .catch(error => console.log(`Error in executing ${ error }`));
    },[ banks, setCoords ])

    function getCoordsFromAddress(bank) {
      const address = `${ bank[ 'city' ] } ${ bank[ 'address' ] }`;

      Geocode.setApiKey(apiKey);

      return Geocode.fromAddress(address).then(
        (response) => {
          const latLng = { lat: response.results[ 0 ].geometry.location.lat, lng: response.results[ 0 ].geometry.location.lng };

          return latLng;
        },
        (error) => {
          console.error(error);
        }
      );
    }

    return (
      <div className="map_container">
        <GoogleMapReact
            bootstrapURLKeys={ { key: apiKey } }
            defaultCenter={ coordinates }
            center={ coordinates }
            defaultZoom={ 15 }
            margin={ [ 50, 50, 50, 50 ] }
            onChange={ (e) => setCoordinates({ lat: e.center.lat, lng: e.center.lng }) }
        >
          <LocationOnOutlinedIcon lat={ userCoordinates?.lat } lng={ userCoordinates?.lng }  style={ { fill: 'blue' } } fontSize="large"/>
          { coords.length && coords.map((coord) => <LocationOnOutlinedIcon lat={ coord?.lat } lng={ coord?.lng } key={ uniqueId() }  style={ { fill: '#0c7e2b' } } fontSize="large"/>)}
        </GoogleMapReact>
      </div>
    )
};

Map.propTypes = {
  banks: PropTypes.array,
  setCoordinates: PropTypes.func.isRequired,
  coordinates: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }).isRequired,
  userCoordinates: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }).isRequired,
};