class Tab {
	constructor(el) {
		this.el = el;
		this.wrapper = this.el.closest('[data-tabs-wrapper]');
		this.clickedToggle = null;

	}
	get isActive() {
		return this.el.classList.contains('is-active')
	}
	set isActive(bool) {
		if (bool) {
			this.el.classList.add('is-active');
			this.wrapper.dataset.activeTab = this.el.dataset.tab
		}
		else  {
			this.el.classList.remove('is-active');
			if (this.clickedToggle) {
				this.clickedToggle.classList.remove('is-clicked');
			}
		}
	}
}

export { Tab }