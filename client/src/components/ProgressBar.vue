<template>
  <div id="progress-bar" class="col-7" style="height: 80vh;">

    <!-- vertical progress bar -->
    <!-- <div class="center">PROGRESS BAR</div> -->
    <div class="progress">
      <ul>
        <li class="current">1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
        <li>7</li>
      </ul>
    </div>
    <!-- <div class="col d-flex justify-content-start">
              <div class="progress" style="height: 20px;">
                <div class="progress-bar bg-secondary" role="progressbar" style="width: 25%;" aria-valuenow="50"
                  aria-valuemin="0" aria-valuemax="2000"></div>
              </div>
            </div> -->

  </div>
</template>

<script>
  export default {
    name: "ProgressBar",
    props: [],
    data() {
      return {}
    },
    computed: {},
    methods: {},
    components: {}
  }
</script>
<style>
  /* progress bar */
  body {
    background-color: #f8f8f8;
    font-family: "Helvetica Neue", Arial, Helvetica, Geneva, sans-serif;
  }

  /* 
  * {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  } */

  .center {
    color: #d6d6d6;
    /* text-align: center; */
    margin-top: 50px;
  }

  /* =================== */
  /* PROGRESS BAR STYLES */
  /* =================== */
  #progress-bar {
    background-color: none !important;
  }

  .progress {
    width: 100%;
    max-width: 800px;
    margin: 30px auto 0;
    display: table;
    position: relative;
    text-align: center;
    left: 4%;
    -webkit-transform: rotate(-90deg);
    /* Chrome, Safari, Opera */
    transform: rotate(-90deg);
    /* transform-origin: bottom left; */
    overflow: visible;
    padding-left: -50px;
  }

  .progress ul {
    display: table-row;
  }


  .progress ul li {
    background-color: #d6d6d6;
    /* Default Bar Color */
    display: table-cell;
    position: relative;
    line-height: 20px;
    z-index: -3;
    color: #FFF;
    text-align: left;
    transition: background-color 0.75s, color 0.5s;
  }

  .progress ul li::before {
    content: '';
    width: 40px;
    height: 40px;
    color: #FFF;
    line-height: 30px;
    text-align: center;
    left: -15px;
    background-color: #d6d6d6;
    /* Default Circle Color */
    border: solid 5px #d6d6d6;
    /* Default Circle Color */
    /* index: -9; */
    position: absolute;
    display: block;
    top: -10px;
    margin-right: auto;
    margin-left: auto;
    z-index: -1;

    transition: background-color 0.75s, color 0.5s;


    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;

    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
  }

  /* CURRENT STEP */
  .progress ul li.current {
    display: inline-block;
    width: 100%;
    z-index: -3;
    color: #0e90d2;
    position: relative;
    transition: background-color 0.75s, color 0.5s;

  }

  .progress ul li.current::before {
    border: solid 5px #0e90d2;
    /* Current Step Circle Color */
    background-color: #FFF;
    transition: background-color 0.75s, color 0.5s;

    -webkit-animation: pulse 3s ease-out;
    -moz-animation: pulse 3s ease-out;
    animation: pulse 3s ease-out;
    -webkit-animation-iteration-count: infinite;
    -moz-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
  }

  /* COMPLETED STEPS */
  .progress ul li.complete {
    background-color: #0e90d2;
    /* Completed Step Bar Color */
    transition: background-color 0.75s, color 0.5s;
  }

  .progress ul li.complete::before {
    background-color: #0e90d2;
    /* Completed Step Circle Color */
    border: 5px solid transparent;
    transition: background-color 0.75s, color 0.5s;
  }

  /* REMOVE FIRST STEP COLOR BAR LINE */
  .progress ul li:last-of-type {
    background-color: transparent;
  }

  .progress ul li.current:last-of-type,
  .progress ul li.complete:last-of-type {
    background-color: transparent;
  }

  /* 
  @-webkit-keyframes pulse {
    0% {
      -webkit-transform: scale(1, 1);
    }

    50% {
      -webkit-transform: scale(1.1, 1.1);
    }

    100% {
      -webkit-transform: scale(1, 1);
    }
  }

  @-keyframes pulse {
    0% {
      transform: scale(1, 1);
    }

    50% {
      transform: scale(1.1, 1.1);
    }

    100% {
      transform: scale(1, 1);
    } */
  /* } */
</style>