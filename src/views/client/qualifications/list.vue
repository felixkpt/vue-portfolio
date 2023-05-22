<template>
  <div class="app-container">
      <h3 class="uppercase">Qualifications</h3>

      <ul class="timeline">
        <li>
          <h3>2001</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.</p>
        </li>
        <li>
          <h3>2002</h3>
          <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </li>
        <li>
          <h3>2003</h3>
          <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </li>
        <li>
          <h3>2004</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.</p>
        </li>
        <li>
          <h3>2005</h3>
          <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </li>
        <li>
          <h3>2006</h3>
          <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </li>
        <li>
          <h3>2007</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.</p>
        </li>
        <li>
          <h3>2008</h3>
          <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </li>
        <li>
          <h3>2009</h3>
          <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </li>
        <li>
          <h3>2010</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.</p>
        </li>
        <li>
          <h3>2011</h3>
          <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </li>
        <li>
          <h3>2012</h3>
          <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </li>
        <li>
          <h3>2013</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.</p>
        </li>
        <li>
          <h3>2014</h3>
          <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </li>
        <li>
          <h3>2015</h3>
          <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </li>
        <li>
          <h3>2016</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.</p>
        </li>
        <li>
          <h3>2017</h3>
          <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </li>
        <li>
          <h3>2018</h3>
          <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </li>
      </ul>
    </div>

</template>

<script>
import { list } from '@/api/client/skills'

export default {
  name: 'ExploreList',
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20
      }
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
  mounted() {
    document.addEventListener('scroll', timeline);

    function timeline() {
      var threshold_position = window.scrollY + window.innerHeight * 2 / 3;
      //compare scrolltop with scrolltop on each timeline event
      var timeline_events = document.querySelectorAll('.timeline li');

      for (let i in timeline_events)
        if (timeline_events[i].offsetTop < threshold_position)
          timeline_events[i].classList.add('visible');
        else
          if (timeline_events[i])
            timeline_events[i]?.classList?.remove('visible');
    }

    timeline();
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: #fff;
  color: #4d4c59;
  font-family: "PT Serif", Georgia, Cambria, "Times New Roman", Times, serif;
}

h3 {
  font-family: sans-serif;
}

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
  background-color: #ccc;
}

.timeline li {
  border-top: 1px solid #ccc;
  position: relative;
  width: 50%;
  min-height: 100px;
  margin-bottom: 20px;
  padding: 20px 40px;
  text-align: right;
  transition: .3s;
  opacity: 0;
  transform: translateX(-10%);
}

/* the rounded mark on each timeline item */
.timeline li:before {
  content: "";
  width: 10px;
  height: 10px;
  position: absolute;
  top: 0;
  right: 0;
  background: #ccc;
  border-radius: 50%;
  box-sizing: border-box;
  transform: translate(50%, -50%);
}

.timeline h3 {
  font-size: 28px;
  margin-bottom: 10px;
}

.timeline p {
  font-size: 20px;
  line-height: 28px;
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
