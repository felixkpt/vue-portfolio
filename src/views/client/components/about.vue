<template>
    <el-row class="about-section_inner card" v-if="about">
        <el-col>
            <h3 v-if="Object.keys(about).length > 0" class="uppercase mb-1">{{ `${about.salutation ? about.salutation + '. ' : ''}${about.name}` }}</h3>
            <h4 class="slogan">{{ about.slogan }}</h4>
        </el-col>
        <el-col :span="16">
            <p class="content_short" v-html="about.content_short"></p>
        </el-col>
        <el-col :span="8">
            <div class="about-logo"><img :src="about.featured_image" :alt="about.name"></div>
        </el-col>
    </el-row>
</template>
<script>
import { getElement, getElements } from 'dropzone'

export default ({
    name: 'AboutComponent',
    props: {
        about: {
            Object
        }
    },
    data() {
        return {
            data: {
                slogan: null,
                content_short: null,
                img: null,
            }
        }
    },
    mounted() {
        this.setElements()

        this.data.slogan.style = 'opacity:0;transform:translatex(-60%)'
        this.data.content_short.style = 'opacity:0.4;transform:translatey(120%)'
        this.data.img.style = 'opacity:0;transform:translatex(120%)'
    },
    watch: {
        about() {
            this.setElements()

            this.data.slogan.style = 'transition: all 3000ms ease;opacity:1;transform:translatex(0%)'
            this.data.content_short.style = 'transition: all 1600ms ease-out;opacity:1;transform:translatex(0%)'
            this.data.img.style = 'transition: all 2200ms ease-in;opacity:1;transform:translatey(0%)'
        }
    },
    methods: {
        setElements() {
            this.data.slogan = document.querySelector('.about-section_inner .slogan')
            this.data.content_short = document.querySelector('.about-section_inner .content_short')
            this.data.img = document.querySelector('.about-section_inner .about-logo')
        }
    }
})
</script>

<style lang="scss">
.about-section_inner {
    overflow: hidden;
    cursor: default;
    margin: auto 20px;
    padding: 5px 15px;
    border-radius: 7px;
    background: rgb(30 41 59 / 50%) !important;

    .content_short {
        padding-inline-end: 10px;
    }

    .slogan {
        margin: 14px 0;
    }
}
</style>