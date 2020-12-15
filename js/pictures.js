'use strict';

// 1. Создайте массив, состоящий из 25 сгенерированных JS объектов, 
// которые будут описывать фотографии, размещённые другими пользователями:

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

var getRandomNumber = function (min, max) {
	return Math.round(Math.random() * (max - min)) + min;
}

// принимает массив с комментариями и возвращает массив из 1-2 случайных комментариев
var getRandomComments = function (commentsArray, amount) {
	var copiedArray = commentsArray.slice(); // копируем исходный массив
	var result = copiedArray.splice(getRandomNumber(0, copiedArray.length - 1), 1); // вырезаем из массива случайный комментарий
	
	if (getRandomNumber(1, amount) > 1) { // с 50% вероятностью вырезаем из массива ещё один случайный комментарий
		result = result.concat(copiedArray.splice(getRandomNumber(0, copiedArray.length), 1));
	}
	
	return result;
}

var generatePicture = function (index) {
	return {
		url: 'photos/' + index + '.jpg',
		likes: getRandomNumber(15, 200),
		comments: getRandomComments(comments, 2),
		description: descriptions[getRandomNumber(0, descriptions.length - 1)],
	}
}

var generateData = function (amount) {
	var pictures = [];
  for (var i = 1; i <= amount; i++) {
		pictures.push(generatePicture(i));
	}
	return pictures;
}

var pictures = generateData(25);

/*
2. На основе данных, созданных в предыдущем пункте и шаблона #picture создайте DOM-элементы, соответствующие
фотографиям и заполните их данными из массива:

o Адрес изображения url подставьте как src изображения.
o Количество лайков likes подставьте как текстовое содержание элемента .picture__stat--likes.
o Количество комментариев comments подставьте как текстовое содержание элемента .picture__stat--comments.
*/
var getPictureTemplate = function (data) {
	var template = document.querySelector('#picture-template').content; // очень важно не забывать по content
	var pictureTemplate = template.cloneNode(true).querySelector('.picture');

	var image = pictureTemplate.querySelector('.picture img');
	var likes = pictureTemplate.querySelector('.picture-likes');
	var comments = pictureTemplate.querySelector('.picture-comments');
	
	image.src = data.url;
	comments.textContent = data.comments.length;
	likes.textContent = data.likes;

	return pictureTemplate;
}

// 3. Отрисуйте сгенерированные DOM-элементы в блок .pictures. Для вставки элементов используйте DocumentFragment:
var renderPictures = function (pictures) {
	var gallery = document.querySelector('.pictures');
	for (let i = 1; i < pictures.length; i++) {
		var picture = getPictureTemplate(pictures[i]);
		gallery.appendChild(picture);
		picture.addEventListener('click', function (evt) {
			evt.preventDefault();
			showBigPicture(pictures[i]);
		});
	}
}
renderPictures(pictures);

/* 4. Покажите элемент .big-picture, удалив у него класс .hidden и заполните 
его данными из первого элемента сгенерированного вами массива:
*/ 
var bigPicture = document.querySelector('.big-picture');

var closeBigPictureOnEscPressHandler = function (evt) {
	if (evt.keyCode === 27) {
		closeElement(bigPicture);
	}
}

var closeElement = function (element) {
	element.classList.add('hidden');
	document.removeEventListener('keydown', closeBigPictureOnEscPressHandler);
}

var removePreviousComments = function (commentsBlock) {
	var socialComments = commentsBlock.querySelectorAll('.social__comment');
	if (socialComments) {
		for (let i = 0; i < socialComments.length; i++) {
			socialComments[i].remove();
		}
	}
}

var renderComments = function (picture) {
	var socialCommentsBlock = document.querySelector('.social__comments');
	removePreviousComments(socialCommentsBlock);
	

	for (var i = 0; i < picture.comments.length; i++) {
		// создать комментарий
		var socialComment = document.createElement('li');
		socialComment.classList.add('social__comment');
		socialComment.classList.add('social__comment--text');

		// создать картинку
		var socialPicture = document.createElement('img');
		socialPicture.classList.add('social__picture');
		socialPicture.src = 'img/avatar-' + getRandomNumber(1, 6) + '.svg';
		socialPicture.alt = "Аватар комментатора фотографии";
		socialPicture.width = 35;
		socialPicture.height = 35;

		// создать текст
		var socialText = document.createElement('p');
		socialText.classList.add('social__text');
		socialText.textContent = picture.comments[i];

		// отрисовать комментарий текст и аватарку на странице
		socialCommentsBlock.appendChild(socialComment);
		socialComment.appendChild(socialPicture);
		socialComment.appendChild(socialText);
	}
}

var showBigPicture = function (picture) {
	bigPicture.classList.remove('hidden');

	var bigPictureImage = bigPicture.querySelector('img');
	var bigPictureTitle = bigPicture.querySelector('.social__caption');
	var bigPictureLikes = bigPicture.querySelector('.likes-count');
	var bigPictureComments = bigPicture.querySelector('.comments-count');
	var bigPictureUserAvatar = bigPicture.querySelector('.social__picture');
	var bigPictureCloseButton = bigPicture.querySelector('.gallery-overlay-close');

	bigPictureImage.src = picture.url;
	bigPictureTitle.textContent = picture.description;
	bigPictureLikes.textContent = picture.likes;
	bigPictureComments.textContent = picture.comments.length;
	
	bigPictureUserAvatar.src = 'img/avatar-' + getRandomNumber(1, 6) + '.svg';
	bigPictureUserAvatar.alt = "Аватар комментатора фотографии";
	bigPictureUserAvatar.width = 35;
	bigPictureUserAvatar.height = 35;

	bigPictureCloseButton.addEventListener('click', function () {
		closeElement(bigPicture);
	});

	document.addEventListener('keydown', closeBigPictureOnEscPressHandler);
	renderComments(picture);
	
}

/* 5. Спрячьте блоки счётчика комментариев .social__comment-count и загрузки
новых комментариев .social__loadmore, добавив им класс .visuallyhidden.
*/
var hideCommentsControl = function () {
	var commentsCount = document.querySelector('.social__comment-count');
	commentsCount.classList.add('visually-hidden');

	var loadMoreCommentsButton = document.querySelector('.social__comment-loadmore');
	loadMoreCommentsButton.classList.add('visually-hidden');
};
hideCommentsControl();

