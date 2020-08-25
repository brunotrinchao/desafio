export default {
  name: 'filtro',

  data() {
    return {
      date: {
        start: null,
        end: null
      }
    };
  },

  beforeMount() {
    this.datasInicias();
  },

  methods: {
    datasInicias() {
      let hoje = this.$moment();
      this.date.end = hoje.format('YYYY-MM-DD');
      this.date.start = hoje.subtract(30, 'd').format('YYYY-MM-DD');
    },
    filtrar() {
      console.log(this.date);
    }
  }
};
