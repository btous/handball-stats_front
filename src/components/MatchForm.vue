<template>
  <form class="app-form create-edit match-form">
    <label class="form-label" for="match-opponent">Rival*</label>
    <input id="match-opponent" class="text-input" v-model="match.opponent" placeholder="Rival del partit" />

    <fieldset class="radio-home-away">
      <p class="info-label">Juguem com a*</p>
      <label for="home">
        <input type="radio" id="home" v-model="match.homeAway" value="home" />
        Locals
      </label>
      <label for="away">
        <input type="radio" id="away" v-model="match.homeAway" value="away" />
        Visitants
      </label>
    </fieldset>

    <label class="form-label" for="match-date">Dia*</label>
    <input id="match-date" class="text-input" v-model="match.date" type="date" placeholder="Dia del partit" />

    <label class="form-label" for="match-tournament">Competició</label>
    <input id="match-tournament" class="text-input" v-model="match.tournament" placeholder="Escriu la competició" />

    <fieldset class="periods-duration">
      <div>
        <label class="form-label" for="match-periods">Períodes*</label>
        <input id="match-periods" class="text-input" min="1" v-model="match.periods" type="number" placeholder="Número" />
      </div>
      <div>
        <label class="form-label" for="match-periods-duration">Durada dels períodes (minuts)*</label>
        <input id="match-periods-duration" class="text-input" min="1" v-model="match.periodsDuration" type="number" placeholder="Minuts de cada part" />
      </div>
    </fieldset>

    <fieldset class="match-timeouts">
      <div>
        <label class="form-label" for="match-timeouts-total">Temps morts per partit</label>
        <input id="match-timeouts-total" class="text-input" v-model="match.totalTimeouts" type="number" placeholder="Temps morts totals" />
      </div>
      <div>
        <label class="form-label" for="match-timeouts-period">Temps morts per període</label>
        <input id="match-timeouts-period" class="text-input" v-model="match.periodTimeouts" type="number" placeholder="Temps morts per part" />
      </div>
    </fieldset>

    <fieldset class="errors">
      <div v-for="error in errors" :key="error">{{ error }}</div>
    </fieldset>

    <fieldset class="form-buttons">
      <button class="form-button accept-button" type="sumbit" @click.prevent="submitForm">
        Acceptar
      </button>
      <button class="form-button cancel-button" @click.prevent="cancelForm">
        Cancel·lar
      </button>
    </fieldset>
  </form>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "MatchForm",
  data() {
    return {
      errors: [],
    };
  },
  computed: {
    ...mapGetters(["team", "match", "creating"]),
  },
  methods: {
    validateForm() {
      this.errors = [];
      if(!this.match.opponent||this.match.opponent==="") {
        this.errors.push("Introdueix el nom del rival");
      }
      if(!this.match.homeAway||this.match.homeAway==="") {
        this.errors.push("Escull entre locals i visitants");
      }
      if(!this.match.date||this.match.date==="") {
        this.errors.push("Introdueix el dia del partit");
      }
      if(!this.match.periods||this.match.periods==="") {
        this.errors.push("Introdueix el número de períodes");
      } else if(this.match.periods<=0) {
        this.errors.push("El número de períodes ha de ser major que 0");
      }
      if(!this.match.periodsDuration||this.match.periodsDuration==="") {
        this.errors.push("Introdueix els minuts de durada dels períodes");
      } else if(this.match.periodsDuration<=0) {
        this.errors.push("La durada dels períodes ha de ser major que 0");
      }
      if (this.errors.length === 0) {
        return true;
      } else {
        return false;
      }
    },
    submitForm() {
      if (this.validateForm()) {
        this.saveMatch();
      }
    },
    saveMatch() {
      // this.match.team = this.team;
      this.match.team = new Object({ id: this.team.id });
      if (this.creating) {
        const data = {
          URL: "/matches/new_match",
          method: "POST",
          body: this.match,
        };
        this.$store
          .dispatch("callBackend", data)
          // .then(() => console.log("Partit desat"))
          .then(() => this.$router.replace(this.$router.go(-1)).catch(() => {}))
          // .catch((error) => {
          //   console.log("Error during saveMatch(): ");
          //   console.log(error);
          // });
      } else {
        const data = {
          URL: "/matches/" + this.match.id,
          method: "PUT",
          body: this.match,
        };
        this.$store
          .dispatch("callBackend", data)
          // .then(() => console.log("Partit actualitzat"))
          .then(() => this.$router.replace(this.$router.go(-1)).catch(() => {}))
          // .catch((error) => {
          //   console.log("Error during updateMatch(): ");
          //   console.log(error);
          // });
      }
    },
    cancelForm() {
      this.$router.replace(this.$router.go(-1)).catch(() => {});
    },
  },
};
</script>

<style lang="scss">
.radio-home-away * {
  margin-right: 2.5rem;
  * {
    margin-right: 0.625rem;
  }
}

.periods-duration {
  display: flex;
  flex-wrap: wrap;

  #match-periods {
    width: 6.25rem;
    margin-right: 1.875rem;
  }
}

.match-timeouts {
  display: flex;
  flex-wrap: wrap;

  #match-timeouts-total {
    width: 12.5rem;
    margin-right: 1.875rem;
  }
}
</style>
