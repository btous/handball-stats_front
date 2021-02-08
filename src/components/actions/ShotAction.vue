<template>
  <section class="match-action-section">
    <form class="app-form action-form">
      <fieldset class="radio-successful">
        <label for="goal">
          <input type="radio" id="goal" v-model="shot.successful" :value="true" />
          Gol
        </label>
        <label for="not-goal">
          <input type="radio" id="not-goal" v-model="shot.successful" :value="false" />
          Errada
        </label>
      </fieldset>

      <fieldset class="radio-shot-direction">
        <table class="goal-table">
          <tr>
            <td><input type="radio" id="upLeft" v-model="shot.shotDirection" value="upLeft" /></td>
            <td><input type="radio" id="upCenter" v-model="shot.shotDirection" value="upCenter" /></td>
            <td><input type="radio" id="upRight" v-model="shot.shotDirection" value="upRight" /></td>
          </tr>
          <tr>
            <td><input type="radio" id="midLeft" v-model="shot.shotDirection" value="midLeft" /></td>
            <td><input type="radio" id="midCenter" v-model="shot.shotDirection" value="midCenter" /></td>
            <td><input type="radio" id="midRight" v-model="shot.shotDirection" value="midRight" /></td>
          </tr>
          <tr>
            <td><input type="radio" id="downLeft" v-model="shot.shotDirection" value="downLeft" /></td>
            <td><input type="radio" id="downCenter" v-model="shot.shotDirection" value="downCenter" /></td>
            <td><input type="radio" id="downRight" v-model="shot.shotDirection" value="downRight" /></td>
          </tr>

        </table>
      </fieldset>

      <fieldset class="radio-shot-position">
        <label for="6m">
          <input type="radio" id="6m" v-model="shot.shotPosition" value="position6m" />
          6 metres
        </label>
        <label for="9m">
          <input type="radio" id="9m" v-model="shot.shotPosition" value="position9m" />
          9 metres
        </label>
        <label for="7m">
          <input type="radio" id="7m" v-model="shot.shotPosition" value="position7m" />
          7 metres (penal)
        </label>
      </fieldset>

      <fieldset class="errors">
        <div v-for="error in errors" :key="error">{{ error }}</div>
      </fieldset>

      <fieldset class="form-buttons">
        <button class="form-button accept-button" @click.prevent="submitAction">Acceptar</button>
        <button class="form-button cancel-button" @click.prevent="cancelAction">Cancel·lar</button>
      </fieldset>
    </form>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ShotAction",
  data() {
    return {
      errors: [],
    };
  },
  computed: {
    ...mapGetters(["shot", "match", "liveMatchElements"]),
  },
  methods: {
    validateAction() {
      this.errors = [];
      if(this.shot.successful===undefined) {
        this.errors.push("Escull entre gol i errada");
      }
      if (this.errors.length === 0) {
        return true;
      } else {
        return false;
      }
    },
    submitAction() {
      if (this.validateAction()) {
        this.saveAction();
      }
    },
    saveAction() {
      this.shot.actionType = "shot";
      this.shot.type = "shot";
      this.shot.match = new Object({ id: this.match.id });
      this.shot.player = new Object({ id: this.liveMatchElements.player });
      const data = {
        action: "shot",
        data: {
          URL: "/shots/new_shot",
          method: "POST",
          body: this.shot,
        },
      };
      this.$emit("submitAction", data);
    },
    cancelAction() {
      this.$emit("cancelAction", "shot");
    },
  },
  created() {
    this.$store.dispatch('setShot', {});
  }
};
</script>

<style lang="scss">
</style>
