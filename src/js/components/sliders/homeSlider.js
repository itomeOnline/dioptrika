import Swiper, {
    Navigation,
    Scrollbar,
    Mousewheel,
    Pagination,
    EffectFade,
    Autoplay,
    Virtual,
    Parallax,
    Lazy
  } from 'swiper';
  
import 'swiper/swiper.min.css';
import 'swiper/modules/scrollbar/scrollbar.min.css';

function homeSlider () {
    const slider = new Swiper('.home__slider', {
        modules: [ Navigation, Mousewheel, EffectFade],
        slidesPerView: 1,
        speed: 700,
        loop: true,
        watchOverflow: true,
        watchSlidesProgress: true,
        preventInteractionOnTransition: true,
        autoplay: {
	        delay: 6000,
	      },
        effect: "fade",
        fadeEffect: {
          crossFade: true
        },
      });

}

export default homeSlider;