'use strict';
(function() {
	var comments = [
		'Всё отлично!',
		'В целом всё неплохо. Но не всё.',
		'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
		'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
		'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
		'Лица у людей на фотке перекошены, как будто их избивают.',
		'Как можно было поймать такой неудачный момент?!'
	];

	var descriptions = [
			'Тестим новую камеру!',
			'Затусили с друзьями на море',
			'Как же круто тут кормят',
			'Отдыхаем...',
			'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
			'Вот это тачка!'
	];

	// принимает массив с комментариями и возвращает массив из 1-2 случайных комментариев
	var getRandomComments = function (commentsArray, amount) {
			var copiedArray = commentsArray.slice(); // копируем исходный массив
			var result = copiedArray.splice(window.utils.getRandomNumber(0, copiedArray.length - 1), 1); // вырезаем из массива случайный комментарий

			if (window.utils.getRandomNumber(1, amount) > 1) { // с 50% вероятностью вырезаем из массива ещё один случайный комментарий
					result = result.concat(copiedArray.splice(window.utils.getRandomNumber(0, copiedArray.length), 1));
			}

			return result;
	}

	var generatePicture = function (index) {
			return {
					url: 'photos/' + index + '.jpg',
					likes: window.utils.getRandomNumber(15, 200),
					comments: getRandomComments(comments, 2),
					description: descriptions[window.utils.getRandomNumber(0, descriptions.length - 1)],
			}
	}

	var generateData = function (amount) {
			var pictures = [];
	for (var i = 1; i <= amount; i++) {
					pictures.push(generatePicture(i));
			}
			return pictures;
	}

	window.data = generateData(25);
})();
