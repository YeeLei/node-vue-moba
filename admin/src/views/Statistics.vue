<template>
  <div class="statistics">
    <bread></bread>
    <div class="fillcontain">
      <div class="chars_container">

      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  mounted () {

  },
  methods: {

  }
};
</script>

<style lang="scss" scoped>
.statistics {
  width: 100%;
  height: 100%;
  font-size: 16px;
  box-sizing: border-box;
  background: #f0f2f5;
  .fillcontain {
    padding: 20px;
    box-sizing: border-box;
  }
  .table_container {
    padding: 10px;
    background: #fff;
    border-radius: 2px;
  }
}
</style>
