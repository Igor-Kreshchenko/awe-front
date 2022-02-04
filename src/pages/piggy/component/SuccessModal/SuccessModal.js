import { Button } from '@material-ui/core'
import CheckCircle from '@material-ui/icons/CheckCircle'
import React from 'react'
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import './SuccessModal.scss'

export const SuccessModal = ({ title, stopChange }) => {

    const { t } = useTranslation()

    return (
      <div className="block__success">
        <h2 className="block__title success">{ title }</h2>
        <div className="block__success-icon"> 
          <CheckCircle style={ { fontSize: '90px', color: 'green' } }/>
        </div>
        <Button color="primary" style={ { marginTop: '50px' } } variant="outlined" fullWidth size="large"
                  onClick={ stopChange }>{ t('modals.button_3') }</Button>
      </div>
      )
}

SuccessModal.propTypes = {
    title: PropTypes.string,
    stopChange: PropTypes.func
}