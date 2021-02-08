<template>
  <div id="team-page">
    <HeaderComp :backIcon="true" :searchIcon="true" :userIcon="true" />
    <main id="main-content">
      <h2 class="club-title">{{ clubName }}</h2>
      <h3 class="team-category-title">
        {{ team.category }} {{ team.gender }} {{ team.categoryLabel }}
      </h3>
      <TeamData :team="team" />
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
import TeamData from "../components/TeamData.vue";

export default {
  name: "TeamPage",
  components: { FooterSettings, HeaderComp, TeamData },
  data() {
    return {
      elementsCheckedId: [],
    };
  },
  computed: {
    ...mapGetters(["teamTab", "team", "clubName"]),
    elementType() {
      switch (this.teamTab) {
        case 0:
          return null;
        case 1:
        case 2:
        case 3:
          return 'match';
        case 4:
          return 'team-player';
        case 5:
          return null;
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
        case 'match':
          return 'partit'
        case 'team-player':
          return 'jugador'
        default:
          return false
      }
    },
    editIcon() {
      switch (this.elementType) {
        case 'match':
          return 'partit'
        case 'team-player':
          return 'jugador'
        default:
          return false
      }
    },
    deleteIcon() {
      switch (this.elementType) {
        case 'match':
          return 'partit'
        case 'team-player':
          return 'jugador'
        default:
          return false
      }
    }
  },
  methods: {
    ...mapActions([
      "getPlayers",
      "getPendingMatches",
      "getInProgressMatches",
      "getEndedMatches",
      "deletePlayer",
      "deleteMatch",
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
        case "match":
          this.loadMatches();
          break;
        case "player":
          this.loadPlayers();
          break;
        default:
          this.loadMatches();
          this.loadPlayers();
      }
    },
    loadMatches() {
      const dataPending = {
        URL: "/teams/" + this.team.id + "/pending_matches",
        method: "GET",
      };
      this.getPendingMatches(dataPending);
      const dataInProgress = {
        URL: "/teams/" + this.team.id + "/in_progress_matches",
        method: "GET",
      };
      this.getInProgressMatches(dataInProgress);
      const dataEnded = {
        URL: "/teams/" + this.team.id + "/ended_matches",
        method: "GET",
      };
      this.getEndedMatches(dataEnded);
    },
    loadPlayers() {
      const data = {
        URL: "/teams/" + this.team.id + "/players/",
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
#team-page {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>