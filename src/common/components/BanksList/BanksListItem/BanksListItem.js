import { Box, Card, CardContent, Typography } from '@material-ui/core'
import React from 'react'
import PropTypes from 'prop-types';
import './BanksListItem.scss'
import { useTranslation } from 'react-i18next';

export const BanksListItem = ({ index, email, phone, address, city, name }) => {
    const { t } = useTranslation();

    // return (
    //   <Card elevation={ 5 } className={ 'banksItem' }>
    //     <CardContent>
    //       <div className="banksItem__title">{ name }</div>
    //       <Box display="flex" justifyContent="space-between">
    //         <Typography variant={ 'subtitle1' }>{ t('map.item.phone') }:</Typography>
    //         <Typography variant={ 'subtitle1' }>{ phone }</Typography>
    //       </Box>
    //       <Box display="flex" justifyContent="space-between">
    //         <Typography variant={ 'subtitle1' }>{ t('map.item.email') }:</Typography>
    //         <Typography variant={ 'subtitle1' }>{ email }</Typography>
    //       </Box>
    //       <Box sx={ { marginTop: '10px' } } display="flex" justifyContent="space-between">
    //         <Typography variant={ 'subtitle2' }>{ t('map.item.address') }:</Typography>
    //         <Typography variant={ 'subtitle2' }>{ `${ city }, ${ address }` }</Typography>
    //       </Box>
    //       <Box sx={ { marginTop: '10px' } } display="flex" justifyContent="space-between">
    //         <Typography variant={ 'subtitle2' }>{ t('map.item.index') }:</Typography>
    //         <Typography variant={ 'subtitle2' }>{ index }</Typography>
    //       </Box>
    //     </CardContent>
    //   </Card>
    // )
    return (
      <div className="banksItem">
        <div className="banksItem__title">{ name }</div>
        <div className="banksItem__content">
          <div>{ t('map.item.phone') }:</div>
          <div className="banksItem__content-text">{ phone }</div>
        </div>
        <div className="banksItem__content email">
          <div>{ t('map.item.email') }:</div>
          <div className="banksItem__content-text">{ email }</div>
        </div>
        <div className="banksItem__line"></div>
        <div className="banksItem__content address">
          <div>{ t('map.item.address') }:</div>
          <div className="banksItem__content-text">{ `${ city }, ${ address }` }</div>
        </div>
        <div className="banksItem__content index">
          <div>{ t('map.item.index') }:</div>
          <div className="banksItem__content-text">{ index }</div>
        </div>
      </div>
    )
}

BanksListItem.propTypes = {
    index: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    address: PropTypes.string,
    city: PropTypes.string
}