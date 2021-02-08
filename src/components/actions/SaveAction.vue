<template>
  <section class="match-action-section">
    <form class="app-form action-form">
      <fieldset class="radio-successful">
        <label for="goal">
          <input type="radio" id="goal" v-model="save.successful" :value="false" />
          Gol
        </label>
        <label for="not-goal">
          <input type="radio" id="not-goal" v-model="save.successful" :value="true" />
          Aturada
        </label>
      </fieldset>

      <fieldset class="radio-shot-direction">
        <table class="goal-table">
          <tr>
            <td><input type="radio" id="upLeft" v-model="save.shotDirection" value="upLeft" /></td>
            <td><input type="radio" id="upCenter" v-model="save.shotDirection" value="upCenter" /></td>
            <td><input type="radio" id="upRight" v-model="save.shotDirection" value="upRight" /></td>
          </tr>
          <tr>
            <td><input type="radio" id="midLeft" v-model="save.shotDirection" value="midLeft" /></td>
            <td><input type="radio" id="midCenter" v-model="save.shotDirection" value="midCenter" /></td>
            <td><input type="radio" id="midRight" v-model="save.shotDirection" value="midRight" /></td>
          </tr>
          <tr>
            <td><input type="radio" id="downLeft" v-model="save.shotDirection" value="downLeft" /></td>
            <td><input type="radio" id="downCenter" v-model="save.shotDirection" value="downCenter" /></td>
            <td><input type="radio" id="downRight" v-model="save.shotDirection" value="downRight" /></td>
          </tr>

        </table>
      </fieldset>

      <fieldset class="radio-shot-position">
        <label for="6m">
          <input type="radio" id="6m" v-model="save.shotPosition" value="position6m" />
          6 metres
        </label>
        <label for="9m">
          <input type="radio" id="9m" v-model="save.shotPosition" value="position9m" />
          9 metres
        </label>
        <label for="7m">
          <input type="radio" id="7m" v-model="save.shotPosition" value="position7m" />
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
  name: "SaveAction",
  data() {
    return {
      errors: [],
    };
  },
  computed: {
    ...mapGetters(["save", "match", "liveMatchElements"]),
  },
  methods: {
    validateAction() {
      this.errors = [];
      if(this.save.successful===undefined) {
        this.errors.push("Escull entre gol i aturada");
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
      this.save.actionType = "save";
      this.save.type = "save";
      this.save.match = new Object({ id: this.match.id });
      this.save.player = new Object({ id: this.liveMatchElements.player });
      const data = {
        action: "save",
        data: {
          URL: "/saves/new_save",
          method: "POST",
          body: this.save,
        },
      };
      this.$emit("submitAction", data);
    },
    cancelAction() {
      this.$emit("cancelAction", "save");
    },
  },
  created() {
    this.$store.dispatch("setSave", {});
  },
};
</script>

<style lang="scss">
</style>
