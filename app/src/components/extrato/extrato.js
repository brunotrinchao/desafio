import Filtro from './filtro';

export default {
  name: 'extrato',

  components: {
    Filtro
  },

  data() {
    return {
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
          sortable: true
        }
      ],
      items: [
        { type: 40, value: 'Dickerson', created_at: 'Macdonald' },
        { type: 21, value: 'Larsen', created_at: 'Shaw' },
        { type: 89, value: 'Geneva', created_at: 'Wilson' },
        { type: 38, value: 'Jami', created_at: 'Carney' }
      ]
    };
  }
};
