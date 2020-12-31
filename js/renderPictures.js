'use strict';
(function () {
  var galleryFilters = document.querySelector('.filters');

  var onLoad = function (data) {
    window.data = data;
    renderPictures(data);
  }

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

  var deletePreviousPhotos = function () {
    var previousePhotos = document.querySelectorAll('.picture');
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
    console.log(pictures);
    console.log(data);
  }

  window.backend.load(onLoad, window.utils.onError);
})();
