<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" :rules="{}" class="form-container">

      <sticky :z-index="10" :class-name="'sub-navbar ' + postForm.status">
        <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm">
          Publish
        </el-button>
        <el-button v-loading="loading" type="warning" @click="draftForm">
          Draft
        </el-button>
      </sticky>

      <div class="createPost-main-container">
        <el-row>
          <!-- <Warning /> -->

          <el-col :span="24">
            <el-form-item style="margin-bottom: 40px;" prop="title">
              <MDinput v-model="postForm.title" :maxlength="100" name="title" required>
                Title
              </MDinput>
            </el-form-item>

            <el-row align="middle" :gutter="15">
              <el-col :span="6" :xs="24">
                <el-row align="middle" type="flex" :gutter="5" class="text-disabled">
                  <el-col :span="24">
                    <el-form-item label="Company:" class="postInfo-container-item">
                      <el-select style="min-width: 160px;" v-model="postForm.company_id" name="company_id"
                        :remote-method="getCompaniesList" filterable default-first-option remote
                        placeholder="Search company">
                        <el-option v-for="item in companiesList" :key="item.id" :label="item.name"
                          :value="item.id" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12" :xs="24">
                <el-form-item label="Start date / End date:" class="postInfo-container-item">
                  <el-date-picker style="min-width: 130px;" name="start_date" v-model="startEndDate" type="monthrange"
                    range-separator="To" start-placeholder="Start date" end-placeholder="End date">
                  </el-date-picker>
                </el-form-item>
              </el-col>

              <el-col :span="6" :xs="24">
                <el-form-item label="Importance:" class="postInfo-container-item">
                  <el-rate style="min-width: 160px;display: inline-block;" v-model="postForm.importance" :max="5"
                    :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :low-threshold="1" :high-threshold="3" />
                </el-form-item>
              </el-col>
            </el-row>

          </el-col>
        </el-row>

        <el-form-item style="margin-bottom: 40px;" label-width="70px" label="Summary:">
          <el-input name="content_short" v-model="postForm.content_short" :rows="1" type="textarea" class="post-textarea"
            autosize placeholder="Please enter the content" />
          <span v-show="contentShortLength" class="word-counter">{{ contentShortLength }}words</span>
        </el-form-item>

        <el-form-item prop="content">
          <Tinymce name="content" ref="editor" v-model="postForm.content" :height="400" />
        </el-form-item>

        <el-form-item label="Skills" prop="skills">
          <el-select name="skills" style="width:100%" v-model="postForm.skills" multiple placeholder="Select">
            <el-option v-for="item in skillsList" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item prop="featured_image" style="margin-bottom: 30px;">
          <Upload v-model="postForm.featured_image" />
        </el-form-item>

        <el-form-item label="Project URL" prop="project_url">
          <el-input v-model="postForm.project_url" name="project_url"></el-input>
        </el-form-item>

        <el-form-item label="Github URL" prop="github_url">
          <el-input v-model="postForm.github_url" name="github_url"></el-input>
        </el-form-item>

      </div>
    </el-form>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import Upload from '@/components/Upload/SingleImage3'
import MDinput from '@/components/MDinput'
import Sticky from '@/components/Sticky' // 粘性header组件
import Warning from './Warning'
import { CommentDropdown, PlatformDropdown, SourceUrlDropdown } from './Dropdown'

import { create, get } from '@/api/admin/projects'
import { list as listCompanies } from '@/api/admin/companies'
import { list as listSkills } from '@/api/admin/skills'

const defaultForm = {
  status: 'draft',
  title: '', // 文章题目
  content: '', // 文章内容
  content_short: '', // 文章摘要
  source_uri: '', // 文章外链
  featured_image: undefined, // 文章图片
  start_date: undefined, // 前台展示时间
  end_date: undefined, // 前台展示时间
  id: undefined,
  platforms: ['a-platform'],
  comment_disabled: false,
  importance: 0,
  company_id: '',
  project_url: '',
  github_url: '',
  skills: [],
}

export default {
  name: 'PostDetail',
  components: { Tinymce, MDinput, Upload, Sticky, Warning, CommentDropdown, PlatformDropdown, SourceUrlDropdown },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      value1: '',
      postForm: Object.assign({}, defaultForm),
      loading: false,
      companiesList: [],
      tempRoute: {},
      skillsList: [],

    }
  },
  computed: {
    contentShortLength() {
      return this.postForm.content_short.length
    },
    startEndDate: {
      // set and get is useful when the data
      // returned by the back end api is different from the front end
      // back end return => "2013-06-25 06:59:25"
      // front end need timestamp => 1372114765000
      get() {
        return [this.postForm.start_date, this.postForm.end_date]
      },
      set(val) {
        this.postForm.start_date = val[0]
        this.postForm.end_date = val[1]
      }
    }
  },
  created() {
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(id)
    }

    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of the setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/issues/1221
    this.tempRoute = Object.assign({}, this.$route)

    this.getCompaniesList()
    this.getSkills()

  },
  methods: {
    fetchData(id) {
      get(id).then(response => {
        this.postForm = { ...response.data, skills: response.data.skills.map(itm => itm.id) }

        // set tagsview title
        this.setTagsViewTitle()

        // set page title
        this.setPageTitle()
      }).catch(err => {
        console.log(err)
      })
    },
    setTagsViewTitle() {
      const title = 'Edit Post'
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.postForm.id}` })
      this.$store.dispatch('tagsViewAdmin/updateVisitedView', route)
    },
    setPageTitle() {
      const title = 'Edit Post'
      document.title = `${title} - ${this.postForm.id}`
    },
    submitForm() {

      this.$refs.postForm.validate(async valid => {

        if (valid) {
          this.loading = true

          this.postForm.status = 'published'

          await create(this.postForm)

          this.$notify({
            title: 'Saving post',
            message: 'The post is being saved...',
            type: 'success',
            duration: 2000
          })

          this.loading = false

        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async draftForm() {
      if (this.postForm.content.length === 0 || this.postForm.title.length === 0) {
        this.$message({
          message: 'Content is required',
          type: 'warning'
        })
        return
      }

      this.postForm.status = 'draft'
      const resp = await create(this.postForm)

      this.$message({
        title: 'Saving post',
        message: 'The post is being saved as draft...',
        type: 'warning',
        showClose: true,
        duration: 1000
      })

    },
    getCompaniesList(query) {
      listCompanies({ all: 1, q: query }).then(res => {
        if (!res) return
        this.companiesList = res.map(v => ({ id: v.id, name: v.name }))
      })
    },
    async getSkills() {
      this.skillsList = await listSkills({ all: 1 })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";

.createPost-container {
  position: relative;

  .createPost-main-container {
    padding: 40px 45px 20px 50px;

    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;

      .postInfo-container-item {
        float: left;
      }
    }
  }

  .word-counter {
    width: 40px;
    position: absolute;
    right: 10px;
    top: 0px;
  }
}

.post-textarea ::v-deep {
  textarea {
    padding-right: 40px;
    resize: none;
    border: none;
    border-radius: 0px;
    border-bottom: 1px solid #bfcbd9;
  }
}
</style>
