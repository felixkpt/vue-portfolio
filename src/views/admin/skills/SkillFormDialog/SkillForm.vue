<template>
  <el-form :model='data' ref='form'>
    <el-form-item label="Name" prop="name">
      <el-input v-model="data.name" name="name"></el-input>
    </el-form-item>
    <el-row>
      <el-col :span="8">
        <el-form-item label="Start date:">
          <el-date-picker v-model="startDate" type="month" name="start_date" format="yyyy-MM"
            placeholder="Select start date" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="Level">
          <el-select v-model="data.level" filterable placeholder="Select">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="Category">
          <el-select v-model="data.category" name="category" filterable placeholder="Select">
            <el-option v-for="item in categories" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
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

import Tinymce from '@/components/Tinymce'
import Upload from '@/components/Upload/SingleImage3'

export default {
  props: {
    inStateOne: Boolean,
  },
  data() {
    return {
      data: {},

      options: [{
        value: 'Beginner',
        label: 'Beginner'
      }, {
        value: 'Intermediate',
        label: 'Intermediate'
      }, {
        value: 'Professional',
        label: 'Professional'
      }, {
        value: 'Expert',
        label: 'Expert'
      }],
      categories: [
      {
        value: 'Front End',
        label: 'Front End'
      }, 
      {
        value: 'Back End',
        label: 'Back End'
      },
      {
        value: 'Others',
        label: 'Others'
      }, 
      ]
    }
  },
  computed: {
    defaultData() {
      return {
        name: '',
        start_date: '',
        level: 'Beginner',
        category: '',
        logo: '',
        importance: 0,
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
    Tinymce, Upload
  }
}
</script>
