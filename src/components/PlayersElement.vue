<template>
  <div class="row-element players-row clickable" @click="playerClicked(player)">
    <div class="thumbnail-element player-number-container" :title="player.number">
      <h3 class="player-number">
        <span v-if="player.number">{{ player.number }}</span>
        <span v-else>-</span>
      </h3>
    </div>
    <div class="player-name" :title="player.name + ' ' + player.surname">
      {{ player.name }} {{ player.surname }}
    </div>
    <div v-if="player.birthday" class="player-age" :title="player.birthday | age | ageText">
      {{ player.birthday | age | ageText }}
    </div>
    <div v-if="player.position" class="player-position" :title="player.position">
      {{ player.position }}
    </div>
    <div v-if="!hidePlayersCheckbox" class="selector-element player-selector clickable">
      <fa-icon v-if="!checked" @click.stop="toggleChecked" :icon="['far', 'square']" class="medium-icon" />
      <fa-icon v-else @click.stop="toggleChecked" :icon="['far', 'check-square']" class="medium-icon" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "PlayersElement",
  components: {},
  props: ["player"],
  data() {
    return {
      checked: false,
    };
  },
  computed: {
    ...mapGetters(["players", "playersCheckedId", "hidePlayersCheckbox"]),
  },
  methods: {
    toggleChecked() {
      this.checked = !this.checked;
      this.$store.dispatch("updatePlayersChecked", this.player.id);
    },
    setMatchPlayersCheck() {
      if (this.playersCheckedId.indexOf(this.player.id) >= 0) {
        this.checked = !this.checked;
      }
    },
    playerClicked(player) {
      this.$emit('playerClicked', player);
    },
  },
  created() {
    this.setMatchPlayersCheck();
  },
};
</script>

<style lang="scss">
// posicionar els elements al grid de la fila
.row-element {
  .player-number-container {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: $main-color;
    color: $secondary-color;
    width: 4rem;
    height: 4rem;
    margin-right: 1rem;
    border-radius: 50%;

    .player-number {
      margin: 0;
    }
  }

  .player-name {
    grid-column: 2 / 3;
    white-space: nowrap;
    overflow: hidden;
    @include ellipsis();
    margin-right: 1rem;
  }

  .player-age {
    grid-column: 2 / 3;
    font-size: $small-font-size;
    white-space: nowrap;
    overflow: hidden;
    @include ellipsis();
    margin-right: 1rem;
  }

  .player-position {
    grid-column: 2 / 3;
    font-size: $small-font-size;
    white-space: nowrap;
    overflow: hidden;
    @include ellipsis();
    margin-right: 1rem;
  }
}
</style>
