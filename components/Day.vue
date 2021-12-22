<template>
  <div class="col-five day">
    <div class="date">
      {{ day.applicable_date }}
    </div>
    <img
      :src="`https://www.metaweather.com/static/img/weather/${weatherAbbr}.svg`"
      alt="天氣圖片"
    />
    <div class="chart-area">
      <figure class="pie-chart" v-bind="gradientStyle">
        <figcaption class="pie-chart-content">
          <p class="pie-chart-content-title">Humidity</p>
          <p class="pie-chart-content-num">{{ humidity }}%</p>
        </figcaption>
      </figure>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DayComponent',
  props: {
    day: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {};
  },
  computed: {
    weatherAbbr() {
      return this.day.weather_state_abbr;
    },
    humidity() {
      return this.day.humidity;
    },

    gradientStyle() {
      return {
        style: {
          background: `conic-gradient(#5d96f7 0% ${this.humidity}%, #aaaaaa 0% 100%)`,
        },
      };
    },
  },
};
</script>
