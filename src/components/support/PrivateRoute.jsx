import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import Header from '../partials/Header';
import { toast } from 'react-toastify';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuth = !!localStorage.getItem('userHash')

  if (!isAuth) toast.error('You are not authorized', { position: toast.POSITION.BOTTOM_RIGHT })

  return (
    <Route
      {...rest}
      render = {props =>
        isAuth ? (
          <div className="content">
            <Header />
            <Component {...props} />
          </div>
        ) : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
      }
    />
  )
}

export default PrivateRoute;
