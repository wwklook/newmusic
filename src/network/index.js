import axios from "axios";
import store from "../store";

export function requests(config) {
  const isProduction = process.env.NODE_ENV === "development";
  let instance;
  if (isProduction) {
    instance = axios.create({});
  } else {
    instance = axios.create({
      baseURL: "https://www.wwklook.com/",
      timeout: 600000,
    });
  }
  // instance.defaults.withCredentials = true;
  instance.interceptors.request.use(
    (config) => {
      if (config.method === "post") {
        config["xsrfCookieName"] = "csrftoken";
        config["xsrfHeaderName"] = "X-CSRFToken";
        // config.headers["X-CSRFToken"] = store.state.CSRFToken;
      }
      return config;
    },
    (err) => {
      return err;
    }
  );
  return instance(config);
}
