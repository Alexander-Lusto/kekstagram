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
  var galleryFiltersContainer = document.querySelector('.img-filters');
  var filters = galleryFiltersContainer.querySelectorAll('button');

  var Filter = { // перечисление
    RECOMMENDED: 'filter-recommended',
    POPULAR: 'filter-popular',
    DISCUSSED: 'filter-discussed',
    RANDOM: 'filter-random',
  }

  var showActiveFilter = function (clickedFilter, allFilters) {
    allFilters.forEach(function (el) {
      el.classList.remove('img-filters__button--active');
    })
    clickedFilter.classList.add('img-filters__button--active');
  }

  var filterPictures = function (evt) {
    var data = window.data.slice();
    switch (evt.target.id) {
      case Filter.RECOMMENDED:
        window.renderPictures(window.data);
        break;
      case Filter.POPULAR:
        window.renderPictures(data.sort(function (right, left) {
          return left.likes - right.likes;
        }));
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
        window.renderPictures(window.data);
        break;
    }
    showActiveFilter(evt.target, filters);
  };

  filters.forEach(function (el) {
    el.addEventListener('click', filterPictures);
  });
})();
