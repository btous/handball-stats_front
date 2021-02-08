<template>
  <div id="match-form-page">
    <HeaderComp :backIcon="true" :searchIcon="false" :userIcon="true" />
    <main id="main-content">
      <h2 class="club-title">{{ club.name }}</h2>
      <h3 class="team-category-title">
        {{ team.category }} {{ team.gender }} {{ team.categoryLabel }}
      </h3>
      <h3 class="match-title">Partit nou</h3>
      <MatchForm />
    </main>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import HeaderComp from "../components/HeaderComp.vue";
import MatchForm from "../components/MatchForm.vue";

export default {
  name: "MatchFormView",
  components: { HeaderComp, MatchForm },
  computed: {
    ...mapGetters(["club", "team", "matchesCheckedId"]),
  },
  methods: {},
  created() {
    if (this.$store.getters.creating && !this.$store.getters.editing) {
      this.$store.dispatch("setMatch", {});
    } else if (!this.$store.getters.creating && this.$store.getters.editing) {
      let matchId = this.matchesCheckedId[0];
      // get match by matchId al backend
      const data = {
        URL: "/matches/" + matchId,
        method: "GET",
      };
      this.$store
        .dispatch("callBackend", data)
        .then((data) => {
          // console.log("Partit carregat");
          this.$store.dispatch("setMatch", data);
        })
        .catch((/* error */) => {
          // console.log("Error during getMatch(): ");
          // console.log(error);
          this.$store.dispatch("setMatch", {});
        });
    } else {
      this.$store.dispatch("setMatch", {});
    }
  },
  beforeDestroy() {
    this.$store.dispatch("resetCreatingEditing");
  },
};
</script>

<style lang="scss">
#match-form-page {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>