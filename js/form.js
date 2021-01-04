'use strict';
(function () {
  var FYLE_TYPES = ['jpg', 'png', 'jpeg', 'gif'];

  var form = document.querySelector('.img-upload__form');
  var uploadInput = document.querySelector('.img-upload__input');
  var imageEditor = document.querySelector('.img-upload__overlay');
  var preview = imageEditor.querySelector('.img-upload__preview img');
	var imageEditorcloseButton = imageEditor.querySelector('.img-upload__cancel');
  var uploadFormHashtags = imageEditor.querySelector('.text__hashtags');
  var uploadFormDescription = imageEditor.querySelector('.text__description');

  var onLoad = function (response) {
    console.log(response)
  };

	var onESCPress = function (evt) {
    var isHashtagsInputNotFocused = document.querySelector( ':focus' ) !== uploadFormHashtags;
    var isMessageInputNotFocused = document.querySelector( ':focus' ) !== uploadFormDescription;

		if (evt.keyCode === 27 && isHashtagsInputNotFocused && isMessageInputNotFocused) {
			closeImageEditor();
		}
	}

	var showImageEditor = function () {
    uploadFormHashtags.value = "";
    uploadFormDescription.value = "";
		imageEditor.classList.remove('hidden');
		document.addEventListener('keydown', onESCPress);
	}

	var closeImageEditor = function () {
    preview.style = "";
    uploadInput.value = "";
		imageEditor.classList.add('hidden');
		document.removeEventListener('keydown', onESCPress);
	}

	var isTegsDuplicated = function (array) {

		for (var i = 0; i < array.length; i++) {
			for (var j = i + 1; j < array.length; j++) {
				if (array[i].toLowerCase() === array[j].toLowerCase()) {
					return true;
				}
			}
		}

		return false;
	}

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
        preview.src = fileReader.result; // заменяем src у нашей картинки на загруженную картинку
      });
      fileReader.readAsDataURL(file); // читаем файл, по окончанию чтения сработает событие
    }

		showImageEditor();
	});

	imageEditorcloseButton.addEventListener('click', function () {
		closeImageEditor();
	});

	uploadFormHashtags.addEventListener('change', function (evt) {

		var tegs = uploadFormHashtags.value.split(' ');

		if (uploadFormHashtags.value[0] !== '#') {
			uploadFormHashtags.setCustomValidity('хэш-тег начинается с символа # (решётка)');
		}
		else if (uploadFormHashtags.value.length === 1 && uploadFormHashtags.value[0] === '#') {
			uploadFormHashtags.setCustomValidity('хеш-тег не может состоять только из одной решётки');
		}
		else if (tegs.length >= 5) {
			uploadFormHashtags.setCustomValidity('Нельзя указывать больше пяти хэш-тегов.');
		}
		else if (isTegsDuplicated(tegs)) {
			uploadFormHashtags.setCustomValidity('один и тот же хэш-тег не может быть использован дважды');
		}
		else {
			uploadFormHashtags.setCustomValidity('');
		}


		for (let i = 0; i < tegs.length; i++) {
			if (tegs[i][0] !== '#') {
				uploadFormHashtags.setCustomValidity('хэш-тег начинается с символа # (решётка)');
      }
      if (tegs[i].length === 1 && tegs[i][0] === '#') {
        uploadFormHashtags.setCustomValidity('хеш-тег не может состоять только из одной решётки');
      }
			else if (tegs[i].length > 20) {
				uploadFormHashtags.setCustomValidity('максимальная длина одного хэш-тега 20 символов, включая решётку.');
      }
		}

  });

  uploadFormHashtags.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
      evt.preventDefault();
    }
  });

  uploadFormDescription.addEventListener('change', function (evt) {
    if (uploadFormDescription.value.length > 140) {
			uploadFormDescription.setCustomValidity('длина комментария не может составлять больше 140 символов');
		} else {
      uploadFormDescription.setCustomValidity('');
    }
  });

  form.addEventListener('submit', function (evt) {
    var data = new FormData (form);
    window.backend.save(data, onLoad, window.utils.onError); // locked by CORS policy
    closeImageEditor();
  });
})();
