<template>
  <div class="row-element teams-row clickable" @click="goTo">
    <div class="team-category" :title="team.category+' '+team.categoryLabel">
      {{ team.category }} {{ team.gender }} {{ team.categoryLabel }}
    </div>
    <div class="team-league" :title="team.league">
      {{ team.league }}
    </div>
    <div class="team-num-players" :title="team.players.length+' jugadors'">
      {{ team.players.length }} jugadors
    </div>
    <div class="selector-element team-selector clickable">
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
export default {
  name: "TeamsElement",
  components: {},
  props: [ 'team' ],
  data() {
    return {
        checked: false
    };
  },
  methods: {
    toggleChecked() {
      this.checked = !this.checked;
      this.$store.dispatch('updateTeamsChecked', this.team.id);
    },
    goTo() {
      this.$store.dispatch('setTeamTab', 0);
      this.$store.dispatch('setTeam', this.team);
      this.$router.push('/team');
    }
  },
};
</script>

<style lang="scss">
// posicionar els elements al grid de la fila
.row-element {
  .team-category {
    grid-column: 2 / 3;
    white-space: nowrap;
    overflow: hidden;
    @include ellipsis();
    margin-right: 1rem;
  }

  .team-league {
    grid-column: 2 / 3;
    font-size: $small-font-size;
    white-space: nowrap;
    overflow: hidden;
    @include ellipsis();
    margin-right: 1rem;
  }

  .team-num-players {
    grid-column: 2 / 3;
    font-size: $small-font-size;
    white-space: nowrap;
    overflow: hidden;
    @include ellipsis();
    margin-right: 1rem;
  }
}
</style>
