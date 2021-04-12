import axios from 'axios'

export function requests(config) {
  const instance = axios.create({
    baseURL: "https://www.wwklook.com/api/",
    timeout: 600000
  })
  // instance.defaults.xsrfCookieName = 'csrftoken';
  // instance.defaults.xsrfHeaderName = 'X-CSRFToken';
  // instance.defaults.withCredentials = true
  return instance(config)
}
