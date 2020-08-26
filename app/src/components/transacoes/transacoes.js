import Extrato from './extrato';
import Saldo from './saldo';
import { mapGetters } from 'vuex';

export default {
  name: 'Transacoes',

  components: {
    Extrato,
    Saldo
  },

  computed: {
    ...mapGetters(['conta'])
  },

  async beforeMount() {
    let conta = await this.conta;
    if (!conta) {
      this.$router.push('/');
      return;
    }
  }
};
