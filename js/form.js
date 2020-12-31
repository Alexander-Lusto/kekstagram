'use strict';
(function () {
  var form = document.querySelector('.upload-form');
	var uploadInput = document.querySelector('.upload-input');
	var imageEditor = document.querySelector('.upload-overlay');
	var imageEditorcloseButton = imageEditor.querySelector('.upload-form-cancel');
  var uploadFormHashtags = document.querySelector('.upload-form-hashtags');
  var uploadFormDescription = document.querySelector('.upload-form-description');

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

	uploadInput.addEventListener('change', function () {
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
