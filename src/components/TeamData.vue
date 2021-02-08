<template>
  <section id="data-container">
    <b-tabs v-model="tabIndex">
      <b-tab
        id="tab-info"
        class="tab-container"
        title="Informació"
      >
        <TeamInfo :team="team" />
      </b-tab>
      <b-tab
        id="tab-pending-matches"
        class="tab-container"
        title="Partits pendents"
      >
        <MatchesList parent="teams" :parentId="team.id" matchState="pending" />
      </b-tab>
      <b-tab
        id="tab-in-progress-matches"
        class="tab-container"
        title="Partits en joc"
      >
        <MatchesList parent="teams" :parentId="team.id" matchState="in-progress" />
      </b-tab>
      <b-tab
        id="tab-ended-matches"
        class="tab-container"
        title="Partits finalitzats"
      >
        <MatchesList parent="teams" :parentId="team.id" matchState="ended" />
      </b-tab>
      <b-tab
        id="tab-players"
        class="tab-container"
        title="Jugadors"
      >
        <PlayersList parent="teams" :parentId="team.id" />
      </b-tab>
      <b-tab
        id="tab-stats"
        class="tab-container"
        title="Estadístiques"
      >
        <TeamStats />
      </b-tab>
    </b-tabs>
  </section>
</template>

<script>
import TeamInfo from '../components/TeamInfo.vue';
import MatchesList from '../components/MatchesList.vue';
import PlayersList from '../components/PlayersList.vue';
import TeamStats from './TeamStats.vue';

export default {
  name: "TeamData",
  components: { TeamInfo, MatchesList, PlayersList, TeamStats },
  props: [ 'team' ],
  computed: {
    tabIndex: {
      get() {
        return this.$store.getters.teamTab;
      },
      set(value) {
        this.$store.dispatch('setTeamTab', value)
      }
    }
  },
};
</script>

<style lang="scss">
</style>
