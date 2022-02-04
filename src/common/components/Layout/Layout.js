import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button } from '@material-ui/core';
import ShortTextIcon from '@material-ui/icons/ShortText';
import { LangMenu } from '../LangMenu/LangMenu';
import './Layout.scss';

export const Layout = ({ children, openMenu, setOpenMenu })=>{
    const menuHandler = () => {
        if (openMenu) {
          setOpenMenu(false);
        } else {
          setOpenMenu(true);
        }
      };

    return(
      <Box className="layout" height="100vh">
        <Box className="layout__main" bgcolor="#fff" height="100%" position="relative">
          <Box display="flex" flexDirection="column" className="layout__content" justifyContent="flex-start">
            <Box className="layout__header">
              <Box className="layout__header_content">
                <Box>
                  <Button onClick={ menuHandler } className="layout_btn">
                    <ShortTextIcon fontSize="large" />
                  </Button>
                </Box>
                <Box>
                  <LangMenu />
                </Box>
              </Box>
            </Box>
            { children }
          </Box>
        </Box>
      </Box>
    )
}

Layout.propTypes = {
    children: PropTypes.node,
    openMenu: PropTypes.bool,
    setOpenMenu: PropTypes.func
  };