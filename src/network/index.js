import axios from 'axios'

export function requests(config) {
	const isProduction = process.env.NODE_ENV === 'development';
	let instance;
	if (isProduction) {
		instance = axios.create({})
	} else {
		instance = axios.create({
			baseURL: "https://www.wwklook.com/",
			timeout: 600000
		})
	}

	// instance.defaults.xsrfCookieName = 'csrftoken';
	// instance.defaults.xsrfHeaderName = 'X-CSRFToken';
	// instance.defaults.withCredentials = true
	return instance(config)
}