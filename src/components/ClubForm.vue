<template>
  <form class="app-form create-edit club-form">
    <label class="form-label" for="club-name">Nom del club*</label>
    <input
      id="club-name"
      class="text-input"
      v-model="club.name"
      placeholder="Nom del club"
    />

    <label class="form-label" for="club-teams-name">Nom genèric dels equips del club*</label>
    <input
      id="club-teams-name"
      class="text-input"
      v-model="club.teamsName"
      placeholder="Nom dels equips"
    />

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
  name: "ClubForm",
  data() {
    return {
      errors: [],
    };
  },
  computed: {
    ...mapGetters(["user", "club"]),
  },
  methods: {
    validateForm() {
      this.errors = [];
      if(!this.club.name||this.club.name==="") {
        this.errors.push("Introdueix el nom del club");
      }
      if(!this.club.teamsName||this.club.teamsName==="") {
        this.errors.push("Introdueix el nom dels equips del club");
      }
      if (this.errors.length === 0) {
        return true;
      } else {
        return false;
      }
    },
    submitForm() {
      if (this.validateForm()) {
        this.saveClub();
      }
    },
    saveClub() {
      // this.club.user = this.user;
      this.club.user = new Object({id: this.user.id});
      this.$store
        .dispatch("callBackend", {
          URL: "/clubs/new_club",
          method: "POST",
          body: this.club,
        })
        // .then(() => console.log("Club desat"))
        .then(() => this.$router.replace(this.$router.go(-1)).catch(() => {}));
    },
    cancelForm() {
      this.$router.replace(this.$router.go(-1)).catch(() => {});
    },
  },
};
</script>

<style lang="scss">
</style>
