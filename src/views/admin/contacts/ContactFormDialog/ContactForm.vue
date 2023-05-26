<template>
  <el-form :model='data' ref='form'>
    <el-form-item label="Type" prop="type">
      <el-input v-model="data.type" name="type"></el-input>
    </el-form-item>
    <el-form-item label="Link" prop="link">
      <el-input v-model="data.link" name="link"></el-input>
    </el-form-item>
    <el-form-item label="Logo" prop="logo" style="margin-bottom: 30px;">
      <Upload v-model="data.logo" />
      <input type="hidden" name="logo">
    </el-form-item>

    <el-form-item label-width="130px" label="Importance:" class="postInfo-container-item">
      <el-rate v-model="data.importance" :max="10" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :low-threshold="1"
        :high-threshold="3" style="display:inline-block" />
    </el-form-item>

  </el-form>
</template>

<script>

import Upload from '@/components/Upload/SingleImage3'

export default {
  props: {
    inStateOne: Boolean,
  },
  data() {
    return {
      data: {},
    }
  },
  computed: {
    defaultData() {
      return {
        type: '',
        link: '',
        logo: '',
        importance: 0
      }
    },
    startDate: {
      // set and get is useful when the data
      // returned by the back end api is different from the front end
      // back end return => "2013-06-25 06:59:25"
      // front end need timestamp => 1372114765000
      get() {
        return (+new Date(this.data.start_date))
      },
      set(val) {
        this.data.start_date = new Date(val)
      }
    },
    endDate: {
      // set and get is useful when the data
      // returned by the back end api is different from the front end
      // back end return => "2013-06-25 06:59:25"
      // front end need timestamp => 1372114765000
      get() {
        return (+new Date(this.data.end_date))
      },
      set(val) {
        this.data.end_date = new Date(val)
      }
    }
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
    }
  },
  components: {
    Upload
  }
}
</script>
