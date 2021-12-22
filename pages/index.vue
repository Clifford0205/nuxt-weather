<template>
  <section class="main-content">
    <div class="home">
      <div class="search-area">
        <input v-model="localText" type="text" @keydown.enter="handleSearch" />
        <button class="search-area-btn" @click="handleSearch">搜尋</button>
      </div>
      <div class="weather-info-area">
        <h2 v-if="isLocalInfoExist" class="weather-info-area-title">
          City:{{ localInfo.title }}
        </h2>
        <div v-if="isWeatherDataExist" class="weather-list">
          <div class="row">
            <div v-for="day in weatherData" :key="day.id" class="col-md-five">
              <img
                src="https://www.metaweather.com/static/img/weather/t.svg"
                alt="天氣圖片"
              />
            </div>
          </div>
        </div>
        <div v-if="localInfo == null" class="no-data">沒有符合的資料</div>
      </div>
    </div>
  </section>
</template>

<script>
import { get, isEmpty } from 'lodash';

export default {
  name: 'IndexPage',
  data() {
    return {
      localText: '',
      weatherData: [],
      localInfo: '',
    };
  },

  computed: {
    isWeatherDataExist() {
      return !isEmpty(this.weatherData);
    },
    isLocalInfoExist() {
      return !isEmpty(this.localInfo);
    },
  },
  methods: {
    // 拿到天氣
    async handleSearch() {
      await this.handleLocationSearch();
      if (get(this.localInfo, 'woeid')) {
        this.$api.weather
          .fetchWeather({ woeid: this.localInfo.woeid })
          .then(res => {
            if (get(res, 'consolidated_weather')) {
              this.weatherData = res.consolidated_weather.slice(0, -1);
            }
          });
      }
    },
    // 拿到地點
    async handleLocationSearch() {
      // this.$axios
      //   .get(`search/?query=${this.localText}`)
      //   .then(res => console.log(res));
      await this.$api.weather
        .fetchLocation({ location: this.localText })
        .then(res => {
          if (res[0]) {
            this.localInfo = res[0];
            return;
          }
          this.localInfo = null;
        });
    },
  },
};
</script>
