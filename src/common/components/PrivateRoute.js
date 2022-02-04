import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRouteComponent = ({ children, isAuth, ...rest }) => {
  return (
    <Route
      { ...rest }
      render={ ({ location }) =>
        isAuth ? (
          children
        ) : (
          <Redirect
            to={ {
              pathname: '/auth/login',
              state: { from: location },
            } }
          />
        )
      }
    />
  );
};

PrivateRouteComponent.propTypes = {
  isAuth: PropTypes.bool,
  children: PropTypes.shape({}),
}

export const PrivateRoute = connect((state) => ({ isAuth: state.auth }))(
  PrivateRouteComponent
);
