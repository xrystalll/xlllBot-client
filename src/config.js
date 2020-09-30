const apiEndPoint = 'http://localhost:7000'
const botUsername = 'xlllbot' // your bot username on twitch
const clientDomain = 'localhost'

const channel = localStorage.getItem('userLogin')
const token = 'Basic ' + btoa(localStorage.getItem('userLogin') + ':' + localStorage.getItem('sessId'))

export { clientDomain, apiEndPoint, botUsername, channel, token }
