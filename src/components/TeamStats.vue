<template>
  <div class="stats-element team-stats">
    <p class="stats-label">Partits jugats</p>
    <h4 class="stats-value">{{ totalMatches }}</h4>
    <p class="stats-label">Partits guanyats</p>
    <h4 class="stats-value">{{ wonMatches }}</h4>
    <p class="stats-label">Partits empatats</p>
    <h4 class="stats-value">{{ tiedMatches }}</h4>
    <p class="stats-label">Partits perduts</p>
    <h4 class="stats-value">{{ lostMatches }}</h4>
    <p class="stats-label">Gols a favor</p>
    <h4 class="stats-value">{{ scoredGoals }}</h4>
    <p class="stats-label">Gols en contra</p>
    <h4 class="stats-value">{{ receivedGoals }}</h4>
    <p class="stats-label">Mitjana de gols a favor per partit</p>
    <h4 class="stats-value">{{ scoredGoalsAverage }}</h4>
    <p class="stats-label">Mitjana de gols en contra per partit</p>
    <h4 class="stats-value">{{ receivedGoalsAverage }}</h4>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "TeamStats",
  computed: {
    ...mapGetters(["endedMatches"]),
    totalMatches() {
      return this.endedMatches.length;
    },
    wonMatches() {
      let matches = 0;
      for (let key in this.endedMatches) {
        let teamScore = this.endedMatches[key].result.teamScore;
        let opponentScore = this.endedMatches[key].result.opponentScore;
        if (teamScore > opponentScore) {
          matches++;
        }
      }
      return matches;
    },
    tiedMatches() {
      let matches = 0;
      for (let key in this.endedMatches) {
        let teamScore = this.endedMatches[key].result.teamScore;
        let opponentScore = this.endedMatches[key].result.opponentScore;
        if (teamScore === opponentScore) {
          matches++;
        }
      }
      return matches;
    },
    lostMatches() {
      let matches = 0;
      for (let key in this.endedMatches) {
        let teamScore = this.endedMatches[key].result.teamScore;
        let opponentScore = this.endedMatches[key].result.opponentScore;
        if (teamScore < opponentScore) {
          matches++;
        }
      }
      return matches;
    },
    scoredGoals() {
      let goals = 0;
      for (let key in this.endedMatches) {
        goals += this.endedMatches[key].result.teamScore;
      }
      return goals;
    },
    receivedGoals() {
      let goals = 0;
      for (let key in this.endedMatches) {
        goals += this.endedMatches[key].result.opponentScore;
      }
      return goals;
    },
    scoredGoalsAverage() {
      if (this.totalMatches === 0) {
        return "--";
      } else {
        return (this.scoredGoals / this.totalMatches).toFixed(2);
      }
    },
    receivedGoalsAverage() {
      if (this.totalMatches === 0) {
        return "--";
      } else {
        return (this.receivedGoals / this.totalMatches).toFixed(2);
      }
    },
  },
};
</script>

<style lang="scss">
</style>
