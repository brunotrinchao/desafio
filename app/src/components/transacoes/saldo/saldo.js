import { mapGetters, mapActions } from 'vuex';

import EventBus from '@/eventBus/index.js';

export default {
  name: 'saldo',

  data() {
    return {
      _conta: null,
      atualizado: null,
      balance: null,
      classe: 'text-danger',
      transacao: {
        tipo: null,
        texto: null,
        valor: '0,0'
      },
      money: {
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        suffix: '',
        precision: 2,
        masked: false /* doesn't work with directive */
      }
    };
  },

  computed: {
    ...mapGetters(['conta'])
  },

  async beforeMount() {
    this._conta = await this.conta;
    this.atualizado = this.$moment(this.conta.updated_at).format('DD/MM/YYYY hh:mm:ss');
    this.balance = this.$helper.numberFormat(this.conta.balance, 2, ',', '.');
    this.classe = this.conta.balance > 0 ? 'text-success' : 'text-danger';
  },

  methods: {
    novaTransacao(transacao) {
      this.transacao.tipo = transacao;
      this.transacao.texto = transacao == 'D' ? 'Depositar' : 'Sacar';
      this.$bvModal.show('nova-transacao');
    },
    resetModal() {
      this.transacao.valor = '0,0';
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    async handleSubmit() {
      let params = {
        account_id: this.conta.id,
        type: this.transacao.tipo,
        value: this.$helper.numberUnformat(this.transacao.valor.replace('R$ ', ''))
      };

      let retorno = await this.setExtrato(params);

      if (retorno.data.code == 200) {
        this.$bvModal.hide('nova-transacao');
        EventBus.$emit('nova-transacao');
        let retornoConta = await this.getConta(this._conta.id);

        if (retornoConta.id) {
          this.setConta(retornoConta);
          this.balance = this.$helper.numberFormat(retornoConta.balance, 2, ',', '.');
          this.atualizado = this.$moment(retornoConta.updated_at).format('DD/MM/YYYY hh:mm:ss');
        }
      }

      this.makeToast(
        retorno.data.code == 200 ? 'success' : 'danger',
        this.transacao.texto,
        retorno.data.msg
      );
    },
    makeToast(variant = null, titulo, msg) {
      this.$bvToast.toast(msg, {
        title: titulo,
        variant: variant,
        solid: true
      });
    },
    ...mapActions(['getSaldo', 'setExtrato', 'getConta', 'setConta'])
  }
};
