'use strict';
(function () {
  /*
  Добавьте обработчики изменения фильтров, которые будут управлять порядком
  отрисовки элементов на странице:

  o Популярные — фотографии в изначальном порядке.
  o Новые — 10 случайных, не повторяющихся фотографий.
  o Обсуждаемые — фотографии, отсортированные в порядке убывания
  количества комментариев.

  • При переключении фильтра, все фотографии отрисованные ранее нужно убрать
  и вместо них показать те, которые подходят под новые условия.

  */
  var galleryFilters = document.querySelector('.filters');
  var filtersButtons = galleryFilters.querySelectorAll('input');

  var Filter = { // перечисление
    NEW: 'new',
    POPULAR: 'popular',
    DISCUSSED: 'discussed',
    RANDOM: 'random',
  }

  var filterPictures = function (evt) {

    var data = window.data.slice();
    console.log(data);

    switch (evt.target.value) {
      case Filter.NEW:
        window.renderPictures(window.utils.shuffleArray(data.slice(0, 10)))
        break;
      case Filter.POPULAR:
        window.renderPictures(window.data);
        break;
      case Filter.DISCUSSED:
        window.renderPictures(data.sort(function (right, left) {
          return left.comments.length - right.comments.length;
        }));
        break;
      case Filter.RANDOM:
        window.renderPictures(window.utils.shuffleArray(data));
        break;

      default:
        break;
    }
  };

  filtersButtons.forEach(function (el, i, arr) {
    el.addEventListener('click', filterPictures);
  });



})();
