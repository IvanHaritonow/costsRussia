javascript:(function(){
(function ($) {
  $.getJSON('https://www.cbr-xml-daily.ru/daily_json.js', dq => {
    let rurUsd;
    try {
      rurUsd = +dq.Valute.USD.Value;
    } catch (err) { return; }
    $('body *:not(style,script):contains("$")').each(function () {
      this.innerHTML = this.innerHTML.replace(/((\d+(?:\.?\d+))\s*\$)/g, '<span data-usdprice="$1">$2</span>');
    });
    $('[data-usdprice]').each(function () {
      this.textContent = Math.round(+this.textContent * rurUsd).toLocaleString('ru-Ru', {
        style: 'currency', currency: 'RUB', minimumFractionDigits: 0, useGrouping: true
      });
      this.title = this.dataset.usdprice;
      this.removeAttribute('data-usdprice');
      this.classList.add('rur-price-conv');
    });
  });
})(jQuery);
})()
