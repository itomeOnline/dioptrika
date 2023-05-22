import Swiper, {
    Navigation,
    Scrollbar,
    Mousewheel,
    Pagination,
    EffectFade,
    Autoplay,
    Virtual,
    Parallax,
    Lazy,
    FreeMode 
  } from 'swiper';
  
import 'swiper/swiper.min.css';
import 'swiper/modules/scrollbar/scrollbar.min.css';

function indexCatalogSlider () {
    const slider = new Swiper('.catalog_section_slider_main', {
        modules: [ Navigation, Mousewheel, Pagination, EffectFade],
        slidesPerView: 1,
        speed: 700,
        // spaceBetween: 12,
        // watchOverflow: true,
        // mousewheelControl: true,
        // watchSlidesProgress: true,
        
        // mousewheel: {
        //   forceToAxis: true,
        // },
        effect: "fade",
        fadeEffect: {
          crossFade: true
        },
        navigation: {
            nextEl: '.catalog_section_slider__btn--next',
            prevEl: '.catalog_section_slider__btn--prev',
        },
        pagination: {
          el: '.catalog_section_slider__pagination',
          type: 'fraction',
        },
      });

}

export default indexCatalogSlider;