<template>
  <header id="header-comp">
    <div class="left-icons">
      <fa-icon v-if="backIcon" @click="$router.go(-1)" id="back-icon" icon="chevron-left" class="medium-icon clickable" />
    </div>
    <div class="right-icons">
      <fa-icon v-if="searchIcon" id="search-icon" icon="search" class="big-icon clickable" />
      <fa-icon v-if="userIcon&&!logged" id="user-icon" icon="user-circle" class="big-icon clickable" />
      <fa-icon v-else-if="userIcon" id="logout-icon" @click="signOut" icon="sign-out-alt" class="big-icon clickable" />
    </div>
  </header>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "HeaderComp",
  components: {},
  props: ["backIcon", "searchIcon", "userIcon"],
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["logged"]),
  },
  watch: {},
  methods: {
    signOut() {
      this.$store.dispatch("resetApp");
      this.$router.push("/").catch(() => {});
    },
  },
};
</script>

<style lang="scss">
#header-comp {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.5em 1.5rem;
  background-color: $light-background;
  border-bottom: 1px solid $main-color;

  .left-icons {
    * {
      margin-right: 1.25rem;
    }
  }
  .right-icons {
    margin-left: auto;
    * {
      margin-left: 1.25rem;
    }
  }
}
</style>

<style lang="scss" scoped>
a {
  line-height: 1em;
}
</style>
