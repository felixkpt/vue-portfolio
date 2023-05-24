<template>
  <div class="sidebar-logo-container" :class="{ 'collapse': collapse }">
    <transition name="sidebarLogoFade">
      <router-link v-if="collapse" key="collapse" class="sidebar-logo-link collapse" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo">
        <div v-else>
          <h1 class="sidebar-title">{{ title }} </h1>
          <h4 class="sidebar-slogan">{{ slogan }} </h4>
        </div>
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <div class="logo-title">
          <img v-if="logo" :src="logo" class="sidebar-logo">
          <h1 class="sidebar-title">{{ title }} </h1>
        </div>
        <h4 class="sidebar-slogan">{{ slogan }} </h4>
      </router-link>
    </transition>
  </div>
</template>

<script>
import { get as getAbout } from '@/api/client/about'

export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      title: '',
      slogan: '',
      logo: ''
    }
  },
  computed: {
    getAbout() {
      return this.about
    },
  },
  created() {
    this.fetchAbout()
  },
  methods: {
    async fetchAbout() {
      const res = await getAbout()
      const about = res.data
      this.title = about.title
      this.slogan = about.slogan
      this.logo = about.featured_image
    },
  }

}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: max(30vh, 220px);
  /* background: #191b23; */
  text-align: center;
  overflow: hidden;
  border-bottom: 1px solid #1c273f;
  margin-block: 1rem;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    align-items: center;
    justify-content: center;
    text-align: center;

    .logo-title {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 5px;
      align-items: center;
      justify-content: center;

    }


    & .sidebar-logo {
      width: 4rem;
      height: 4rem;
      vertical-align: middle;
      border-radius: 50%;

    }

    &.collapse .sidebar-logo {
      width: 3rem;
      height: 3rem;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 40px;
      font-size: 14px;
    }
    & .sidebar-slogan {
      width: 70%;
      display: inline-block;
      margin: 0;
      color: #20ab95;
      line-height: 35px;
      font-size: 16px;
      font-style: italic;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
