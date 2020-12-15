'use strict';

/*
1. Значения поля выбора файла #upload-file. При наступлении
события change на этом поле, можно сразу показывать форму редактирования
изображения.
*/

var uploadForm = document.querySelector('.upload-form');
var uploadInput = document.querySelector('.upload-input');
var imageEditor = document.querySelector('.upload-overlay');
var imageEditorcloseButton = imageEditor.querySelector('.upload-form-cancel');
var uploadScalePin = imageEditor.querySelector('.upload-effect-level-pin');
var submitUploadForm = imageEditor.querySelector('.upload-form-submit');
var uploadFormHashtags = document.querySelector('.upload-form-hashtags');
var isTegsInputNotFocused = document.querySelector( ':focus' ) !== uploadFormHashtags;

var onESCPress = function (evt) {
	if (evt.keyCode === 27 && isTegsInputNotFocused) {
		closeImageEditor();
	}
}

var showImageEditor = function () {
	imageEditor.classList.remove('hidden');
	document.addEventListener('keydown', onESCPress);
};

var closeImageEditor = function () {
	uploadInput.value = "";
	imageEditor.classList.add('hidden');
	document.removeEventListener('keydown', onESCPress);
}

uploadInput.addEventListener('change', function () {
	showImageEditor();
});

imageEditorcloseButton.addEventListener('click', function () {
	closeImageEditor();
});

/*
добавим на пин слайдера .scale__pin обработчик события mouseup, который будет
согласно ТЗ изменять уровень насыщенности фильтра для изображения. Для
определения уровня насыщенности, нужно рассчитать положение пина слайдера
относительно всего блока и воспользоваться пропорцией, чтобы понять, какой
уровень эффекта нужно применить.
*/

uploadScalePin.addEventListener('mouseup', function () {

});

/*
Хэш-теги:
хэш-теги необязательны; - done
хэш-тег начинается с символа # (решётка); - done
хеш-тег не может состоять только из одной решётки; - done
хэш-теги разделяются пробелами;
один и тот же хэш-тег не может быть использован дважды; - done
нельзя указать больше пяти хэш-тегов; - done
максимальная длина одного хэш-тега 20 символов, включая решётку.; - done
теги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом. - done
если фокус находится в поле ввода хэш-тега, нажатие на Esc не должно приводить к закрытию формы редактирования изображения. - done
*/

uploadFormHashtags.addEventListener('change', function (evt) {

	var tegs = uploadFormHashtags.value.split(' ');
	console.log(tegs);
	
	if (uploadFormHashtags.value[0] != '#') {
		uploadFormHashtags.setCustomValidity('хэш-тег начинается с символа # (решётка)');
	}
	else if (uploadFormHashtags.value.length < 2) {
		console.log('error');
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
			console.log(tegs[i][0]);
			uploadFormHashtags.setCustomValidity('хэш-тег начинается с символа # (решётка)');
		}
		else if (tegs[i].length > 20) {
			uploadFormHashtags.setCustomValidity('максимальная длина одного хэш-тега 20 символов, включая решётку.');
		}
	}	
	
});

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