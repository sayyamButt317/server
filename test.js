import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 50,
  cloud: {
    // Project: Salesync
    projectID: 3741002,
    // Test runs with the same name groups test runs together.
    name: 'Test (22/01/2025-00:46:44)'
  },
  thresholds: {
    http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    http_req_duration: ['p(95)<200'], // 95% of requests should be below 2s
  },
  // spike testing

  stages: [
    { duration: '1m', target: 50 },
    { duration: '30s', target: 0 },
    { duration: '10s', target: 50 },
    
  ],
};

export default function() {
  http.get('https://localhost:8000/api/products');
  sleep(1);
}