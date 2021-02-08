<template>
  <div class="club-box">
    <h2 class="club-box-title">{{ club.name }}</h2>
    <div id="nav" class="pill-options">
      <div class="pill clickable" to="/club" @click="goToClub(0)">Equips</div>
      <div class="pill clickable" to="/club" @click="goToClub(1)">Jugadors</div>
    </div>
  </div>
</template>

<script>

export default {
  name: "ClubsBox",
  props: [ 'club' ],
  methods: {
    goToClub(tab) {
      this.$store.dispatch('setClub', this.club);
      this.$store.dispatch('setClubTab', tab);
      this.$router.push('/club');
    }
  },
};
</script>

<style lang="scss">
</style>
