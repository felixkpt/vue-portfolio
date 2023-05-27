<template>
    <div class="about-section_inner card">
        <el-row v-if="Object.keys(about).length > 0">
            <el-col :span="24">
                <div class="grid">
                    <div class="grid-item title_sect">
                        <div class="text-center text-left-md">
                            <h3 class="uppercase mb-1">{{ `${about.salutation} ${about.name}` }}</h3>
                            <h4 class="slogan">{{ about.slogan }}</h4>
                        </div>
                    </div>
                    <div class="grid-item content_short_sect">
                        <p class="content_short" v-html="about.content_short"></p>
                    </div>
                    <div class="grid-item featured_image_sect">
                        <div class="about-logo"><img :src="about.featured_image" :alt="about.name"></div>
                    </div>
                </div>
            </el-col>
        </el-row>
        <el-row :gutters="12" v-else>
            <content-placeholders v-for="indx in [1]" :key="indx" :animated="true" :rounded="true">
                <el-row>
                    <el-col :span="24" class="mb-2">
                        <content-placeholders-heading />
                    </el-col>
                    <el-col :span="16">
                        <content-placeholders-text :lines="4" />
                    </el-col>
                    <el-col :span="8">
                        <div style="margin-inline-start: 2rem;">
                            <content-placeholders-img />
                        </div>
                    </el-col>
                </el-row>
            </content-placeholders>
        </el-row>
    </div>
</template>
<script>

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
        // this.setElements()

        if (!this.data.slogan) return

        // this.data.slogan.style = 'opacity:0;transform:translatex(-60%)'
        // this.data.content_short.style = 'opacity:0.4;transform:translatey(120%)'
        // this.data.img.style = 'opacity:0;transform:translatex(120%)'
    },
    watch: {
        about() {
            // this.setElements()

            // this.data.slogan.style = 'transition: all 3000ms ease;opacity:1;transform:translatex(0%)'
            // this.data.content_short.style = 'transition: all 1600ms ease-out;opacity:1;transform:translatex(0%)'
            // this.data.img.style = 'transition: all 2200ms ease-in;opacity:1;transform:translatey(0%)'
        }
    },
    methods: {
        setElements() {
            this.data.slogan = document.querySelector('.about-section_inner .slogan')
            this.data.content_short = document.querySelector('.about-section_inner .content_short')
            this.data.img = document.querySelector('.about-section_inner .about-logo .logo')
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

    @media all and (max-width: 768px) {
        margin: auto;
    }

    .slogan {
        margin: 14px 0;
    }

}
</style>

<style>
.title_sect {
    grid-area: title_sect;
}

.content_short_sect {
    grid-area: content_short_sect;
}

.featured_image_sect {
    grid-area: featured_image_sect;
}

.grid {
    display: grid;
    grid-template-areas:
        'title_sect featured_image_sect'
        'content_short_sect featured_image_sect';
}

.grid-item {
    margin: auto 0;
    padding: 0.3rem;
}

@media all and (max-width: 1024px) {
    .grid {
        grid-template-areas:
            'title_sect title_sect'
            'featured_image_sect content_short_sect';
        grid-template-columns: minmax(0, 1fr), minmax(0, 1fr);
        width: 100%;

    }
}

@media all and (max-width: 768px) {
    .grid {
        grid-template-areas:
            'title_sect'
            'featured_image_sect'
            'content_short_sect';
        grid-template-columns: minmax(0, 1fr);
        width: 100%;
    }
}
</style>