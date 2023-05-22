function headerCatalog () {
    const header = document.querySelector('.header');
    const headerBG = document.querySelector('.header__overlay');
    const headerBtn = document.querySelector('[data-catalog-btn=""]');
    const catalog = document.querySelector('.header_catalog');
    const closeBtn = document.querySelector('[data-btn-close=""]');
    const catalogLink = document.querySelectorAll('[data-catalog-link=""]');
    const categoriesBlock = document.querySelector('[data-categories=""]');
    
    headerBtn.addEventListener('click', _ => {
        header.classList.toggle('is-catalog-open');
    })

    closeBtn.addEventListener('click', _ => {
        header.classList.remove('is-catalog-open');
    })

    headerBG.addEventListener('click', _ => {
        header.classList.remove('is-catalog-open');
    })

    catalogLink.forEach(link => {
        link.addEventListener('mouseover', _ => {
            categoriesBlock.classList.add('is-active');
        })

        link.addEventListener('mouseout', _ => {
            categoriesBlock.classList.remove('is-active');
        })

    })

    categoriesBlock.addEventListener('mouseover', _ => {
        categoriesBlock.classList.add('is-active');
    })

    categoriesBlock.addEventListener('mouseout', _ => {
        categoriesBlock.classList.remove('is-active');
    })
}

export default headerCatalog;