import { Tab } from './tab';

export let TabsDispatcher = (function () {

	let tabsList = {};

	function checkIfTabInList(tabName) {
		return (typeof tabsList[tabName] !== 'undefined')
	}

	function createTab(tab) {
		let tabName = tab.dataset.tab;
		if (!checkIfTabInList(tabName)) {
			tabsList[tabName] = new Tab(tab);
		}

	}

	function showTab(tab) {
		if (tab.wrapper.querySelector('[data-tab].is-active')) {
			tabsList[tab.wrapper.querySelector('[data-tab].is-active').dataset.tab].isActive = false;
		}
		tab.isActive = true
	}

	function fillList() {
		let tabs = document.querySelectorAll('[data-tab]');
		[].forEach.call(tabs, createTab);
	}

	function setActiveTabs() {
		[].forEach.call(document.querySelectorAll('[data-tabs-wrapper]'), (wrap) => {
			let firstTabName = wrap.querySelector('[data-tab]').dataset.tab;
			let toggle = document.querySelector(`[data-linked-tab="${firstTabName}"]`);
			tabsList[firstTabName].isActive = true;
			tabsList[firstTabName].clickedToggle = toggle;
			toggle.classList.add('is-clicked');

		});
	}


	

	function bindEvents() {
		document.addEventListener('mousedown', function (event) {
			if (event.which === 1) {
				let toggle = event.target.closest('[data-linked-tab]'),
				tab = {};
				if (!!toggle && !!tabsList[toggle.dataset.linkedTab]) {
					toggle.classList.add('is-clicked');
					tabsList[toggle.dataset.linkedTab].clickedToggle = toggle;
					showTab(tabsList[toggle.dataset.linkedTab]);
					event.stopPropagation();
					event.preventDefault();
				}

			}
		});
	}

	function init() {

		fillList();
		bindEvents();
		setActiveTabs();

	}
	return {
		init: init    
	}

})();