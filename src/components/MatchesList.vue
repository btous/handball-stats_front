<template>
  <div id="matches-container" class="rows-layout">
    <template v-if="matchState==='pending'">
      <MatchesElement v-for="match in matches.pending" :key="match.id" :match="match" />
    </template>
    <template v-if="matchState==='in-progress'">
      <MatchesElement v-for="match in matches['in-progress']" :key="match.id" :match="match" />
    </template>
    <template v-if="matchState==='ended'">
      <MatchesElement v-for="match in matches.ended" :key="match.id" :match="match" />
    </template>

  </div>
</template>

<script>
import { mapGetters } from "vuex";
import MatchesElement from "@/components/MatchesElement.vue";

export default {
  name: "MatchesList",
  components: { MatchesElement },
  props: ["parent", "parentId", "matchState"],
  computed: {
    ...mapGetters([
      "matches"
    ]),
  },
};
</script>

<style lang="scss">
</style>