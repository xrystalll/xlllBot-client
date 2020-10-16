import React, { Component } from 'react';
import { channel } from 'config';
import { socket } from 'instance/Socket';
import { EventItem } from './EventItem';
import { Footer } from 'components/partials/Footer';
import { Loader } from 'components/partials/Loader';
import { Errorer } from 'components/partials/Error';
import { toast } from 'react-toastify';

class Events extends Component {
  _isMounted = false;
  constructor() {
    super();
    this.state = {
      response: [],
      noData: false,
      showClear: false
    }
  }

  componentDidMount() {
    document.title = 'xlllBot - Events'
    this._isMounted = true
    socket.emit('event_items', { channel })
    this.subscribeToEvents()
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  subscribeToEvents() {
    if (!this._isMounted) return

    socket.on('output_events', (data) => {
      if (data.length > 0) {
        this.setState({ response: data.reverse(), showClear: true })
      } else {
        this.setState({ noData: true })
      }
    })
    socket.on('events_deleted', (data) => {
      this.setState({ showClear: false })

      if (data.deletedCount > 0) {
        this.setState({ response: [], noData: true })
        toast.success('Old events successfully deleted', { position: toast.POSITION.BOTTOM_RIGHT })
      } else {
        toast.info('Nothing to clear', { position: toast.POSITION.BOTTOM_RIGHT })
      }
    })
    socket.on('new_event', (data) => {
      if (data.channel === channel) {
        this.setState({ response: [data, ...this.state.response], noData: false })
      }
    })
  }

  deleteEvents() {
    socket.emit('delete_events', { channel })
  }

  render() {
    const { response, showClear, noData } = this.state
    const clearVis = showClear ? '' : ' none'

    return (
      <section id="main">

        <section id="content">
          <div className="content--boxed-sm">
            <header className="content__header">
              <h2>Events <small>Dashboard</small></h2>
            </header>

            <div className="card">
              <div className="card__body">
                <div className="card__sub">
                  <h4>Chat events by last 24 hrs</h4>
                  {!noData && (
                    <div className={`clear${clearVis}`} onClick={this.deleteEvents}>
                      <i className="material-icons">delete</i>
                      <span>Delete all events</span>
                    </div>
                  )}
                  <div id="content_inner">
                    {response.length > 0 ? (
                      response.map(item => (
                        <EventItem key={item._id} data={item} />
                      ))
                    ) : (
                      !noData ? <Loader /> : <Errorer message="No events yet" />
                    )}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        <Footer />

      </section>
    )
  }
}

export default Events;
