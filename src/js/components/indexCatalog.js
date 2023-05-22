function indexCatalog () {
    const catalogLink = document.querySelectorAll('.catalog_section_list__item');
    const catalogListBlock = document.querySelector('.catalog_section_list_inner');
    const catalogContent = document.querySelector('.catalog_section__content');
    

    catalogLink.forEach(link => {
        link.addEventListener('mouseover', _ => {
            catalogListBlock.classList.add('is-open');
            catalogContent.classList.add('bg');
        })

        link.addEventListener('mouseout', _ => {
            catalogListBlock.classList.remove('is-open');
            catalogContent.classList.remove('bg');
        })

    })

    catalogListBlock.addEventListener('mouseover', _ => {
        catalogListBlock.classList.add('is-open');
        catalogContent.classList.add('bg');
    })

    catalogListBlock.addEventListener('mouseout', _ => {
        catalogListBlock.classList.remove('is-open');
        catalogContent.classList.remove('bg');
    })

    if (window.matchMedia("(max-width:750px)").matches) {
        
        catalogLink.forEach(link => {
            link.href = "/catalog_inner";
        })
    } 
}

export default indexCatalog;