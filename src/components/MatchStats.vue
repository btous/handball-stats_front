<template>
  <div class="stats-element match-stats">
    <p class="stats-label">Efectivitat en el llançament</p>
    <h4 class="stats-value">{{ matchGoals }} goals de {{ matchTeamShots }} llançaments</h4>
    <h4 class="stats-value">({{ matchShotsEffectivity }}% d'encert)</h4>
    <p class="stats-label">Efectivitat a la porteria</p>
    <h4 class="stats-value">{{ matchSaves }} aturades de {{ matchOpponentShots }} llançaments</h4>
    <h4 class="stats-value">({{ matchSavesEffectivity }}% d'encert)</h4>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "MatchStats",
  props: ["match"],
  computed: {
    ...mapGetters(["endedMatches"]),
    totalMatches() {
      return this.endedMatches.length;
    },
    matchGoals() {
      let goals = 0;
      for (let key in this.match.actions) {
        let type = this.match.actions[key].type;
        let successful = this.match.actions[key].successful;
        if (type === "shot" && successful) {
          goals++;
        }
      }
      return goals;
    },
    matchTeamShots() {
      let shots = 0;
      for (let key in this.match.actions) {
        let type = this.match.actions[key].type;
        if (type === "shot") {
          shots++;
        }
      }
      return shots;
    },
    matchShotsEffectivity() {
      if (this.matchTeamShots === 0) {
        return "--";
      } else {
        return ((this.matchGoals * 100) / this.matchTeamShots).toFixed(2);
      }
    },
    matchSaves() {
      let saves = 0;
      for (let key in this.match.actions) {
        let type = this.match.actions[key].type;
        let successful = this.match.actions[key].successful;
        if (type === "save" && successful) {
          saves++;
        }
      }
      return saves;
    },
    matchOpponentShots() {
      let shots = 0;
      for (let key in this.match.actions) {
        let type = this.match.actions[key].type;
        if (type === "save") {
          shots++;
        }
      }
      return shots;
    },
    matchSavesEffectivity() {
      if (this.matchOpponentShots === 0) {
        return "--";
      } else {
        return ((this.matchSaves * 100) / this.matchOpponentShots).toFixed(2);
      }
    },
  },
};
</script>

<style lang="scss">
</style>
