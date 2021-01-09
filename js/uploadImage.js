'use strict';
(function () {
  var FYLE_TYPES = ['jpg', 'png', 'jpeg', 'gif'];
  var previewImage = document.querySelector('.img-upload__preview img');
  var uploadInput = document.querySelector('.img-upload__input');

  // input.files - a FileList object that lists every selected file. This list has no more than one member unless the multiple attribute is specified.
  // arr.some(callback) - возвращает true, если вызов callback вернёт true для какого-нибудь элемента arr
  // string.andsWith() - позволяет определить, заканчивается ли строка символами указанными в скобках, возвращая, соотвественно, true или false.

  uploadInput.addEventListener('change', function () {
    var file = uploadInput.files[0]; // выбираем один из загруженных файлов
    var fileName = file.name.toLowerCase(); // переводим его имя в нижний регистр
    var matches = FYLE_TYPES.some(function (it) { // проверяем, является ли он картинкой
      return fileName.endsWith(it);
    });

    if (matches) { // если проверка пройдена, тогда
      var fileReader = new FileReader(); // создаём специальный объект, чтобы прочитать файл
      fileReader.addEventListener('load', function () { // вешаем событие окончания чтения файла (загрузки)
        previewImage.src = fileReader.result; // заменяем src у нашей картинки на загруженную картинку
      });
      fileReader.readAsDataURL(file); // читаем файл, по окончанию чтения сработает событие
    }

		window.imageEditor.show();
	});
})();
