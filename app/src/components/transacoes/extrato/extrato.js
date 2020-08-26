import { mapGetters, mapActions } from 'vuex';
import Filtro from './filtro';

import EventBus from '@/eventBus/index.js';

export default {
  name: 'extrato',

  components: {
    Filtro
  },

  data() {
    return {
      _conta: null,
      fields: [
        {
          key: 'type',
          sortable: false,
          label: 'Transação'
        },
        {
          key: 'value',
          sortable: false,
          label: 'Valor'
        },
        {
          key: 'created_at',
          label: 'Data',
          sortable: false
        }
      ],
      items: []
    };
  },

  computed: {
    ...mapGetters(['conta'])
  },

  beforeMount() {
    EventBus.$on('filtrar', async dados => {
      this._conta = await this.conta;

    if(this._conta){
        let loader = this.$loading.show({
          // Optional parameters
          container: this.$refs.formContainer,
          canCancel: true
        });
        let retorno = await this.getExtrato(dados);
        this.items = retorno.data.map(elemento => {
          elemento.type = elemento.type == 'D' ? 'Depósito' : 'Saque';

          if (elemento.value) {
            elemento.value = `R$ ${this.$helper.numberFormat(elemento.value, 2, ',', '.')}`;
          }

          elemento.created_at = this.$moment(elemento.created_at).format('DD/MM/YYYY hh:mm:ss');

          return elemento;
        });
        loader.hide();
      }
    });
  },

  methods: {
    ...mapActions(['getExtrato'])
  }
};
