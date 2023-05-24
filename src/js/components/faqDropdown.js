function faqDropdown () {
    const dropdownItems = document.querySelectorAll('[data-dropdown-block=""]');
    
    dropdownItems.forEach( item => {

        if (document.querySelector('.product_page')) {

            item.querySelector('[data-dropdown-block-btn]').addEventListener('click', _ => {
                
                item.classList.toggle('is-active');
            })
        } else {

            item.querySelector('[data-dropdown-block-btn]').addEventListener('click', _ => {
                dropdownItems.forEach(btn => {
                    if (btn  === item) return
    
                    btn.classList.remove('is-active');
                })
                
                item.classList.toggle('is-active');
            })
        }
        
    })


}

export default faqDropdown;