<template>
  <section id="data-container">
    <b-tabs v-model="tabIndex">
      <b-tab id="tab-info" class="tab-container" title="Informació">
        <PlayerInfo :player="player" />
      </b-tab>
      <b-tab id="tab-stats" class="tab-container" title="Estadístiques">
        <PlayerStats :player="player" />
      </b-tab>
    </b-tabs>
  </section>
</template>

<script>
import PlayerInfo from "../components/PlayerInfo.vue";
import PlayerStats from "./PlayerStats.vue";

export default {
  name: "PlayerData",
  components: { PlayerInfo, PlayerStats },
  props: ["player"],
  computed: {
    tabIndex: {
      get() {
        return this.$store.getters.playerTab;
      },
      set(value) {
        this.$store.dispatch("setPlayerTab", value);
      },
    },
  },
};
</script>

<style lang="scss">
</style>
