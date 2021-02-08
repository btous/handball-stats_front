<template>
  <div id="actions-container" class="rows-layout">
    <div id="shot-element" class="action-element clickable" :class="{'active-match-element': matchActiveClasses.shot}" @click="actionClicked('shot')" >
      Llançament
    </div>
    <div id="save-element" class="action-element clickable" :class="{'active-match-element': matchActiveClasses.save}" @click="actionClicked('save')" >
      Aturada
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: "ActionsList",
  props: ["parent", "parentId"],
  data() {
    return {
      matchActiveClasses: {
        shot: false,
        save: false,
      }
    };
  },
  methods: {
    ...mapActions(["setLiveMatchActionType"]),
    actionClicked(action) {
      this.setMatchActiveClass(action);
      this.setLiveMatchActionType(action);
    },
    setMatchActiveClass(action) {
      for (let key in this.matchActiveClasses) {
        if (key === action) {
          this.matchActiveClasses[key] = !this.matchActiveClasses[key];
        } else {
          this.matchActiveClasses[key] = false;
        }
      }
    },
  },
  created() {
    this.$store.dispatch('resetLiveMatchElements');
  }
};
</script>

<style lang="scss">
</style>
