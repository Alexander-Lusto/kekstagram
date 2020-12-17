'use strict';
(function () {
	var SCALE_LINE__WIDTH = 450;

	var imageEditor = document.querySelector('.upload-overlay');
	var imagePreview = imageEditor.querySelector('.effect-image-preview');
	var scale = imageEditor.querySelector('.upload-effect-level');
	var scalePin = imageEditor.querySelector('.upload-effect-level-pin');
	var scaleLine = imageEditor.querySelector('.upload-effect-level-val');

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
				scaleLine.style.width = pinShift + 'px';
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
				case filtersNames.ORIGINAL:
					window.utils.hideElement(scale);
					break;
			
				case filtersNames.CHROME:
					window.utils.showElement(scale);
					imagePreview.style.filter = 'grayscale(' + percent + ')';
					break;
				
				case filtersNames.SEPIA:
					window.utils.showElement(scale);
					imagePreview.style.filter = 'sepia(' + percent + ')';
					break;
				
				case filtersNames.MARVIN:
					window.utils.showElement(scale);
					imagePreview.style.filter = 'invert(' + (percent * 100) + '%)';
					break;
				
				case filtersNames.PHOBOS:
					window.utils.showElement(scale);
					imagePreview.style.filter = 'blur(' + (percent * 3) + 'px)';
					break;
				
				case filtersNames.HEAT:
					window.utils.showElement(scale);
					imagePreview.style.filter = 'brightness(' + (percent * 3) + ')';
					break;
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
	var filtersPannel = document.querySelector('.upload-effect-controls');
	var filters = filtersPannel.querySelectorAll('input[name="effect"]');
	var filtersNames = {
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