import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 1000,
  duration: '5s',
};

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3001';

export default function () {
  const res = http.get(`${BASE_URL}/recipes`);

  const isSuccessful = check(res, {
    'status is 200': (r) => r.status === 200,
  });

  // Tik jei atsakymas buvo sėkmingas, tikrinam body turinį
  if (isSuccessful && res.body) {
    check(res, {
      'body has recipe data': (r) => r.body.includes('Mock Recipe'),
    });
  }

  sleep(1);
}
