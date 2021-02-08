<template>
  <div id="page-not-found">
    <HeaderComp :backIcon="true" :searchIcon="false" :userIcon="true" />
    <main id="main-content">
      <img id="logo" src="@/assets/logos/isotip.svg" alt="logo" />
      <h2 class="not-found-title">Pàgina no trobada</h2>
      <p class="not-found-text">
        No hem pogut trobar la pàgina que estàs cercant. És possible que no existeixi o que la direcció sigui incorrecta.
      </p>
      <p>HTTP ERROR 404</p>
    </main>
  </div>
</template>

<script>
import HeaderComp from "@/components/HeaderComp.vue";

export default {
  name: "NotFoundPage",
  components: {
    HeaderComp,
  },
};
</script>

<style lang="scss">
#page-not-found {
  #main-content {
    margin: 0 auto;
    max-width: 700px;
    text-align: center;

    #logo {
      margin: 2.5rem auto;
      width: 150px;
    }

    .not-found-title {
      margin-bottom: 1.25rem;
    }

    .not-found-text {
      padding: 0 1.5rem;
    }
  }
}
</style>