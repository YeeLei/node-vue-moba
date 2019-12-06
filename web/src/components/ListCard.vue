<template>
  <m-card :icon="icon"
          :title="title">
    <div class="mt-2 mb-4"
         v-if="newHeroBanner">
      <a :href="newHeroBanner.url"
         class="new-hero">
        <img :src="newHeroBanner.image">
      </a>
    </div>
    <div class="nav jc-between px-2 fs-lg">
      <div class="nav-item"
           :class="{ active: currentIndex === index }"
           v-for="(category, index) in categories"
           :key="index"
           @click="$refs.list.swiper.slideTo(index)">
        <div class="nav-link">{{ category.name }}</div>
      </div>
    </div>
    <div class="mt-3"></div>
    <swiper ref="list"
            :options="swiperOption"
            @slide-change="() => (currentIndex = $refs.list.swiper.realIndex)">
      <swiper-slide v-for="(category, index) in categories"
                    :key="index">
        <slot name="items"
              :category="category"> </slot>
      </swiper-slide>
    </swiper>
  </m-card>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    categories: {
      type: Array,
      required: true
    },
    showHero: {
      type: Boolean,
      default: false
    },
    newHeroBanner: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      currentIndex: 0,
      swiperOption: {
        autoHeight: true
      }
    }
  }
}
</script>

<style lang="scss">
.new-hero {
  display: block;
  img {
    width: 100%;
  }
}
.nav {
  line-height: 25px;
}
</style>
