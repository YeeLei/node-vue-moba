<template>
  <div class="page-article"
       v-if="model">
    <!-- <div class="d-flex py-3 px-2 border-bottom">
      <div class="iconfont icon-back text-blue"
           @click="back"></div>
      <strong class="flex-1 text-blue pl-2 text-ellipsis">{{model.title}}</strong>
      <div class="text-grey">2019-11-12</div>
    </div> -->
    <div v-html="model.body"
         class="fs-xl box">
    </div>
    <div class="px-3 py-3 mt-3">
      <div class="d-flex ai-center about">
        <h2 class="text-blue fs-xl text-ellipsis ml-1">猜您喜欢</h2>
      </div>
      <div class="pt-2 about-news">
        <router-link class="py-1 d-flex ai-center"
                     tag="div"
                     :to="`/picvideos/${item._id}`"
                     v-for="item in model.related"
                     :key="item._id">
          <span class="flex-1 text-ellipsis fs-lg">{{item.title}}</span>
          <span class="text-grey">{{item.createdAt | date}}</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  props: {
    id: {
      required: true
    }
  },
  data () {
    return {
      model: null
    }
  },
  created () {
    this.fetch()
  },
  methods: {
    back () {
      this.$router.back()
    },
    async fetch () {
      const res = await this.$http.get(`picvideos/${this.id}`)
      this.model = res.data
    }
  },
  watch: {
    id () {
      this.fetch()
    }
  },
  filters: {
    // 格式化时间
    date (val) {
      return dayjs(val).format('YYYY-MM-DD')
    }
  }
}
</script>

<style lang="scss">
.page-article {
  .iconfont {
    font-size: 1.6923rem;
  }
  .box {
    img {
      max-width: 100%;
      height: auto;
    }
    iframe {
      width: 100%;
      height: 230px;
    }
  }
  .about {
    height: 2.6667rem;
    h2 {
      background: url('../assets/images/lin.png') left center no-repeat;
      padding-left: 8%;
      font-weight: bold;
      display: inline-block;
      height: 2.6667rem;
      line-height: 2.6667rem;
      width: 73%;
    }
  }
  .about-news {
    line-height: 20px;
  }
}
</style>
