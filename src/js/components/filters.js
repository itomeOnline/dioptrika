function filters () {
    const section = document.querySelector('.catalog_inner');
    const mainBtn = document.querySelector('[data-filter-btn=""]');
    const catalogBtns = document.querySelectorAll('.catalog_filters__main_btn');
    const filtersCloseBtns = document.querySelectorAll('[data-filters-close]');
    const catalogMainBlock = document.querySelector('.catalog_filters__block');
    const catalogInnerBlock = document.querySelector('.catalog_filters_aside');
    const backBtn = document.querySelector('.catalog_filters_aside__top');
    
    if (mainBtn) {

        mainBtn.addEventListener('click', _ => {
        
            section.classList.toggle('is-filter');
        })
        
        catalogBtns.forEach(btn => {
            btn.addEventListener('click', _ => {
                catalogInnerBlock.classList.add('is-active');
                catalogMainBlock.classList.add('is-hidden');
            } )
        })
    
        backBtn.addEventListener('click', _ => {
            catalogInnerBlock.classList.remove('is-active');
            catalogMainBlock.classList.remove('is-hidden');
        })

        if (window.matchMedia("(max-width:750px)").matches) {
            
            filtersCloseBtns.forEach(btn => {
                btn.addEventListener('click', _ => {
                    section.classList.remove('is-filter');
                })
            })
        }

    }
    
}

export default filters;