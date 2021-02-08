<template>
  <div id="player-form-page">
    <HeaderComp :backIcon="true" :searchIcon="false" :userIcon="true" />
    <main id="main-content">
      <div class="player-title">
        <div class="player-number-container">
          <p v-if="player.number" class="player-number">{{ player.number }}</p>
          <p v-else class="player-number">-</p>
        </div>
        <h2 v-if="player.name" class="player-name">
          <span v-if="player.name">{{ player.name }} </span>
          <span v-if="player.surname">{{ player.surname }}</span>
        </h2>
        <h2 v-else class="player-name">Jugador nou</h2>
      </div>
      <PlayerForm />
    </main>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import HeaderComp from "../components/HeaderComp.vue";
import PlayerForm from "../components/PlayerForm.vue";

export default {
  name: "PlayerFormView",
  components: { HeaderComp, PlayerForm },
  props: [],
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["player", "playersCheckedId"]),
    teamPlayer() {
      if (this.$route.params.team) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {},
  created() {
    if (this.$store.getters.creating && !this.$store.getters.editing) {
      this.$store.dispatch("setPlayer", {
        position: "",
        gender: ""
      });
      if (!this.teamPlayer) {
        this.$store.dispatch("setTeam", { id: "" });
      }
    } else if (!this.$store.getters.creating && this.$store.getters.editing) {
      let playerId = this.playersCheckedId[0];
      // get player by playerId al backend
      const dataPlayer = {
        URL: "/players/" + playerId,
        method: "GET",
      };
      this.$store
        .dispatch("callBackend", dataPlayer)
        .then((data) => {
          // console.log("Jugador carregat");
          this.$store.dispatch("setPlayer", data);
        })
        .catch((/* error */) => {
          // console.log("Error during getPlayer(): ");
          // console.log(error);
          this.$store.dispatch("setPlayer", {});
        });
      // get teams by playerId al backend
      const dataTeam = {
        URL: "/players/" + playerId + "/teams/",
        method: "GET",
      };
      this.$store
        .dispatch("callBackend", dataTeam)
        .then((data) => {
          // console.log("Equip carregat");
          this.$store.dispatch("setTeam", data[0]);
        })
        .catch((/* error */) => {
          // console.log("Error during getTeam(): ");
          // console.log(error);
          this.$store.dispatch("setTeam", {});
        });
    } else {
      this.$store.dispatch("setPlayer", {});
    }
  },
  beforeDestroy() {
    this.$store.dispatch("resetCreatingEditing");
  },
};
</script>

<style lang="scss">
#player-form-page {
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
    cursor: pointer;

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