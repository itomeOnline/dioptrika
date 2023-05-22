function productCardButtons () {
    const buttonsWrap = document.querySelector('.product_page_info__buttons--page');
    const btnCart = document.querySelector('.product_page_info__buttons_wrap');
    const btnFav = document.querySelector('.product_page_info__btn--fav');

    btnFav.addEventListener('click', _ => {
        btnFav.classList.toggle('is-added');
    });


    btnCart.addEventListener('mouseover', _ => {
        buttonsWrap.classList.add('is-counter-active');
    });

    btnCart.addEventListener('mouseout', _ => {
        buttonsWrap.classList.remove('is-counter-active');
    });

    if (window.matchMedia("(max-width:750px)").matches) {
        
        btnCart.dataset.linkedModal = "modal_product_count";
    };
}

export default productCardButtons;