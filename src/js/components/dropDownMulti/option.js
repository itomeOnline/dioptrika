export default class Option {
    constructor(dataOption, ref) {
        this.dataOption = dataOption,
        this.option = document.createElement('button');
        this.multiEl = document.createElement('button');
        this.multiEl.classList.add('multi_option');
        this.ref = ref,

        this.render(),
        this.text = this.option.textContent,
        this.bindEventListeners()  
    }

    bindEventListeners() {
        this.option.addEventListener('click', this.hadleOptionClick.bind(this));
        this.multiEl.addEventListener('click', this.removeOption.bind(this));
    }

    hadleOptionClick(Event) {
        Event.stopPropagation();
        if (this.option.classList.contains('is-clicked')) this.removeMultiOption();
        else this.addMultiOption(); 
    }

    addMultiOption() {
        this.option.classList.add('is-clicked');
        
        this.multiEl.textContent = this.text;
        this.ref.querySelector('.simplebar-content').appendChild(this.multiEl);
        setTimeout(() => this.multiEl.classList.add('is-visible'), 1);
    }

    removeMultiOption() {
        this.option.classList.remove('is-clicked');
        this.multiElems = document.querySelectorAll('.multi_option');
        let multiRemove = [].find.call(this.multiElems, el => el.textContent == this.text);
        multiRemove.classList.remove('is-visible');
        setTimeout(() => multiRemove.remove(), 300);
    }

    removeOption(Event) {
        Event.stopPropagation();
        this.multiEl.remove();
        this.optionList = document.querySelectorAll('[data-dropdown-option]');
        let optionRemove = [].find.call(this.optionList, el => el.textContent == this.text);
        optionRemove.classList.remove('is-clicked');
    }

    render() {

        this.option.setAttribute('type', 'button');
        this.option.setAttribute('data-dropdown-option', '');
        this.option.setAttribute('data-dropdown-value', `${this.dataOption.value}`);
        this.option.innerHTML = `${this.dataOption.key}`;

        return this.option;
    }
}

export { Option };