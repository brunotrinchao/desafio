import EventBus from '@/eventBus/index.js';

export default {
  name: 'filtro',

  data() {
    let hoje = this.$moment();
    return {
      date: {
        start: hoje.subtract(30, 'd').format('YYYY-MM-DD'),
        end: hoje.format('YYYY-MM-DD')
      }
    };
  },

  beforeMount() {
    this.datasInicias();
    this.emitirFiltro();

    EventBus.$on('nova-transacao', () => {
      this.emitirFiltro();
    });
  },

  methods: {
    emitirFiltro() {
      EventBus.$emit('filtrar', {
        start_date: this.date.start,
        end_date: this.date.end
      });
    },
    datasInicias() {
      let hoje = this.$moment();
      this.date.end = hoje.format('YYYY-MM-DD');
      this.date.start = hoje.subtract(30, 'd').format('YYYY-MM-DD');
    },
    filtrar() {
      this.emitirFiltro();
    }
  }
};
