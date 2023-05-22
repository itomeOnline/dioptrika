function historyBack() {
    const btnBack = document.querySelector('[data-history-back=""]');

    if (btnBack) {
        btnBack.addEventListener('click', () => {
            history.back();
        })
    }
}

export default historyBack;