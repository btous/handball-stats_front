<template>
  <div id="players-container" class="rows-layout">
    <PlayersElement :class="{'active-match-element': player.id===matchActiveClass}" @playerClicked="playerClicked" v-for="player in players" :key="player.id" :player="player" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import PlayersElement from "@/components/PlayersElement.vue";

export default {
  name: "PlayersList",
  components: { PlayersElement },
  props: ["parent", "parentId", "liveMatchPage"],
  data() {
    return {
      matchActiveClass: "",
    };
  },
  computed: {
    ...mapGetters(["players"]),
  },
  methods: {
    ...mapActions(["setLiveMatchPlayerId"]),
    playerClicked(player) {
      if (this.liveMatchPage) {
        this.setMatchActiveClass(player);
        this.setLiveMatchPlayerId(player.id);
      } else {
        this.goTo(player);
      }
    },
    goTo(player) {
      this.$store.dispatch("setPlayerTab", 0);
      this.$store.dispatch("setPlayer", player);
      this.$router.push("/player");
    },
    setMatchActiveClass(player) {
      if (this.matchActiveClass === player.id) {
        this.matchActiveClass = "";
      } else {
        this.matchActiveClass = player.id;
      }
    },
  },
  created() {
    this.$store.dispatch('resetLiveMatchElements');
  }
};
</script>

<style lang="scss">
</style>
