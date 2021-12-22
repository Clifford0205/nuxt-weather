export const weatherRepository = request => ({
  fetchLocation({ location }) {
    return request({
      method: 'get',
      url: `/search/?query=${location}`,
    });
  },
  fetchWeather({ woeid }) {
    return request({
      method: 'get',
      url: `/${woeid}/`,
    });
  },
});

export default weatherRepository;
