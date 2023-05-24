<template>
  <div class="app-container">
    <div class="contacts">
      <el-row justify="center" type="flex">
        <el-col :span="18">
          <h3 class="uppercase mb-1">Contacts</h3>
          <p class="message">If you have a project idea or simply want to have a conversation, don't hesitate to send me
            an email!</p>
        </el-col>
        <el-col :span="18">
          <el-form ref="data" :model="data" :rules="{}" class="form-container">
            <el-form-item label="Name">
              <el-input type="text" name="name" v-model="data.name" required></el-input>
            </el-form-item>
            <el-form-item label="Email">
              <el-input type="email" name="email" v-model="data.email" required></el-input>
            </el-form-item>
            <el-form-item label="Subject">
              <el-input type="text" name="subject" v-model="data.subject" required></el-input>
            </el-form-item>
            <el-form-item style="margin-bottom: 40px;" label="Message">
              <el-input name="message" v-model="data.message" :rows="3" type="textarea" class="post-textarea" autosize
                placeholder="Please enter the message" />
              <span v-show="messageShortLength" class="word-counter">{{ messageShortLength }} words</span>
            </el-form-item>

            <div>
              <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm">
                Submit
              </el-button>
            </div>
          </el-form>
        </el-col>

        <el-col :span="18">
          <div style="margin-top: 6rem" class="items_categories">
            <el-row justify="scenter" type="flex">
              <el-col>
                <h5 class="uppercase mb-1">Find me on</h5>
              </el-col>
              <el-col :span="12" v-for="contact in list" :key="contact.id">
                <div class="card">
                  <h4 class="flex wrap align-center gap-1 mb-1">
                    <div class="before"><img :src="contact.logo" alt=""></div>
                    <div class="cursor-default">{{ contact.type }}:</div>
                    <div class="cursor-default">
                      <a v-if="isURL(contact.link)" :href="contact.link" target="_blank">{{ contact.link }}</a>
                      <span v-else>{{ contact.link }}</span>
                    </div>
                  </h4>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { list, sendMessage } from '@/api/client/contacts';

export default {
  data() {
    return {
      data: {
        name: '',
        email: '',
        subject: '',
        message: '',
      },
      list: [],
      loading: false
    };
  },
  methods: {
    async submitForm() {
      this.loading = true
      await sendMessage(this.data).then(res => {
        if (res.type == 'success') {
          this.$notify({
            title: 'Success',
            message: res.message,
            type: 'success'
          })
          for (let key in this.data) {
            this.data[key] = ''
          }
        }

      }).finally(() => this.loading = false)

    },
    async getContacts() {
      const res = await list()
      this.list = res.data
    },
    isURL(str) {
      var regex = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
      return !!regex.test(str)
    }
  },
  computed: {
    messageShortLength() {
      return this.data.message.length
    }
  },
  created() {
    this.getContacts()
  }
};
</script>
<style lang="scss">
.contacts {
  .message {
    font-size: 18px;
    padding: 1.4rem 0;
  }

  button {
    background: #20ab95;
    font-weight: 600;

    &:hover,
    &:focus {
      background: #2bc7af;
    }
  }
}
</style>