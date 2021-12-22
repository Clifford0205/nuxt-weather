/* eslint-disable no-unused-vars */
import { get } from 'lodash';
import qs from 'qs';
import { ErrorType, ResponseStatus } from './constants.js';

export const interceptors = context => ({
  // handel response
  onResponse(response) {
    const data = response.data;

    if (response.status === 200) {
      return data;
    }

    // default result error
    return Promise.reject(new Error(response || 'Error'));
  },
  onRequest(config) {
    config.paramsSerializer = params =>
      qs.stringify(params, { arrayFormat: 'brackets' });

    return config;
  },
  onError(error) {
    if (!error.response) {
      return;
    }

    const code = error.response.status;
    let insideCode;
    if (error.response.data.status) {
      insideCode = error.response.data.status.code;
    }

    if (code === ErrorType.Forbidden) {
      return Promise.reject(error.response.data.status.message);
    }
  },
});

export default interceptors;
