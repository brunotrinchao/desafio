<template>
  <div class="row mb-5">
    <form class="form-inline">
      De
      <b-form-datepicker
        id="start-datepicker"
        size="sm"
        local="pt-br"
        v-model="date.start"
        class="mr-3 ml-3"
      ></b-form-datepicker>
      Até
      <b-form-datepicker
        id="start-datepicker"
        size="sm"
        local="pt-br"
        v-model="date.end"
        class="mr-3 ml-3"
      ></b-form-datepicker>
      <b-button @click.stop.prevent="filtrar" variant="primary btn-sm">Pesquisar</b-button>
    </form>
  </div>
</template>

<script src="./filtro.js" />
