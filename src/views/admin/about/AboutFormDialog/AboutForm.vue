<template>
  <el-form :model='data' ref='form'>
    <el-form-item label="Title" prop="title">
      <el-input v-model="data.title" name="title"></el-input>
    </el-form-item>
    <el-form-item style="margin-bottom: 40px;" label-width="70px" label="Summary:">
      <el-input name="content_short" v-model="data.content_short" :rows="1" type="textarea" class="post-textarea" autosize
        placeholder="Please enter the content" />
      <span v-show="contentShortLength" class="word-counter">{{ contentShortLength }}words</span>
    </el-form-item>

    <el-form-item prop="content">
      <Tinymce name="content" ref="editor" v-model="data.content" :height="400" />
    </el-form-item>

    <el-form-item prop="featured_image" style="margin-bottom: 30px;">
      <Upload v-model="data.featured_image" />
    </el-form-item>

  </el-form>
</template>

<script>

import Tinymce from '@/components/Tinymce'
import Upload from '@/components/Upload/SingleImage3'

export default {
  props: {
    inStateOne: Boolean,
  },
  data() {
    return {
      data: {},
      skillsList: [],
    }
  },
  computed: {
    defaultData() {
      return {
        title: '',
        content_short: '',
        content: '',
        featured_image: '',
      }
    },
    contentShortLength() {
      return this.data.content_short?.length
    },

  },
  methods: {
    _setData(data) {
      // console.log(data)
      this.data = {
        ...data,
      }
    },
    _getData() {
      return {
        ...this.data,
      }
    },

  },
  components: {
    Tinymce, Upload
  },
}
</script>
