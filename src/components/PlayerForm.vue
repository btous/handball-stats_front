<template>
  <form class="app-form create-edit player-form">
    <label class="form-label" for="player-name">Nom*</label>
    <input
      id="player-name"
      class="text-input"
      v-model="player.name"
      placeholder="Nom del jugador"
    />

    <label class="form-label" for="player-surname">Cognoms</label>
    <input
      id="player-surname"
      class="text-input"
      v-model="player.surname"
      placeholder="Cognoms del jugador"
    />

    <label class="form-label" for="player-number">Dorsal</label>
    <input
      id="player-number"
      class="text-input"
      v-model="player.number"
      placeholder="Dorsal del jugador"
    />

    <label class="form-label" for="player-team">Equip*</label>
    <select id="player-team" class="select-box" v-model="team.id" >
      <option class="placeholder" value="" disabled selected>
        Selecciona l'equip
      </option>
      <option v-for="team in allTeams" :key="team.id" :value="team.id" >
        {{ team.category }} {{ team.gender }} {{ team.categoryLabel }}
      </option>
    </select>
    
    <label class="form-label" for="player-position">Posició*</label>
    <select id="player-position" class="select-box" v-model="player.position" >
      <option class="placeholder" value="" disabled selected>
        Selecciona la posició
      </option>
      <option v-for="position in allPositions" :key="position">
        {{ position }}
      </option>
    </select>
   
    <label class="form-label" for="player-birthday">Data de naixement</label>
    <input
      id="player-birthday"
      class="text-input"
      v-model="player.birthday"
      type="date"
      placeholder="Data de naixement del jugador"
    />

    <label class="form-label" for="player-gender">Gènere*</label>
    <select id="player-gender" class="select-box" v-model="player.gender">
      <option value="" disabled selected>Selecciona el gènere</option>
      <option v-for="gender in allGenders" :key="gender">{{ gender }}</option>
    </select>

    <fieldset class="errors">
      <div v-for="error in errors" :key="error">{{ error }}</div>
    </fieldset>

    <fieldset class="form-buttons">
      <button
        class="form-button accept-button"
        type="sumbit"
        @click.prevent="submitForm"
      >
        Acceptar
      </button>
      <button class="form-button cancel-button" @click.prevent="cancelForm">
        Cancel·lar
      </button>
    </fieldset>
  </form>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "PlayerForm",
  data() {
    return {
      allPositions: ["EE", "LE", "CE", "LD", "ED", "PV", "PO"],
      allTeams: [],
      allGenders: ["Femení", "Masculí", "Altre"],
      errors: [],
    };
  },
  computed: {
    ...mapGetters(["club", "team", "player", "creating"]),
  },
  methods: {
    validateForm() {
      this.errors = [];
      if(!this.player.name||this.player.name==="") {
        this.errors.push("Introdueix el nom del jugador");
      }
      if(!this.team.id||this.team.id==="") {
        this.errors.push("Selecciona l'equip");
      }
      if(!this.player.position||this.player.position==="") {
        this.errors.push("Selecciona la posició");
      }
      if(!this.player.gender||this.player.gender==="") {
        this.errors.push("Selecciona el gènere");
      }
      if (this.errors.length === 0) {
        return true;
      } else {
        return false;
      }
    },
    submitForm() {
      if (this.validateForm()) {
        this.savePlayer();
      }
    },
    savePlayer() {
      // this.player.team = this.team;
      this.player.team = new Object({id: this.team.id});
      if (this.creating) {
        const data = {
          URL: "/players/new_player",
          method: "POST",
          body: this.player,
        };
        this.$store
          .dispatch("callBackend", data)
          // .then(() => console.log("Jugador desat"))
          .then(() => this.$router.replace(this.$router.go(-1)).catch(() => {}))
          // .catch((error) => {
          //   console.log("Error during savePlayer(): ");
          //   console.log(error);
          // });
      } else {
        const data = {
          URL: "/players/" + this.player.id,
          method: "PUT",
          body: this.player,
        };
        this.$store
          .dispatch("callBackend", data)
          // .then(() => console.log("Jugador actualitzat"))
          .then(() => this.$router.replace(this.$router.go(-1)).catch(() => {}))
          // .catch((error) => {
          //   console.log("Error during updatePlayer(): ");
          //   console.log(error);
          // });
      }
    },
    cancelForm() {
      this.$router.replace(this.$router.go(-1)).catch(() => {});
    },
  },
  created() {
    // get allTeams al backend
    const data = {
      URL: "/clubs/" + this.club.id + "/teams/",
      method: "GET",
    };
    this.$store
      .dispatch("callBackend", data)
      .then((data) => {
        // console.log("Equips carregats");
        this.allTeams = data;
      })
      // .catch((error) => {
      //   console.log("Error during getTeams(): ");
      //   console.log(error);
      // });
  },
};
</script>

<style lang="scss">
</style>
