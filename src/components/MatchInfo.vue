<template>
  <div class="info-element match-info">
    <p class="info-label">Dia</p>
    <h4 class="info-value">{{ match.date | weekDay }} {{ match.date | dateFormatted }}</h4>
    <p class="info-label">Número de períodes</p>
    <h4 class="info-value">{{ match.periods }}</h4>
    <p class="info-label">Durada dels períodes</p>
    <h4 class="info-value">{{ match.periodsDuration }} minuts</h4>
    <p class="info-label">Timeouts totals</p>
    <h4 class="info-value">{{ match.totalTimeouts }} (cada equip)</h4>
    <p class="info-label" v-if="match.totalTimeouts!==match.periodTimeouts" >Timeouts màxims per part</p>
    <h4 class="info-value" v-if="match.totalTimeouts!==match.periodTimeouts">{{ match.periodTimeouts }} (cada equip)
      </h4>
  </div>
</template>

<script>
export default {
  name: "MatchInfo",
  props: [ 'match' ]
};
</script>

<style lang="scss">
</style>
