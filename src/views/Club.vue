<template>
  <div id="club-page">
    <HeaderComp :backIcon="true" :searchIcon="true" :userIcon="true" />
    <main id="main-content">
      <h2 class="club-title">{{ club.name }}</h2>
      <ClubData :club="club" />
    </main>
    <FooterSettings v-if="showFooter"
      :createIcon="createIcon"
      :editIcon="editIcon"
      :deleteIcon="deleteIcon"
      @createClicked="createClicked"
      @editClicked="editClicked"
      @deleteClicked="deleteClicked"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import FooterSettings from "../components/FooterSettings.vue";
import HeaderComp from "../components/HeaderComp.vue";
import ClubData from "../components/ClubData.vue";

export default {
  name: "ClubPage",
  components: { FooterSettings, HeaderComp, ClubData },
  data() {
    return {
      elementsCheckedId: [],
    };
  },
  computed: {
    ...mapGetters(["clubTab", "club"]),
    elementType() {
      switch (this.clubTab) {
        case 0:
          return "team";
        case 1:
          return "player";
        default:
          return null;
      }
    },
    showFooter() {
      if(this.createIcon||this.editIcon||this.deleteIcon) {
        return true;
      } else {
        return false;
      }
    },
    createIcon() {
      switch (this.elementType) {
        case 'team':
          return 'equip'
        case 'player':
          return 'jugador'
        default:
          return false
      }
    },
    editIcon() {
      switch (this.elementType) {
        case 'team':
          return 'equip'
        case 'player':
          return 'jugador'
        default:
          return false
      }
    },
    deleteIcon() {
      switch (this.elementType) {
        case 'team':
          return 'equip'
        case 'player':
          return 'jugador'
        default:
          return false
      }
    }
  },
  methods: {
    ...mapActions([
      "getTeams",
      "getPlayers",
      "deleteTeam",
      "deletePlayer",
      "createElement",
      "editElement",
      "deleteElements",
      "resetElementsChecked",
    ]),
    createClicked() {
      this.createElement(this.elementType);
    },
    editClicked() {
      this.editElement(this.elementType);
    },
    deleteClicked() {
      this.deleteElements(this.elementType)
        .then(() => this.loadData(this.elementType))
        // .catch(() => console.log("Error during delete"));
    },
    loadData(elementType) {
      switch (elementType) {
        case "team":
          this.loadTeams();
          break;
        case "player":
          this.loadPlayers();
          break;
        default:
          this.loadTeams();
          this.loadPlayers();
      }
    },
    loadTeams() {
      const data = {
        URL: "/clubs/" + this.club.id + "/teams/",
        method: "GET",
      };
      this.getTeams(data);
    },
    loadPlayers() {
      const data = {
        URL: "/clubs/" + this.club.id + "/players/",
        method: "GET",
      };
      this.getPlayers(data);
    },
  },
  created() {
    this.$store.dispatch("resetElementsChecked");
    this.$store.dispatch("setHidePlayersCheckbox", false);
    this.loadData();
  },
};
</script>

<style lang="scss">
#club-page {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>