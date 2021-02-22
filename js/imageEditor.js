'use strict';
(function () {
  var form = document.querySelector('.img-upload__form');
  var uploadInput = document.querySelector('.img-upload__input');
  var imageEditor = document.querySelector('.img-upload__overlay');
  var preview = imageEditor.querySelector('.img-upload__preview');
  var previewImage = imageEditor.querySelector('.img-upload__preview img');
	var imageEditorcloseButton = imageEditor.querySelector('.img-upload__cancel');
  var uploadFormHashtags = imageEditor.querySelector('.text__hashtags');
  var uploadFormDescription = imageEditor.querySelector('.text__description');
  var resizeControlValue = imageEditor.querySelector('.resize__control--value');
  var scale = imageEditor.querySelector('.scale');
  var scaleValue = scale.querySelector('.scale__value');

  var defaultFilter = imageEditor.querySelector('#effect-none');


  console.log(scaleValue);

  var onLoad = function (response) {
    console.log(response)
  };

	var onESCPress = function (evt) {
    var isHashtagsInputNotFocused = document.querySelector( ':focus' ) !== uploadFormHashtags;
    var isMessageInputNotFocused = document.querySelector( ':focus' ) !== uploadFormDescription;

		if (evt.keyCode === 27 && isHashtagsInputNotFocused && isMessageInputNotFocused) {
			window.imageEditor.close();
		}
  }

  window.imageEditor = {
    show : function () {
      scaleValue.value = "";
      resizeControlValue.value = "100%";
      defaultFilter.checked = true;
      uploadFormHashtags.value = "";
      uploadFormDescription.value = "";
      imageEditor.classList.remove('hidden');
      document.addEventListener('keydown', onESCPress);
    },

    close : function () {
      uploadInput.value = "";
      preview.style = "";
      previewImage.style = "";
      preview.className = window.utils.IMAGE_PREVIEW_CLASS_NAME;
      scale.style = "";
      scale.classList.add('hidden');
      imageEditor.classList.add('hidden');
      document.removeEventListener('keydown', onESCPress);
    }
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

  imageEditorcloseButton.addEventListener('click', function () {
		window.imageEditor.close();
	});

  form.addEventListener('submit', function (evt) {
    var data = new FormData (form);
    window.backend.save(data, onLoad, window.utils.onError); // locked by CORS policy
    window.imageEditor.close();
  });
})();
