<template>
  <section id="data-container">
    <b-tabs v-model="tabIndex">
      <b-tab id="tab-equips" class="tab-container" title="Equips">
        <TeamsList parent="clubs" :parentId="club.id" />
      </b-tab>
      <b-tab id="tab-equips" class="tab-container" title="Jugadors">
        <PlayersList parent="clubs" :parentId="club.id" />
      </b-tab>
    </b-tabs>
  </section>
</template>

<script>
import TeamsList from '../components/TeamsList.vue';
import PlayersList from '../components/PlayersList.vue';

export default {
  name: "ClubData",
  components: { TeamsList, PlayersList },
  props: [ 'club' ],
  computed: {
    tabIndex: {
      get() {
        return this.$store.getters.clubTab;
      },
      set(value) {
        this.$store.dispatch('setClubTab', value)
      }
    }
  },
};
</script>

<style lang="scss">
</style>
