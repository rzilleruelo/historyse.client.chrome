var config = {
  client_id: "8b5376a0eb673623ad4b0b6b6d80dd92f553a2c3",
  historyse: {
    endpoint: "http://historyse.local:43000/v1",
    window_events_sampling_rate: 5000,
    endpoint_history_events: "http://historyse.local:43000/v1/users/%(user_id)s/history/events",
    endpoint_history_urls: "http://historyse.local:43000/v1/users/%(user_id)s/history/urls",
  },
  auth: {
    endpoint_login: "http://authorize-gateway.com/v1/users/oauth",
    request_timeout: 1000
  }
};
