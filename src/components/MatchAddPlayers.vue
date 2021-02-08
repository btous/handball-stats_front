<template>
  <section id="add-players">
    <header id="add-players-header">
      Selecciona els jugadors convocats
    </header>
    <form class="app-form add-players-form">
      <PlayersList />
      <fieldset class="form-buttons">
        <button class="form-button accept-button" type="sumbit" @click.prevent="submitForm">
          Acceptar
        </button>
        <button class="form-button cancel-button" @click.prevent="cancelForm">
          Cancel·lar
        </button>
      </fieldset>
    </form>
  </section>
</template>

<script>
import PlayersList from "../components/PlayersList.vue";

export default {
  name: "MatchAddPlayers",
  components: { PlayersList },
  methods: {
    submitForm() {
      this.$emit('submitForm');
    },
    cancelForm() {
      this.$emit('cancelForm');
    }
  }
};
</script>

<style lang="scss">
</style>
