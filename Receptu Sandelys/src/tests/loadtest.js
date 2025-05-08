import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 5,           // Tik 5 virtualūs naudotojai
  duration: '10s',  // Tik 10 sekundžių
};

const API_KEY = __ENV.SPOONACULAR_API_KEY;
const BASE_URL = 'https://api.spoonacular.com/recipes/complexSearch';

export default function () {
  const url = `${BASE_URL}?apiKey=${API_KEY}&query=chicken&number=3`;

  const res = http.get(url);

  check(res, {
    'status is 200': (r) => r.status === 200,
    'body includes results': (r) => r.body.includes('results'),
  });

  sleep(1); // Priverstinis laukimas, kad neperkrautų
}
