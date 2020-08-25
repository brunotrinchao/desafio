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
        ]
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
      items: [
        // { type: 40, balance: 'Dickerson', created_at: 'Macdonald' },
        // { type: 21, balance: 'Larsen', created_at: 'Shaw' },
        // { type: 89, balance: 'Geneva', created_at: 'Wilson' },
        // { type: 38, balance: 'Jami', created_at: 'Carney' }
      ]
    };
  },
  async beforeMount() {
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
  methods: {
    selecionaRow(item, index, event) {
      console.log({ item, index, event });
    },
    modalConta() {
      this.$bvModal.show('nova-conta');
    },
    resetModal() {
      console.log('reset');
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    handleSubmit() {
      this.getConta();
      // console.log('submit');
    },
    ...mapActions(['getConta', 'getTodasContas'])
  }
};
