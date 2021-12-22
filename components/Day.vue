<template>
  <div class="col-md-five">
    <img
      :src="`https://www.metaweather.com/static/img/weather/${weatherAbbr}.svg`"
      alt="天氣圖片"
    />
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
  },
};
</script>
