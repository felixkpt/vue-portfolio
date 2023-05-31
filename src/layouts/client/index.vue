<template>
  <div id="clientLayout" :class="classObj" class="app-wrapper">
    <div v-if="device === 'mobile' && sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar class="sidebar-container" />
    <div :class="{ hasTagsView: needTagsView }" class="main-container">
      <div :class="{ 'fixed-header': fixedHeader }">
        <navbar />
        <tags-view v-if="needTagsView" />
      </div>
      <app-main />
    </div>
  </div>
</template>

<script>
import { AppMain, Navbar, Settings, Sidebar, TagsView } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { mapState } from 'vuex'

export default {
  name: 'ClientLayout',
  components: {
    AppMain,
    Navbar,
    Settings,
    Sidebar,
    TagsView
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      showSettings: state => state.settings.showSettings,
      needTagsView: state => state.settings.tagsViewPublic,
      fixedHeader: state => state.settings.fixedHeader
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="scss">
@import "~@/styles/mixin.scss";
@import "~@/styles/client/variables.scss";

@import '~@/styles/client/index.scss'; // global css

#clientLayout {

  &.app-wrapper {
    @include clearfix;
    position: relative;
    min-height: 100%;
    width: 100%;
    background: #0f172afc;
    color: #d6d9dc;

    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
  }

  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }

  :root {
    --shadow-color: transparent;
    --shadow: inset 0 -1px 2px 0 rgba(148, 163, 184, .1);
    --shadow-colored: inset 0 -1px 2px 0 var(--shadow-color);
    --ring-shadow: 0 0 #0000;
    --ring-color: rgba(59, 130, 246, .5);
    --ring-offset-shadow: 0 0 #0000;
  }

  .card {
    padding: 1rem;
    border-radius: 5px;
    background: transparent;
    box-shadow: var(--ring-offset-shadow, 0 0 #0000), var(--ring-shadow, 0 0 #0000), var(--shadow) !important;
    height: 100%;

    &:hover {
      background: rgba(30, 41, 59, .5) !important;
    }

    &:hover h3 {
      color: rgb(94 234 212);
    }

    &:hover .featured_image {
      transform: scale(1.01);
    }

    transition-property: color,
    background-color,
    border-color,
    text-decoration-color,
    fill,
    stroke,
    opacity,
    box-shadow,
    transform,
    filter,
    backdrop-filter;
    transition-timing-function: cubic-bezier(.4, 0, .2, 1);
    transition-duration: .15s;
  }

  .text-lightgray {
    color: rgb(100 116 139);
  }

  .text-gray {
    color: rgb(148 163 184);
  }

  .text-darkgray {
    color: rgb(82 97 116);
  }

  .cursor-pointer {
    cursor: pointer;
  }

  .cursor-default {
    cursor: default;
  }

  .uppercase {
    text-transform: uppercase;
  }

  .flex {
    display: flex;
  }

  .wrap {
    flex-wrap: wrap;
  }

  .justify-between {
    justify-content: space-between;
  }

  .w-100 {
    width: 100%;
  }

  .align-center {
    align-items: center;
  }

  .gap-1 {
    gap: 1rem;
  }

  .gap-2 {
    gap: 2rem;
  }

  .skills {
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      padding: 3px 5px;
      border-radius: 7px;
      border: solid 1px #4b635f;
      color: #5eead4;
      background: rgb(114 117 125 / 30%);
    }
  }

  .company_logo {
    width: 4rem;
    height: 3rem;
    border-radius: 5px;
    background-color: rgb(114 117 125 / 30%);
    transition: transform .15s ease-in-out;

    img {
      width: 4rem;
      height: 3rem;
      border-radius: 5px;

    }
  }

  .featured_image {
    width: 100%;
    /* height: 14rem; */
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    background-color: rgb(114 117 125 / 30%);
    transition: transform .15s ease-in-out;
    overflow: hidden;

    img {
      width: 100%;
      height: auto;
      max-height: 260px;
      border-radius: 5px;
      background-size: cover;
    }

    @media screen and (max-width: 768px) {
      width: 70%;
      max-height: 200px;

      img {
        max-height: 100%;
      }
    }

    @media screen and (max-width: 476px) {
      width: 90%;
      max-height: 150px;

      img {
        max-height: 100%;
      }
    }
  }

  .mb-1 {
    margin-bottom: 0.5rem;
  }

  .mb-2 {
    margin-bottom: 1rem;
  }

  .mb-3 {
    margin-bottom: 1.5rem;
  }

  .mb-4 {
    margin-bottom: 2rem;
  }

  .items_categories {

    .list {
      margin-inline-start: 3rem;

      ul {
        margin: 0;
        padding: 0;
        list-style: none;

        li {
          cursor: default;
          padding: 4px 0;
          display: flex;
          gap: 5px;
        }
      }
    }

    .before {
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      background: #ccc;
      box-sizing: border-box;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
  }

  .vue-content-placeholders-heading__img,
  .vue-content-placeholders-heading__title,
  .vue-content-placeholders-heading__subtitle,
  .vue-content-placeholders-text__line {
    background: #94a3b8 !important;
  }

  .text-center {
    text-align: center;
  }

  @media screen and (min-width: 768px) {
    .text-left-md {
      text-align: left !important;
      ;
    }

  }

  .pagination-container {
    background: none;
  }

  .transition-link {
    cursor: pointer;
    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
    transition-timing-function: cubic-bezier(0.12, 0.97, 0.88, 0.35);
    transition-duration: .32s;

    i {
      display: inline-block;
    }

    &:hover {
      i {
        transform: translateX(0.2rem);
      }
    }

    &.hover-color {
      &:hover {
        color: #5eead4;
      }
    }
  }

  .transition-link-ext {
    cursor: pointer;
    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
    transition-timing-function: cubic-bezier(0.12, 0.97, 0.88, 0.35);
    transition-duration: .32s;

    i {
      display: inline-block;
    }

    &:hover {
      i {
        transform: translate(.1rem, -.1rem);
      }
    }

    &.hover-color {
      &:hover {
        color: #5eead4;
      }
    }
  }
}
</style>
