'use strict';
(function () {
  var SCALE_LINE__WIDTH = 450;
  var IMAGE_PREVIEW_CLASS_NAME = window.utils.IMAGE_PREVIEW_CLASS_NAME;

	var imageEditor = document.querySelector('.img-upload__overlay');
	var imagePreview = imageEditor.querySelector('.img-upload__preview');
	var scale = imageEditor.querySelector('.scale');
	var scalePin = scale.querySelector('.scale__pin');
  var scaleLine = scale.querySelector('.scale__level');
  var scaleValue = scale.querySelector('.scale__value');

  var valueToClassName = { // словарь
    'none' : 'effects__preview--none',
    'chrome' : 'effects__preview--chrome',
    'sepia' : 'effects__preview--sepia',
    'marvin' : 'effects__preview--marvin',
    'phobos' : 'effects__preview--phobos',
    'heat' : 'effects__preview--heat',
  }

  var addClassNameToElement = function (element, value, defaultClass) {
    element.className = '';
    element.classList.add(defaultClass);
    element.classList.add(valueToClassName[value]);
  }

	// Смена насыщенности фильтра
	scalePin.addEventListener('mousedown', function (evt) {
		evt.preventDefault();

		var startCoords = {
			x: evt.clientX,
			y: evt.clientY,
		}

		var onMouseMove = function (moveEvt) {
			moveEvt.preventDefault();

			var shift = {
				x: moveEvt.clientX - startCoords.x,
			}

			startCoords = {
				x: moveEvt.clientX,
			}

			var pinShift = scalePin.offsetLeft + shift.x;
			var isMovementInRange = pinShift >= 0 && pinShift <= SCALE_LINE__WIDTH;

			if (isMovementInRange) {
				scalePin.style.left = pinShift + 'px';
        scaleLine.style.width = pinShift / SCALE_LINE__WIDTH * 100 + '%';
        scaleValue.value = Math.round(pinShift / SCALE_LINE__WIDTH * 100);
				changeFilter(pinShift);
			}

		}

		var onMouseUp = function (upEvt) {
			upEvt.preventDefault();

			document.removeEventListener('mousemove', onMouseMove);
			document.removeEventListener('mouseup', onMouseUp);
		}

		document.addEventListener('mousemove', onMouseMove);
		document.addEventListener('mouseup', onMouseUp);
	});

	var choseClickedFilter = function (filter, percent) {
		var isFilterChecked = filter.checked;
		if (isFilterChecked) {
			switch(filter.value) {
				case FilterName.ORIGINAL:
          imagePreview.style.filter = 'none';
          window.utils.hideElement(scale);
          addClassNameToElement(imagePreview, filter.value, IMAGE_PREVIEW_CLASS_NAME);
					break;

				case FilterName.CHROME:
          window.utils.showElement(scale);
          imagePreview.style.filter = 'grayscale(' + percent + ')';
          addClassNameToElement(imagePreview, filter.value, IMAGE_PREVIEW_CLASS_NAME);
					break;

				case FilterName.SEPIA:
					window.utils.showElement(scale);
          imagePreview.style.filter = 'sepia(' + percent + ')';
          addClassNameToElement(imagePreview, filter.value, IMAGE_PREVIEW_CLASS_NAME);
					break;

				case FilterName.MARVIN:
					window.utils.showElement(scale);
          imagePreview.style.filter = 'invert(' + (percent * 100) + '%)';
          addClassNameToElement(imagePreview, filter.value, IMAGE_PREVIEW_CLASS_NAME);
					break;

				case FilterName.PHOBOS:
					window.utils.showElement(scale);
          imagePreview.style.filter = 'blur(' + (percent * 3) + 'px)';
          addClassNameToElement(imagePreview, filter.value, IMAGE_PREVIEW_CLASS_NAME);
					break;

				case FilterName.HEAT:
					window.utils.showElement(scale);
          imagePreview.style.filter = 'brightness(' + (percent * 3) + ')';
          addClassNameToElement(imagePreview, filter.value, IMAGE_PREVIEW_CLASS_NAME);
					break;
      }

      if (percent === 1) {
        scalePin.style.left = SCALE_LINE__WIDTH + 'px';
				scaleLine.style.width = '100%';
      }
		}
	}

	var changeFilter = function (number) {
		var percent = (number / SCALE_LINE__WIDTH).toFixed(2);

		for (var i = 0; i < filters.length; i++) {
			choseClickedFilter(filters[i], percent);
		}
	}

	// Смена изображения при клике на фильтр
	var filtersPannel = document.querySelector('.img-upload__effects');
	var filters = filtersPannel.querySelectorAll('input[name="effect"]');
	var FilterName = { // перечисление
		ORIGINAL: 'none',
		CHROME: 'chrome',
		SEPIA: 'sepia',
		MARVIN: 'marvin',
		PHOBOS: 'phobos',
		HEAT: 'heat',
	}

	for (var i = 0; i < filters.length; i++) {
		filters[i].addEventListener('click', function () {
			choseClickedFilter(this, 1);
		});
	}
})();
