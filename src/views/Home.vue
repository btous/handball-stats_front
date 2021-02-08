<template>
  <div id="home-page">
    <HeaderComp :backIcon="false" :searchIcon="true" :userIcon="true" />
    <main id="main-content">
      <h1>HANDBALL STATS</h1>
      <img id="logo" alt="Handball Stats logo" src="@/assets/logos/isotip.svg" />
      <div v-if="!logged" id="user-management">
        <router-link id="login" class="acces-button" to="/login">Inicia sessió</router-link>
        <router-link id="register" class="acces-button" to="/register">Registra't</router-link>
      </div>
      <div v-else-if="clubs.length===0" @click="createElement('club')" class="add-first-element clickable">
        <fa-icon icon="plus" class="huge-icon add-first-element-button" />
        <h4 class="add-first-element-label">Afegeix un club</h4>
      </div>
      <ClubsBox v-else v-for="club in clubs" :key="club.id" :club="club" />
    </main>
    <FooterSettings v-if="logged&&clubs.length!==0" :createIcon="false" :editIcon="'club'" :deleteIcon="'club'" @editClicked="editClicked" @deleteClicked="deleteClicked" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import HeaderComp from "@/components/HeaderComp.vue";
import FooterSettings from "@/components/FooterSettings.vue";
import ClubsBox from "../components/ClubsBox.vue";

export default {
  name: "HomePage",
  components: {
    HeaderComp,
    FooterSettings,
    ClubsBox,
  },
  data() {
    return {
      elementsCheckedId: [],
    };
  },
  computed: {
    ...mapGetters(["logged", "clubs"]),
  },
  methods: {
    ...mapActions([
      "getClubs",
      "createElement",
      "editElement",
      "deleteElements",
    ]),
    createClicked() {
      this.createElement("club");
    },
    editClicked() {
      this.editElement("club");
    },
    deleteClicked() {
      this.deleteElements("club")
        .then(() => this.getClubs())
        // .catch(() => console.log("Error during delete"));
    },
  },
  created() {
    this.$store.dispatch("resetElementsChecked");
    this.$store.dispatch("setHidePlayersCheckbox", false);
    if (this.logged) {
      this.getClubs();
    }
  },
};
</script>

<style lang="scss">
#home-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 100%;

  #logo {
    margin: 2.5rem auto;
    width: 150px;
  }

  #user-management {
    margin-top: 2.5rem;
    .acces-button {
      display: block;
      max-width: 12.5rem;
      margin: 1.25rem auto;
      padding: 1.25rem;
      border-radius: 0.3125rem;
      font-size: $h3-font-size;
      text-decoration: none;
    }

    #login {
      background-color: $main-color;
      color: $secondary-color;
    }

    #register {
      background-color: $secondary-color;
      color: $main-color;
    }
  }

  .club-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 1.25rem auto;
    padding: 1.25rem;
    width: 90%;
    background-color: $main-color;
    border-radius: 0.625rem 0 0.625rem 0;
    color: $secondary-color;

    .club-box-title {
      padding: 0 1.8rem;
    }
    .pill-options {
      display: flex;
      flex-direction: column;
      width: 100%;
    }

    .pill {
      margin: 0.625rem 0;
      width: 100%;
      padding: 2rem 0.625rem;
      background-color: $secondary-color;
      color: $main-color;
      border-radius: 0.625rem 0 0.625rem 0;
    }
  }
}
</style>