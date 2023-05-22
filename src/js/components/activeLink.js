function activeLink () {

    const activeLinks = document.querySelectorAll('[data-active-link]');

    activeLinks.forEach(el => {
        if (el.href === location.href) {
            el.classList.add('is-active')
        } else {
            el.classList.remove('is-active')
        }
    })
}

export default activeLink;
