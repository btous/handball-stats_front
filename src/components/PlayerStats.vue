<template>
  <div class="stats-element player-stats">
    <template v-if="player.position==='PO'">
      <p class="stats-label">Efectivitat a la porteria</p>
      <h4 class="stats-value">{{ goalkeeperSaves }} aturades de {{ goalkeeperShots }} llançaments</h4>
      <h4 class="stats-value">({{ goalkeeperEffectivity }}% d'encert)</h4>
    </template>
    <template v-else>
      <p class="stats-label">Efectivitat en el llançament</p>
      <h4 class="stats-value">{{ playerGoals }} goals de {{ playerShots }} llançaments</h4>
      <h4 class="stats-value">({{ playerEffectivity }}% d'encert)</h4>
    </template>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "PlayerStats",
  props: ["player"],
  computed: {
    ...mapGetters(["endedMatches"]),
    totalMatches() {
      return this.endedMatches.length;
    },
    playerGoals() {
      let goals = 0;
      for (let key in this.player.actions) {
        let type = this.player.actions[key].type;
        let successful = this.player.actions[key].successful;
        if (type === "shot" && successful) {
          goals++;
        }
      }
      return goals;
    },
    playerShots() {
      let shots = 0;
      for (let key in this.player.actions) {
        let type = this.player.actions[key].type;
        if (type === "shot") {
          shots++;
        }
      }
      return shots;
    },
    playerEffectivity() {
      if (this.playerShots === 0) {
        return "--";
      } else {
        return ((this.playerGoals * 100) / this.playerShots).toFixed(2);
      }
    },
    goalkeeperSaves() {
      let saves = 0;
      for (let key in this.player.actions) {
        let type = this.player.actions[key].type;
        let successful = this.player.actions[key].successful;
        if (type === "save" && successful) {
          saves++;
        }
      }
      return saves;
    },
    goalkeeperShots() {
      let shots = 0;
      for (let key in this.player.actions) {
        let type = this.player.actions[key].type;
        if (type === "save") {
          shots++;
        }
      }
      return shots;
    },
    goalkeeperEffectivity() {
      if (this.goalkeeperShots === 0) {
        return "--";
      } else {
        return ((this.goalkeeperSaves * 100) / this.goalkeeperShots).toFixed(2);
      }
    },
  },
};
</script>

<style lang="scss">
</style>
