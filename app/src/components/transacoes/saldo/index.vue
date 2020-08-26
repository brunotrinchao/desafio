<template>
  <div>
    <ul class="list-group mb-3">
      <li class="list-group-item d-flex justify-content-between lh-condensed">
        <div>
          <h5 class="my-0 text-left">Saldo</h5>
        </div>
        <span class="text-muted"
          >R$ <b>{{ balance }}</b></span
        >
      </li>
      <li class="list-group-item d-flex justify-content-between lh-condensed">
        <b-button-group class="w-100">
          <b-button variant="success" class="w-100" @click.stop.prevent="novaTransacao('D')"
            >Depositar</b-button
          >
          <b-button variant="danger" class="w-100" @click.stop.prevent="novaTransacao('S')"
            >Sacar</b-button
          >
        </b-button-group>
      </li>
      <li class="list-group-item d-flex justify-content-between lh-condensed">
        <b-button variant="info" class="w-100" @click.stop.prevent="listaContas">Contas</b-button>
      </li>
    </ul>

    <small class="text-muted"
      >Atualizado em {{ atualizado }}
      <b-icon-arrow-repeat animation="spin" font-scale="1"></b-icon-arrow-repeat
    ></small>

    <b-modal
      id="nova-transacao"
      title="Nova transação"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <div class="d-block">
        <form ref="form" @submit.stop.prevent="handleSubmit">
          <div class="row">
            <div class="col-md-12">
              <h3
                class="text-center"
                :class="transacao.tipo == 'D' ? 'text-success' : 'text-danger'"
              >
                {{ transacao.texto }}
              </h3>
            </div>
            <div class="col-md-12">
              <b-form-group label="Valor">
                <b-form-input
                  id="valor"
                  type="text"
                  v-model.lazy="transacao.valor"
                  v-money="money"
                ></b-form-input>
              </b-form-group>
            </div>
          </div>
        </form>
      </div>
    </b-modal>
  </div>
</template>

<script src="./saldo.js" />
<style src="./saldo.scss" lang="scss" scoped />
