import axios from 'axios';

const BASE_URL = 'http://api.dpubinmarcipka.jatengprov.go.id';

/*export default function requestApi (type, url, data) {
  return axios({
    method: type,
    baseURL: BASE_URL,
    url: url,
    data: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
*/

export default function request(type, url, data) {
  return axios({
    method: type,
    baseURL: BASE_URL,
    url: url,
    data: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export const requestWithToken = (token, type, url, data) => {
  return axios({
    method: type,
    baseURL: BASE_URL,
    url: url,
    data,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const requestFormData = (type, url, data) => {
  return axios({
    method: type,
    baseURL: BASE_URL,
    url: url,
    data: data,
    /*headers: {
      'Content-Type': 'multipart/form-data',
    }*/
  });
};

export const url = data => {
  return `${BASE_URL}/${data}`;
};
