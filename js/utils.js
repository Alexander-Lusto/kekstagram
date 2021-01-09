'use strict';
(function () {
	window.utils = {
    IMAGE_PREVIEW_CLASS_NAME : 'img-upload__preview',

		getRandomNumber : function (min, max) {
			return Math.round(Math.random() * (max - min)) + min;
    },

    shuffleArray: function (array) {
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }

      return array;
    },

		hideElement : function (element) {
			element.classList.add('hidden');
		},

		showElement : function (element) {
			element.classList.remove('hidden');
    },

    onError : function (error) {
      console.error(error);
    }
	}
})();
