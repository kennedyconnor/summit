<template>
  <div class="p-bar">
    <h1>Progress Bar</h1>
    <div class="progress vertical" id="pbar">
      <div class="progress-bar" role="progressbar" :style="{height: userProgress+'%'}"></div>
      <span class="climber" data-toggle="tooltip" data-placement="left" :title="userProgress+'%'"></span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ProgressBar",
    props: [],
    mounted() {
      $('[data-toggle="tooltip"]')
        .tooltip({ trigger: 'manual' })
        .tooltip('show')


      //where floating tooltip comes from tooltip.show
    },
    beforeDestroy() {
      $('[data-toggle="tooltip"]').tooltip('dispose');
    },
    data() {
      return {
        // value: 0.75
      }
    },
    computed: {
      userProgress() {
        let value = Math.floor(this.$store.state.user.points / this.$store.state.summitThreshold * 100)
        $('[data-toggle="tooltip"]')
          // .tooltip({ trigger: 'manual' })
          // .tooltip('show')
          .attr('data-original-title', value + '%')
          // .tooltip('fixTitle')
          .tooltip('show')
        if (value >= 100) {
          value = 100;
        }
        return value
      }
    },
    // methods: {},
    // components: {},
  }
</script>

<style>
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
    background-color: pink;
    padding: 5px 15px;
  }

  /* 
  .climber+.tooltip>.tooltip-arrow {
    styling for arrow here
  } */
</style>