export const getCookie = (key) => {
  const match = document.cookie.match(`(^|;) ?${key}=([^;]*)(;|$)`)
  return match ? match[2] : undefined
}

export const clearCookies = () => {
  document.cookie.split(';').map(cookie => {
    document.cookie = cookie.replace(/^ +/, '').replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/')
    return true
  })
}
