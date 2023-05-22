import Swiper, {
  Navigation,
  Scrollbar,
  Mousewheel,
  Pagination,
  Grid,
  Autoplay
} from "swiper";

import 'swiper/swiper.min.css';
import "swiper/modules/grid/grid.min.css";
import "swiper/modules/grid/grid.js";

function brandsSlider () {
    const slider = new Swiper('.brands_section__slider', {
        modules: [ Navigation, Scrollbar, Mousewheel, Grid, Autoplay],
        slidesPerView: 4,
        grid: {
          rows: 2,
          fill: 'column',
        },
        navigation: {
          nextEl: '.brands_section__nav_btn--next',
          prevEl: '.brands_section__nav_btn--prev',
        },
        speed: 700,
        spaceBetween: 18,
        // watchOverflow: true,
        mousewheelControl: true,
        mousewheel: {
          forceToAxis: true,
        },
        breakpoints: {
          300: {
            grid: {
                rows: 1,
                fill: 'row',
            },
            slidesPerView: 1.5,
            spaceBetween: 6
          },
          450: {
            grid: {
                rows: 1,
                fill: 'row',
            },
            slidesPerView: 2,
            spaceBetween: 6
          },
          750: {
            grid: {
                rows: 2,
                fill: 'column',
            },
            slidesPerView: 4,
            spaceBetween: 18
          },
        },
      });
}

export default brandsSlider;