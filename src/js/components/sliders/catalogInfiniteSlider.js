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

function catalogInfiniteSlider () {
    const slider = new Swiper('.catalog_infinite_slider', {
      modules: [ Navigation, Scrollbar, Mousewheel, Autoplay],
      slidesPerView: "auto",
	    speed: 4000,
	    spaceBetween: 60,
	    loop: true,
	    autoplay: {
	      delay: 0,
	    },
      loopedSlides: 5,
	    breakpoints: {
	      // 300: {
	      //   slidesPerView: 1,
        //   loopedSlides: 1,
        //   spaceBetween: 30,
	      // },
        // 750: {
        //   slidesPerView: 5,
        //   loopedSlides: 5,
        //   spaceBetween: 60,
        // },
	    },        
      });
}

export default catalogInfiniteSlider;