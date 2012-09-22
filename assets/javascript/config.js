historyse_endpoint = "http://api.historyse.com/v1";
auth_endpoint = "http://api.authorize-gateway.com/v1";

var config = {
  client_id: "8b5376a0eb673623ad4b0b6b6d80dd92f553a2c3",
  historyse: {
    window_events_sampling_rate: 5000,
    endpoint: historyse_endpoint,
    endpoint_history_events: historyse_endpoint + "/users/%(user_id)s/history/events",
    endpoint_history_urls: historyse_endpoint + "/users/%(user_id)s/history/urls"
  },
  auth: {
    endpoint: auth_endpoint,
    endpoint_login: auth_endpoint + "/users/oauth",
    request_timeout: 1000
  }
};
