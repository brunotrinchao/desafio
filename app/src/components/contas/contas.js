import { mapActions } from 'vuex';

export default {
  name: 'Contas',

  data() {
    return {
      form: {
        type: 'CC',
        balance: '0,0',
        options: [
          { value: 'CC', text: 'Conta corrente' },
          { value: 'CP', text: 'Conta poupança' }
        ],
        money: {
          decimal: ',',
          thousands: '.',
          prefix: 'R$ ',
          suffix: '',
          precision: 2,
          masked: false /* doesn't work with directive */
        }
      },
      fields: [
        {
          key: 'type',
          sortable: false,
          label: 'Tipo'
        },
        {
          key: 'balance',
          sortable: false,
          label: 'Saldo'
        },
        {
          key: 'created_at',
          label: 'Data',
          sortable: true
        }
      ],
      items: []
    };
  },
  async beforeMount() {
    this.atualizaListaContas();
  },
  methods: {
    async atualizaListaContas() {
      let contas = await this.getTodasContas();
      this.items = contas.data.map(elemento => {
        elemento.type = elemento.type == 'CC' ? 'Conta corrente' : 'Conta poupança';

        if (elemento.balance) {
          elemento.balance = `R$ ${this.$helper.numberFormat(elemento.balance, 2, ',', '.')}`;
        }

        elemento.created_at = this.$moment(elemento.created_at).format('DD/MM/YYYY');

        return elemento;
      });
    },
    async selecionaRow(item) {
      let conta = await this.getConta(item.id);
      if (conta.id) {
        this.setConta(conta);
        this.$router.push('/transacoes');
      }
    },
    modalConta() {
      this.$bvModal.show('nova-conta');
    },
    resetModal() {
      this.form.type = 'CC';
      this.form.balance = '0,0';
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    async handleSubmit() {
      let params = {
        type: this.form.type,
        balance: this.$helper.numberUnformat(this.form.balance.replace('R$ ', ''))
      };

      let retorno = await this.postConta(params);

      if (retorno.data.code == 200) {
        this.atualizaListaContas();
        this.$bvModal.hide('nova-conta');
      }
    },
    ...mapActions(['getConta', 'getTodasContas', 'postConta', 'setConta'])
  }
};
