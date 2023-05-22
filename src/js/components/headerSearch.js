function headerSearch () {
    const searchBtn = document.querySelectorAll('[data-search-start=""]');
    const searchCont = document.querySelector('.header_search');
    
    searchBtn.forEach(btn => {
        btn.addEventListener('click', _ => {
            btn.classList.toggle('is-search');
            searchCont.classList.toggle('is-open');
        })  
    })
}

export default headerSearch;