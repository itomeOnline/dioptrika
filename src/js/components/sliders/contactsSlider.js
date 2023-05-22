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

function contactsSlider () {
    const slider = new Swiper('.contacts_slider', {
        modules: [ Navigation, Mousewheel],
        slidesPerView: 1.1,
        speed: 700,
        spaceBetween: 6,
        watchOverflow: true,
        mousewheelControl: true,
        watchSlidesProgress: true,
        preventInteractionOnTransition: true,
        mousewheel: {
          forceToAxis: true,
        },
      });

}

export default contactsSlider;