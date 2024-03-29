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

function promoSlider () {
    const slider = new Swiper('.promo__slider', {
        modules: [ Navigation, Mousewheel],
        slidesPerView: 2,
        speed: 700,
        spaceBetween: 16,
        watchOverflow: true,
        mousewheelControl: true,
        watchSlidesProgress: true,
        preventInteractionOnTransition: true,
        mousewheel: {
          forceToAxis: true,
        },
        navigation: {
            nextEl: '.promo__nav_btn--next',
            prevEl: '.promo__nav_btn--prev',
        },
        breakpoints: {
            300: {
              slidesPerView: 1.2,
              spaceBetween: 12
            },
            500: {
              slidesPerView: 2,
              spaceBetween: 16
            },
        },
      });

}

export default promoSlider;