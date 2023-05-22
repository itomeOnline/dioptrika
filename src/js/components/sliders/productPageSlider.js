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

function productPageSlider () {
    const slider = new Swiper('.product_page__slider', {
        modules: [ Pagination, Mousewheel],
        slidesPerView: 1,
        speed: 700,
        spaceBetween: 8,
        watchOverflow: true,
        mousewheelControl: true,
        watchSlidesProgress: true,
        preventInteractionOnTransition: true,
        mousewheel: {
          forceToAxis: true,
        },
        pagination: {
          el: '.product_page__slider_pagination',
          type: 'bullets',
        },
      });

}

export default productPageSlider;