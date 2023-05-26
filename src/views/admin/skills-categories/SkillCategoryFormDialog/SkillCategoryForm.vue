<template>
  <el-form :model='data' ref='form'>
    <el-form-item label="Name" prop="name">
      <el-input v-model="data.name" name="name"></el-input>
    </el-form-item>
    <el-table-column align="center" label="Institution" min-width="220px">
        <template slot-scope="scope">
          <el-row align="center" type="flex">
            <el-col :span="5">
              <div class="item-logo"><img :src="scope.row.featured_image" alt="Featured image"></div>
            </el-col>
            <el-col :span="19" style="margin-block: auto;"><span>{{ scope.row.institution }}</span></el-col>
          </el-row>
        </template>
      </el-table-column>
    <el-form-item label="Featured_image" prop="featured_image" style="margin-bottom: 30px;">
      <Upload v-model="data.featured_image" />
      <input type="hidden" name="featured_image">
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
        name: '',
        featured_image: '',
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
  components: { Upload }
}
</script>
