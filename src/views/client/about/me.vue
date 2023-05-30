<template>
  <div class="app-container">
    <div class="mb-2" id="about-section">
      <About :about="getAbout" />
      <div style="margin-top: 2rem;">
        <el-row>
          <el-col v-if="Object.keys(getAbout).length > 0" :span="24">
            <p v-html="about.content"></p>
          </el-col>
          <el-col v-else :span="24">
            <content-placeholders v-for="indx in [1, 2, 3]" :key="indx" :animated="true" :rounded="true">
              <el-row class="mb-2">
                <el-col :span="24">
                  <content-placeholders-text :lines="5" />
                </el-col>
              </el-row>
            </content-placeholders>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import { get } from '@/api/client/about'
import About from '../components/about.vue';

export default {
  name: "AboutMe",
  data() {
    return {
      about: {},
      total: 0,
      aboutLoading: true,
      aboutQuery: {
        page: 1,
        per_page: 5
      }
    };
  },
  created() {
    this.fetchAbout();
  },
  methods: {
    async fetchAbout() {
      const res = await get();
      this.about = res.data;
    },
  },
  computed: {
    getAbout() {
      return this.about;
    }
  },
  components: { About }
}
</script>
