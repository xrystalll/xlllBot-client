import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Header from 'components/partials/Header';

class GeneralRoute extends Component {
  render() {
    const { component: Component, ...rest } = this.props

    return (
      <Route
        {...rest}
        render = {props =>
          <div className="content">
            <Header />
            <Component {...props} />
          </div>
        }
      />
    )
  }
}

export default GeneralRoute;
