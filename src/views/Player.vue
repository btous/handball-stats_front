<template>
  <div id="player-page">
    <HeaderComp :backIcon="true" :searchIcon="false" :userIcon="true" />
    <main id="main-content">
      <div class="player-title">
        <div class="player-number-container" :title="player.number">
          <p class="player-number">
            <span v-if="player.number">{{ player.number }}</span>
            <span v-else>-</span>
          </p>
        </div>
        <h2 class="player-name" :title="player.name">
          {{ player.name }} {{ player.surname }}
        </h2>
      </div>
      <PlayerData :player="player" />
    </main>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import HeaderComp from "../components/HeaderComp.vue";
import PlayerData from "../components/PlayerData.vue";

export default {
  name: "PlayerPage",
  components: { HeaderComp, PlayerData },
  computed: {
    ...mapGetters(["player"]),
  },
  created() {
    this.$store.dispatch("resetElementsChecked");
    this.$store.dispatch("setHidePlayersCheckbox", false);
  },
};
</script>

<style lang="scss">
#player-page {
  display: flex;
  flex-direction: column;
  height: 100%;

  .player-title {
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
  }

  .player-number-container {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-color: $main-color;
    color: $secondary-color;
    width: 2.5rem;
    height: 2.5rem;
    margin-right: 1rem;
    border-radius: 50%;

    .player-number {
      margin: 0;
    }
  }

  .player-name {
    display: inline-block;
    margin: 0;
  }
}
</style>