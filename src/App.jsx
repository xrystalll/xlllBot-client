import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CustomScrollbar from 'components/support/CustomScrollbar';
import PrivateRoute from 'components/support/PrivateRoute';
import { socket } from 'instance/Socket';
import Home from 'components/home';
import Channel from 'components/channel';
import Commands from 'components/commands';
import Badwords from 'components/badwords';
import Songs from 'components/songs';
import Events from 'components/events';
import Settings from 'components/settings';
import { Auth } from 'components/auth';
import { AuthError } from 'components/auth/error'
import { NotFound } from 'components/error';
import { ToastContainer, toast } from 'react-toastify';

toast.configure({
  autoClose: 3000
})

class App extends Component {
  componentDidMount() {
    socket.on('alert', (data) => {
      toast.error(data.message, { position: toast.POSITION.BOTTOM_RIGHT })
    })
  }

  render() {
    return (
      <CustomScrollbar className="view">
        <Router>
          <Switch>
            <Route path="/" exact component={Home} />
            <PrivateRoute path="/dashboard/channel" component={Channel} />
            <PrivateRoute path="/dashboard/commands" component={Commands} />
            <PrivateRoute path="/dashboard/badwords" component={Badwords} />
            <PrivateRoute path="/dashboard/songs" component={Songs} />
            <PrivateRoute path="/dashboard/events" component={Events} />
            <PrivateRoute path="/dashboard/settings" component={Settings} />
            <Route path="/auth" exact component={Auth} />
            <Route path="/auth/error" component={AuthError} />
            <Route component={NotFound} />
          </Switch>
        </Router>

        <ToastContainer />
      </CustomScrollbar>
    )
  }
}

export default App;
