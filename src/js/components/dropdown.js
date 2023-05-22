export default class Dropdown {
    constructor(ref) {
        this.ref = ref;
        const dataset = this.ref.dataset;
        this.options = JSON.parse(dataset.dropdownOptions);

        if (dataset.dropdownPlaceholder) {
            this.placeholder = dataset.dropdownPlaceholder;
        }else{
            this.defaultValue = JSON.parse(dataset.defaultValue);
        }
        
        if (!dataset.dropdownReadonly) {
            this.readOnly = false;
        }
// 		this.readOnly = dataset.dropdownReadonly ? false : '';
        if (!dataset.dropdownName) {
            this.name = 'genericDropdown'
        }else{
           this.name = dataset.dropdownName
        }
        // this.name = dataset.dropdownName ? 'genericDropdown' : '';
        this.data = {key: '', value: ''};
        this.ref.innerHTML = this.render();
        this.visibleInput = this.ref.querySelector('[data-dropdown-input]');
        this.hiddenInput = this.ref.querySelector('[data-dropdown-value]');
        this.optionsList = this.ref.querySelector('[data-dropdown-list]');
        this.optionListRect;

        if (this.defaultValue) {
            this.setOption(this.defaultValue);
        }

        this.addEventListeners();
        

    
    }
    render() {
        return /*html*/ `
            ${this.renderInputs()}
            <div class="form__dropdown_arrow" data-dropdown-arrow=""></div>
            <div class="form__dropdown_menu" data-dropdown-list data-simplebar>
                ${this.renderOptions()}
            </div>
			`
        
    }
    renderInputs() {
        return /*html*/ `
            <input data-dropdown-input readonly name="${this.name}_visible" ${this.placeholder ? 'placeholder="' + this.placeholder + '"' : ''}>
            <input data-dropdown-value type="hidden" name="${this.name}" value="">
			`
         
    }
    renderOptions(options = this.options) {
        
        return options.reduce((html, option) => {
				return html += /*html*/ `<button type="button" data-dropdown-option data-dropdown-value="${option.value}">${option.key}</button>`
				}, '')
    }
    addEventListeners() {
        //    this.visibleInput.addEventListener('focus', this.handleInputFocus.bind(this));
        //    this.visibleInput.addEventListener('input', this.handleInputInput.bind(this));
        //    this.visibleInput.addEventListener('blur', this.handleInputBlur.bind(this));
    
        
        document.addEventListener('click', ({target}) => {
            if (!target.closest('[data-dropdown]')) {
                    this.handleInputBlur();
            }
        })

        this.ref.addEventListener('click', this.handleClick.bind(this));
        this.optionsList.addEventListener('mousedown', this.handleOptionClick.bind(this));
    }
    handleInputFocus() {
       this.ref.classList.add('on-focus');

	   if (!this.readOnly) {
			this.visibleInput.placeholder = 'Поиск по названию';
       		this.visibleInput.value = '';
	   }
              
        document.dispatchEvent(new CustomEvent('dropdown::gotFocus', {detail:{el: this.ref}}))
    }
    handleInputBlur() {
       this.ref.classList.remove('on-focus');
       this.visibleInput.placeholder = this.placeholder;
       this.visibleInput.value = this.data.key;
        document.dispatchEvent(new CustomEvent('dropdown::lostFocus', {detail:{el: this.ref}}))
    }
    handleOptionClick({target}) {

        const btn = target.closest('[data-dropdown-option]');

        this.setOption({
            key: btn.innerText,
            value: btn.dataset.dropdownValue
        });
    }

    handleClick()  {
        this.optionListRect = this.optionsList.getBoundingClientRect();

        // if (this.optionListRect.top > window.innerHeight - this.optionListRect.height - 30) {
        //     this.ref.classList.add('is-top');
        // }else{
        //     setTimeout( _ => {
        //         this.ref.classList.remove('is-top');
        //     }, 250)
        // }
 
        this.ref.classList.toggle('on-focus');
    }

    setOption({key, value}) {
        this.visibleInput.value = key;
        this.visibleInput.classList.add('is-value');
        this.hiddenInput.value = value;
        this.data = {key: key, value: value};
        document.dispatchEvent(new CustomEvent('dropdown::optionSet', {detail: {
            el: this.ref,
            data: this.data
        }}))

        document.dispatchEvent(new CustomEvent('dropdown::change', {detail: 
            {
                input: this.hiddenInput
            } 
        }))
    }
    handleInputInput({target}) {
        const options = this.filterOptions(target.value);
        if (options.length) {
            this.optionsList.innerHTML = this.renderOptions(options);
        }
        else {
            this.optionsList.innerHTML = '<div data-dropdown-option class="is-disabled">Ничего не найдено</div>'
        }
        
    }
    filterOptions(query) {
        return this.options.filter(option => ~option.key.toLowerCase().indexOf(query.toLowerCase()));
    }
    
}

