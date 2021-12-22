<template>
  <section class="main-content">
    <div class="home">
      <div class="search-area">
        <input v-model="localText" type="text" @keydown.enter="handleSearch" />
        <button class="search-area-btn" @click="handleSearch">搜尋</button>
      </div>
      <div class="weather-info-area">
        <h2
          v-if="isWeatherDataExist && localInfo"
          class="weather-info-area-title"
        >
          City:{{ localInfo.title }}
        </h2>
        <div
          v-if="isWeatherDataExist && localInfo"
          class="weather-list container"
        >
          <div class="row">
            <Day v-for="day in weatherData" :key="day.id" :day="day" />
          </div>
          <div class="bar-area">
            <table id="q-graph">
              <tbody>
                <tr
                  v-for="(day, index) in weatherData"
                  :id="`q${index + 1}`"
                  :key="day.id"
                  class="qtr"
                >
                  <th scope="row">{{ day.applicable_date }}</th>
                  <td
                    class="max-temp bar"
                    :style="`height: ${
                      Math.abs(day.max_temp - minBarNum) * 4
                    }px`"
                  >
                    <p>{{ day.max_temp.toFixed(1) }}°C</p>
                  </td>
                  <td
                    class="min-temp bar"
                    :style="`height: ${
                      Math.abs(day.min_temp - minBarNum) * 4
                    }px`"
                  >
                    <p>{{ day.min_temp.toFixed(1) }}°C</p>
                  </td>
                </tr>
              </tbody>

              <div class="bar-explain">
                <div>
                  <div class="max-temp"></div>
                  Max temperature
                </div>
                <div class="mt-2">
                  <div class="min-temp"></div>
                  Min temperature
                </div>
              </div>
            </table>

            <div id="ticks">
              <div v-for="n in 6" :key="n" class="tick" style="height: 40px">
                <p>{{ minBarNum + (6 - n) * 10 }}°C</p>
              </div>
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
    minTempArray() {
      const arr = this.weatherData.map(item => item.min_temp);
      return arr;
    },
    maxTempArray() {
      const arr = this.weatherData.map(item => item.max_temp);
      return arr;
    },
    minValue() {
      return Math.min(...this.minTempArray);
    },
    maxValue() {
      return Math.max(...this.maxTempArray);
    },
    minBarNum() {
      if (this.minValue > 0) {
        const remain = this.minValue % 10;
        return this.minValue - remain;
      } else {
        const absolute = Math.abs(this.minValue);
        const remain = absolute % 10;
        return 0 - (absolute - remain + 10);
      }
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
