export default (_ => {

    const DOM = {};
    let popupVideoRect = {};
    let initialTransform = '';
    

    const init = _ => {
        cacheDOM();
        bindListeners();
        getPopupVideoRect();
    }
    const cacheDOM = _ => {
        DOM.popup = document.querySelector('[data-video-popup]');
        DOM.popupVideo = DOM.popup.querySelector('[data-video-popup-video]');
        DOM.sources = document.querySelectorAll('[data-video-popup-src]')
    }
    const bindListeners = _ => {
        DOM.popup.addEventListener('click', handlePopupClick);
        DOM.sources.forEach(source => {
            source.addEventListener('click', handleSourceClick);
            source.addEventListener('mouseover', handleSourceMouseover);
        });
    }

    const getPopupVideoRect = _ => {
        popupVideoRect = DOM.popupVideo.getBoundingClientRect()
    }
    
    const handlePopupClick = ({target}) => {
        if (!target.closest('[data-video-popup-video]')) {
            DOM.popup.classList.remove('is-visible');
            DOM.popupVideo.style.transform = initialTransform;
            document.body.style.overflow = '';
            DOM.popupVideo.removeAttribute('controls');
			DOM.popupVideo.pause();
            [...DOM.sources].find(el => el.parentElement.classList.remove('is-hidden'));
        }
    }
    const handleSourceClick = ({target}) => {
        DOM.popup.classList.add('is-visible');
        DOM.popupVideo.style.transition = 'transform .3s, box-shadow .3s';
        initialTransform = DOM.popupVideo.style.transform;
        DOM.popupVideo.style.transform = '';
        document.body.style.overflow = 'hidden';
        target.classList.add('is-hidden');
        target.parentElement.classList.add('is-hidden');
    }
    const handleSourceMouseover = ({target}) => {
        moveVideo(target);
        setSource(target.src)   
    }

    const setSource = src => {
        DOM.popupVideo.src = src;
        setTimeout(_ => {
            DOM.popupVideo.controls = true;
        }, 300)
        
    }
    
    const moveVideo = target => {
        const targetRect = target.getBoundingClientRect();
        const xMoveTo = (targetRect.left + (targetRect.width / 2) -  (popupVideoRect.left + (popupVideoRect.width / 2)));
        const yMoveTo = (targetRect.top + (targetRect.height / 2) -  (popupVideoRect.top + (popupVideoRect.height / 2)));

        const xScaleTo = (targetRect.width / 2) / (popupVideoRect.width / 2);
        const yScaleTo = (targetRect.height / 2) / (popupVideoRect.height / 2);

        DOM.popupVideo.style.transform = `translate3d(${xMoveTo}px, ${yMoveTo}px, 0) scale(${xScaleTo}, ${yScaleTo})`
    
    }
    
    return {
        init: init
    }
})()