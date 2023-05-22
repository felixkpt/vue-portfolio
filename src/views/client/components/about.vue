<template>
    <el-row class="about-section" v-if="about">
        <el-col>
            <h3 class="uppercase">{{ about.title }}</h3>
            <h4 class="slogan">{{ about.slogan }}</h4>
        </el-col>
        <el-col :span="16">
            <p class="content_short" v-html="about.content_short"></p>
        </el-col>
        <el-col :span="8">
            <div class="about-logo"><img :src="about.featured_image" :alt="about.title"></div>
        </el-col>
    </el-row>
</template>
<script>
export default ({
    name: 'AboutComponent',
    props: {
        about: {
            Object
        }
    },
    mounted() {
        const slogan = document.querySelector('.about-section .slogan')
        slogan.style = 'opacity:0;transform:translatex(-30%)'
        const content_short = document.querySelector('.about-section .content_short')
        content_short.style = 'opacity:0.4;transform:translatey(10%)'
        const img = document.querySelector('.about-section .about-logo')
        img.style = 'opacity:0;transform:translatex(120%)'
    },
    watch: {
        about() {

            const slogan = document.querySelector('.about-section .slogan')
            slogan.style = 'transition: all 1200ms ease;opacity:1;transform:translatex(0%)'
            const content_short = document.querySelector('.about-section .content_short')
            content_short.style = 'transition: all 500ms ease-in;opacity:1;transform:translatex(0%)'
            const img = document.querySelector('.about-section .about-logo')
            img.style = 'transition: all 900ms ease-in;opacity:1;transform:translatey(0%)'
        }
    }
})
</script>