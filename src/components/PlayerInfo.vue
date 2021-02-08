<template>
  <div class="info-element player-info">
    <p class="info-label">Nom</p>
    <h4 class="info-value">{{ player.name }}</h4>
    <p class="info-label">Cognoms</p>
    <h4 class="info-value">{{ player.surname }}</h4>
    <p class="info-label">Número</p>
    <h4 class="info-value">{{ player.number }}</h4>
    <p class="info-label">Equip</p>
    <h4 class="info-value">
      {{ playerTeams.category }} {{ playerTeams.gender }}
      {{ playerTeams.categoryLabel }}
    </h4>
    <p class="info-label">Posició</p>
    <h4 class="info-value">{{ player.position }}</h4>
    <p class="info-label">Data de naixement</p>
    <h4 class="info-value">{{ day + "/" + month + "/" + year }}</h4>
    <p class="info-label">Gènere</p>
    <h4 class="info-value">{{ player.gender }}</h4>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "PlayerInfo",
  props: ["player"],
  computed: {
    ...mapGetters({
      playerTeams: "playerTeams",
      day: "playerDayBirthday",
      month: "playerMonthBirthday",
      year: "playerYearBirthday",
    }),
  },
  created() {
    const data = {
      URL: "/players/" + this.player.id + "/teams",
      method: "GET",
    };
    this.$store
      .dispatch("callBackend", data)
      .then((data) => {
        // console.log("Equips del jugador carregats");
        this.$store.dispatch("setPlayerTeams", data);
      })
      .catch((/* error */) => {
        // console.log("Error during getPlayerTeams(): ");
        // console.log(error);
        this.$store.dispatch("setPlayerTeams", []);
      });
  },
};
</script>

<style lang="scss">
</style>
