const Helper = {
  install(Vue) {
    Vue.prototype.$helper = {
      numberFormat: function(number, decimals, dec_point, thousands_point) {
        if (number == null || !isFinite(number)) {
          return number;
        }

        if (decimals == null) {
          var len = number.toString().split('.').length;
          decimals = len > 1 ? len : 0;
        }

        if (!dec_point) {
          dec_point = '.';
        }

        if (!thousands_point) {
          thousands_point = ',';
        }

        number = parseFloat(number).toFixed(decimals);

        number = number.replace('.', dec_point);

        var splitNum = number.split(dec_point);
        splitNum[0] = splitNum[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousands_point);
        number = splitNum.join(dec_point);

        return number;
      },
      numberUnformat: function(valor, sinal) {
        if (valor === null || valor === undefined) {
          return null;
        } else {
          if (!sinal) {
            valor = valor.split('-').join('');
          }
          valor = valor.split('.').join('');
          valor = valor.split(',').join('.');
          valor = valor.split('R$').join('');
          valor = valor.split('%').join('');
          return valor.trim();
        }
      }
    };
  }
};

export default Helper;
