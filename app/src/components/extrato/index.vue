<template>
  <div>
    <Filtro />
    <h4 class="mb-3">Extrato</h4>
    <b-table striped hover bordered small :items="items" :fields="fields"></b-table>
  </div>
</template>

<script src="./extrato.js" />
<style src="./extrato.scss" lang="scss" scoped />
