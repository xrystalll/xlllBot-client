const clientDomain = 'localhost'
const apiEndPoint = 'http://localhost:7000'
const channel = localStorage.getItem('userLogin')
const token = 'Basic ' + btoa(localStorage.getItem('userLogin') + ':' + localStorage.getItem('sessId'))

export { clientDomain, apiEndPoint, channel, token }
