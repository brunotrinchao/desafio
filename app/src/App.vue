<template>
  <div id="app">
    <div class="container">
      <div class="py-5 text-center">
        <img
          alt="Capgemini logo"
          width="300"
          class="d-block mx-auto mb-4"
          src="./assets/img/logo.png"
        />
        <h2>Bank</h2>
      </div>

      <router-view />
    </div>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
