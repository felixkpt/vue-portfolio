<template>
  <div class="app-container">
    <h3 class="uppercase mb-1">Qualifications</h3>

    <ul class="timeline" v-if="list.length > 0">
      <li class="card" v-for="qualification in list" :key="qualification._id">
        <h3>{{ qualification.start_date }} - {{ qualification.end_date }}</h3>
        <div>
          <p class="desc">{{ qualification.institution }} - {{ qualification.course }}</p>
          <p class="qualification">{{ qualification.qualification }}</p>
        </div>
        <div class="after"><img :src="qualification.featured_image" alt=""></div>
      </li>
    </ul>
    <el-row :gutters="22" v-else>
      <content-placeholders v-for="indx in [1, 2, 3, 4]" :key="indx" :animated="true" :rounded="true">
        <el-row>
          <el-col :span="12" style="padding: 2rem 0;">
            <el-row v-if="indx % 2 !== 0">
              <el-col :span="21">
                <content-placeholders-heading />
              </el-col>
              <el-col :span="3">
                <content-placeholders-img />
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="12" style="padding: 2rem 0;">
            <el-row v-if="indx % 2 === 0">
              <el-col :span="3">
                <content-placeholders-img />
              </el-col>
              <el-col :span="21">
                <content-placeholders-heading />
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </content-placeholders>
    </el-row>
  </div>
</template>

<script>
import { list } from '@/api/client/qualifications'

export default {
  name: 'QualificationsList',
  data() {
    return {
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20
      },
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      list(this.listQuery).then(response => {
        this.list = response.data.data
        this.total = response.data.total
        this.listLoading = false
      })
    }
  },
  watch: {
    list() {

      setTimeout(() => {
        document.addEventListener('scroll', timeline);

        function timeline() {
          var threshold_position = window.scrollY + window.innerHeight * 2 / 3;
          //compare scrolltop with scrolltop on each timeline event
          var timeline_events = document.querySelectorAll('.timeline li');
          for (let i in timeline_events) {
            if (i === 0) {
              console.log(timeline_events[i].offsetTop)
            }
            if (timeline_events[i].offsetTop < threshold_position)
              timeline_events[i].classList.add('visible');
            else
              if (timeline_events[i])
                timeline_events[i]?.classList?.remove('visible');
          }
        }

        timeline();
      }, 100);
    }

  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.timeline {

  margin-top: 3rem;
  position: relative;
  display: flex;
  flex-direction: column;
  list-style: none;
  padding-top: 20px;
  padding-bottom: 20px;

  @media screen and (max-width:768px) {
    padding-left: 1px;
  }

  /* the timeline's center vertical line */
  &:before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    width: 1px;
    background-color: #94a3b8;

    @media screen and (max-width:768px) {
      left: 0%;
    }
  }
}

.timeline li {
  border-top: 1px solid #94a3b8;
  position: relative;
  width: 50%;
  min-height: 100px;
  margin-bottom: 20px;
  padding: 20px 40px;
  text-align: right;
  transition: .5s;
  opacity: 0;
  transform: translateX(-10%);

  @media screen and (max-width:768px) {
    width: 100%;
  }

  &:hover {
    cursor: default;
  }
}

/* the rounded mark on each timeline item */
.timeline li>.after {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  position: absolute;
  top: 0;
  right: 0;
  background: #ccc;
  box-sizing: border-box;
  transform: translate(50%, -50%);


  @media screen and (max-width:768px) {
    left: 0;
  }

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
}

.vue-content-placeholders-img {
  width: 2rem;
  height: 2rem;
}

.timeline h3 {
  font-size: 22px;
  margin-bottom: 10px;
}

.timeline div {
  .desc {
    font-size: 18px;
    line-height: 24px;
  }

  .qualification {
    margin-top: 0.5rem;
    color: #94a3b8;
  }
}

.timeline li:nth-child(2n) {
  align-self: flex-end;
  text-align: left;
  transform: translateX(10%);
}

.timeline li:nth-child(2n):before {
  left: 0;
  transform: translate(-50%, -50%);
}

.timeline li.visible {
  opacity: 1;
  transform: translateX(0);
}
</style>
