import { validationMessages } from './validationMessages';



export default class Input {
    constructor(el, obj) {
        this.el = el;
        this.obj = obj;
        this.addEventListeners();
    }

    addEventListeners() {
        this.el.addEventListener('blur', this.validationOptions.bind(this));
        this.el.addEventListener('input', this.fillInput.bind(this));
    }

    validationOptions() {
        for (let key in this.el.validity) {
			if (key !== 'valid' && this.el.validity[key]) {
            
                const type = this.obj[key][this.el.type] ? this.el.type : 'default';
                const message = this.obj[key][type];

                this.renderTooltip(message);
                this.addValidation();
			}
		}
    }

    addValidation() {
        this.el.closest('[data-input-wrapper]').classList.add('not-valid');
    }

    removeValidation() {
        this.el.closest('[data-input-wrapper]').classList.remove('not-valid');
    }

    renderTooltip() {
        this.el.closest('[data-input-wrapper]').querySelector('[data-input-tooltip]').innerHTML = `
        <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.8334 5.00065V11.6673H9.16671V5.00065H10.8334Z" fill="#FF0101"/>
        <path d="M9.16671 13.334H10.8417V15.0007H9.16671V13.334Z" fill="#FF0101"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.833374 10.0007C0.833374 4.93804 4.93743 0.833984 10 0.833984C15.0627 0.833984 19.1667 4.93804 19.1667 10.0007C19.1667 15.0633 15.0627 19.1673 10 19.1673C4.93743 19.1673 0.833374 15.0633 0.833374 10.0007ZM10 2.50065C5.85791 2.50065 2.50004 5.85852 2.50004 10.0007C2.50004 14.1428 5.85791 17.5007 10 17.5007C14.1422 17.5007 17.5 14.1428 17.5 10.0007C17.5 5.85852 14.1422 2.50065 10 2.50065Z" fill="#FF0101"/>
        </svg>
        `;
    }

    fillInput() {
        this.el.classList.add('is-filled');

        if (this.el.value === '' ) {
			this.el.classList.remove('is-filled');
		}

		this.removeValidation();
    }
}