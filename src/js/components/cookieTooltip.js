function cookieTooltip() {
    const tooltip = document.querySelector('[data-cookie-tooltip]');
    const btn = document.querySelector('[data-cookie-btn]')

    if (!btn || !tooltip) return;
    btn.addEventListener('click', _ => {
        tooltip.classList.remove('is-visible');
        
        localStorage.setItem('cookies', true);
    })

    if (!localStorage.getItem('cookies')) {

        setTimeout(_ => {
            tooltip.classList.add('is-visible');
        }, 5000)

    }
}

export default cookieTooltip;