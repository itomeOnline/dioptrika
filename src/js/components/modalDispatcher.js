import { Modal } from './modal';


let ModalDispatcher = (function () {

	let appRoot,
	commonModalOverlay,
	commonModalOverlayRect,
	commonCloseButton,
	prevAddClass,
	activeModal =  null,
	modalsContainer = document.querySelector('.modals'),
	modalsList = {};

	setTimeout( _ => {
		modalsContainer.style.opacity = "";
	}, 1000); 

	function getScrollWidth() {
		let div = document.createElement('div');

		div.style.overflowY = 'scroll';
		div.style.width = '50px';
		div.style.height = '50px';

		// мы должны вставить элемент в документ, иначе размеры будут равны 0
		document.body.append(div);
		let scrollWidth = div.offsetWidth - div.clientWidth;

		div.remove();

		return scrollWidth;
	}

	function checkIfModalInList(modalName) {
		return (typeof modalsList[modalName] !== 'undefined')
	}

	function createModal(modal) {
		let modalName = modal.dataset.modal;
		if (!checkIfModalInList(modalName)) {
			modalsList[modalName] = new Modal(modal);
		}


	}

	function fillList() {
		modalsList = {};
		let modals = document.querySelectorAll('[data-modal]');
		[].forEach.call(modals, createModal);
	}


	function showModal(modal) {

		if (activeModal) {
			if (activeModal === modalsList[modal.parentModal]) {
				modalsList[modal.parentModal].isOnActiveChild = true
			}
			else {
				
				if (activeModal.parentModal && modalsList[activeModal.parentModal].isActive) {
					closeModal(modalsList[activeModal.parentModal])
				}
				closeModal(activeModal);
				
			}
		}

		if (modal.el.dataset.addBodyClass) {
			document.body.classList.add(modal.el.dataset.addBodyClass);
		}

		if (prevAddClass && !modal.el.hasAttribute('data-add-body-class') || 
			(modal.el.hasAttribute('data-add-body-class') && prevAddClass !== modal.el.dataset.addBodyClass)) {
				
			document.body.classList.remove(prevAddClass);
		}

		if (modal.el.dataset.addBodyClass) {
			prevAddClass = modal.el.dataset.addBodyClass;
		}

		modal.isActive = true
		activeModal = modal;
		handleOverlay();
	}

	function closeModal(modal) {

		if (activeModal.parentModal) {
			modalsList[activeModal.parentModal].isOnActiveChild = false;
			activeModal.isActive = false;
			activeModal = modalsList[activeModal.parentModal]
		}
		else { 
			closeAll()
		}


		handleOverlay();
	}

	function handleClosing(modal = null) {
		if (modal) {
			closeModal(modal);
		}
		else {
			closeAll();
		}
	}

	function closeAll(event) {
		if (!event || event.which === 1) {
			if (activeModal) {
				activeModal.isActive = false;
				if (modalsList[activeModal.parentModal]) {
					modalsList[activeModal.parentModal].isActive = false;
					modalsList[activeModal.parentModal].isOnActiveChild = false;
				}

				// console.log(activeModal);

				if (activeModal.el.querySelector('video')) {
					activeModal.el.querySelector('video').pause();
				}

				
				if (activeModal.el.dataset.addBodyClass) {
					const activeModalClass = activeModal.el.dataset.addBodyClass;

					// document.body.classList.remove(activeModalClass);

					setTimeout( _ => {
						if (activeModal && activeModal.el.dataset.addBodyClass !== activeModalClass) {
							document.body.classList.remove(activeModalClass);
						} else if (!activeModal) {
							document.body.classList.remove(activeModalClass);
						}
					}, 500)
				}

				// document.dispatchEvent(new CustomEvent('needModal', {detail: activeModal}));  

				activeModal = null;
				handleOverlay();
			}

		}


	}

	function handleOverlay() {
		if (!commonModalOverlay) {
			return 
		}


		if (activeModal && activeModal.needOverlay) {
			commonModalOverlay.classList.add('is-active');
			document.querySelector('html').style.overflowY = 'hidden';
			document.querySelector('html').style.touchAction = 'none';
			// document.querySelector('html').style.paddingRight = `${getScrollWidth()}px`;
			if (commonCloseButton) {
				commonCloseButton.style.willChange = 'transform';
			}
		}
		else {
			commonModalOverlay.classList.remove('is-active');
			document.querySelector('html').style.overflowY = 'unset';
			document.querySelector('html').style.touchAction = '';
			// document.querySelector('html').style.paddingRight = "";
			if (commonCloseButton) {
				commonCloseButton.style.willChange = '';
			}
		}
	}

	function moveCloseButton(event) {
		let x = event.pageX,
		y = event.pageY,
		modalOffsetX = commonModalOverlayRect.left,
		modalOffsetY = commonModalOverlayRect.top,
		toX = x - modalOffsetX - commonCloseButton.offsetWidth / 2,
		toY = y - modalOffsetY - commonCloseButton.offsetHeight / 2;

		commonCloseButton.style.transform =
		'translate3d(' + toX + 'px, ' + toY + 'px, 0)';
	}

	function hideCloseButton() {
		commonCloseButton.style.display = 'none';
	}
	function showCloseButton() {
		commonCloseButton.style.display = '';
	}

	function setInputs(modal, inputs) {
		const target = modal.el.querySelector('form') ? modal.el.querySelector('form') : modal.el.closest('form');
		inputs.forEach(input => {
			console.log(modal.el);
			const el = target.querySelector(`[name="${input.key}"]`);
			if (el) {
				el.value = input.value;
			}
		})
	}
	function setFormId(modal, formId) {
		const target = modal.el.querySelector('form');
		target.dataset.formId = formId;
	}

	function bindEvents() {
		document.addEventListener('click', function (event) {
			console.log('test');
			if (event.which === 1) {
				let toggle = event.target.closest('[data-linked-modal]'),
				modal = {};
				if (!!toggle && !!modalsList[toggle.dataset.linkedModal]) {
					toggle.classList.add('is-clicked');
					modalsList[toggle.dataset.linkedModal].clickedToggle = toggle;
					showModal(modalsList[toggle.dataset.linkedModal]);
					event.stopPropagation();
					event.preventDefault();

					if (toggle.dataset.modalSetInputs) {
						setInputs(modalsList[toggle.dataset.linkedModal], JSON.parse(toggle.dataset.modalSetInputs))
					}
					if (toggle.dataset.modalFormId) {
						setFormId(modalsList[toggle.dataset.linkedModal], toggle.dataset.modalFormId)
					}
				}

			}
		});

		document.addEventListener('mousedown', function (event) {
			if (event.which === 1) {
				let closeButton = event.target.closest('[data-modal-close]');
				if (!!closeButton) {
					var modal = modalsList[closeButton.closest('[data-modal]').dataset.modal];
					handleClosing(modal);
				}
			}
		})
		document.addEventListener('keyup', function (event) {
			event = event || window.event;
			if (event.keyCode == 27) {
				handleClosing(activeModal);
			}
		});

		document.addEventListener('needModal', ({detail}) => {	
			showModal(modalsList[detail]);
		});

		document.addEventListener('needCloseModal', ({detail}) => {
			closeModal(modalsList[detail]);
		});

		if (commonModalOverlay) {
			commonModalOverlay.addEventListener('mousedown', closeAll);
			if (commonCloseButton) {
				commonModalOverlayRect = commonModalOverlay.getBoundingClientRect();
				commonModalOverlay.addEventListener('mousemove', Utils.throttle(moveCloseButton, 10));
				commonModalOverlay.addEventListener('mouseleave', hideCloseButton);
				commonModalOverlay.addEventListener('mouseenter', showCloseButton);
			}
		}
	}

	function init() {
		commonModalOverlay = document.getElementById('commonModalOverlay');
		commonCloseButton = document.getElementById('commonCloseButton');
		fillList();
		bindEvents();

	}
	return {
		init: init,
		closeAll: closeAll    
	}

})();

export default ModalDispatcher;