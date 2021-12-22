import createInterceptors from './interceptors';
import { weatherRepository } from '@/api';
// const url = 'https://www.metaweather.com/api/location';

const createRepository = ({ app, $axios, redirect }) => {
  const backendApi = $axios.create();

  backendApi.setBaseURL('/api/location');
  backendApi.defaults.timeout = 30000;

  const interceptors = createInterceptors({ app, backendApi, redirect });

  backendApi.onRequest(interceptors.onRequest);
  backendApi.onResponse(interceptors.onResponse);
  backendApi.onError(interceptors.onError);

  return {
    weather: weatherRepository(backendApi),
  };
};

export default createRepository;
