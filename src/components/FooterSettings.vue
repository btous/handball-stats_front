<template>
  <footer id="footer-settings">
    <div v-if="createIcon" @click="createClicked" class="setting clickable">
      <fa-icon icon="plus" class="medium-icon" />
      <p class="setting-label">Crear {{ createIcon }}</p>
    </div>
    <div v-if="editIcon" @click="editClicked" class="setting clickable">
      <fa-icon icon="pen" class="medium-icon" />
      <p class="setting-label">Editar {{ editIcon }}</p>
    </div>
    <div v-if="deleteIcon" @click="deleteClicked" class="setting clickable">
      <fa-icon icon="trash-alt" class="medium-icon" />
      <p class="setting-label">Eliminar {{ deleteIcon }}<span v-if="deleteIcon!=='club'" >s</span></p>
    </div>
    <div v-if="startIcon" @click="startClicked" class="setting clickable">
      <fa-icon icon="play" class="medium-icon" />
      <p class="setting-label">Iniciar {{ startIcon }}</p>
    </div>
    <div v-if="addIcon" @click="addClicked" class="setting clickable">
      <fa-icon icon="user-plus" class="medium-icon" />
      <p class="setting-label">Afegir {{ addIcon }}</p>
    </div>
    <div v-if="startChronoIcon" @click="startChronoClicked" class="setting clickable">
      <fa-icon icon="stopwatch-20" class="medium-icon" />
      <p class="setting-label">Iniciar</p>
    </div>
    <div v-if="stopChronoIcon" @click="stopChronoClicked" class="setting clickable">
      <fa-icon icon="stopwatch" class="medium-icon" />
      <p class="setting-label">Aturar</p>
    </div>
    <div v-if="exitIcon" @click="exitClicked" class="setting clickable">
      <fa-icon icon="door-open" class="medium-icon" />
      <p class="setting-label">Desar i sortir</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterSettings",
  components: {},
  props: ["createIcon", "editIcon", "deleteIcon", "startIcon", "addIcon", "startChronoIcon", "stopChronoIcon", "exitIcon"],
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
    createClicked() {
      this.$emit("createClicked");
    },
    editClicked() {
      this.$emit("editClicked");
    },
    deleteClicked() {
      this.$emit("deleteClicked");
    },
    startClicked() {
      this.$emit("startClicked");
    },
    addClicked() {
      this.$emit("addClicked");
    },
    startChronoClicked() {
      this.$emit("startChronoClicked");
    },
    stopChronoClicked() {
      this.$emit("stopChronoClicked");
    },
    exitClicked() {
      this.$emit("exitClicked");
    },
  },
};
</script>

<style lang="scss">
#footer-settings {
  display: flex;
  justify-content: space-around;
  gap: 1.25rem;
  background-color: $dark-background;
  border-top: 1px solid $main-color;
  padding: 0.5em 1.5rem;
  text-align: center;

  .setting {
    min-width: 5.5rem;
  }

  .setting-label {
    margin: 0;
    font-size: $small-font-size;
  }
}
</style>
