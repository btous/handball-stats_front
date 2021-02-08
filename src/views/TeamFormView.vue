<template>
  <div id="team-form-page">
    <HeaderComp :backIcon="true" :searchIcon="false" :userIcon="true" />
    <main id="main-content">
      <h2 class="club-title">{{ club.name }}</h2>
      <h3 v-if="team.category" class="team-category-title">{{ team.category }} {{ team.gender }} {{ team.categoryLabel }}
      </h3>
      <h3 v-else class="team-category-title">Nou equip</h3>
      <TeamForm />
    </main>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import HeaderComp from "../components/HeaderComp.vue";
import TeamForm from "../components/TeamForm.vue";

export default {
  name: "TeamFormView",
  components: { HeaderComp, TeamForm },
  computed: {
    ...mapGetters(["club", "team", "teamsCheckedId"]),
  },
  methods: {},
  created() {
    if (this.$store.getters.creating && !this.$store.getters.editing) {
      this.$store.dispatch("setTeam", {
        name: this.club.teamsName,
        gender: ""
      });
    } else if (!this.$store.getters.creating && this.$store.getters.editing) {
      let teamId = this.teamsCheckedId[0];
      // get team by teamId al backend
      const data = {
        URL: "/teams/" + teamId,
        method: "GET",
      };
      this.$store
        .dispatch("callBackend", data)
        .then(data => {
          // console.log("Equip carregat");
          this.$store.dispatch("setTeam", data);
        })
        .catch((/* error */) => {
          // console.log("Error during getTeam(): ");
          // console.log(error);
          this.$store.dispatch("setTeam", {});
        });
    } else {
      this.$store.dispatch("setTeam", {});
    }
  },
  beforeDestroy() {
    this.$store.dispatch("resetCreatingEditing");
  },
};
</script>

<style lang="scss">
#team-form-page {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>