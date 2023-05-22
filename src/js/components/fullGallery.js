import { Swiper, Navigation, Virtual } from 'swiper';
Swiper.use([
	Navigation,
	Virtual,
]);
export default {
	init: function() {
		var sliderFullGallery = new Swiper('[data-slider="gallery"]', {
			slidesPerView: 1,
			centeredSlides: true,
			speed: 700,
			spaceBetween: 20,
			watchOverflow: true,
			virtual: {
				cache: false,
				renderSlide: function(slide) {
					const tag = ~['mp4', 'mov'].indexOf(slide.split('.').pop()) ? 'video' : 'img';
					return `<div class="swiper-slide gallery__slide"><${tag} class="gallery__src_content" src="${slide}" ${tag === 'video' ? 'controls' : ''}/></div>`
				}
			},
			navigation: {
				nextEl: '.gallery__nav_btn--next',	
				prevEl: '.gallery__nav_btn--prev'	
			},
			
			keyboard: {
				enabled: true,
				onlyInViewport: false,
			},
		});

		document.addEventListener('mousedown', function(event) {
			var el = event.target.closest('[data-gallery-slides]');
			if (!el) return;
			var slides = JSON.parse(el.dataset.gallerySlides);

			if (!slides) {
				return
			}

			sliderFullGallery.virtual.slides = [];
			sliderFullGallery.update();
			sliderFullGallery.virtual.slides = slides
			sliderFullGallery.slideTo(0, 0);
			sliderFullGallery.update();
			sliderFullGallery.scrollbar.updateSize();
			if (event.target.closest('[data-id]')) {
				sliderFullGallery.slideTo(+event.target.closest('[data-id]').dataset.id, 0);
			}

			document.dispatchEvent(new CustomEvent('needModal', {detail: 'gallery'}))

		});

	}
}