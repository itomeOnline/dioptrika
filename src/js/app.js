import LazyLoad from "vanilla-lazyload";
import LocomotiveScroll from 'locomotive-scroll';
import InputPhone from "./components/inputs/inputPhone";
import Input from "./components/inputs/input";
import validationMessages from "./components/inputs/validationMessages";
import IMask from "imask";
import SimpleBar from "simplebar";
import "simplebar/dist/simplebar.css";
import ModalDispatcher from "./components/modalDispatcher";
import formSubmit from "./components/form";
import cookieTooltip from "./components/cookieTooltip";
import preloaderCounter from "./components/preloaderCounter";
import catalogInfiniteSlider from "./components/sliders/catalogInfiniteSlider";
import hitsSlider from "./components/sliders/hitsSlider";
import hitsSlider1 from "./components/sliders/hitsSlider1";
import hitsSlider2 from "./components/sliders/hitsSlider2";
import brandsSlider from "./components/sliders/brandsSlider";
import contactsSlider from "./components/sliders/contactsSlider";
import faqDropdown from "./components/faqDropdown";
import filters from "./components/filters";
import Dropdown from './components/dropdown';
import activeLink from "./components/activeLink";
import headerCatalog from "./components/headerCatalog";
import tab from "./components/productTabs";
import indexCatalog from "./components/indexCatalog";
import indexCatalogSlider from "./components/sliders/indexCatalogSlider";
import mapWidget from "./components/mapWidget";
import rangeSliders from "./components/rangeSliders";
import historyBack from "./components/historyBack";
import DropzoneArea from "./components/DropzoneArea";
import headerSearch from "./components/headerSearch";
import HvrSlider from "./components/sliders/HvrSlider";
import productCardMobile from "./components/productCardMobile";
import productCardButtons from "./components/productCardButtons";
import productPageSlider from "./components/sliders/productPageSlider";
import homeSlider from "./components/sliders/homeSlider";
import promoSlider from "./components/sliders/promoSlider";

setTimeout(() => { 
    document.querySelector('body').classList.add('on-loaded');
}, 1000)

document.addEventListener("DOMContentLoaded", _ => {
    if (!sessionStorage.activeSession) {
        // setTimeout(_ => {
        //   document.querySelector('.preloader').classList.add('is-ready');
        //   sessionStorage.activeSession = 1;
        // }, 1000)
        
        setTimeout(() => {
            document.querySelector('body').classList.add('disabled');
            // sessionStorage.setItem('site', 'enter');
        }, 3500)
        
        sessionStorage.activeSession = 1;
    } else {
        document.querySelector('body').classList.add('disabled');
    }

    formSubmit();
    cookieTooltip();
    ModalDispatcher.init();

    preloaderCounter();
    faqDropdown();
    filters();
    activeLink();
    headerCatalog();
    mapWidget();
    rangeSliders();
    historyBack();
    headerSearch();
    productCardMobile();
    productCardButtons();

    catalogInfiniteSlider();
    hitsSlider();
    hitsSlider1();
    hitsSlider2();
    brandsSlider();
    contactsSlider();
    indexCatalogSlider();
    productPageSlider();
    homeSlider();
    promoSlider();

    if (document.querySelectorAll('[data-many-sliders=""]')) {
        const blocks = document.querySelectorAll('[data-many-sliders=""]');

        blocks.forEach(block => {
            hitsSlider();
            hitsSlider1();
            hitsSlider2();
        })
    }
    

    if (document.querySelector('[data-hover-images=""]')) {
        new HvrSlider('[data-hover-images=""]')
    }

    if (document.querySelector('.catalog_section')) {
        indexCatalog();
    } 
    
    // if (document.querySelector('.product_page')) {
        
    // } 

    if (document.querySelector('.dropzone')) {
        document.querySelectorAll('.dropzone').forEach(item => {
            new DropzoneArea(item).init();
        })
    }


    let scroll = new LocomotiveScroll({ 
        getDirection: true,
    });
    
    const lazyLoadInstance = new LazyLoad({
        elements_selector: '[data-lazy]'
    });

    setTimeout( _ => {
        scroll.update();


        scroll.on('scroll', (args) => {
        if (args.scroll.y > 100) {
            document.body.dataset.scrollDirection = args.direction;
        }
        else {
            document.body.dataset.scrollDirection = '';
        }
        });
        
        // scroll.on('call', func => {
        //     statsCounter();
        // })  
    }, 0)

    document.querySelectorAll('[data-dropdown]').forEach(el => {
        new Dropdown(el);
    })

    if (document.querySelectorAll('[data-tab-wrapper]')) {
        const wrappers = document.querySelectorAll('[data-tab-wrapper]');
        
        wrappers.forEach(wrap => {
            tab(wrap);
        })
    }


    // PRIVACY
    
    if (document.querySelector('.privacy')) {
        let containers = document.querySelectorAll('[data-sector]');
        let links = document.querySelectorAll('.privacy_pagination__link');
        let anchorLinks = document.querySelectorAll('[data-anchor-link]');
      
        function intersectionHandler(entries) {
            [].forEach.call(entries, function(entry) {
                let sector = entry.target.dataset.sector;
                let link = [].find.call(links, link =>  link.getAttribute('href').replace('#', '') === sector);
                if (entry.isIntersecting) {
                    link.classList.add('is-active');
                }
                else {
                    link.classList.remove('is-active');
                }
      
            });
        }
      
        let observerSector = new IntersectionObserver(intersectionHandler, {  threshold: .1, rootMargin: '-20% 0% -50%'});
        [].forEach.call(containers, function(entry) {
            observerSector.observe(entry);
        });
      
        [].forEach.call(anchorLinks, function(link) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
      
                const sector = link.getAttribute('href').replace('#', '');
                const pos = document.querySelector(`[data-sector="${sector}"]`).offsetTop;
                window.scrollTo(0, pos);
            });
        });
      
      }
      
    // ANCHOR LINKS

    const anchorLinks = document.querySelectorAll('[data-anchor]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', evt => {
            evt.preventDefault();
            const target = document.querySelector(`[data-scroll-id=${link.dataset.anchor}]`);
            scroll.scrollTo(target);
        });
    });

    // INPUTS

    const inputs = document.querySelectorAll('.input_wrapper__input');


    document.querySelectorAll('[name="phone"]').forEach((el) => {
        new InputPhone(el);
    });

    inputs.forEach(item => {
        new Input(item, validationMessages);
    })

});