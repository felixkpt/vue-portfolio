<template>
  <el-form :model='data' ref='form'>
    <el-form-item label="Name" prop="name">
      <el-input v-model="data.name" name="name"></el-input>
    </el-form-item>
    <el-form-item label-width="130px" label="Importance:" class="postInfo-container-item">
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
        name: '',
        importance: 0,
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
