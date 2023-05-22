class Modal {
	constructor(el) {
		this.el = el;
		this.needOverlay = !el.dataset.modalNoOverlay;
		this.parentModal = el.dataset.parentModal;
		this.clickedToggle = null;
		this.firstInput = this.el.querySelector('input, textarea')
	}
	get isActive() {
		return this.el.classList.contains('is-active')
	}
	set isActive(bool) {
		if (bool) {
			this.el.classList.add('is-active');
			if (this.firstInput) {
				setTimeout(() =>  {
					this.firstInput.focus();
				}, 100)
			}
		}
		else  {
			this.el.classList.remove('is-active');
			if (this.clickedToggle) {
				this.clickedToggle.classList.remove('is-clicked');
			}
			if (this.el.querySelector('.on-success')) {
				setTimeout(_ => {
					this.el.querySelector('.on-success').classList.remove('on-success')
				}, 500)
			}
		}
	}
	get isOnActiveChild() {
		return this.el.classList.contains('on-active-child')
	}
	set isOnActiveChild(bool) {
		if (bool) {
			this.el.classList.add('on-active-child');
		}
		else  {
			this.el.classList.remove('on-active-child');
		}
	}
}
export { Modal };