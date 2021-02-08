<template>
  <div id="teams-container" class="rows-layout">
    <TeamsElement v-for="team in teams" :key="team.id" :team="team" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import TeamsElement from "@/components/TeamsElement.vue";

export default {
  name: "TeamsList",
  components: { TeamsElement },
  props: ["parent", "parentId"],
  computed: {
    ...mapGetters(["teams"]),
  },
};
</script>

<style lang="scss">
</style>
