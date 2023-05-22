<template>
  <div class="app-container">
    <skill-bar skill="HTML" level="100" barSize="medium" />
    <skill-bar skill="PHP" level="100" barSize="medium" />
  </div>
</template>

<script>
import { SkillBar } from 'vue-skill-bar'

export default (
  {
    name: 'Skills',
    components: {
      'skill-bar': SkillBar
    },
    data: function () {
      return {

      }
    }
  }
)
  </script>