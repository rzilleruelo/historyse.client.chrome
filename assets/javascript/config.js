var config = {
  "client_id": "feaaaf824156266c183e4bc000a849d1fce156ed",
  "historyse": {
    "endpoint": "http://historyse.local:3000/v1",
    "window_events_sampling_rate": 5000,
    endpoint_history_events: "http://historyse.local:3000/v1/users/%(user_id)s/history/events",
    endpoint_history_urls: "http://historyse.local:3000/v1/users/%(user_id)s/history/urls",
  },
  "auth": {
    "endpoint_login": "http://auth.historyse.local:3000/v1/users/oauth",
    "request_timeout": 1000
  }
};
