<template>
  <div id="register-page">
    <HeaderComp :backIcon="false" :searchIcon="false" :userIcon="true" />
    <main id="main-content">
      <h2>Registra un nou usuari</h2>
      <form class="app-form login-register register-form">
        <label class="form-label" for="username">Nom d'usuari*</label>
        <input id="username" class="text-input" v-model="username" placeholder="Escull un nom d'usuari" />
        <label class="form-label" for="email">Correu electrònic*</label>
        <input id="email" class="text-input" type="email" v-model="email" placeholder="Introdueix el teu email" />
        <label class="form-label" for="password">Contrasenya*</label>
        <input id="password" class="text-input" type="password" v-model="password" placeholder="Escull una contrasenya" />
        <label class="form-label" for="passwordCopy">Confirma la contrasenya*</label>
        <input id="passwordCopy" class="text-input" type="password" v-model="passwordCopy" placeholder="Repeteix la contrasenya" />
        <fieldset class="errors">
          <div v-for="error in errors" :key="error">{{ error }}</div>
        </fieldset>
        <fieldset class="form-buttons">
          <button class="form-button accept-button" type="sumbit" @click.prevent="submitForm">
            Registra't
          </button>
          <button class="form-button cancel-button" @click.prevent="cancelForm">
            Cancel·lar
          </button>
        </fieldset>
      </form>
      <p>
        Ja estàs registrat? <router-link to="/login">Inicia sessió</router-link>
      </p>
    </main>
  </div>
</template>

<script>
import HeaderComp from "@/components/HeaderComp.vue";

export default {
  name: "RegisterPage",
  components: {
    HeaderComp,
  },
  data() {
    return {
      username: "",
      email: "",
      password: "",
      passwordCopy: "",
      errors: [],
    };
  },
  computed: {},
  methods: {
    validateEmail(email) {
      var regExp = /\S+@\S+\.\S+/;
      return regExp.test(email);
    },
    validateForm() {
      this.errors = [];
      if (this.username === "") {
        this.errors.push("Introdueix un nom d'usuari");
      }
      if (this.email === "") {
        this.errors.push("Introdueix un correu electrònic");
      } else if (!this.validateEmail(this.email)) {
        this.errors.push("Introdueix un correu electrònic vàlid");
      }
      if (this.password.length === 0) {
        this.errors.push("Introdueix una contrasenya");
      } else if (this.password.length < 5) {
        this.errors.push(
          "La contrasenya ha de tenir, com a mínim, 5 caràcters"
        );
      }
      if (this.password !== this.passwordCopy) {
        this.errors.push("Les contrasenyes introduïdes no coincideixen");
      }
      if (this.errors.length === 0) {
        return true;
      } else {
        return false;
      }
    },
    submitForm() {
      if (this.validateForm()) {
        this.registerUser();
      }
    },
    cancelForm() {
      this.$router.replace(this.$router.push("/")).catch(() => {});
    },
    registerUser() {
      const data = {
        URL: "/users/new_user",
        method: "POST",
        body: this.$data,
      };
      this.$store
        .dispatch("callBackend", data)
        .then((data) => {
          // console.log("user assigned with id: " + data.id);
          this.$store.dispatch("setUser", data);
        })
        .then(() =>
          this.$router.replace(this.$router.push("/")).catch(() => {})
        )
        .catch((error) => {
          // console.log("Error during login: ");
          // console.log(error.message);
          switch (error.message) {
            case "usernameNotAvailable":
              this.errors.push("El nom d'usuari no està disponible");
              break;
            case "emailNotAvailable":
              this.errors.push(
                "Ja hi ha un usuari amb aquest correu electrònic"
              );
              break;
          }
        });
    },
  },
};
</script>

<style lang="scss">
#register-page {
  display: flex;
  flex-direction: column;
  height: 100%;

  p {
    text-align: center;
    a {
      color: $secondary-color;
    }
  }
}
</style>