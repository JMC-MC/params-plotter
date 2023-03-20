// Function for posting to DB
const reqData = async function (method, url, data) {
  const response = await fetch(url, {
    method: method,
    body: JSON.stringify(data),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  return response.json();
};

const getData = async function (url) {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  return response.json();
};
const APIURL =
  'http://node-express-env.eba-xu2ptdt2.ap-southeast-2.elasticbeanstalk.com/';
export { reqData, getData, APIURL };
