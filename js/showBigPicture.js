'use strict';
(function () {
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
			socialPicture.src = picture.comments[i].avatar;
			socialPicture.alt = "Аватар комментатора фотографии";
			socialPicture.width = 35;
			socialPicture.height = 35;

			// создать текст
			var socialText = document.createElement('p');
			socialText.classList.add('social__text');
			socialText.textContent = picture.comments[i].message;

			// отрисовать комментарий текст и аватарку на странице
			socialCommentsBlock.appendChild(socialComment);
			socialComment.appendChild(socialPicture);
			socialComment.appendChild(socialText);
		}
	}

	var hideCommentsControl = function () {
		var commentsCount = document.querySelector('.social__comment-count');
		commentsCount.classList.add('visually-hidden');

		var loadMoreCommentsButton = document.querySelector('.social__comment-loadmore');
		loadMoreCommentsButton.classList.add('visually-hidden');
	};
	// hideCommentsControl();

	window.showBigPicture = function (picture) {
		bigPicture.classList.remove('hidden');

		var bigPictureImage = bigPicture.querySelector('img');
		var bigPictureTitle = bigPicture.querySelector('.social__caption');
		var bigPictureLikes = bigPicture.querySelector('.likes-count');
		var bigPictureComments = bigPicture.querySelector('.comments-count');
		var bigPictureUserAvatar = bigPicture.querySelector('.social__picture');
		var bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');

		bigPictureImage.src = picture.url;
		bigPictureTitle.textContent = picture.description;
		bigPictureLikes.textContent = picture.likes;
		bigPictureComments.textContent = picture.comments.length;

		bigPictureUserAvatar.src = 'img/avatar-' + window.utils.getRandomNumber(1, 6) + '.svg';
		bigPictureUserAvatar.alt = "Аватар комментатора фотографии";
		bigPictureUserAvatar.width = 35;
		bigPictureUserAvatar.height = 35;

		bigPictureCloseButton.addEventListener('click', function () {
			closeElement(bigPicture);
		});

		document.addEventListener('keydown', closeBigPictureOnEscPressHandler);
		renderComments(picture);

	}
})();
