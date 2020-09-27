import React, { Component } from 'react';
import { channel } from 'config';
import { socket } from 'instance/Socket';
import { Footer } from '../partials/Footer';
import { Loader } from '../partials/Loader';
import { Error } from '../partials/Error';
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
        this.setState({ response: data, showClear: true })
      } else {
        this.setState({ noData: true })
      }
    })
    socket.on('events_deleted', (data) => {
      if (data.deletedCount > 0) {
        toast.success('Old events successfully deleted', { position: toast.POSITION.BOTTOM_RIGHT })
      } else {
        toast.info('Nothing to clear', { position: toast.POSITION.BOTTOM_RIGHT })
        this.setState({ showClear: false })
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

  timeFormat(timestamp) {
    const d = new Date()
    const t = new Date(Number(timestamp))

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    const curYear = d.getFullYear()
    const curMonth = months[d.getMonth()]
    const curDate = d.getDate()

    const year = t.getFullYear()
    const month = months[t.getMonth()]
    const date = t.getDate()
    const hour = t.getHours()
    const min = t.getMinutes() < 10 ? `0${t.getMinutes()}` : t.getMinutes()

    let thisYear
    year !== curYear ? thisYear = ` ${year}` : thisYear = ''

    if (`${date}.${month}.${year}` === `${curDate}.${curMonth}.${curYear}`) {
      return `today at ${hour}:${min}`
    } else if (`${date}.${month}.${year}` === `${curDate - 1}.${curMonth}.${curYear}`) {
      return `yesterday at ${hour}:${min}`
    } else {
      return `${date} ${month}${thisYear} at ${hour}:${min}`
    }
  }

  render() {
    const { response } = this.state
    const clearVis = this.state.showClear ? '' : ' none'

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
                  {!this.state.noData ? (
                    <div className={`clear${clearVis}`} onClick={this.deleteEvents}>
                      <i className="material-icons">delete</i>
                      <span>Delete events older than 24 hours</span>
                    </div>
                  ) : null}
                  <div id="content_inner">
                    {response.length > 0 ? (
                      response.reverse().map(item => (
                        <div className="event_item" key={item._id}>
                          <div className="event_time">{this.timeFormat(item.time)}</div>
                          <div>{item.text}</div>
                        </div>
                      ))
                    ) : (
                      !this.state.noData ? <Loader /> : <Error message="No events yet" />
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
