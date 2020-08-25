<template>
  <div>
    <h4 class="mb-3">
      Contas
      <b-button class="btn-sm float-right" @click.stop.prevent="modalConta" variant="primary"
        >Adicionar</b-button
      >
    </h4>
    <b-table
      striped
      hover
      bordered
      :items="items"
      :fields="fields"
      @row-clicked="selecionaRow"
    ></b-table>
    <b-modal
      id="nova-conta"
      title="Nova conta"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <div class="d-block">
        <form ref="form" @submit.stop.prevent="handleSubmit">
          <div class="row">
            <div class="col-md-6">
              <b-form-group label="Tipo de conta">
                <b-form-select v-model="form.type" :options="form.options" required></b-form-select>
              </b-form-group>
            </div>
            <div class="col-md-6">
              <b-form-group label="Valor inicial">
                <b-form-input id="balance" type="text" :value="form.balance"></b-form-input>
              </b-form-group>
            </div>
          </div>
        </form>
      </div>
    </b-modal>
  </div>
</template>

<script src="./contas.js" />
