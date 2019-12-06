<template>
  <div>
    <!-- 轮播图 -->
    <swiper :options="swiperOption"
            v-if="banners.length">
      <swiper-slide v-for="(banner, index) in banners"
                    :key="index">
        <a :href="banner.url">
          <img class="w-100"
               :src="banner.image" />
        </a>
      </swiper-slide>
      <div class="swiper-pagination pagination-home text-right px-3 pb-1"
           slot="pagination"></div>
    </swiper>
    <!-- 图标导航 -->
    <div class="nav-icons bg-white mt-3">
      <div class="d-flex flex-wrap text-center">
        <a class="nav-item mb-3 mt-3 text-dark"
           v-for="n in sprite"
           :key="n.name"
           :href="n.link">
          <i class="sprite"
             :class="n.icon"></i>
          <div class="py-2">{{ n.name }}</div>
        </a>
      </div>
      <div class="bg-light py-2 fs-sm text-center"
           @click="handleSprite">
        <i class="sprite mr-1"
           :class="getIcon"></i>
        <span>收起</span>
      </div>
    </div>
    <!-- 新闻资讯 -->
    <m-list-card icon="menu"
                 title="新闻资讯"
                 :categories="newsCats">
      <template #items="{category}">
        <router-link :to="`/articles/${news._id}`"
                     v-for="(news, index) in category.newsList.slice(0, 5)"
                     :key="index"
                     tag="a"
                     class="py-2 fs-xl d-flex">
          <span class="text-info1">[{{ news.categoryName }}]</span>
          <span class="px-1">|</span>
          <span class="flex-1 text-ellipsis">{{ news.title }}</span>
          <span class="text-grey fs-sm">{{ news.createdAt | date }}</span>
        </router-link>
      </template>
    </m-list-card>
    <!-- 英雄列表 -->
    <m-list-card icon="card-hero"
                 title="英雄列表"
                 :categories="heroCats"
                 :newHeroBanner="newHeroBanner[0]">
      <template #items="{category}">
        <div class="d-flex flex-wrap"
             style="margin: 0 -0.5rem;flex-wrap: wrap;">
          <router-link tag="div"
                       :to="`/heroes/${hero._id}`"
                       class="p-2 text-center"
                       style="width: 20%;"
                       v-for="(hero, index) in category.heroList"
                       :key="index">
            <img :src="hero.avatar"
                 class="w-100" />
            <div>{{ hero.name }}</div>
          </router-link>
        </div>
      </template>
    </m-list-card>
    <!-- 精彩视频 -->
    <m-list-card icon="video"
                 title="精彩视频"
                 :categories="videoNewsCats">
      <template #items="{category}">
        <ul class="w-100 strategy_list">
          <router-link :to="`/picvideos/${videonews._id}`"
                       v-for="(videonews, index) in category.videoNewsList.slice(0, 4)"
                       :key="index"
                       tag="li"
                       class="pic-news mb-4">
            <div class="pic"><img v-lazy="videonews.pic" /></div>
            <div class="pic-desc py-1">
              <div class="title fs-xl mt-1">
                {{ videonews.title }}
              </div>
              <span class="desc mt-2 fs-sm text-grey-2">
                {{ videonews.title }}
              </span>
              <span class="time mt-2 fs-xs text-grey-3">
                {{ videonews.createdAt | date }}
              </span>
            </div>
            <div class="line"></div>
          </router-link>
        </ul>
      </template>
    </m-list-card>
    <!-- 图文攻略 -->
    <m-list-card icon="tuwen"
                 title="图文攻略"
                 :categories="picNewsCats">
      <template #items="{category}">
        <ul class="w-100 strategy_list">
          <router-link :to="`/picarticles/${picnews._id}`"
                       v-for="(picnews, index) in category.picNewsList.slice(0, 8)"
                       :key="index"
                       tag="li"
                       class="pic-news mb-4">
            <div class="pic"><img v-lazy="picnews.pic" /></div>
            <div class="pic-desc py-1">
              <div class="title fs-xl mt-1">
                {{ picnews.title }}
              </div>
              <span class="desc mt-2 fs-sm text-grey-2">
                {{ picnews.title }}
              </span>
              <span class="time mt-2 fs-xs text-grey-3">
                {{ picnews.createdAt | date }}
              </span>
            </div>
            <div class="line"></div>
          </router-link>
        </ul>
      </template>
    </m-list-card>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  data () {
    return {
      sprite: [
        {
          name: '爆料站',
          icon: 'sprite-news',
          link: 'https://pvp.qq.com/m/m201706/coming/index.htm'
        },
        {
          name: '故事站',
          icon: 'sprite-story',
          link: 'https://pvp.qq.com/story201904/index.html#/index'
        },
        {
          name: '周边商城',
          icon: 'sprite-store',
          link: 'http://pvp.qq.com/mall/m/?biz=yxzj#/'
        },
        {
          name: '体验服',
          icon: 'sprite-quick',
          link: 'https://pvp.qq.com/cp/a20161116tyf/page01.htm'
        },
        {
          name: '新人专区',
          icon: 'sprite-people',
          link: 'https://pvp.qq.com/m/m201606/goCenter.shtml'
        },
        {
          name: '荣耀·传承',
          icon: 'sprite-inherit',
          link: 'https://pvp.qq.com/cp/a20181130culture/index.html'
        },
        {
          name: '模拟战资料库',
          icon: 'sprite-imitate',
          link: 'https://pvp.qq.com/m/wzmnzm/index.html'
        },
        {
          name: '王者营地',
          icon: 'sprite-camp',
          link:
            'https://image.ttwz.qq.com/wzry/wzryzs_download_4001.htm?ADTAG=mpvp.qq.com'
        },
        {
          name: '公众号',
          icon: 'sprite-public',
          link:
            'https://game.weixin.qq.com/cgi-bin/comm/openlink?noticeid=90102708&appid=wx95a3a4d7c627e07d&url=https%3A%2F%2Fgame.weixin.qq.com%2Fcgi-bin%2Fh5%2Fstatic%2Fsubscribe%2Findex.html%3Fappid%3Dwx95a3a4d7c627e07d#wechat_redirect'
        },
        {
          name: '版本介绍',
          icon: 'sprite-edition',
          link: 'https://pvp.qq.com/cp/a20190320bbgxsmm/index.html'
        },
        {
          name: '对局环境',
          icon: 'sprite-station',
          link: 'https://pvp.qq.com/cp/a20190917station/index.html'
        },
        {
          name: '无限王者团',
          icon: 'sprite-boundlessp',
          link: 'https://pvp.qq.com/cp/a20190827boundlessp/index.html'
        }
      ],
      sprite1: [],
      swiperOption: {
        pagination: {
          el: '.pagination-home'
        },
        autoplay: {
          stopOnLastSlide: true,
          disableOnInteraction: false
        },
        loop: true
      },
      banners: [],
      newHeroBanner: {},
      newsCats: [],
      heroCats: [],
      picNewsCats: [],
      videoNewsCats: []
    }
  },
  created () {
    // 获取首页轮播图数据
    this.fetchBanners()
    // 获取首页最新英雄数据
    this.fetchNewHeroBanner()
    // 获取首页新闻资讯数据
    this.fetchNewsCats()
    // 获取首页英雄列表数据
    this.fetchHeroCats()
    // 获取首页图文攻略数据
    this.fetchPicNewsCats()
    // 获取首页精彩视频数据
    this.fetchPicVideoCats()
  },
  mounted () {
    this.sprite1 = this.sprite.slice()
  },
  computed: {
    getIcon () {
      if (this.sprite.length === 4) {
        return 'sprite-arrow-up'
      } else {
        return 'sprite-arrow-down'
      }
    }
  },
  methods: {
    handleSprite () {
      if (this.sprite.length === 4) {
        this.sprite = this.sprite1
      } else {
        this.sprite = this.sprite.slice(0, 4)
      }
    },
    async fetchBanners () {
      // 请求首页轮播图数据
      const res = await this.$http.get('/banners/list')
      this.banners = res.data[0].items
    },
    async fetchNewHeroBanner () {
      // 请求首页最新英雄数据
      const res = await this.$http.get('/newHero')
      this.newHeroBanner = res.data[0].items
    },
    async fetchNewsCats () {
      // 请求新闻资讯数据
      const res = await this.$http.get('news/list')
      this.newsCats = res.data
    },
    async fetchHeroCats () {
      // 请求英雄列表数据
      const res = await this.$http.get('heroes/list')
      this.heroCats = res.data
    },
    async fetchPicNewsCats () {
      // 请求图文攻略数据
      const res = await this.$http.get('picarticles/list')
      this.picNewsCats = res.data
    },
    async fetchPicVideoCats () {
      // 请求视频攻略数据
      const res = await this.$http.get('picvideos/list')
      this.videoNewsCats = res.data
    }

  },
  filters: {
    // 格式化时间
    date (val) {
      return dayjs(val).format('MM/DD')
    }
  }
}
</script>

<style lang="scss">
@import '../assets/scss/variables';
.pagination-home {
  .swiper-pagination-bullet {
    opacity: 1;
    border-radius: 0.1538rem;
    width: 0.6rem;
    height: 0.6rem;
    background: map-get($colors, 'white');
    &.swiper-pagination-bullet-active {
      background: map-get($colors, 'info');
    }
  }
}
.nav-icons {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  .nav-item {
    width: 25%;
    position: relative;
    border-left: 1px solid $border-color;
    &:nth-child(4n + 1) {
      border-left: none;
    }
  }
}
.card-header {
  height: 40px;
  line-height: 40px;
}
.strategy_list {
  .pic-news {
    position: relative;
    width: 100%;
    height: 7rem;
    .pic {
      display: inline-block;
      width: 33%;
      height: 7rem;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        border-radius: 0.3rem;
      }
    }
    .pic-desc {
      position: absolute;
      top: 0;
      display: inline-block;
      width: 58%;
      margin-left: 2%;
      height: 7rem;
      .title {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        height: 2rem;
      }
      .desc {
        height: 4rem;
        line-height: 1.5rem;
      }
      .time {
        position: absolute;
        left: 0;
        bottom: 0;
        height: 1rem;
      }
    }
    .line {
      content: '';
      position: absolute;
      bottom: -0.7rem;
      left: 0;
      width: 100%;
      height: 1px;
      background: #d4d9de;
      transform: scaleY(0.5);
    }
  }
}
</style>
