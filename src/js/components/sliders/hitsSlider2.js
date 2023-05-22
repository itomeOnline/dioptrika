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

function hitsSlider2 () {
    const slider = new Swiper('.hits__slider_2', {
        modules: [ Navigation, Mousewheel],
        slidesPerView: 4,
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
            nextEl: '.hits_2__nav_btn--next',
            prevEl: '.hits_2__nav_btn--prev',
        },
        breakpoints: {
            300: {
              slidesPerView: 2,
              spaceBetween: 12
            },
            750: {
              slidesPerView: 4,
              spaceBetween: 16
            },
        },
      });

}

export default hitsSlider2;