<template>
  <el-form :model='data' ref='form'>
    <el-form-item label="Name" prop="name">
      <el-input v-model="data.name" name="name"></el-input>
    </el-form-item>
    <el-form-item label="URL" prop="url">
      <el-input v-model="data.url" name="url"></el-input>
    </el-form-item>
    <el-form-item label="Logo" prop="logo" style="margin-bottom: 30px;">
      <Upload v-model="data.logo" />
      <input type="hidden" name="logo">
    </el-form-item>

    <el-form-item label="Position" prop="position">
      <el-input v-model="data.position" name="position"></el-input>
    </el-form-item>
    <el-form-item prop="roles">
      <template prepend>
        <strong>Roles</strong>
      </template>
      <Tinymce ref="editor" v-model="data.roles" :height="400" />
      <input type="hidden" name="roles">
    </el-form-item>

    <el-row type="flex">
      <el-col :span="12">
        <el-form-item label-width="120px" label="Start date:" class="postInfo-container-item">
          <el-date-picker v-model="startDate" type="month" name="start_date" format="yyyy-MM"
            placeholder="Select start date" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label-width="120px" label="End date:" class="postInfo-container-item">
          <el-date-picker v-model="endDate" type="month" name="end_date" format="yyyy-MM" placeholder="Select end date" />
        </el-form-item>
      </el-col>
    </el-row>
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
        name: '',
        url: '',
        logo: '',
        position: '',
        roles: '',
        start_date: '',
        end_date: '',
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
