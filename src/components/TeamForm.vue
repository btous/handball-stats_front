<template>
  <form class="app-form create-edit team-form">
    <label class="form-label" for="team-name">Nom*</label>
    <input
      id="team-name"
      class="text-input"
      v-model="team.name"
      placeholder="Nom de l'equip"
    />

    <label class="form-label" for="team-category">Categoria*</label>
    <input
      id="team-category"
      class="text-input"
      v-model="team.category"
      placeholder="Categoria (Sènior, juvenil, cadet...)"
    />

    <label class="form-label" for="team-category-label">Etiqueta</label>
    <input
      id="team-category-label"
      class="text-input"
      v-model="team.categoryLabel"
      placeholder="(A, B, C...)"
    />

    <label class="form-label" for="team-league">Divisió*</label>
    <input
      id="team-league"
      class="text-input"
      v-model="team.league"
      placeholder="Lliga a la que competeix"
    />

    <label class="form-label" for="team-gender">Gènere*</label>
    <select id="team-gender" class="select-box" v-model="team.gender">
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
import { mapGetters } from 'vuex';

export default {
  name: "TeamForm",
  data() {
    return {
      allGenders: ["Femení", "Masculí", "Mixt"],
      errors: [],
    };
  },
  computed: {
    ...mapGetters(["club", "team", "creating"])
  },
  methods: {
    validateForm() {
      this.errors = [];
      if(!this.team.name||this.team.name==="") {
        this.errors.push("Introdueix el nom de l'equip");
      }
      if(!this.team.category||this.team.category==="") {
        this.errors.push("Introdueix la categoria");
      }
      if(!this.team.league||this.team.league==="") {
        this.errors.push("Introdueix la divisió");
      }
      if(!this.team.gender||this.team.gender==="") {
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
        this.saveTeam();
      }
    },
    saveTeam() {
      // this.team.club = this.club;
      this.team.club = new Object({id: this.club.id});
      if (this.creating) {
        const data = {
          URL: "/teams/new_team",
          method: "POST",
          body: this.team,
        };
        this.$store
          .dispatch("callBackend", data)
          // .then(() => console.log("Equip desat"))
          .then(() => this.$router.replace(this.$router.go(-1)).catch(() => {}))
          // .catch(error => {
          //   console.log("Error during saveTeam(): ");
          //   console.log(error);
          // });
      } else {
        const data = {
          URL: "/teams/" + this.team.id,
          method: "PUT",
          body: this.team,
        };
        this.$store
          .dispatch("callBackend", data)
          // .then(() => console.log("Equip actualitzat"))
          .then(() => this.$router.replace(this.$router.go(-1)).catch(() => {}))
          // .catch(error => {
          //   console.log("Error during updateTeam(): ");
          //   console.log(error);
          // });
      }
    },
    cancelForm() {
      this.$router.replace(this.$router.go(-1)).catch(() => {});
    },
  },
};
</script>

<style lang="scss">
</style>