'use strict';
(function () {
  var GET_URL = 'https://javascript.pages.academy/kekstagram/data';
  var POST_URL = 'https://js.dump.academy/kekstagram';



  window.backend = {

    load : function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', GET_URL);
      xhr.responseType = 'json';
      xhr.timeout = 10000;

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError('Статус ответа' + status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + timeout / 1000 + ' c');
      });

      xhr.send();
    },

    save : function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.open('POST', POST_URL);
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError('Статус ответа' + status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + timeout / 1000 + ' c');
      });

      xhr.send(data);
    }
  }

})();
