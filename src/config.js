const apiEndPoint = 'http://localhost:5000'
const channel = localStorage.getItem('userLogin')
const token = 'Basic ' + btoa('xlllClient:' + localStorage.getItem('userHash'))

export { apiEndPoint, channel, token }
