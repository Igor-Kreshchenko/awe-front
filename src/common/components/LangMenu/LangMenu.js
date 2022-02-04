import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useLocalStorage } from '../../hooks/index';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getItemFromLocalStorage } from '../../helpers/getItemFromLocalStorage';

export const LangMenu = () => {
  const { i18n } = useTranslation()
  const [ anchorEl, setAnchorEl ] = React.useState(null);
  const lang = getItemFromLocalStorage('i18nextLng');

  const changeLang = (event) => {
    event.preventDefault()
    i18n.changeLanguage(event.target.id)
    setAnchorEl(null);
  };

  const handleClose = (e) => {
    setAnchorEl(null);
  };

  const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
  };

  return (
    <div>
      <Button
        style={ { minWidth: '50px', borderRadius: '10px', border: '2px solid #AC4C9D' } }
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={ handleClick }
      >
        { lang }
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={ anchorEl }
        keepMounted
        open={ Boolean(anchorEl) }
        onClose={ handleClose }
      >
        <MenuItem id="en" onClick={ changeLang }>
          EN
        </MenuItem>
        <MenuItem id="ua" onClick={ changeLang }>
          UA
        </MenuItem>
      </Menu>
    </div>
  );
};