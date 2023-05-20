<template>
  <el-form :model='data' ref='form'>
    <el-form-item label="Institution" prop="institution">
      <el-input v-model="data.institution" name="institution"></el-input>
    </el-form-item>
    <el-form-item label="Course" prop="course">
      <el-input v-model="data.course" name="course"></el-input>
    </el-form-item>
    <el-form-item label="Qualification" prop="qualification">
      <el-input v-model="data.qualification" name="qualification"></el-input>
    </el-form-item>
    <el-form-item label="Start date / End date:">
      <el-date-picker style="width: 100%;" name="start_date" v-model="startEndDate" type="monthrange" range-separator="To"
        start-placeholder="Start date" end-placeholder="End date">
      </el-date-picker>
    </el-form-item>
    <el-form-item label-width="130px" label="Importance:">
      <el-rate v-model="data.importance" :max="10" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :low-threshold="1"
        :high-threshold="3" style="display:inline-block" />
    </el-form-item>

  </el-form>
</template>

<script>

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
        institution: '',
        course: '',
        qualification: '',
        start_date: '',
        end_date: '',
        importance: 0
      }
    },
    startEndDate: {
      // set and get is useful when the data
      // returned by the back end api is different from the front end
      // back end return => "2013-06-25 06:59:25"
      // front end need timestamp => 1372114765000
      get() {
        return [this.data.start_date, this.data.end_date]
      },
      set(val) {
        this.data.start_date = val[0]
        this.data.end_date = val[1]
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
}
</script>
