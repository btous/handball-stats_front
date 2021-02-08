<template>
  <section id="data-container">
    <b-tabs v-model="tabIndex">
      <b-tab
        id="tab-info"
        class="tab-container"
        title="Informació"
      >
        <MatchInfo :match="match" />
      </b-tab>
      <b-tab
        id="tab-players"
        class="tab-container"
        title="Jugadors"
      >
        <PlayersList parent="matches" :parentId="match.id" />
      </b-tab>
      <b-tab
        id="tab-stats"
        class="tab-container"
        title="Estadístiques"
      >
        <MatchStats :match="match" />
      </b-tab>
    </b-tabs>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import MatchInfo from '../components/MatchInfo.vue';
import PlayersList from '../components/PlayersList.vue';
import MatchStats from './MatchStats.vue';

export default {
  name: "MatchData",
  components: { MatchInfo, PlayersList, MatchStats },
  computed: {
    ...mapGetters(["match"]),
    tabIndex: {
      get() {
        return this.$store.getters.matchTab;
      },
      set(value) {
        this.$store.dispatch('setMatchTab', value)
      }
    }
  },
  methods: {
    getElementType() {
      switch (this.tabIndex) {
        case 0:
          this.$emit('setElementType', null);
          break;
        case 1:
          this.$emit('setElementType', 'match-player');
          break;
        case 2:
          this.$emit('setElementType', null);
          break;
        default:
          this.$emit('setElementType', null);
      }
    }
  }
};
</script>

<style lang="scss">
</style>
