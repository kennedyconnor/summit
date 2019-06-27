<template>
  <div class="p-bar">
    <h1>Progress Bar</h1>
    <div class="progress vertical">
      <div class="progress-bar" role="progressbar" :style="{height: value+'%'}"></div>
      <span class="climber" data-toggle="tooltip" data-placement="left" :title='value'></span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ProgressBar",
    props: [],
    mounted() {
      $('[data-toggle="tooltip"]').tooltip({ trigger: 'manual' }).tooltip('show')
    },
    data() {
      return {
        value: 55
      }
    },
    computed: {},
    methods: {},
    components: {}
  }
</script>

<style scoped>
  .progress {
    transform: scaleY(-1);
    overflow: visible;
    background-color: #b2d1db85;
    /* background-color: transparent; */
    /* bg-transparent makes bar see-through for stacking multiple users on top of each other when making teams*/
  }

  .progress-bar {
    background-color: #346575;
    /* background-color: transparent; */
    /* bg-transparent makes bar see-through for stacking multiple users on top of each other when making teams*/

  }

  .tooltip {
    position: relative;
    float: right;
  }

  .tooltip>.tooltip-inner {
    background-color: pink !important;
    padding: 5px 15px;
  }

  .climber+.tooltip>.tooltip-arrow {
    /* styling for arrow here */
  }
</style>