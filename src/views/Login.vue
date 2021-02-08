<template>
  <div id="login-page">
    <HeaderComp :backIcon="false" :searchIcon="false" :userIcon="true" />
    <main id="main-content">
      <h2>Inicia sessió</h2>
      <form class="app-form login-register login-form">
        <label class="form-label" for="email">Correu electrònic*</label>
        <input id="email" class="text-input" type="email" v-model="email" placeholder="Introdueix el teu email" />
        <label class="form-label" for="password">Contrasenya*</label>
        <input id="password" class="text-input" type="password" v-model="password" placeholder="Introdueix la contrasenya" />
        <fieldset class="errors">
          <div v-for="error in errors" :key="error">{{ error }}</div>
        </fieldset>
        <fieldset class="form-buttons">
          <button class="form-button accept-button" type="sumbit" @click.prevent="submitForm">
            Inicia sessió
          </button>
          <button class="form-button cancel-button" @click.prevent="cancelForm">
            Cancel·lar
          </button>
        </fieldset>
      </form>
      <p>
        Encara no tens compte?
        <router-link to="/register">Registra't</router-link>
      </p>
    </main>
  </div>
</template>

<script>
import HeaderComp from "@/components/HeaderComp.vue";

export default {
  name: "LoginPage",
  components: {
    HeaderComp,
  },
  data() {
    return {
      email: "",
      password: "",
      errors: [],
    };
  },
  methods: {
    validateEmail(email) {
      var regExp = /\S+@\S+\.\S+/;
      return regExp.test(email);
    },
    validateForm() {
      this.errors = [];
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
      if (this.errors.length === 0) {
        return true;
      } else {
        return false;
      }
    },
    submitForm() {
      if (this.validateForm()) {
        this.loginUser();
      }
    },
    loginUser() {
      const data = {
        URL: "/users/login",
        method: "POST",
        body: this.$data,
      };
      this.$store
        .dispatch("callBackend", data)
        .then((data) => {
          // console.log("user assigned with id: " + data.id);
          this.$store.dispatch("setUser", data);
        })
        .then(() => {
          this.$router.replace(this.$router.push("/")).catch(() => {});
        })
        .catch((error) => {
          // console.log("Error during login: ");
          // console.log(error.message);
          switch (error.message) {
            case "userNotFound":
              this.errors.push(
                "No existeix cap usuari amb aquest correu electrònic"
              );
              break;
            case "wrongPassword":
              this.errors.push("La constrasenya és incorrecta");
              break;
          }
        });
    },
    cancelForm() {
      this.$router.replace(this.$router.push("/")).catch(() => {});
    },
  },
  beforeDestroy() {
    this.email = "";
    this.password = "";
  },
};
</script>

<style lang="scss">
#login-page {
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