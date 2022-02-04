import { Switch, Route, Redirect } from 'react-router-dom';
import { PrivateRoute } from '../common';
import { Login, LoginGoogle, LoginFacebook, Register, ForgotPassword, ResetPassword } from '../pages';
import { Title } from '../pages/index';
import { Main } from '../pages';

export const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Title />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/login-google">
        <LoginGoogle />
      </Route>
      <Route exact path="/login-facebook">
        <LoginFacebook />
      </Route>
      <Route exact path="/register">
        <Register />
      </Route>
      <Route exact path="/forgot-password">
        <ForgotPassword />
      </Route>
      <Route exact path="/change-password/:token">
        <ResetPassword />
      </Route>
      <PrivateRoute  path="/home">
        <Main/>
      </PrivateRoute>
      <Redirect to="/" />
    </Switch>
  );
};
