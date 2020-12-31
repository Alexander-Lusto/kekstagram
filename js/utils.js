'use strict';
(function () {
	window.utils = {
		getRandomNumber : function (min, max) {
			return Math.round(Math.random() * (max - min)) + min;
		},

		hideElement : function (element) {
			element.classList.add('visually-hidden');
		},

		showElement : function (element) {
			element.classList.remove('visually-hidden');
    },

    onError : function (error) {
      console.error(error);
    }
	}
})();
