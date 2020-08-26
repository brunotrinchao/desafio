<template>
  <div>
    <div class="row mb-5">
      <div class="col-md-5 d-flex">
        <span>De</span>
        <b-form-datepicker
          id="start-datepicker"
          size="sm"
          local="pt-br"
          v-model="date.start"
          :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
          class="mr-3 ml-3"
        ></b-form-datepicker>
      </div>
      <div class="col-md-5 d-flex">
        Até
        <b-form-datepicker
          id="end-datepicker"
          size="sm"
          local="pt-br"
          v-model="date.end"
          :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
          class="mr-3 ml-3"
        ></b-form-datepicker>
      </div>
      <div class="col-md-2 d-flex">
        <b-button @click.stop.prevent="filtrar" variant="primary btn-sm">Pesquisar</b-button>
      </div>
    </div>
  </div>
</template>

<script src="./filtro.js" />
