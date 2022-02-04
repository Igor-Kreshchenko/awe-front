import './Notifications.scss';
import { useTranslation } from 'react-i18next';
import { Badge } from '@material-ui/core';
import CommentIcon from '@mui/icons-material/Comment';
import CancelIcon from '@mui/icons-material/Cancel';
import { useEffect, useState } from 'react';
import { Messages } from './messages/Messages';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setIsNew, setUserId } from './notifications-slice';

export const NotificationsComponent = ({ isNew, userID, checkAsRead, createChannel, messages }) => {
    const { t } = useTranslation()

    const [ isOpen, setIsOpen ] = useState(false)
 
    const closeNotifications = () => {
        setIsOpen(false)
    }

    const openNotifications = () => {
      setIsOpen(true)
      checkAsRead(false)
    }

    useEffect(() => {
      createChannel(userID);
    }, [])

    return (
      <div className="notifications__wrapper">
        { isOpen && 
        <div className="notifications">
          <div className="notifications__header">
            <h3>Awesomebank</h3>
            <p>{ t('notifications.headerText') }</p>
          </div>
          <div className="notifications__list">
            <Messages messages={ messages } />
          </div>
        </div>
        }
        <div className="notifications__icon">
          { !isNew && !isOpen &&
            <Badge color="primary" onClick={ openNotifications }>
              <CommentIcon fontSize="large" color="action" />
            </Badge> }
          { !isOpen && isNew && 
            <Badge variant="dot" color="primary" onClick={ openNotifications }>
              <CommentIcon fontSize="large" color="action" />
            </Badge> }
          { isOpen && 
            <Badge color="primary" onClick={ closeNotifications }>
              <CancelIcon fontSize="large" color="action" />
            </Badge> }
        </div>
      </div>
    )
}

NotificationsComponent.propTypes = {
  messages: PropTypes.array,
  isNew: PropTypes.bool,
  userID: PropTypes.number,
  checkAsRead: PropTypes.func,
  createChannel: PropTypes.func
}

const mapStateToProps = (state) => {
  return {
    messages: state.notificationsReduser.messages,
    isNew: state.notificationsReduser.isNew,
    userID: state.profileReducer.user.UserID,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    checkAsRead: (data) => dispatch(setIsNew(data)),
    createChannel: (data) => dispatch(setUserId(data))
  }
}

export const NotificationsPage = connect(mapStateToProps, mapDispatchToProps)(NotificationsComponent)
