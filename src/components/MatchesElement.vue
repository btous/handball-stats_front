<template>
  <div class="matches-row-element clickable" @click="goTo">
    <div class="match-date" :title="matchWeekDay(match.id)+' '+matchMonthDay(match.id)+'-'+matchMonth(match.id)+'-'+matchYear(match.id)">
      {{ matchWeekDay(match.id)+' '+matchMonthDay(match.id)+'-'+matchMonth(match.id)+'-'+matchYear(match.id) }}
    </div>
    <div class="match-team match-local-team" :title="localTeam(match.id)">
      {{ localTeam(match.id) }}
    </div>
    <div class="match-score match-local-score" :title="localScore(match.id)">
      {{ localScore(match.id) | score }}
    </div>
    <div class="match-score match-visitor-score" :title="visitorScore(match.id)">
      {{ visitorScore(match.id) | score }}
    </div>
    <div class="match-team match-visitor-team" :title="visitorTeam(match.id)">
      {{ visitorTeam(match.id) }}
    </div>
    <div class="match-selector clickable">
      <fa-icon
        v-if="!checked"
        @click.stop="toggleChecked"
        :icon="['far', 'square']"
        class="medium-icon"
      />
      <fa-icon
        v-else
        @click.stop="toggleChecked"
        :icon="['far', 'check-square']"
        class="medium-icon"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "MatchesElement",
  props: [ 'match' ],
  data() {
    return {
      checked: false,
    };
  },
  computed: {
    ...mapGetters([
      'teamName',
      'matchWeekDay',
      'matchMonthDay',
      'matchMonth',
      'matchYear',
      'localTeam',
      'visitorTeam',
      'localScore',
      'visitorScore'
    ]),
  },
  methods: {
    toggleChecked() {
      this.checked = !this.checked;
      this.$store.dispatch('updateMatchesChecked', this.match.id);
    },
    goTo() {
      this.$store.dispatch('setMatchTab', 0);
      this.$store.dispatch('setMatch', this.match);
      this.$router.push("/match");
    },
  },
  created() {
    this.$store.dispatch('setMatch', this.match);
  }
};
</script>

<style lang="scss">
// posicionar els elements al grid de la fila
.matches-row-element {
  position: relative;
  display: grid;
  grid-template-columns: 1fr auto auto 1fr;
  grid-template-rows: auto 1fr;
  background-color: transparent;
  padding: 0.8rem 0.625rem;
  border-bottom: 1px solid $secondary-color;
  align-items: center;
  text-align: center;
  .match-date {
    grid-column: 1 / -1;
    grid-row: 1 / 2;
    font-size: $small-font-size;
  }

  .match-team {
    padding: 0 0.5rem;
  }

  .match-local-team {
    grid-column: 1 / 2;
    grid-row: 2 / 3;
  }

  .match-visitor-team {
    grid-column: -2 / -1;
    grid-row: 2 / 3;
  }

  .match-score {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: $main-color;
    color: $secondary-color;
    width: 2.5rem;
    height: 2rem;
  }

  .match-local-score {
    grid-column: 2 / 3;
    grid-row: 2 / 3;
    margin-right: 0.2rem;
    border-radius: 0.3rem 0 0 0.3rem;
  }

  .match-visitor-score {
    grid-column: -2 / -3;
    grid-row: 2 / 3;
    margin-left: 0.2rem;
    border-radius: 0 0.3rem 0.3rem 0;
  }

  .match-selector {
    position: absolute;
    top: 0.625rem;
    right: 0.625rem;
  }
}
</style>
