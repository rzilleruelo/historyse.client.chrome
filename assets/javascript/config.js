auth_endpoint = 'http://auth.historyse.local:3001/v1';

var config = {
  'client_id': '053ed936c37dd16b3a650a3831f513ca646a1fa2',
  'historyse': {
    'endpoint': 'http://historyse.local:3000/v1'
  },
  'auth': {
    'endpoint_login': auth_endpoint + '/users/oauth',
    'request_timeout': 1000
  }
};
