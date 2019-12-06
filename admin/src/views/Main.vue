<template>
  <div class="index">
    <headNav></headNav>
    <leftMenu></leftMenu>
    <div class="rightContainer"
         ref="rightContainer">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import HeadNav from "../components/HeadNav";
import LeftMenu from "../components/LeftMenu";
import { mapGetters } from 'vuex'
export default {
  name: 'index',
  computed: {
    ...mapGetters([
      'collapse'
    ])
  },
  watch: {
    collapse (newV) {
      if (newV) {
        this.$refs.rightContainer.style.left = 40 + 'px'
        // eslint-disable-next-line no-undef
        this.$refs.rightContainer.style.width = (window.innerWidth - 40) + 'px'
      } else {
        this.$refs.rightContainer.style.left = 180 + 'px'
        // eslint-disable-next-line no-undef
        this.$refs.rightContainer.style.width = (window.innerWidth - 180) + 'px'
      }

    }
  },
  components: {
    HeadNav,
    LeftMenu
  }
};
</script>

<style lang="scss" scoped>
.index {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.rightContainer {
  position: relative;
  top: 0;
  left: 180px;
  width: calc(100% - 180px);
  height: calc(100% - 71px);
  overflow: auto;
  z-index: 200;
}
</style>