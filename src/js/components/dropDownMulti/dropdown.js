import { OptionList } from './optionsList';
// import { Input } from './input';
import { InputHidden } from './InputHidden';

export default class DropdownMulti {
    constructor(ref) {
        this.ref = ref;
        const dataset = this.ref.dataset;
        this.options = JSON.parse(dataset.dropdownOptions);
        this.placeholder = dataset.dropdownPlaceholder;
		this.readOnly = dataset.dropdownReadonly ?? false;
        this.name = dataset.dropdownName ?? 'genericDropdown';
        this.data = {key: '', value: ''};
        
        this.input = null,
        this.inputHidden = null,
        this.optionsList = document.createElement('div'),
        this.render();
        this.addEventListeners();
        
        this.visibleInput = this.ref.querySelector('[data-dropdown-input]');
        this.hiddenInput = this.ref.querySelector('[data-dropdown-value]');
        this.optionsList = this.ref.querySelector('[data-dropdown-list]');
        
    }

    addEventListeners() {
        this.ref.addEventListener('click', this.handleClick.bind(this));

    }

    render() {
        this.inputHidden = new InputHidden(this.placeholder).inputHidden;
        
        this.ref.appendChild( this.inputHidden );
        this.ref.appendChild( this.optionsList );

        this.options.forEach(dataOption => {
            new OptionList(this.optionsList, dataOption, this.ref).list
        });
    }

    handleClick()  {
        this.ref.classList.toggle('on-focus');
    }
    
}

