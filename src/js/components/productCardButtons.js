function productCardButtons () {
    const buttonsWrap = document.querySelectorAll('[data-buttons-wrap=""]');

    buttonsWrap.forEach(wrap => {

        const buttonsWrap = wrap.querySelector('.product_page_info__buttons--page');
        const btnCartWrap = wrap.querySelector('.product_page_info__buttons_wrap');
        const btnCart = wrap.querySelector('.product_page_info__btn--cart');
        const btnFav = wrap.querySelector('.product_page_info__btn--fav');
    
        btnFav.addEventListener('click', _ => {
            btnFav.classList.toggle('is-added');
        });
        
        btnCart.addEventListener('click', _ => {
            btnCart.classList.add('is-added')
            
            if (btnCart.classList.contains('is-added')) {
    
                btnCartWrap.addEventListener('mouseover', _ => {
                    buttonsWrap.classList.add('is-counter-active');
                });
            
                btnCartWrap.addEventListener('mouseout', _ => {
                    buttonsWrap.classList.remove('is-counter-active');
                });
            }
        })

    
    
        if (window.matchMedia("(max-width:750px)").matches) {
            
            btnCart.dataset.linkedModal = "modal_product_count";
        };
    })

}

export default productCardButtons;