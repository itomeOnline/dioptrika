export default function tab(item){
    let dom = {},
    activeBtn = item.querySelector('.is-active[data-tab-id]'),
    activeTab = item.querySelector('.is-active[data-tab]')

    function cacheDom () {
        dom.tabBtns = item.querySelectorAll('[data-tab-id]');
        dom.tabItems = item.querySelectorAll('[data-tab]');
    }

    function selectTab (target) {
        const tabId = target.dataset.tabId;

        //setActiveTab

        activeTab.classList.remove('is-active');
        activeTab = item.querySelector(`[data-tab="${tabId}"]`);
        activeTab.classList.add('is-active')


        //setActiveBtn
        const btnPosX = target.offsetLeft;
        const btnWidth = target.offsetWidth;

        activeBtn.classList.remove('is-active');
        activeBtn = target;
        activeBtn.classList.add('is-active');

        // changeLinePosition(btnWidth ,btnPosX)
    }

    
    function bindEvents() {
        dom.tabBtns.forEach( btn => {
            btn.addEventListener('click', ({target}) => selectTab(target.closest('[data-tab-id]')))
        })
    }

    function init() {
        cacheDom();
        bindEvents();
    }

    init();
}