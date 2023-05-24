<template>
  <div class="app-container">
    <h3 class="uppercase mb-1">Qualifications</h3>

    <ul class="timeline">
      <li class="card" v-for="qualification in list" :key="qualification.id">
        <h3>{{ qualification.start_date }} - {{ qualification.end_date }}</h3>
        <div>
          <p class="desc">{{ qualification.institution }} - {{ qualification.course }}</p>
          <p class="qualification">{{ qualification.qualification }}</p>
        </div>
        <div class="after"><img :src="qualification.featured_image" alt=""></div>
      </li>
    </ul>
  </div>
</template>

<script>
import { list } from '@/api/client/qualifications'

export default {
  name: 'QualificationsList',
  data() {
    return {
      list: null,
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
.timeline {
  margin-top: 3rem;
  position: relative;
  display: flex;
  flex-direction: column;
  list-style: none;
  padding-top: 20px;
  padding-bottom: 20px;
}

/* the timeline's center vertical line */
.timeline:before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 1px;
  background-color: #94a3b8;
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

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
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
    font-size: 17px;
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
