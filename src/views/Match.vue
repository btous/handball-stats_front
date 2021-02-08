<template>
  <div id="match-page">
    <HeaderComp :backIcon="true" :searchIcon="true" :userIcon="true" />
    <main id="main-content">
      <div class="match-title">
        <h3 class="match-team match-local-team" :title="localTeam(match.id)">
          {{ localTeam(match.id) }}
        </h3>
        <div class="match-score match-local-score">
          <h3 :title="localScore(match.id)">
            {{ localScore(match.id) | score }}
          </h3>
        </div>
        <div class="match-score match-visitor-score">
          <h3 :title="visitorScore(match.id)">
            {{ visitorScore(match.id) | score }}
          </h3>
        </div>
        <h3 class="match-team match-visitor-team" :title="visitorTeam(match.id)">
          {{ visitorTeam(match.id) }}
        </h3>
      </div>
      <MatchData v-if="!showTeamPlayersList" />
      <MatchAddPlayers v-else @submitForm="submitForm" @cancelForm="cancelForm" />
    </main>
    <FooterSettings v-if="showFooter" :startIcon="'partit'" :addIcon="'jugadors'" @startClicked="startClicked" @addClicked="addClicked" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import HeaderComp from "../components/HeaderComp.vue";
import FooterSettings from "../components/FooterSettings.vue";
import MatchData from "../components/MatchData.vue";
import MatchAddPlayers from "../components/MatchAddPlayers.vue";

export default {
  name: "MatchPage",
  components: { HeaderComp, FooterSettings, MatchData, MatchAddPlayers },
  data() {
    return {
      showTeamPlayersList: false,
    };
  },
  computed: {
    ...mapGetters([
      "hideCheckbox",
      "club",
      "team",
      "match",
      "players",
      "matchWeekDay",
      "matchMonthDay",
      "matchMonth",
      "matchYear",
      "localTeam",
      "visitorTeam",
      "localScore",
      "visitorScore",
    ]),
    showFooter() {
      if (this.showTeamPlayersList) {
        return false;
      } else {
        return true;
      }
    },
    playersCheckedId() {
      return this.players.map((player) => player.id);
    },
  },
  methods: {
    ...mapActions([
      "getMatch",
      "getPendingMatches",
      "getInProgressMatches",
      "getEndedMatches",
      "getPlayers",
      "setPlayersCheckedId",
      "setHidePlayersCheckbox",
      "setMatchPlayers",
      "updateChrono",
    ]),
    goTo() {
      this.$router.push("/live-match");
    },
    startClicked() {
      this.goTo();
    },
    addClicked() {
      this.setPlayersCheckedId(this.playersCheckedId);
      this.loadTeamPlayers();
      this.setHidePlayersCheckbox(false);
      this.showTeamPlayersList = true;
    },
    submitForm() {
      this.setMatchPlayers().then(() => {
        this.showTeamPlayersList = false;
        this.setHidePlayersCheckbox(true);
        this.loadMatchPlayers();
      });
    },
    cancelForm() {
      this.showTeamPlayersList = false;
      this.setHidePlayersCheckbox(true);
      this.loadMatchPlayers();
    },
    loadData(elementType) {
      switch (elementType) {
        case "player":
          this.loadMatchPlayers();
          break;
        default:
          this.loadMatchPlayers();
      }
    },
    loadMatchPlayers() {
      const data = {
        URL: "/matches/" + this.match.id + "/players/",
        method: "GET",
      };
      this.getPlayers(data);
    },
    loadTeamPlayers() {
      const data = {
        URL: "/teams/" + this.team.id + "/players/",
        method: "GET",
      };
      this.getPlayers(data);
    },
  },
  created() {
    this.$store.dispatch("resetElementsChecked");
    this.setHidePlayersCheckbox(true);
  },
  mounted() {
    this.loadData();
    this.updateChrono(null);
  },
};
</script>

<style lang="scss">
#match-page {
  display: flex;
  flex-direction: column;
  height: 100%;

  .match-title {
    display: grid;
    grid-gap: 0.625rem;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, auto);
    text-align: center;

    .match-team {
      grid-row: 1 / 2;
    }

    .match-score {
      grid-row: -1 / -2;
      display: flex;
      align-items: center;
      justify-content: center;

      h3 {
      padding: 0.5em;
      color: $secondary-color;
      background-color: $main-color;
      border-radius: 50%;
      }
    }

    .match-local-team,
    .match-local-score {
      grid-column: 1 / 2;
    }

    .match-visitor-team,
    .match-visitor-score {
      grid-column: -1 / -2;
    }
  }

  #add-players-header {
    margin: 1.5rem 0 0.5rem;
    padding: 0.5rem 0;
    text-align: center;
    font-size: $h4-font-size;
    border-bottom: 3px solid $secondary-color;
  }
}
</style>