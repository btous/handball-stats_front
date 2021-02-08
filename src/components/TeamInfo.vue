<template>
  <div class="info-element team-info">
    <p class="info-label">Nom</p>
    <h4 class="info-value">{{ team.name }}</h4>
    <p class="info-label">Categoria</p>
    <h4 class="info-value">{{ team.category }}</h4>
    <p class="info-label">Etiqueta</p>
    <h4 class="info-value">{{ team.categoryLabel }}</h4>
    <p class="info-label">Divisió</p>
    <h4 class="info-value">{{ team.league }}</h4>
    <p class="info-label">Gènere</p>
    <h4 class="info-value">{{ team.gender }}</h4>
  </div>
</template>

<script>
export default {
  name: "TeamInfo",
  props: [ 'team' ]
};
</script>

<style lang="scss">
</style>
