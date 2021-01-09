'use strict';
(function () {
  var RESIZE_IMAGE_STEP = 25;
  var MAX_RANGE = 100;
  var MIN_RANGE = 25;

  var imageEditor = document.querySelector('.img-upload__overlay');
  var preview = imageEditor.querySelector('.img-upload__preview img');
  var resizeControlPlus = imageEditor.querySelector('.resize__control--plus');
  var resizeControlMinus = imageEditor.querySelector('.resize__control--minus');
  var resizeControlValue = imageEditor.querySelector('.resize__control--value');

  var resizeImage = function (value) {
    var newValue = parseInt(resizeControlValue.value) + value;
    resizeControlValue.value = newValue + '%';
    preview.style = 'transform: scale(' + newValue/100 + ');';
  }

  resizeControlPlus.addEventListener('click', function () {
    if (parseInt(resizeControlValue.value) < MAX_RANGE) {
      resizeImage(RESIZE_IMAGE_STEP);
    }
  });

  resizeControlMinus.addEventListener('click', function () {
    if (parseInt(resizeControlValue.value) > MIN_RANGE) {
      resizeImage(-RESIZE_IMAGE_STEP);
    }
  });
})();
