<template>
  <div class="page-hero">
    <!-- 顶部菜单 -->
    <div class="topbar bg-black py-2 px-4 d-flex ai-center fs-lg">
      <img src="../assets/logo.png"
           height="30">
      <div class="px-3 flex-1">
        <span class="text-white">王者荣耀</span>
        <span class="ml-3 text-white">攻略站</span>
      </div>
      <router-link to="/"
                   tag="div"
                   class="text-white">
        更多英雄 &gt;
      </router-link>
    </div>
    <!-- top -->
    <div class="top"
         v-if="model"
         :style="{'background-image': `url(${model.banner})`}">
      <div class="info text-white p-4 h-100 d-flex flex-column jc-end">
        <div class="fs-sm title">{{model.title}}</div>
        <h2 class="my-2 text-bold name">{{model.name}}</h2>
        <div class="fs-sm mt-1 score"
             v-if="model">{{handleScore}}</div>
        <div class="d-flex jc-between pt-2">
          <div class="scores d-flex ai-center item"
               v-if="model.scores">
            <span>难度</span>
            <span class="badge bg-primary">{{model.scores.difficult}}</span>
            <span>技能</span>
            <span class="badge bg-blue-1">{{model.scores.skills}}</span>
            <span>攻击</span>
            <span class="badge bg-danger">{{model.scores.attack}}</span>
            <span>生存</span>
            <span class="badge bg-dark">{{model.scores.survive}}</span>
          </div>
          <router-link to="/"
                       tag="span"
                       class="text-grey fs-sm skin">皮肤: 2 &gt;</router-link>
        </div>
      </div>
    </div>
    <!-- end of top -->
    <div class="bg-white px-3">
      <div class="nav d-flex jc-around pt-3 pb-2 border-bottom">
        <div class="nav-item"
             :class="{'active': currentIndex === index}"
             v-for="(item,index) in switchItems"
             :key="index"
             @click="$refs.list.swiper.slideTo(index)">
          <div class="nav-link">{{item.name}}</div>
        </div>
      </div>
    </div>
    <swiper ref="swiper"
            :options="swiperOption"
            @slide-change="() => currentIndex = $refs.swiper.swiper.realIndex">
      <swiper-slide>
        <div class="p-3 bg-white border-bottom">
          <div class="d-flex">
            <router-link tag="button"
                         to="/"
                         class="btn btn-lg flex-1 play">
              <i class="iconfont icon-play"></i>
              英雄介绍视频
            </router-link>
            <router-link tag="button"
                         to="/"
                         class="btn btn-lg flex-1 ml-2">
              <i class="iconfont icon-photo"></i>
              一图识英雄
            </router-link>
          </div>
          <!-- skills -->
          <div class="skills bg-white mt-4">
            <div class="d-flex jc-around">
              <img class="icon"
                   @click="currentSkillIndex = i"
                   :class="{active: currentSkillIndex === i}"
                   :src="item.icon"
                   v-for="(item, i) in model.skills"
                   :key="item.name" />
            </div>
            <div v-if="currentSkill">
              <div class="d-flex pt-4 pb-3">
                <h3 class="m-0 text-dark-1 text-bold">{{currentSkill.name}}</h3>
                <span class="text-grey-1 ml-4">
                  (冷却值: {{currentSkill.delay}}
                  消耗: {{currentSkill.cost}})
                </span>
              </div>
              <p class="text-dark-1">{{currentSkill.description}}</p>
              <div class="border-bottom mt-3"></div>
              <p class="text-grey-1 py-2">小提示: {{currentSkill.tips}}</p>
            </div>
          </div>
        </div>
        <!-- 出装推荐 -->
        <m-card plain
                icon="chuzhuang"
                title="出装推荐"
                class="hero-items">
          <div class="fs-xl text-dark-1">顺风出装</div>
          <div class="d-flex jc-around text-center mt-3">
            <div v-for="item in model.items1"
                 :key="item.name">
              <img :src="item.icon"
                   class="icon">
              <div class="fs-sm text-dark-1 mt-1">{{item.name}}</div>
            </div>
          </div>
          <div class="border-bottom mt-3"></div>
          <div class="fs-xl mt-3 text-dark-1">逆风出装</div>
          <div class="d-flex jc-around text-center mt-3">
            <div v-for="item in model.items2"
                 :key="item.name">
              <img :src="item.icon"
                   class="icon">
              <div class="fs-sm text-dark-1 mt-1">{{item.name}}</div>
            </div>
          </div>
        </m-card>
        <!-- 使用技巧 -->
        <m-card plain
                icon="jiqiao"
                title="使用技巧">
          <p class="m-0 text-dark-1 fs-lg">{{model.usageTips}}</p>
        </m-card>
        <!-- 对抗技巧 -->
        <m-card plain
                icon="pk"
                title="对抗技巧">
          <p class="m-0 text-dark-1 fs-lg">{{model.battleTips}}</p>
        </m-card>
        <!-- 团战思路 -->
        <m-card plain
                icon="news"
                title="团战思路">
          <p class="m-0 text-dark-1 fs-lg">{{model.teamTips}}</p>
        </m-card>
        <!-- 英雄关系 -->
        <m-card plain
                icon="guanxi"
                title="英雄关系">
          <div class="fs-xl text-dark-1">最佳搭档</div>
          <div v-for="item in model.partners"
               :key="item.name"
               class="d-flex pt-3">
            <img :src="item.hero.avatar"
                 alt=""
                 height="60">
            <p class="flex-1 m-0 ml-3 text-dark-1 fs-lg">
              {{item.description}}
            </p>
          </div>
          <div class="border-bottom mt-3"></div>
          <div class="fs-xl mt-3 text-dark-1">被谁克制</div>
          <div v-for="item in model.badPartners"
               :key="item.name"
               class="d-flex pt-3">
            <img :src="item.hero.avatar"
                 alt=""
                 height="60">
            <p class="flex-1 m-0 ml-3 text-dark-1 fs-lg">
              {{item.description}}
            </p>
          </div>
          <div class="border-bottom mt-3"></div>
          <div class="fs-xl mt-3 text-dark-1">克制谁</div>
          <div v-for="item in model.restrains"
               :key="item.name"
               class="d-flex pt-3">
            <img :src="item.hero.avatar"
                 alt=""
                 height="60">
            <p class="flex-1 m-0 ml-3 text-dark-1 fs-lg">
              {{item.description}}
            </p>
          </div>
        </m-card>
      </swiper-slide>
      <swiper-slide>
        <div class="no-result"
             style="width:100%;height:50vh;">暂无攻略！</div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      required: true
    }
  },
  data () {
    return {
      model: {},
      currentIndex: 0,
      currentSkillIndex: 0,
      currentSkill: {},
      swiperOption: {
        autoHeight: true
      },
      switchItems: [
        {
          name: '英雄初识'
        },
        {
          name: '进阶攻略'
        }
      ]
    }
  },
  created () {
    this.fetch()
  },
  computed: {
    handleScore () {
      if (!this.model.categories) {
        return
      }
      return this.model.categories.map(v => v.name).join('/')
    }
  },
  methods: {
    async fetch () {
      const res = await this.$http.get(`heroes/${this.id}`)
      this.model = Object.assign({}, this.model, res.data)
      this.currentSkill = this.model.skills[this.currentSkillIndex];
    }
  },
  watch: {
    currentSkillIndex (newIndex) {
      this.currentSkill = this.model.skills[newIndex]
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/scss/variables.scss';
.page-hero {
  position: static;
  width: 100%;
  height: auto;
  overflow-x: hidden;
  .topbar {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 999;
  }
  .top {
    height: 50vw;
    background: #fff no-repeat top center;
    background-size: auto 100%;
    margin-top: 3.125rem;
  }
  .info {
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
    .scores {
      .badge {
        margin: 0 0.25rem;
        display: inline-block;
        width: 1rem;
        height: 1rem;
        line-height: 0.9rem;
        text-align: center;
        border-radius: 50%;
        font-size: 0.6rem;
        border: 1px solid rgba(255, 255, 255, 0.2);
      }
    }
  }
  .skills {
    img.icon {
      width: 70px;
      height: 70px;
      border: 3px solid map-get($colors, 'white');
      &.active {
        border-color: map-get($colors, 'primary');
      }
      border-radius: 50%;
    }
  }
  .hero-items {
    img.icon {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
  }
}
</style>
