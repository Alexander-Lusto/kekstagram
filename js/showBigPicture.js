'use strict';
(function () {
  var bigPicture = document.querySelector('.big-picture');

  var SHOWED_COMMENTS_ON_START = 5;
  var SHOWED_COMMENTS_ON_CLICK = 5;
  var showedComments;

	var removePreviousComments = function (commentsBlock) {
		var socialComments = commentsBlock.querySelectorAll('.social__comment');
		if (socialComments) {
			for (let i = 0; i < socialComments.length; i++) {
				socialComments[i].remove();
			}
		}
	}

	var renderComments = function (picture, commentsArray) {
    var socialCommentsBlock = document.querySelector('.social__comments');
    var currentCommentsCount = bigPicture.querySelector('.current-comments-count');
    var allCommentsCount = bigPicture.querySelector('.comments-count');
		removePreviousComments(socialCommentsBlock);

		for (var i = 0; i < commentsArray.length; i++) {
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

    currentCommentsCount.textContent = commentsArray.length;
    allCommentsCount.textContent = picture.comments.length;
	}

	window.showBigPicture = function (picture) {
		bigPicture.classList.remove('hidden');

		var bigPictureImage = bigPicture.querySelector('img');
		var bigPictureTitle = bigPicture.querySelector('.social__caption');
		var bigPictureLikes = bigPicture.querySelector('.likes-count');

		var bigPictureUserAvatar = bigPicture.querySelector('.social__picture');
    var bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');
    var showMorePhotosButton = bigPicture.querySelector('.social__comment-loadmore');


    var closeBigPictureOnEscPressHandler = function (evt) {
      if (evt.keyCode === 27) {
        closeElement(bigPicture);
        showMorePhotosButton.removeEventListener('click', showMoreCommentsClickHandler);
      }
    }

    var closeElement = function (element) {
      element.classList.add('hidden');
      document.removeEventListener('keydown', closeBigPictureOnEscPressHandler);
      showMorePhotosButton.removeEventListener('click', showMoreCommentsClickHandler);
    }

		bigPictureImage.src = picture.url;
		bigPictureTitle.textContent = picture.description;
		bigPictureLikes.textContent = picture.likes;

		bigPictureUserAvatar.src = 'img/avatar-' + window.utils.getRandomNumber(1, 6) + '.svg';
		bigPictureUserAvatar.alt = "Аватар комментатора фотографии";
		bigPictureUserAvatar.width = 35;
		bigPictureUserAvatar.height = 35;

		bigPictureCloseButton.addEventListener('click', function () {
			closeElement(bigPicture);
    });

    document.addEventListener('keydown', closeBigPictureOnEscPressHandler);

    showMorePhotosButton.classList.remove('hidden');
    showedComments = picture.comments.slice(0, SHOWED_COMMENTS_ON_START);

    var showMoreCommentsClickHandler = function (evt) {
      if (picture.comments.length > showedComments.length) {
        showedComments = picture.comments.slice(0, showedComments.length + SHOWED_COMMENTS_ON_CLICK);
        renderComments(picture, showedComments);
        if (picture.comments.length === showedComments.length) {
          showMorePhotosButton.classList.add('hidden');
        }
      }
      else {
        showedComments = picture.comments.slice(0, SHOWED_COMMENTS_ON_START);
        showMorePhotosButton.removeEventListener('click', showMoreCommentsClickHandler);
      }
    };
    showMorePhotosButton.addEventListener('click', showMoreCommentsClickHandler);

		renderComments(picture, showedComments);
	}
})();
