import http from 'k6/http';
import { check } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 100, 
      timeUnit: '1s', 
      duration: '3m', 
      preAllocatedVUs: 50, 
      maxVUs: 200, 
    },
  },
  thresholds: {
    http_req_duration: ['p(95)<500'], 
  },
};

export default function () {

  const res = http.get('http://localhost:3000/products');
  
  check(res, {
    'status is 200': (r) => r.status === 200,
  });
}

export function handleSummary(data) {
  return {
    "relatorio-k6.html": htmlReport(data),
  };
}