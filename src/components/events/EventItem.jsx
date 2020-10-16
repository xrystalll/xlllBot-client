import React from 'react';

export const EventItem = ({ data }) => {

  const timeFormat = (timestamp) => {
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

  return (
    <div className="event_item">
      <div className="event_time">{timeFormat(data.time)}</div>
      <div>{data.text}</div>
    </div>
  )
}
