<template>
  <div id="club-form-page">
    <HeaderComp :backIcon="true" :searchIcon="false" :userIcon="true" />
    <main id="main-content">
      <h2 class="club-title">Club nou</h2>
      <ClubForm />
    </main>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import HeaderComp from '../components/HeaderComp.vue';
import ClubForm from '../components/ClubForm.vue';

export default {
  name: "ClubFormView",
  components: { HeaderComp, ClubForm },
  computed: {
    ...mapGetters(["elementsCheckedId"])
  },
  created() {
    if (this.$store.getters.creating && !this.$store.getters.editing) {
      this.$store.dispatch("setClub", {});
    } else if (!this.$store.getters.creating && this.$store.getters.editing) {
      let clubId = this.elementsCheckedId[0];
      // get club by clubId al backend
      const data = {
        URL: "/clubs/" + clubId,
        method: "GET",
      };
      this.$store
        .dispatch("callBackend", data)
        .then(data => {
          // console.log("Club carregat");
          this.$store.dispatch("setClub", data);
        })
        .catch((/* error */) => {
          // console.log("Error during getClub(): ");
          // console.log(error);
          this.$store.dispatch("setClub", {});
        });
    } else {
      this.$store.dispatch("setClub", {});
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