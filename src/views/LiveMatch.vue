<template>
  <div id="live-match-page">
    <header id="header" class="match-scoreboard">
      <div class="scoreboard-result">
        <h4 class="match-team match-local-team" :title="localTeam()">
          {{ localTeam() }}
        </h4>
        <h4 class="match-score match-local-score" :title="localScore()">
          {{ localScore() | score }}
        </h4>
        <h4 class="match-score match-visitor-score" :title="visitorScore()">
          {{ visitorScore() | score }}
        </h4>
        <h4 class="match-team match-visitor-team" :title="visitorTeam()">
          {{ visitorTeam() }}
        </h4>
      </div>
      <div class="scoreboard-time">
        <button id="decrease30s" class="adjust-chrono-button decrease-chrono" @click="adjustChrono(-30)">-30</button>
        <button id="decrease10s" class="adjust-chrono-button decrease-chrono" @click="adjustChrono(-10)">-10</button>
        <div id="chrono-time" class="clickable" @click="toggleChrono">
          <div>{{ chronoPeriod | clock }}</div>
          <div>{{ period }}a part</div>
        </div>
        <button id="increase10s" class="adjust-chrono-button increase-chrono" @click="adjustChrono(10)">+10</button>
        <button id="increase30s" class="adjust-chrono-button increase-chrono" @click="adjustChrono(30)">+30</button>
      </div>
    </header>
    <ShotAction v-if="showAction.shot" @submitAction="submitAction" @cancelAction="cancelAction" />
    <SaveAction v-else-if="showAction.save" @submitAction="submitAction" @cancelAction="cancelAction" />
    <template v-else>
      <section id="players-section" class="match-section">
        <h4 class="match-section-title">Jugadors</h4>
        <PlayersList :liveMatchPage="true" />
      </section>
      <section id="actions-section" class="match-section">
        <h4 class="match-section-title">Accions</h4>
        <ActionsList />
      </section>
    </template>
    <FooterSettings :startChronoIcon="!playing&&match.matchState!=='ended'" :stopChronoIcon="playing&&match.matchState!=='ended'" :exitIcon="true" @startChronoClicked="toggleChrono" @stopChronoClicked="toggleChrono" @exitClicked="$router.go(-1)" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import FooterSettings from "../components/FooterSettings.vue";
import PlayersList from "../components/PlayersList.vue";
import ActionsList from "../components/ActionsList.vue";
import ShotAction from "../components/actions/ShotAction.vue";
import SaveAction from "../components/actions/SaveAction.vue";

export default {
  name: "LiveMatchPage",
  components: {
    FooterSettings,
    PlayersList,
    ActionsList,
    ShotAction,
    SaveAction,
  },
  data() {
    return {
      showAction: {
        shot: false,
        save: false,
      },
      timer: null,
      playing: false,
    };
  },
  computed: {
    ...mapGetters([
      "match",
      "localTeam",
      "visitorTeam",
      "localScore",
      "visitorScore",
      "liveMatchElements",
      "startTime",
      "referenceTime",
      "lastChrono",
      "chrono",
    ]),
    chronoPeriod() {
      return (
        this.chrono - (this.period - 1) * this.match.periodsDuration * 60 * 1000
      );
    },
    period() {
      let val = Math.trunc(
        this.chrono / 1000 / 60 / this.match.periodsDuration
      );
      if (val >= this.match.periods) {
        return val;
      } else {
        return val + 1;
      }
    },
  },
  watch: {
    liveMatchElements: {
      handler(value) {
        if (value.action !== "") {
          switch (this.liveMatchElements.action) {
            case "shot":
              if (value.player !== "") {
                this.newShot();
              }
              break;
            case "save":
              if (value.player !== "") {
                this.newSave();
              }
              break;
          }
        }
      },
      deep: true,
    },
    chrono(value) {
      let secondsPeriod = 60 * this.match.periodsDuration;
      let secondsMatch = 60 * this.match.periodsDuration * this.match.periods;
      let secondsChrono = Math.trunc(value / 1000);
      let secondsChronoPeriod = Math.trunc(
        (value - (this.period - 2) * this.match.periodsDuration * 60 * 1000) /
          1000
      );
      if (secondsChronoPeriod === secondsPeriod&&this.period>1) {
        // console.log("Final període");
        setTimeout(() => alert("Final del període"));
        this.stopChrono();
        this.saveMatch();
      }
      if (secondsChrono === secondsMatch) {
        // console.log("Final partit");
        setTimeout(() => alert("Final del partit"));
        this.match.matchState = "ended";
        this.stopChrono();
        this.saveMatch();
      }
    },
  },
  methods: {
    ...mapActions([
      "getPlayers",
      "addAction",
      "setMatch",
      "setStartTime",
      "setReferenceTime",
      "setLastChrono",
      "updateChrono",
      "updateMatch",
    ]),
    startMatch() {
      let startTime = new Date();
      this.setStartTime(startTime);
      this.setReferenceTime(startTime);
      this.setLastChrono(0);
      this.match.matchState = "inProgress";
    },
    resumeMatch() {
      // this.setStartTime(new Date(this.startTime));
      // this.match.result.actualTime = new Date(this.match.result.actualTime);
      this.setReferenceTime(new Date());
      let actualTime = new Date(this.match.result.actualTime).getTime();
      if (actualTime >= this.chrono) {
        this.setLastChrono(actualTime);
      } else {
        this.setLastChrono(this.chrono);
      }
      this.runningChrono();
    },
    saveMatch() {
      let startSeconds = new Date(this.startTime).getTime() / 1000;
      let actualTimeSeconds = this.chrono / 1000;
      this.match.result.startTime = Math.floor(startSeconds);
      this.match.result.actualTime = Math.floor(actualTimeSeconds);
      this.updateMatch();
      this.match.result.actualTime = new Date(
        this.match.result.actualTime * 1000
      );
    },
    submitAction(data) {
      //add instant to action
      let startSeconds = new Date(this.startTime).getTime() / 1000;
      let actionSeconds = this.chrono / 1000;
      data.data.body.time = Math.floor(startSeconds + actionSeconds);
      this.addAction(data.data)
        .then(() => {
          this.hideAction(data.action);
          if (data.action === "shot" && data.data.body.successful) {
            this.match.result.teamScore++;
          }
          if (data.action === "save" && !data.data.body.successful) {
            this.match.result.opponentScore++;
          }
        })
        // .catch(() =>
        //   console.log("Error en desar l'acció. El marcador no s'ha actualitzat")
        // );
    },
    cancelAction(action) {
      this.hideAction(action);
    },
    newShot() {
      this.showAction.shot = true;
    },
    newSave() {
      this.showAction.save = true;
    },
    hideAction(action) {
      this.showAction[action] = false;
    },
    startChrono() {
      this.setReferenceTime(new Date());
      this.timer = setInterval(() => this.runningChrono(), 1000);
      this.playing = true;
    },
    stopChrono() {
      clearInterval(this.timer);
      this.setLastChrono(this.chrono);
      this.playing = false;
    },
    runningChrono() {
      this.updateChrono(new Date() - this.referenceTime + this.lastChrono);
    },
    toggleChrono() {
      if (this.playing) {
        this.stopChrono();
      } else {
        this.startChrono();
      }
    },
    adjustChrono(value) {
      if (!this.playing) {
        this.setReferenceTime(new Date());
        this.referenceTime.setSeconds(this.referenceTime.getSeconds() - value);
        this.runningChrono();
        this.setLastChrono(this.chrono);
      } else {
        this.referenceTime.setSeconds(this.referenceTime.getSeconds() - value);
        this.runningChrono();
      }
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
  },
  created() {
    this.loadData();
    this.$store.dispatch("setHidePlayersCheckbox", true);
    if (this.match.matchState === "pending") {
      // console.log("Partit nou iniciat");
      this.startMatch();
    }
    if (this.match.matchState === "inProgress") {
      // console.log("Partit en joc continuat");
      this.resumeMatch();
    }
    if (this.match.matchState === "ended") {
      // console.log("Partit finalitzat");
      this.resumeMatch();
    }
  },
  beforeDestroy() {
    this.stopChrono();
    this.saveMatch();
  },
};
</script>

<style lang="scss">
#live-match-page {
  display: flex;
  flex-direction: column;
  height: 100%;

  .match-scoreboard {
    display: flex;
    flex-direction: column;

    .scoreboard-result {
      display: flex;
      grid-gap: 1.25rem;
      justify-content: center;
      align-items: center;
      text-align: center;
      padding: 1em 1.5rem;
      background: $secondary-color;
      border-bottom: 1px solid $main-color;

      .match-team {
        flex: 1;
      }

      .match-score {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.5em;
        color: $secondary-color;
        background-color: $main-color;
        border-radius: 50%;
      }
    }

    .scoreboard-time {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.625rem;
      padding: 0.3125rem 0;
      background: $main-color;

      #chrono-time {
        font-weight: bold;
        text-align: center;
        color: $secondary-color;
      }

      .adjust-chrono-button {
        font-size: 0.8em;
        padding: 0;
        border-radius: 50%;
        width: 2.5rem;
        height: 2.5rem;
      }
    }
  }

  .match-section {
    .match-section-title {
      text-align: center;
      padding: 0.3em;
      border: 2px solid $secondary-color;
      margin-bottom: 1.25rem;
      border-radius: 0.5rem;
    }

    .active-match-element {
      background: $main-color;
      color: $secondary-color;
    }
  }

  .match-action-section {
    flex: 1;
    overflow: auto;
    padding: 1em 1.5rem;
  }

  #players-section {
    flex: 1;
    overflow: auto;
    padding: 1em 1.5rem;

    #players-container {
      .row-element {
        display: flex;
        margin: 0 auto;
        align-items: center;
        max-width: 25rem;
        margin-bottom: 0.625em;
        padding: 0.3125em 0.625rem;
        border: 2px solid $main-color;
        border-radius: 3rem;

        .player-number-container {
          width: 2rem;
          height: 2rem;

          .player-number {
            font-size: 1em;
          }
        }

        .player-age,
        .player-position {
          display: none;
        }
      }
    }
  }

  #actions-section {
    flex-grow: 0;
    padding: 1em 1.5rem;
    border-top: 1px solid $main-color;

    #actions-container {
      display: flex;
      justify-content: center;
      gap: 1.25rem;

      .action-element {
        flex: 1;
        max-width: 12.5rem;
        text-align: center;
        padding: 0.625em 0.625rem;
        border: 2px solid $main-color;
        border-radius: 3rem;
      }
    }
  }

  .radio-successful {
    display: flex;
    justify-content: center;
    gap: 1.25rem;
  }

  .radio-shot-direction {
    margin: 1.25em 0;
    height: calc(46.8vw + 9px); // if I set 9px stills show a line in Chrome
    max-height: 209px; // if I set 210px stills show a line in Chrome
    overflow: hidden;
    border-collapse: collapse;

    .goal-table {
      margin: 10px auto;
      width: 70vw;
      max-width: 300px;
      height: 46.8vw;
      max-height: 200px;
      text-align: center;
      outline: 10px dashed red;
      box-shadow: 0 0 0 10px white;

      td {
        border: 1px dashed white;
      }

      tr:first-child td {
        border-top: none;
      }
      tr td:first-child {
        border-left: none;
      }
      tr td:last-child {
        border-right: none;
      }
      tr:last-child td {
        border-bottom: none;
      }
    }
  }

  .radio-shot-position {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>