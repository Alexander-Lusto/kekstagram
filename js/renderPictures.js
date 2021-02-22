'use strict';
(function () {
  var galleryFilters = document.querySelector('.img-filters');

  var onLoad = function (data) {
    window.data = data;
    renderPictures(data);
  }

	var getPictureTemplate = function (data) {
		var template = document.querySelector('#picture').content; // очень важно не забывать по content
		var pictureTemplate = template.cloneNode(true).querySelector('.picture__link');

		var image = pictureTemplate.querySelector('.picture__img');
		var likes = pictureTemplate.querySelector('.picture__stat--likes');
		var comments = pictureTemplate.querySelector('.picture__stat--comments');

		image.src = data.url;
		comments.textContent = data.comments.length;
		likes.textContent = data.likes;

		return pictureTemplate;
  }

  var deletePreviousPhotos = function () {
    var previousePhotos = document.querySelectorAll('.picture__link');
    if (previousePhotos) {
      previousePhotos.forEach(function (el) {
        el.remove();
      });
    }
  }

	window.renderPictures = function (pictures) {
    deletePreviousPhotos();
		var gallery = document.querySelector('.pictures');
		for (let i = 0; i < pictures.length; i++) {
			var picture = getPictureTemplate(pictures[i]);
			gallery.appendChild(picture);
			picture.addEventListener('click', function (evt) {
				evt.preventDefault();
				window.showBigPicture(pictures[i]);
			});
    }
    galleryFilters.classList.remove('hidden');
  }

  window.backend.load(onLoad, window.utils.onError);
})();
